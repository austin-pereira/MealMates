import { useState } from 'react';
import '../../styles/auth.css';
import { auth, googleProvider } from '../../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully');
        navigate('/group');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up successfully');
        navigate('/group');
      }
    } catch (error: any) {
      setError(`Failed to ${isLogin ? 'sign in' : 'sign up'}`);
      console.error(`${isLogin ? 'Login' : 'Signup'} error:`, error);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('User signed in with Google successfully');
      navigate('/group');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
      console.error('Google login error:', error);
    }
  };

  const toggleMode = (mode: boolean) => {
    setIsLogin(mode);
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <div 
          className={`auth-tab ${isLogin ? 'active' : ''}`}
          onClick={() => toggleMode(true)}
        >
          Log in
        </div>
        <div 
          className={`auth-tab ${!isLogin ? 'active' : ''}`}
          onClick={() => toggleMode(false)}
        >
          Sign up
        </div>
      </div>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️'}
            </button>
          </div>
          {isLogin && (
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          )}
        </div>
        
        <button type="submit" className="auth-button primary">
          {isLogin ? 'Continue' : 'Sign Up'}
        </button>
        
        <div className="divider">
          <span>Or</span>
        </div>
        
        <button type="button" className="auth-button apple">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Zm2.52,7.44a4.51,4.51,0,0,1,2.16-3.81,4.66,4.66,0,0,0-3.66-2c-1.56-.16-3,.91-3.83.91s-2-.89-3.3-.87A4.92,4.92,0,0,0,4.69,9.39C2.93,12.45,4.24,17,6,19.47,6.8,20.68,7.8,22.05,9.12,22s1.75-.82,3.28-.82,2,.82,3.3.79,2.22-1.23,3.06-2.45a11,11,0,0,0,1.38-2.85A4.41,4.41,0,0,1,17.46,12.63Z"/>
          </svg>
          {isLogin ? 'Login with Apple' : 'Sign up with Apple'}
        </button>
        
        <button type="button" className="auth-button google" onClick={handleGoogleSignIn}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {isLogin ? 'Login with Google' : 'Sign up with Google'}
        </button>
        
        <div className="auth-footer">
          {isLogin ? (
            <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(false); }}>Sign up</a></>
          ) : (
            <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(true); }}>Log in</a></>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;