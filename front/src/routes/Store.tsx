import { Tabs, TabsProps } from "antd"

import StorePage from "../components/store/StorePage"
import StorePokechakuchon from "../components/store/StorePokechakuchon"
import StoreItem from "../components/store/StoreItem"

const Store = () => {

    const items : TabsProps['items'] = [
        {
            label: `News`,
            key: "1",
            children: <StorePage />,
          },
          {
            label: `Buy Pokechakuchon`,
            key: "2",
            children: <StorePokechakuchon />,
          },
          {
            label: `Buy Items`,
            key: "3",
            children: <StoreItem />,
          },
    ]


    return (
    <div>
      <h2>Store</h2>
      <div>
        <Tabs
            defaultActiveKey="1"
            style={{ marginBottom: 32 }}
            items={items}
        />
      </div>
    </div>
    )
  }

export default Store