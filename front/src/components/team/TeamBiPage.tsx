import React, { useEffect, useState } from "react";
import { getAllMyPechkuchon, getMyUsedPechakuchon, getAllMyItems, getMyUsedItems } from "../../services/Team";
import { Divider, Row, Col } from "antd";
import TeamList from "./TeamList";

interface TeamBiPageProps {
  type: string;
}

const TeamBiPage: React.FC<TeamBiPageProps> = ({ type }) => {
  const [fullGallery, setFullGallery] = useState<{ name: string; description: string }[]>([]);
  const [usedGallery, setUsedGallery] = useState<{ name: string; description: string }[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      if (type === "pokechakuchon") {
        setFullGallery(await getAllMyPechkuchon());
        setUsedGallery(await getMyUsedPechakuchon());
      } else {
        setFullGallery(await getAllMyItems());
        setUsedGallery(await getMyUsedItems());
      }
    };
    fetchGallery();
  }, [type]);

  return (
    <Row style={{ width: "100%" }}>
      <Col span={11}>
        <h3>My Library</h3>
        <TeamList members={fullGallery} type="library" />
      </Col>
      <Col span={2}>
        <Divider type="vertical" style={{ height: "100%" }} />
      </Col>
      <Col span={11}>
        <h3>My Team</h3>
        <TeamList members={usedGallery} type="team" />
      </Col>
    </Row>
  );
};

export default TeamBiPage;
