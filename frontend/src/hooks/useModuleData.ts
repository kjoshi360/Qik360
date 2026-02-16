import { useEffect, useState } from 'react';
import { ModuleApi } from '../api/services';

export function useModuleData(module: string) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    ModuleApi.list(module).then((res) => setData(res.data));
  }, [module]);
  return data;
}
