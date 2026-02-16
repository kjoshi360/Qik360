import { NavLink } from 'react-router-dom';
import { adminModuleRoutes } from '../../pages/admin';
import { tenantModuleRoutes } from '../../pages/tenant';

type Scope = 'tenant' | 'admin';

export function PlatformSidebar({ scope }: { scope: Scope }) {
  const routes = scope === 'admin' ? adminModuleRoutes : tenantModuleRoutes;

  return (
    <aside className="sidebar">
      <h2>{scope === 'admin' ? 'Admin Panel' : 'Tenant App'}</h2>
      {routes.map((route) => (
        <NavLink key={`${route.module}-${route.path}`} to={route.path} className={({ isActive }) => (isActive ? 'active' : '')}>
          {route.title}
        </NavLink>
      ))}
    </aside>
  );
}
