import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { GetGroup } from './DataStorage';

const ExistingGroup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/'); // Redirect to login page if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const returnToGroupSelection = () => {
    navigate('/group'); // Replace with your desired route
  };

  const Group = () => {
    const { id } = useParams() as { id: string };
    let group = JSON.parse(GetGroup(id));
    let groupinfo = group[id];

    return (
      <div>
        <h3>{groupinfo['name']}</h3>
        <p>Description: {groupinfo['description']}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Existing Group</h1>
      <Group />
      <button className="auth-button secondary" onClick={returnToGroupSelection}>
          Return to Group Selection
        </button>
    </div>
  );
};

export default ExistingGroup;
