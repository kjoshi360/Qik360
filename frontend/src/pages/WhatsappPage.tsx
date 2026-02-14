import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function WhatsappPage() {
  const data = useModuleData('whatsapp' === 'whatsapp' ? 'whatsapp' : 'whatsapp');
  return <Card><h1>Whatsapp</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
