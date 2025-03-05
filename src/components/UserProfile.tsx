import React from 'react';

interface UserProfileProps {
  name: string;
  email: string;
  profileImage: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, profileImage }) => {
  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      margin: '1rem 0'
    }}>
      <img 
        src={profileImage} 
        alt={name}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          marginRight: '1rem'
        }}
      />
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>{name}</h3>
        <p style={{ margin: 0, color: '#666' }}>{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
