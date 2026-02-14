import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function AIPage() {
  const data = useModuleData('ai' === 'whatsapp' ? 'whatsapp' : 'ai');
  return <Card><h1>AI</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
