import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";
import { auth } from '../../firebaseConfig';
import { NewGroup } from './GroupDataStorage';

const CreateGroup = () => {
  const navigate = useNavigate();

  const returnToGroupSelection = () => {
		navigate('/group'); // Replace with your desired route
	};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/'); // Redirect to login page if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const [formData, setFormData] = useState({name: "",description: ""});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //alert(`Name: ${formData.name}, Description: ${formData.description}`);
    if(formData.name == ""){
      alert("Name field cannot be empty!");
      return;
    }
    let id = NewGroup(formData.name, formData.description, auth.currentUser?.email || "nil");
    navigate(`/existing-group/${id}`);
  };

  return (
    <div>
      <h1>Create Group</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        <div>
          <p> </p> 
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="description" id="description" name="description" value={formData.description} onChange={handleChange}/>
        </div>
        
        <button type="submit">Submit</button>
      </form>
      <div>
        <button className="auth-button secondary" onClick={returnToGroupSelection}>
        Return to Group Selection
        </button>
      </div>
    </div>
    
  );
};

export default CreateGroup;
