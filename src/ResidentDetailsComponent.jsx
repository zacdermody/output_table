import React from 'react';
import './ResidentDetailsComponent.css'; // Add or update the CSS for this component

// Function to generate fake email and login based on resident's name
const generateFakeDetails = (name) => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  const email = `${name.toLowerCase().replace(' ', '.')}@example.com`; // Fake email
  const login = `${name.toLowerCase().replace(' ', '')}${randomNum}`; // Fake login

  return { email, login };
};

const ResidentDetailsComponent = ({ resident, onClose }) => {
  if (!resident) return null; // If no resident is selected, return null to hide the component

  const { email, login } = generateFakeDetails(resident.name);

  return (
    <div className="resident-details-overlay">
      <div className="resident-details">
        <h2>{resident.name}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Login:</strong> {login}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ResidentDetailsComponent;
