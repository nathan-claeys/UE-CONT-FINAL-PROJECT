import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { getUserProfile, getUserFriends, User } from "../services/Social";
import Clubs from "../components/social/Clubs";

const Social: React.FC = () => (
  <div>
    <h1>Social</h1>
    <TabsComponent />
  </div>
);

interface FriendsProps {
  friends: string[];
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile();
      setUser(profile);
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      {user ? (
        <div>
          <h2>Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Date de création: {user.createdAt}</p>
          <p>Badges: {user.badges.join(", ")}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

const Friends: React.FC<FriendsProps> = ({ friends }) => (
  <div>
    <h2>Friends</h2>
    {friends.map((friend) => (
      <p key={friend}>{friend}</p>
    ))}
  </div>
);

const TabsComponent: React.FC = () => {
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsList = await getUserFriends();
      setFriends(friendsList.map(String)); // Convert to strings
    };

    fetchFriends();
  }, []);

  const items: TabsProps["items"] = [
    { key: "1", label: "Profile", children: <Profile /> },
    { key: "2", label: "Friends", children: <Friends friends={friends} /> },
    { key: "3", label: "Clubs", children: <Clubs /> },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Social;
