import React, { useState, useEffect } from "react";
import { Input, Button, Typography } from "antd";
import MessageList from "./MessageList";
import { sendMessage, refreshConversation } from "../../services/Messages";

const { Text } = Typography;

interface ChatWindowProps {
  selectedUser: string | null;
  conversation: { text: string; isLeft: boolean }[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser, conversation }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(conversation);

  useEffect(() => {
    setMessages(conversation); // Mettre à jour les messages si la conversation change
  }, [conversation]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Mise à jour locale immédiate
    const newMessage = { text: input, isLeft: false };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    // Persist les données avec l'API mockée
    if (selectedUser) {
      await sendMessage(selectedUser, input);

      // Optionnel : Rafraîchir la conversation pour récupérer les messages simulés du serveur
      const updatedMessages = await refreshConversation(selectedUser);
      setMessages(updatedMessages);
    }
  };

  if (!selectedUser) {
    return <Text>Veuillez sélectionner un utilisateur pour commencer une conversation.</Text>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        <MessageList messages={messages} />
      </div>
      <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ccc" }}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Écrivez votre message..."
        />
        <Button type="primary" onClick={handleSend} style={{ marginLeft: "10px" }}>
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
