import { NavLink } from 'react-router-dom';
import { sidebarConfig } from '../../config/sidebar';
import { useAuthStore } from '../../store/authStore';

export function Sidebar() {
  const { user, plan } = useAuthStore();
  return (
    <aside className="sidebar">
      <h2>Qik360</h2>
      {sidebarConfig
        .filter((item) => user && item.roles.includes(user.role) && item.plans.includes(plan))
        .map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
    </aside>
  );
}
