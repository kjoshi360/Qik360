import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function SettingsPage() {
  const data = useModuleData('settings' === 'whatsapp' ? 'whatsapp' : 'settings');
  return <Card><h1>Settings</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
