import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import ChatWindow from "../components/messages/ChatWindow";
import { getUsers, getConversation } from "../services/Messages";

const { Sider, Content } = Layout;

const Messages: React.FC = () => {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [conversation, setConversation] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const userList = await getUsers();
      setUsers(userList);
    }
    fetchUsers();
  }, []);

  const handleUserSelect = async (userId: string) => {
    setSelectedUser(userId);
    const convo = await getConversation(userId);
    setConversation(convo);
  };

  return (
    <div>
        <h1>Messages</h1>
        <div>
            <Layout style={{ height: "80vh" }}>
            <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                mode="inline"
                onClick={(e) => handleUserSelect(e.key)}
                selectedKeys={selectedUser ? [selectedUser] : []}
                style={{ height: "100%", borderRight: 0 }}
                >
                {users.map((user) => (
                    <Menu.Item key={user.id}>{user.name}</Menu.Item>
                ))}
                </Menu>
            </Sider>
            <Content style={{ padding: "20px" }}>
                <ChatWindow selectedUser={selectedUser} conversation={conversation} />
            </Content>
            </Layout>
        </div>
    </div>
  );
};

export default Messages;
