import { FormEvent, useState } from 'react';
import { AuthApi } from '../api/services';
import { useAuthStore } from '../store/authStore';

export function LoginPage() {
  const [email, setEmail] = useState('owner@qik360.dev');
  const [password, setPassword] = useState('Owner@123');
  const setAuth = useAuthStore((s) => s.setAuth);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await AuthApi.login({ email, password });
    setAuth(res.data.accessToken, res.data.user);
  };

  return <form onSubmit={submit} className="card" style={{maxWidth:400,margin:'40px auto'}}>
    <h1>Login</h1>
    <label>Email<input value={email} onChange={(e)=>setEmail(e.target.value)} /></label>
    <label>Password<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /></label>
    <button type="submit">Sign in</button>
  </form>;
}
