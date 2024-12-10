import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, List, Typography, notification, Progress } from 'antd';
import { Match, simulatePokemonRound } from '../../services/Match';

const { Title, Text } = Typography;

interface ActiveMatchTabProps {
  match: Match;
  onFinishMatch: (matchId: number) => void; // Callback to finish the match
}

const ActiveMatchTab: React.FC<ActiveMatchTabProps> = ({ match, onFinishMatch }) => {
  const [rounds, setRounds] = useState(match.rounds);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startNextRound = () => {
    const nextRoundNumber = rounds.length + 1;

    setLoading(true);
    setProgress(0);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 10;

        if (nextProgress >= 100) {
          clearInterval(timerRef.current!);
          timerRef.current = null;

          // Call the backend logic to simulate the round
          const nextRound = simulatePokemonRound(match.creator, match.opponent, nextRoundNumber);

          // Replace "Player 1" and "Player 2" with actual user names
          nextRound.player1Choice = nextRound.player1Choice.replace('Player 1', match.creator.name);
          nextRound.player2Choice = nextRound.player2Choice.replace('Player 2', match.opponent.name);

          // Add the new round to the state
          setRounds((prevRounds) => [...prevRounds, nextRound]);

          setLoading(false);

          // Display a notification
          notification.success({
            message: `Round ${nextRoundNumber} Completed!`,
            description: `${nextRound.winnerId}'s Pokémon emerged victorious!`,
          });
        }

        return nextProgress;
      });
    }, 200);
  };

  const handleFinishMatch = () => {
    onFinishMatch(match.id);
    notification.success({
      message: `Match ${match.id} Completed!`,
      description: `The match between ${match.creator.name} and ${match.opponent.name} has concluded.`,
    });
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Title level={3}>Match {match.id}</Title>
      <Text>
        <strong>Type:</strong> {match.matchType}
      </Text>
      <Card title="Rounds" style={{ marginTop: 16 }}>
        <List
          dataSource={rounds}
          renderItem={(round) => (
            <List.Item>
              <Text>
                <strong>Round {round.roundNumber}:<br />
                </strong> {round.player1Choice || 'TBD'} vs{' '}
                {round.player2Choice || 'TBD'}{' '} <br />
                <strong>Winner:</strong> {round.winnerId || 'TBD'}
              </Text>
            </List.Item>
          )}
        />
      </Card>
      {loading && (
        <Progress
          percent={progress}
          status="active"
          style={{ marginTop: 16 }}
          strokeColor={{
            from: '#1890ff',
            to: '#52c41a',
          }}
        />
      )}
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={startNextRound}
        disabled={loading}
      >
        {loading ? 'Battle in Progress...' : 'Start Next Round'}
      </Button>
      <Button
        type="default"
        style={{ marginTop: 16, marginLeft: 8 }}
        onClick={handleFinishMatch}
        disabled={rounds.length < 3} // Enable only after 3 rounds
      >
        Finish Match
      </Button>
    </div>
  );
};

export default ActiveMatchTab;
