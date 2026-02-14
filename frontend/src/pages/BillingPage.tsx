import { Card } from '../components/ui/Card';
import { useModuleData } from '../hooks/useModuleData';

export function BillingPage() {
  const data = useModuleData('billing' === 'whatsapp' ? 'whatsapp' : 'billing');
  return <Card><h1>Billing</h1><pre>{JSON.stringify(data, null, 2)}</pre></Card>;
}
