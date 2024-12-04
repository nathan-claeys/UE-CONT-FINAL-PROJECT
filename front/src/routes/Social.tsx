import React, { useEffect } from 'react';
import { Tabs, Button, Flex } from 'antd';
import type { TabsProps } from 'antd';
import { getUserProfile, getUserFriends, getUserClubs, User, getMyClub, leaveClub } from '../services/Social';
import Clubs from '../components/social/Clubs';


const Social: React.FC = () => (
  <div>
    <h1>Social</h1>
    <TabsComponent />
  </div>
)

interface FriendsProps {
  friends: string[];
}

const Profile: React.FC = () => {
  
  const [user, setUser] = React.useState<User | undefined>();

  useEffect(() => {
    getUserProfile().then((profile) => setUser(profile));
  }, []);
  
  return (
    <>
      {user && 
        <div>
          <h2>Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Date de création: {user.createdAt}</p>
          <p>Badges: {user.badges.join(', ')}</p>
        </div>
      }
    </>
  )
}

const Friends: React.FC<FriendsProps> = ({ friends }) => (
  <div>
    <h2>Friends</h2>
    {friends.map((friend) => (
      <p key={friend}>{friend}</p>
    ))}
  </div>
)

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    children: <Profile/>,
  },
  {
    key: '2',
    label: 'Friends',
  children: <Friends friends = {getUserFriends()}/>,
  },
  {
    key: '3',
    label: 'Clubs',
    children: <Clubs clubs = {getUserClubs()}/>,
  },
];

const TabsComponent: React.FC = () => <Tabs defaultActiveKey="1" items={items} />;
export default Social