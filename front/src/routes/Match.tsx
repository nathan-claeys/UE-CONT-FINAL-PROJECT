import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MatchesTab from '../components/match/MatchTab';
import StatsTab from '../components/match/StatsTab';

const MatchAgainstAITab: React.FC = () => (
  <div>
    <h2>Match Against AI</h2>
    <p>Create and play matches against an AI opponent.</p>
  </div>
);

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Matches',
    children: <MatchesTab />,
  },
  {
    key: '2',
    label: 'History & Stats',
    children: <StatsTab />,
  },
  {
    key: '3',
    label: 'Match vs AI',
    children: <MatchAgainstAITab />,
  },
];

const TabsComponent: React.FC = () => <Tabs defaultActiveKey="1" items={items} />;

const Match: React.FC = () => (
  <div>
    <h1>Match Service</h1>
    <TabsComponent />
  </div>
);

export default Match;
