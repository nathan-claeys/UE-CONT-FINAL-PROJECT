import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Row, Col } from 'antd';
import { FireOutlined} from '@ant-design/icons';

const Welcome: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Logo de l'application */}
      <div style={{ marginBottom: '20px' }}>
        <FireOutlined style={{ fontSize: '80px', color: '#f5222d' }} />
      </div>

      {/* Titre de l'application */}
      <Typography.Title level={2}>Clash of Pokechakucha !!!</Typography.Title>

      {/* Les boutons de navigation */}
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12}>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <Button type="primary" block size="large">
              Se connecter
            </Button>
          </Link>
        </Col>
        <Col xs={24} sm={12}>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button type="default" block size="large">
              Créer un compte
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
