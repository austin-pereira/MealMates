import '../../styles/auth.css';

const GroupSelection = () => {
  return (
    <div className="auth-container group-selection">
      <div className="group-buttons">
        <button className="auth-button primary">CREATE GROUP</button>
        
        <div className="divider">
          <span>Or</span>
        </div>
        
        <button className="auth-button secondary">EXISTING GROUP</button>
      </div>
    </div>
  );
};

export default GroupSelection;