import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
    } catch (error: any) {
      setError('Failed to send password reset email');
      console.error('Password reset error:', error);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <p>Enter your email to reset your password</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{width: '100%'}}
        />
        <br />
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
