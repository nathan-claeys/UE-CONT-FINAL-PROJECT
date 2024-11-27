import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/social">social</Link>
        <Link style={padding} to="/matches">matches</Link>
        <Link style={padding} to="/store">users</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/social" element={<Social />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/store" element={<Store />} />
      </Routes>

      <div>
        <i> Clash of Pokechakuchon </i> 
      </div>
    </Router>
  )
}

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the Clash of Pokechakucha</p>
  </div>
)

const Social = () => (
  <div>
    <h2>Social</h2>
    <p>Here you can find friends and your user profile</p>
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