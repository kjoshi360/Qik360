import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginPage } from '../pages/LoginPage';
import { PlatformPage } from '../pages/PlatformPage';
import { adminRoutes, promotionalRoutes, tenantRoutes } from '../config/platformRoutes';
import { PlatformSidebar } from '../components/layout/PlatformSidebar';

function Protected({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function AppShell({ scope }: { scope: 'tenant' | 'admin' }) {
  const routes = scope === 'admin' ? adminRoutes : tenantRoutes;

  return (
    <div className="layout">
      <PlatformSidebar scope={scope} />
      <main className="content">
        <Routes>
          {routes.map((route) => (
            <Route key={route.key} path={route.path} element={<PlatformPage title={route.title} apiModule={route.apiModule} />} />
          ))}
        </Routes>
      </main>
    </div>
  );
}

const authKeys = new Set(['login', 'register', 'forgot-password', 'reset-password', 'email-verification']);

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<PlatformPage title="Register" />} />
      <Route path="/forgot-password" element={<PlatformPage title="Forgot Password" />} />
      <Route path="/reset-password" element={<PlatformPage title="Reset Password" />} />
      <Route path="/email-verification" element={<PlatformPage title="Email Verification" />} />

      {promotionalRoutes
        .filter((route) => !authKeys.has(route.key))
        .map((route) => (
          <Route key={route.key} path={route.path} element={<PlatformPage title={route.title} />} />
        ))}

      <Route path="/app/*" element={<Protected><AppShell scope="tenant" /></Protected>} />
      <Route path="/admin/*" element={<Protected><AppShell scope="admin" /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
