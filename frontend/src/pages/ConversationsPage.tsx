import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function ConversationsPage() {
  const data = useModuleData('conversations' === 'whatsapp' ? 'whatsapp' : 'conversations');
  return <Card><h1>Conversations</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
