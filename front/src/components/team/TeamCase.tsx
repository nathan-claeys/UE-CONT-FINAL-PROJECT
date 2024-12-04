import React from "react";
import { Button, Modal, message } from "antd";

interface TeamCaseProps {
  name: string;
  description: string;
  isLibrary: boolean;
}

const TeamCase: React.FC<TeamCaseProps> = ({ name, description, isLibrary }) => {
  const handleSell = () => {
    Modal.confirm({
      title: "Confirm Sell",
      content: `Are you sure you want to sell ${name}?`,
      onOk: () => {
        message.success(`Sold ${name}`);
      },
    });
  };

  const handleAddToTeam = () => {
    if (/* logic to check team size */ false) {
      message.error("You cannot add more than 5 members to the team.");
    } else {
      message.success(`${name} added to the team.`);
    }
  };

  const handleRemoveFromTeam = () => {
    message.success(`${name} removed from the team.`);
  };

  return (
    <div style={{ border: "1px solid #d9d9d9", padding: 16, borderRadius: 6, marginBottom: 8 }}>
      <h4>{name}</h4>
      <p>{description}</p>
      {isLibrary ? (
        <>
          <Button onClick={handleSell} style={{ marginRight: 8 }}>
            Sell
          </Button>
          <Button onClick={handleAddToTeam}>Add to Team</Button>
        </>
      ) : (
        <Button onClick={handleRemoveFromTeam}>Remove from Team</Button>
      )}
    </div>
  );
};

export default TeamCase;
