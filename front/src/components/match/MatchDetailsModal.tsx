import React from 'react';
import { Modal, Button, List } from 'antd';
import { Match } from '../../services/Match';

interface MatchDetailsModalProps {
  visible: boolean;
  match: Match | null;
  onClose: () => void;
}

const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ visible, match, onClose }) => {
  return (
    <Modal
      title={`Match Details: ${match?.id}`}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {match ? (
        <>
          <p>
            <strong>Creator ID:</strong> {match.creatorId}
          </p>
          <p>
            <strong>Opponent ID:</strong> {match.opponentId || 'N/A'}
          </p>
          <p>
            <strong>Type:</strong> {match.matchType}
          </p>
          <p>
            <strong>Status:</strong> {match.status}
          </p>
          <h3>Rounds</h3>
          {match.rounds.length > 0 ? (
            <List
              bordered
              dataSource={match.rounds}
              renderItem={(round) => (
                <List.Item>
                  <div>
                    <strong>Round {round.roundNumber}:</strong> Player 1 chose {round.player1Choice},{' '}
                    Player 2 chose {round.player2Choice}.{' '}
                    {round.winnerId ? `Winner: ${round.winnerId}` : 'No winner yet.'}
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <p>No rounds available for this match.</p>
          )}
        </>
      ) : (
        <p>No match details available.</p>
      )}
    </Modal>
  );
};

export default MatchDetailsModal;
