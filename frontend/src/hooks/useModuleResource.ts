import { useCallback, useEffect, useState } from 'react';
import { ModuleApi } from '../api/services';

export function useModuleResource(module: string) {
  const [items, setItems] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ModuleApi.list(module);
      const nextItems = Array.isArray(res.data?.items) ? res.data.items : [res.data];
      setItems(nextItems);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [module]);

  const create = useCallback(
    async (payload: Record<string, unknown>) => {
      setError(null);
      await ModuleApi.create(module, payload);
      await refresh();
    },
    [module, refresh],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, loading, error, refresh, create };
}
