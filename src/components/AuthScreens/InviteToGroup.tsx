import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";
import { auth } from '../../firebaseConfig';
import { AddUserToGroup } from './GroupDataStorage';

const InviteToGroup = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/'); // Redirect to login page if not logged in
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);
  
  const [formData, setFormData] = useState({email: ""});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { id } = useParams() as { id: string };
    if(AddUserToGroup(id,formData.email,auth.currentUser?.email || "")){
      navigate(`/existing-group/${id}`);
    } 
  };

  const ReturnToGroup = () => {
    const { id } = useParams() as { id: string };
    navigate(`/existing-group/invite/${id}`);
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter the email of the user you want to invite:</label>
        <div><input type="text" id="email" name="email" value={formData.email} onChange={handleChange}/></div>

        <button type="submit">Submit</button>
      </form>
      <button className="auth-button secondary" onClick={ReturnToGroup}>Back To Group</button>
    </div>
  );
}

export default InviteToGroup;