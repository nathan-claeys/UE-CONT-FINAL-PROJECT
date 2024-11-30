import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import {
  BrowserRouter as Router,
  Routes, Route,
  useNavigate,
  useLocation
} from 'react-router-dom'
import Social from './routes/Social'

const AppTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Détermine l'onglet actif en fonction de l'URL
  const activeKey = location.pathname;

  return (
    <Tabs
      activeKey={activeKey}
      onChange={(key) => navigate(key)} // Change la route quand on change d'onglet
      tabPosition="left"
    >
      <TabPane tab="News" key="/" />
      <TabPane tab="Social" key="/social" />
      <TabPane tab="Matches" key="/matches" />
      <TabPane tab="Store" key="/store" />
    </Tabs>
  );
};

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "250px", borderRight: "1px solid #ddd" }}>
          <AppTabs />
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/social/*" element={<Social />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/store" element={<Store />} />
      </Routes>
        </div>
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the Clash of Pokechakucha</p>
  </div>
)



const Matches = () => (
  <div>
    <h2>Matches</h2>
    <p>Here you can find matches</p>
  </div>
)

const Store = () => (
  <div>
    <h2>Store</h2>
    <p>Here you can find the store</p>
  </div>
)



export default App