import React from 'react';
import { Container, Title, InfoText, ProfileCard } from './styles';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    age: number;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Container>
      <ProfileCard>
        <Title>User Profile</Title>
        <InfoText>Name: {user.name}</InfoText>
        <InfoText>Email: {user.email}</InfoText>
        <InfoText>Age: {user.age}</InfoText>
      </ProfileCard>
    </Container>
  );
};

export default UserProfile;
