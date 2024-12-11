import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/AuthContext';
import { login } from '../services/Login';
import { Form, Input, Button, Typography, message } from 'antd';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  const handleSubmit = async (): Promise<void> => {
    if (!email.endsWith('@imt-atlantique.net')) {
      setError('L\'adresse email doit se terminer par "@imt-atlantique.net".');
      return;
    }

    setError(''); // Réinitialise l'erreur

    try {
      const validAuth = await login(email, password);
      if (validAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          setAuthUser({ token }); // Met à jour l'état d'authentification dans AuthContext
        } else {
          setError('Token is missing');
          message.error('Token is missing');
        }
        navigate('/home');
      }
    } catch (error: any) {
      setError(error.message);
      message.error(error.message); // Affiche une notification avec Ant Design
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Connexion
        </Typography.Title>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Adresse email"
            validateStatus={error && !email.endsWith('@imt-atlantique.net') ? 'error' : ''}
            help={error && !email.endsWith('@imt-atlantique.net') ? error : ''}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre adresse email"
            />
          </Form.Item>
          <Form.Item label="Mot de passe">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Se connecter
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => navigate('/register')} block>
              Créer un compte
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
