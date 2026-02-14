import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function TeamPage() {
  const data = useModuleData('team' === 'whatsapp' ? 'whatsapp' : 'team');
  return <Card><h1>Team</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
