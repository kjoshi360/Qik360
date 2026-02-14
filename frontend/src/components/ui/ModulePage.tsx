import { FormEvent, useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { useModuleResource } from '../../hooks/useModuleResource';

interface ModulePageProps {
  title: string;
  module: string;
  createLabel?: string;
}

export function ModulePage({ title, module, createLabel = 'Create' }: ModulePageProps) {
  const { items, loading, error, refresh, create } = useModuleResource(module);
  const [name, setName] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await create({ name, metadata: { source: 'frontend' } });
    setName('');
  };

  return (
    <>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{title}</h1>
          <Button onClick={refresh}>{loading ? 'Loading...' : 'Refresh'}</Button>
        </div>
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </Card>

      <Card>
        <h2>{createLabel}</h2>
        <form onSubmit={onSubmit}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={`New ${title} item`} />
          </label>
          <div style={{ marginTop: 12 }}>
            <button type="submit">Save</button>
          </div>
        </form>
      </Card>
    </>
  );
}
