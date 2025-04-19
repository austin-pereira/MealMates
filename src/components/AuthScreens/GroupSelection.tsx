import '../../styles/auth.css';
import { useNavigate } from 'react-router-dom';

const GroupSelection = () => {
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate('/create-group'); // Replace with your desired route
  };

  const handleExistingGroup = () => {
    navigate('/existing-group'); // Replace with your desired route
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
      </div>
    </div>
  );
};

export default GroupSelection;