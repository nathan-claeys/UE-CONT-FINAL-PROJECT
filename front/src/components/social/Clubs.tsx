import React, { useEffect, useState } from "react";
import { Button, Modal, Input, message } from "antd";
import { getMyClub, leaveClub, joinClub, createClub, getClubs } from "../../services/Social";

interface Club {
  id: number;
  name: string;
  members: number;
}

const Clubs: React.FC = () => {
  const [myClub, setMyClub] = useState<Club | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClubsData = async () => {
      const clubsData = await getClubs();
      const myClubData = await getMyClub();
      setClubs(clubsData);
      setMyClub(myClubData);
    };

    fetchClubsData();
  }, []);

  const handleAddClub = async () => {
    if (!newClubName.trim()) {
      message.error("Club name cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      await createClub(newClubName);
      message.success(`Club "${newClubName}" created successfully!`);
      setNewClubName("");
      setIsModalVisible(false);
    } catch (error: any) {
      message.error("Failed to create the club.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = async (club: Club) => {
    const joinedClub = await joinClub(club.id);
    setMyClub(joinedClub);
    message.success(`You have joined the club "${club.name}".`);
  };

  return (
    <div>
      <h2>Clubs</h2>

      <h3>My Club</h3>
      {myClub ? (
        <div>
          <p>
            {myClub.name} ({myClub.members} members)
          </p>
          <Button
            onClick={() => {
              leaveClub(myClub.name);
              setMyClub(null);
              message.success("You have left the club.");
            }}
          >
            Leave
          </Button>
        </div>
      ) : (
        <p>You are not in a club.</p>
      )}

      <Button onClick={() => setIsModalVisible(true)}>Create Club</Button>

      <h3>Available Clubs</h3>
      {clubs
        .filter((club) => !myClub || club.id !== myClub.id)
        .map((club) => (
          <div key={club.id}>
            <p>
              {club.name} ({club.members} members)
            </p>
            <Button onClick={() => handleJoinClub(club)}>Join</Button>
          </div>
        ))}

      <Modal
        title="Create a Club"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddClub} loading={loading}>
            Create
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter club name"
          value={newClubName}
          onChange={(e) => setNewClubName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Clubs;
