import { FormEvent, useState } from 'react';
import { Card } from '../components/ui/Card';
import { useModuleResource } from '../hooks/useModuleResource';

interface PlatformPageProps {
  title: string;
  apiModule?: string;
}

export function PlatformPage({ title, apiModule }: PlatformPageProps) {
  const [name, setName] = useState('');
  const resource = apiModule ? useModuleResource(apiModule) : null;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!resource || !name.trim()) return;
    await resource.create({ name, metadata: { source: 'platform-page' } });
    setName('');
  };

  return (
    <>
      <Card>
        <h1>{title}</h1>
        {apiModule ? (
          <>
            <p>Connected module: <strong>{apiModule}</strong></p>
            {resource?.error && <p style={{ color: '#b91c1c' }}>{resource.error}</p>}
            <pre>{JSON.stringify(resource?.items ?? [], null, 2)}</pre>
          </>
        ) : (
          <p>Public informational page configured for marketing website.</p>
        )}
      </Card>

      {apiModule && (
        <Card>
          <h2>Create {title}</h2>
          <form onSubmit={onSubmit}>
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={`Create ${title}`} />
            </label>
            <div style={{ marginTop: 12 }}>
              <button type="submit">Save</button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}
