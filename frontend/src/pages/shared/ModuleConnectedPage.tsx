import { FormEvent, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { useModuleResource } from '../../hooks/useModuleResource';

interface ModuleConnectedPageProps {
  title: string;
  module: string;
}

export function ModuleConnectedPage({ title, module }: ModuleConnectedPageProps) {
  const { items, error, create } = useModuleResource(module);
  const [name, setName] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await create({ name, metadata: { from: title } });
    setName('');
  };

  return (
    <>
      <Card>
        <h1>{title}</h1>
        <p>API Module: <strong>{module}</strong></p>
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </Card>
      <Card>
        <h2>Create item</h2>
        <form onSubmit={onSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={`Create in ${title}`} />
          <div style={{ marginTop: 12 }}>
            <button type="submit">Save</button>
          </div>
        </form>
      </Card>
    </>
  );
}
