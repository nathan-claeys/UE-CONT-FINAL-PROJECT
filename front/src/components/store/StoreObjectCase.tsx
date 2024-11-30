import React from "react";
import { Card, Button} from "antd";

interface StoreObjectProps {
  name: string;
  description: string;
  onBuy: () => void;
}

const StoreObjectCase: React.FC<StoreObjectProps> = ({ name, description, onBuy }) => {
  return (
    <Card
      title={name}
      bordered={true}
      style={{ margin: "10px", textAlign: "center" }}
    >
      <p>
        {description.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <Button type="primary" onClick={onBuy}>
        Acheter
      </Button>
    </Card>
  );
};

export default StoreObjectCase;
