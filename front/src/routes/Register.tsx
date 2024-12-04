import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import register from '../services/Register';

export default function Register(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (): Promise<void> => {
    if (!email.endsWith('@imt-atlantique.net')) {
      message.error('L\'adresse email doit se terminer par "@imt-atlantique.net".');
      return;
    }

    if (password !== confirmPassword) {
      message.error('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const res = await register(name, email, password);

      if (res.message === 'User registered successfully') {
        message.success('Inscription réussie !');
        navigate('/login');
      } else {
        message.error('Erreur lors de l\'inscription.');
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          Inscription
        </Typography.Title>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Nom">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez votre nom"
            />
          </Form.Item>
          <Form.Item
            label="Adresse email"
            validateStatus={!email.endsWith('@imt-atlantique.net') ? 'error' : ''}
            help={!email.endsWith('@imt-atlantique.net') ? 'L\'adresse email doit se terminer par "@imt-atlantique.net".' : ''}
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
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              visibilityToggle={{
                visible: showPassword,
                onVisibleChange: setShowPassword,
              }}
            />
          </Form.Item>
          <Form.Item
            label="Confirmer le mot de passe"
            validateStatus={password !== confirmPassword ? 'error' : ''}
            help={password !== confirmPassword ? 'Les mots de passe ne correspondent pas.' : ''}
          >
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              visibilityToggle={{
                visible: showPassword,
                onVisibleChange: setShowPassword,
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              S'inscrire
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => navigate('/login')} block>
              Se connecter
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
