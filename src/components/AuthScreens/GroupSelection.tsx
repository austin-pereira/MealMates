import '../../styles/auth.css';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { User, signOut } from 'firebase/auth';
import { Role, GetAllGroupIDsFromUser, GetGroup } from './GroupDataStorage';
import { WipeLocalStorage, createDynamicComponent } from './Utils';

const GroupSelection = () => {
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate('/create-group'); // Replace with your desired route
  };

  const handleExistingGroup = () => {
    navigate('/existing-group'); // Replace with your desired route
  };

  const ClearLocal = () => {
    WipeLocalStorage();
    navigate('/group');
  }

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

  interface GroupItem {
    groupid: string;
    groupJSON: string;
  }

  const GroupElement: React.FC<GroupItem> = ({groupid, groupJSON}) => {
    let group = JSON.parse(groupJSON);
    
    return (
      <div>
        <p>Group Name: {group['name']}</p>
        <button className="auth-button secondary" onClick={() => navigate(`/existing-group/${groupid}`)}>Go To Group</button>
      </div>
      
    );
  }

  

  const RenderGroups = () => {
    let groupIDs = GetAllGroupIDsFromUser(auth.currentUser?.email || "nil");

    return (
      <div>
        {groupIDs.map((item, index) => createDynamicComponent(GroupElement, {groupid : item, groupJSON : JSON.stringify(JSON.parse(GetGroup(item))[item])}))}
      </div>
    );
  }

  return (
    <div className="auth-container group-selection">
      <div className="group-buttons">
        <div>Your Groups</div>
        <RenderGroups />

        <div className="divider">
          <span>Or</span>
        </div>

        <button className="auth-button primary" onClick={handleCreateGroup}>
          CREATE GROUP
        </button>

        <button className="auth-button primary" onClick={ClearLocal}>
          DEBUG: CLEAR STORAGE
        </button>

        <button className="auth-button logout" onClick={handleLogout}>
          LOGOUT
      </button>
      </div>
    </div>
  );
};

export default GroupSelection;