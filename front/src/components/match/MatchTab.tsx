import React, { useState, useEffect } from 'react';
import { List, Button, Modal, Form, Select, Divider, Tabs, notification } from 'antd';
import MatchDetailsModal from './MatchDetailsModal';
import { getUserProfile, User } from '../../services/Social';
import { MatchService, Match, Opponent } from '../../services/Match';
import ActiveMatchTab from './ActiveMatchTab';

const { TabPane } = Tabs;

const MatchesTab: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // State for user
  const [matches, setMatches] = useState<Match[]>([]);
  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [activeMatches, setActiveMatches] = useState<Match[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>("matches-tab"); // Active tab state

  useEffect(() => {
    const currentUser = getUserProfile();
    setUser(currentUser);
    MatchService.getMatches().then((data) => setMatches(data));
    MatchService.getOpponents(currentUser.id).then((data) => setOpponents(data));
  }, []);

  const showDetailsModal = (match: Match) => {
    setSelectedMatch(match);
    setIsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setSelectedMatch(null);
    setIsModalVisible(false);
  };

  const handleFinishMatch = async (matchId: number) => {
    try {
      await MatchService.finishMatch(matchId);
      const updatedMatches = await MatchService.getMatches();
      setMatches(updatedMatches);
      setActiveMatches(updatedMatches.filter((match) => match.status === 'in-progress'));
      setActiveTabKey("matches-tab");

      notification.success({ message: `Match ${matchId} finished`, description: 'The match has been completed.' });
    } catch (error) {
      notification.error({ message: 'Error finishing match', description: `Could not update match status. Please try again. Error: ${error}` });
    }
  };

  const handleCreateMatch = (match: Match) => {
    if (!user) {
      notification.error({ message: 'User not logged in!' });
      return;
    }

    const opponent = opponents.find((opponent) => opponent.id === match.opponentId)

    if (!opponent) {
      notification.error({ message: 'Opponent not found!' });
      return;
    }

    const newMatch: Match = {
      id: Math.random(), // Generate a random match ID
      creatorId: user.id,
      creator: user,
      opponentId: match.opponentId,
      opponent: opponent,
      matchType: match.matchType,
      status: 'in-progress',
      rounds: [],
    };

    MatchService.createMatch(newMatch).then((createdMatch) => {
      setMatches([...matches, createdMatch]);
      setActiveMatches([...activeMatches, createdMatch]);
      setIsCreateModalVisible(false);
      setActiveTabKey(createdMatch.id.toString()); // Set the new match tab as active
      notification.success({ message: `Match ${createdMatch.id} created`, description: 'The match has started.' });
    });
  };

  const handleDeleteMatch = (id: number) => {
    MatchService.deleteMatch(id).then(() => {
      setMatches(matches.filter((match) => match.id !== id));
      setActiveMatches(activeMatches.filter((match) => match.id !== id));
    });
  };

  return (
    <div>
      <h2>Manage Matches</h2>
      <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
        Create Match
      </Button>
      <Divider />
      <Tabs
        activeKey={activeTabKey || undefined}
        onChange={(key) => setActiveTabKey(key || undefined)}
      ><TabPane tab="Matches" key="matches-tab">
          <List
            bordered
            dataSource={matches.filter((match) => match.status !== 'in-progress')}
            renderItem={(match) => (
              <List.Item>
                <div>
                  <strong>Match ID:</strong> {match.id} <br />
                  <strong>Type:</strong> {match.matchType}
                </div>
                <div>
                  <Button type="link" onClick={() => showDetailsModal(match)}>
                    View Details
                  </Button>
                  <Button type="link" danger onClick={() => handleDeleteMatch(match.id)}>
                    Delete
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        {activeMatches
          .filter((match) => match.status === 'in-progress')
          .map((match) => (
            <TabPane tab={`Match ${match.id} (active)`} key={match.id}>
              <ActiveMatchTab match={match} onFinishMatch={handleFinishMatch} />
            </TabPane>
          ))}
      </Tabs>
      <MatchDetailsModal
        visible={isModalVisible}
        match={selectedMatch}
        onClose={closeDetailsModal}
      />
      <Modal
        title="Create a New Match"
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreateMatch}>
          <Form.Item
            label="Opponent"
            name="opponentId"
            rules={[{ required: true, message: 'Please select an opponent!' }]}
          >
            <Select placeholder="Select an Opponent">
              {opponents.map((opponent) => (
                <Select.Option key={opponent.id} value={opponent.id}>
                  {opponent.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Match Type"
            name="matchType"
            rules={[{ required: true, message: 'Please select the match type!' }]}
          >
            <Select placeholder="Select Match Type">
              <Select.Option value="ranked">Ranked</Select.Option>
              <Select.Option value="casual">Casual</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Match
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MatchesTab;
