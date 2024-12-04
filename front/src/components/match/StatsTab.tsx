import React, { useEffect, useState } from 'react';
import { Typography, Statistic, Row, Col, Card } from 'antd';
import { Pie } from '@ant-design/plots';
import { Match, MatchService } from '../../services/Match';
import { getUserProfile, User } from '../../services/Social';

const { Title, Text } = Typography;

const StatsTab: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [userWins, setUserWins] = useState(0);
  const [userLosses, setUserLosses] = useState(0);
  const [mostPlayedOpponent, setMostPlayedOpponent] = useState<string | null>(null);
  const [, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const currentUser = getUserProfile();
      setUser(currentUser);

      const fetchedMatches = await MatchService.getMatches();
      setMatches(fetchedMatches);

      const wins = fetchedMatches.filter(
        (match) =>
          match.status === 'completed' && match.winner?.id === currentUser.id
      ).length;

      const losses = fetchedMatches.filter(
        (match) =>
          match.status === 'completed' && match.winner?.id !== currentUser.id
      ).length;

      setUserWins(wins);
      setUserLosses(losses);

      // Determine the most played opponent
      const opponentCounts = fetchedMatches.reduce<Record<number, number>>((acc, match) => {
        const opponentId = match.opponent?.id;
        if (opponentId) {
          acc[opponentId] = (acc[opponentId] || 0) + 1;
        }
        return acc;
      }, {});

      const mostPlayed = Object.entries(opponentCounts).reduce(
        (max: { id: number | null; count: number }, [opponentId, count]) =>
          count > max.count
            ? { id: Number(opponentId), count }
            : max,
        { id: null, count: 0 }
      );


      if (mostPlayed.id !== null) {
        const opponentName = fetchedMatches.find((match) => match.opponent?.id === mostPlayed.id)?.opponent?.name;
        setMostPlayedOpponent(opponentName || null);
      }
    };

    fetchMatches();
  }, []);

  const pieData = [
    { type: 'Wins', value: userWins },
    { type: 'Losses', value: userLosses },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div>
      <Title level={2}>Match History and Statistics</Title>
      <Text>Review your performance and see detailed statistics of your matches.</Text>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Matches Played" value={matches.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Matches Won" value={userWins} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Matches Lost" value={userLosses} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Most Played Against" value={mostPlayedOpponent || 'N/A'} />
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: 40 }}>
        <Title level={4}>Wins vs Losses</Title>
        <Pie {...pieConfig} />
      </div>
    </div>
  );
};

export default StatsTab;
