import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginPage } from '../pages/LoginPage';
import { promotionalModuleRoutes } from '../pages/promotional';
import { tenantModuleRoutes } from '../pages/tenant';
import { adminModuleRoutes } from '../pages/admin';
import { PlatformSidebar } from '../components/layout/PlatformSidebar';

function Protected({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function AppShell({ scope }: { scope: 'tenant' | 'admin' }) {
  const routes = scope === 'admin' ? adminModuleRoutes : tenantModuleRoutes;
  return (
    <div className="layout">
      <PlatformSidebar scope={scope} />
      <main className="content">
        <Routes>
          {routes.map((route) => (
            <Route key={`${route.module}-${route.path}`} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      {promotionalModuleRoutes.map((route) => (
        <Route key={`${route.module}-${route.path}`} path={route.path} element={route.path === '/login' ? <LoginPage /> : <route.component />} />
      ))}
      <Route path="/app/*" element={<Protected><AppShell scope="tenant" /></Protected>} />
      <Route path="/admin/*" element={<Protected><AppShell scope="admin" /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
