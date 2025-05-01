import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Role, GetGroup, LeaveGroup, DeleteGroup, IsOwner, GetUserRole, GetAllMembersInGroup } from './GroupDataStorage';
import { createDynamicComponent } from './Utils';

/*
TODO: 
- add task creation and task assignment
- integrate shopping lists
*/

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
  

	interface GroupMember {
		member: string;
	}

	const MemberElement: React.FC<GroupMember> = ({member}) => {
		const { id } = useParams() as { id: string };
		let currentuser = auth.currentUser?.email || "";
		let currentuserrole = GetUserRole(id,currentuser); //TODO: use for things

		return (
		<div>
			<div>{member}</div>
			<div>Role: {GetUserRole(id,member)}</div>
			
		</div>
		);
	}

  const Group = () => {
    const { id } = useParams() as { id: string };
    const isOwner = IsOwner(id,auth.currentUser?.email || "");
    let group = JSON.parse(GetGroup(id));
    let groupinfo = group[id];

    const leaveGroup = () => {
      if(LeaveGroup(id, auth.currentUser?.email || "")){
        returnToGroupSelection();
      }
    }

    const deleteGroup = () => {
      if(DeleteGroup(id,auth.currentUser?.email || "")){
        returnToGroupSelection();
      }
    }

    const RenderMembers = () => {
      return (
        <div>
        {GetAllMembersInGroup(id).map((item, index) => createDynamicComponent(MemberElement, {member:item}))}
        </div>
      );
    }

    return (
      <div>
        <h3>{groupinfo['name']}</h3>
        <div>Description: {groupinfo['description']}</div>
        <RenderMembers />
        <button className="auth-button secondary" onClick={() => navigate(`/existing-group/invite/${id}`)}>Invite Member</button>
        <button className="auth-button secondary" onClick={isOwner ? deleteGroup : leaveGroup}>{isOwner ? "Delete" : "Leave"} Group</button>
        <button className="auth-button secondary" onClick={() => navigate(`/existing-group/create-recipe/${id}`)}>Create Recipe</button>
        <button className="auth-button secondary" onClick={() => navigate(`/existing-group/recipes/${id}`)}>View Recipes</button>

      </div>
    );
  }

  return (
  <div>
  <h1>Existing Group</h1>
  <Group />
  
  <div>
    <button className="auth-button secondary" onClick={returnToGroupSelection}>
      Return to Group Selection
    </button>
  </div>
  
  </div>
  );
};

export default ExistingGroup;
