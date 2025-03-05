import React from 'react';
import styles from './UserProfile.module.css';

interface UserProfileProps {
  name: string;
  email: string;
  profileImageUrl: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, profileImageUrl }) => {
  return (
    <div className={styles.container}>
      <img 
        src={profileImageUrl} 
        alt="Profile" 
        className={styles.profileImage}
      />
      <div className={styles.infoContainer}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.email}>{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
