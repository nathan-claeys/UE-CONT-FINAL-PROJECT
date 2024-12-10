import React, { useEffect, useState } from "react";
import { Button, Modal, Input, message } from "antd";
import { getMyClub, leaveClub, joinClub, createClub, getClubs } from "../../services/Social";

interface Club {
  id: number;
  name: string;
  members: number;
}

const Clubs: React.FC = () => {
  const [myClub, setMyClub] = useState<{ id: number; name: string; members: number } | null>();
  const [clubs, setClubs] = useState<Club[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      const clubs = await getClubs(); // Appel à la fonction de service
      setClubs(clubs);
      const myClub = getMyClub(); // Appel à la fonction de service
      setMyClub(myClub);
    };
    fetchClubs();
  }, []);

  const handleAddClub = async () => {
    if (!newClubName.trim()) {
      message.error("Club name cannot be empty!");
      return;
    }
    setLoading(true);
    try {
      await createClub(newClubName); // Appel à la fonction de service
      message.success(`Club "${newClubName}" created successfully!`);
      setNewClubName("");
      setIsModalVisible(false);
    } catch (error: any) {
      message.error(error.message || "Failed to create the club.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = (club: Club) => {
    Modal.confirm({
      title: "Confirm Join",
      content: `Are you sure you want to join the club "${club.name}"?`,
      onOk: () => {
        const joinedClub = joinClub(club.id); // Appel à la fonction de service
        setMyClub(joinedClub);
        message.success(`You have joined the club "${club.name}".`);
      },
    });
  };

  return (
    <div>
      <h2>Clubs</h2>

      <h3>My Club</h3>
      {myClub ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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

      <Button type="primary" style={{ margin: "10px 0" }} onClick={() => setIsModalVisible(true)}>
        Create Club
      </Button>

      <h3>Available Clubs</h3>
      {clubs && clubs
        .filter((club) => !myClub || club.id !== myClub.id)
        .map((club) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }} key={club.id}>
            <p>
              {club.name} ({club.members} members)
            </p>
            <Button onClick={() => handleJoinClub(club)}>Join</Button>
          </div>
        ))}

      {/* Modal pour ajouter un club */}
      <Modal
        title="Create a Club"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleAddClub}>
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
