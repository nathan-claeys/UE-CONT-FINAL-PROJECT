import React from 'react';
import { Tabs, Button } from 'antd';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './helpers/AuthContext';
import ProtectedRoute from './components/PrivateRoute';
import Welcome from './routes/Welcome';
import Social from './routes/Social';
import Store from './routes/Store';
import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';
import Messages from './routes/Messages';
import Team from './routes/Team';

const { TabPane } = Tabs;

// Composant pour gérer les onglets et le bouton Logout
const AppTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // Détermine l'onglet actif en fonction de l'URL
  const activeKey = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige l'utilisateur vers la page de connexion
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => navigate(key)} // Change la route quand on change d'onglet
        tabPosition="left"
        style={{ flex: 1, overflow: 'hidden', }}
        tabBarStyle={{
          width: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        <TabPane tab="News" key="/home" />
        <TabPane tab="Social" key="/social" />
        <TabPane tab="Team" key="/team" />
        <TabPane tab="Matches" key="/matches" />
        <TabPane tab="Store" key="/store" />
        <TabPane tab="Messages" key="/messages" />
      </Tabs>
      <div style={{ padding: '10px', borderTop: '1px solid #ddd' }}>
        <Button type="primary" danger block onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

// Page Matches
const Matches = () => (
  <div>
    <h2>Matches</h2>
    <p>Here you can find matches</p>
  </div>
);

// Layout pour les routes protégées avec AppTabs
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', height: '100vh' }}>
    <div style={{ width: '250px', borderRight: '1px solid #ddd' }}>
      <AppTabs />
    </div>
    <div style={{ flex: 1, padding: '20px' }}>{children}</div>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes protégées */}
          <Route
            path="/home"
            element={
              <ProtectedRoute component={() => (
                <ProtectedLayout>
                  <Home />
                </ProtectedLayout>
              )} />
            }
          />
          <Route
            path="/social/*"
            element={
              <ProtectedRoute component={() => (
                <ProtectedLayout>
                  <Social />
                </ProtectedLayout>
              )} />
            }
          />
          <Route
            path="/team/*"
            element={
              <ProtectedRoute component={() => (
                <ProtectedLayout>
                  <Team />
                </ProtectedLayout>
              )} />
            }
          />
          <Route
            path="/matches"
            element={
              <ProtectedRoute component={() => (
                <ProtectedLayout>
                  <Matches />
                </ProtectedLayout>
              )} />
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute component={() => (
                <ProtectedLayout>
                  <Store />
                </ProtectedLayout>
              )} />
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute component={() => (
                <ProtectedLayout>
                  <Messages />
                </ProtectedLayout>
              )} />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
