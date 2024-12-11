import { Tabs, TabsProps } from "antd";
import TeamBiPage from "../components/team/TeamBiPage";

const Team = () => {
  const items: TabsProps["items"] = [
    {
      label: `Pokéchakuchons`,
      key: "1",
      children: <TeamBiPage type={"pokechakuchon"} />,
    },
    {
      label: `Items`,
      key: "2",
      children: <TeamBiPage type={"item"} />,
    },
  ];

  return (
    <div>
      <h2>Store</h2>
      <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }} items={items} />
    </div>
  );
};

export default Team;
