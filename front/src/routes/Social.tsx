import { Button } from 'antd';
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { getUserProfile, getUserFriends, getUserClubs, User } from '../services/Social';



const Social: React.FC = () => (
  <div>
    <h1>Social</h1>
    <TabsComponent />
  </div>
)

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => (
  // Display info about the user
  <div>
    <h2>Profile</h2>
    <p>Name: {user.name}</p>
    <p>Email: {user.email}</p>
    <p>Age: {user.age}</p>
    <p>Badges: {user.badges.join(', ')}</p>
  </div>
)

const Friends: React.FC = () => (
  <div>
    <h2>Friends</h2>
    <p>Here you can find your friends</p>
  </div>
)

const Clubs: React.FC = () => (
  <div>
    <h2>Clubs</h2>
    <p>Here you can find your clubs</p>
  </div>
)

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    children: <Profile user = {getUserProfile()} />,
  },
  {
    key: '2',
    label: 'Friends',
    children: <Friends />,
  },
  {
    key: '3',
    label: 'Clubs',
    children: <Clubs />,
  },
];

const TabsComponent: React.FC = () => <Tabs defaultActiveKey="1" items={items} />;
export default Social