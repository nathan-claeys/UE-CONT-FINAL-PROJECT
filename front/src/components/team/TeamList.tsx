import React from "react";
import TeamCase from "./TeamCase";

interface TeamMember {
  name: string;
  description: string;
}

interface TeamListProps {
  members: TeamMember[];
  type: string;
}

const TeamList: React.FC<TeamListProps> = ({ members, type }) => {
  return (
    <div>
      {members.map((member, index) => (
        <TeamCase
          key={index}
          name={member.name}
          description={member.description}
          isLibrary={type === "library"}
        />
      ))}
    </div>
  );
};

export default TeamList;
