import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuthStore } from '../store/authStore';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ConversationsPage } from '../pages/ConversationsPage';
import { WhatsappPage } from '../pages/WhatsappPage';
import { AIPage } from '../pages/AIPage';
import { KnowledgePage } from '../pages/KnowledgePage';
import { AutomationPage } from '../pages/AutomationPage';
import { BillingPage } from '../pages/BillingPage';
import { TeamPage } from '../pages/TeamPage';
import { SettingsPage } from '../pages/SettingsPage';

function Protected({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function Shell() {
  return <div className="layout"><Sidebar /><main className="content"><Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/conversations" element={<ConversationsPage />} />
    <Route path="/whatsapp" element={<WhatsappPage />} />
    <Route path="/ai" element={<AIPage />} />
    <Route path="/knowledge" element={<KnowledgePage />} />
    <Route path="/automation" element={<AutomationPage />} />
    <Route path="/billing" element={<BillingPage />} />
    <Route path="/team" element={<TeamPage />} />
    <Route path="/settings" element={<SettingsPage />} />
  </Routes></main></div>;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<Protected><Shell /></Protected>} />
    </Routes>
  );
}
