import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function DashboardPage() {
  const data = useModuleData('dashboard' === 'whatsapp' ? 'whatsapp' : 'dashboard');
  return <Card><h1>Dashboard</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
