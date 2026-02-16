import { NavLink } from 'react-router-dom';
import { adminRoutes, tenantRoutes } from '../../config/platformRoutes';

type Scope = 'tenant' | 'admin';

export function PlatformSidebar({ scope }: { scope: Scope }) {
  const routes = scope === 'admin' ? adminRoutes : tenantRoutes;

  return (
    <aside className="sidebar">
      <h2>{scope === 'admin' ? 'Admin Panel' : 'Tenant App'}</h2>
      {routes.map((route) => (
        <NavLink key={route.key} to={route.path} className={({ isActive }) => (isActive ? 'active' : '')}>
          {route.title}
        </NavLink>
      ))}
    </aside>
  );
}
