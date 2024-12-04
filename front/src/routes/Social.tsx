import React, { useEffect } from 'react';
import { Tabs, Button, Flex } from 'antd';
import type { TabsProps } from 'antd';
<<<<<<< HEAD
import { getUserProfile, getUserFriends, getUserClubs, User, getMyClub, leaveClub } from '../services/Social';
import Clubs from '../components/social/Clubs';
=======
import { getUserProfile, getUserFriends, User, getMyClub, leaveClub } from '../services/Social';

import { joinClub } from '../services/Social';
>>>>>>> 82eb8f4399a7d5339a92f8642c7462b03b937c57


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

<<<<<<< HEAD
=======
const Clubs: React.FC = () => {

  const [clubs, setClubs] = React.useState<{ id: number, name: string, members: number }[]>([]);
  const [myClub, setMyClub] = React.useState<{ id: number, name: string, members: number } | null>(getMyClub());
  
  useEffect(() => {
    getUserClubs().then((clubs) => setClubs(clubs));
  }, []);

  return (
  <div>
    <h2>Clubs</h2>
    <h3>My club</h3>
    {myClub ? (
      <Flex gap={"middle"}>
        <p>{myClub.name} ({myClub.members} members)</p>
        <Button onClick={() => {leaveClub();setMyClub(null)}}>Leave</Button>
      </Flex>
    ) : (
      <p>You are not in a club</p>
    )}
    <h3>Available clubs</h3>
    {clubs.map((club) => (
      <Flex gap={"middle"} key={club.name}>
        <p>{club.name} ({club.members} members)</p>
        <Button onClick={() => setMyClub(joinClub(club.id))}>Join</Button>
      </Flex>
    ))}
  </div>
)}

>>>>>>> 82eb8f4399a7d5339a92f8642c7462b03b937c57
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
    children: <Clubs/>,
  },
];

const TabsComponent: React.FC = () => <Tabs defaultActiveKey="1" items={items} />;
export default Social