import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function AutomationPage() {
  const data = useModuleData('automation' === 'whatsapp' ? 'whatsapp' : 'automation');
  return <Card><h1>Automation</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
