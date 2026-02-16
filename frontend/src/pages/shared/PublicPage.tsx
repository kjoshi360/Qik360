import { Card } from '../../components/ui/Card';

interface PublicPageProps {
  title: string;
  module: string;
}

export function PublicPage({ title, module }: PublicPageProps) {
  return (
    <Card>
      <h1>{title}</h1>
      <p>Promotional Module: <strong>{module}</strong></p>
      <p>This page is ready for marketing content and conversion components.</p>
    </Card>
  );
}
