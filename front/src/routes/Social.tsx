import React from 'react';
import { Tabs, Button, Flex } from 'antd';
import type { TabsProps } from 'antd';
import { getUserProfile, getUserFriends, getUserClubs, User, getMyClub, leaveClub } from '../services/Social';

import { joinClub } from '../services/Social';


const Social: React.FC = () => (
  <div>
    <h1>Social</h1>
    <TabsComponent />
  </div>
)

interface ProfileProps {
  user: User;
}

interface FriendsProps {
  friends: string[];
}

interface ClubsProps {
  clubs: { id: number, name: string, members: number }[];
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

const Friends: React.FC<FriendsProps> = ({ friends }) => (
  <div>
    <h2>Friends</h2>
    {friends.map((friend) => (
      <p key={friend}>{friend}</p>
    ))}
  </div>
)

const Clubs: React.FC<ClubsProps> = ({ clubs }) => {

  const [myClub, setMyClub] = React.useState<{ id: number, name: string, members: number } | null>(getMyClub());
  
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

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    children: <Profile user = {getUserProfile()} />,
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