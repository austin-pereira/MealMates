import { useState } from 'react';
import Login from './components/AuthScreens/Login';
import GroupSelection from './components/AuthScreens/GroupSelection';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'group'>('login');

  return (
    <div className="app-container">
      {currentScreen === 'login' ? (
        <div>
          <Login />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              onClick={() => setCurrentScreen('group')} 
              style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
            >
              Go to Group Selection (for demo purposes)
            </button>
          </div>
        </div>
      ) : (
        <div>
          <GroupSelection />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              onClick={() => setCurrentScreen('login')} 
              style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
            >
              Back to Login (for demo purposes)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;