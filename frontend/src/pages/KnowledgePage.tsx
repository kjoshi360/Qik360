import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function KnowledgePage() {
  const data = useModuleData('knowledge' === 'whatsapp' ? 'whatsapp' : 'knowledge');
  return <Card><h1>Knowledge</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
