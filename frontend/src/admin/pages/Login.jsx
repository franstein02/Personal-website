import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { FiLock } from 'react-icons/fi';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    const result = await login(password);
    
    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <div className="w-full max-w-md p-8 rounded-2xl border shadow-xl" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        
        <div className="mb-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--accent)' }}>
            <FiLock size={24} />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Admin Login</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>Enter your password to access the panel.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl text-sm font-medium border text-red-500 bg-red-500/10 border-red-500/20 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium eyebrow">PASSWORD</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
              style={{ 
                backgroundColor: 'var(--bg)', 
                borderColor: 'var(--border)',
                color: 'var(--text)' 
              }}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm hover:underline" style={{ color: 'var(--text-muted)' }}>
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
