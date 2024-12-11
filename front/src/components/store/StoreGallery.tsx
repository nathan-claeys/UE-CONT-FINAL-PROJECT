import React from "react";
import { Row, Col } from "antd";
import StoreObject from "./StoreObjectCase";

interface StoreGalleryProps {
  items: { name: string; description: string }[];
  columns: number;
  onBuy: (item: { name: string; description: string }) => void;
}

const StoreGallery: React.FC<StoreGalleryProps> = ({ items, columns, onBuy }) => {
  return (
    <Row gutter={[16, 16]} style={{ padding: "20px" }}>
      {items.map((item, index) => (
        <Col key={index} span={24 / columns}>
          <StoreObject
            name={item.name}
            description={item.description}
            onBuy={() => onBuy(item)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default StoreGallery;
