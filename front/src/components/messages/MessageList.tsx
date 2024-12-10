import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

interface MessageListProps {
  messages: { text: string; isLeft: boolean }[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: msg.isLeft ? "flex-start" : "flex-end",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              maxWidth: "70%",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: msg.isLeft ? "#f0f0f0" : "#1890ff",
              color: msg.isLeft ? "#000" : "#fff",
              textAlign: msg.isLeft ? "left" : "right",
            }}
          >
            <Text>{msg.text}</Text>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessageList;
