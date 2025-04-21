import '../../styles/auth.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { User, signOut } from 'firebase/auth';

const GroupSelection = () => {
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate('/create-group'); // Replace with your desired route
  };

  const handleExistingGroup = () => {
    navigate('/existing-group'); // Replace with your desired route
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/'); // Redirect to login page if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="auth-container group-selection">
      <div className="group-buttons">
        <button className="auth-button primary" onClick={handleCreateGroup}>
          CREATE GROUP
        </button>
        
        <div className="divider">
          <span>Or</span>
        </div>
        
        <button className="auth-button secondary" onClick={handleExistingGroup}>
          EXISTING GROUP
        </button>
        <button className="auth-button logout" onClick={handleLogout}>
          LOGOUT
      </button>
      </div>
    </div>
  );
};

export default GroupSelection;