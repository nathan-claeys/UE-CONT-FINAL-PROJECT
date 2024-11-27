import { Link, Outlet, Route, Routes } from "react-router-dom"
import { Tabs } from "antd"

import StorePage from "../components/StorePage"
import StorePokechakuchon from "../components/StorePokechakuchon"
import StoreItem from "../components/StoreItem"

const Store = () => {

    const padding = {
        padding: 5
      }


    return (
    <div>
      <h2>Store</h2>
      <div>
        <Tabs>
            
        </Tabs>
        <Link style={padding} to="/store">News</Link>
        <Link style={padding} to="/store/pokechakuchon">Pokechakuchon</Link>
        <Link style={padding} to="/store/items">Items</Link>
      </div>
      <div>
        <Outlet />
        <Routes>
            <Route index element={<StorePage />} />
            <Route path="pokechakuchon" element={<StorePokechakuchon />} />
            <Route path="items" element={<StoreItem />} />
        </Routes>
      </div>
    </div>
    )
  }

export default Store