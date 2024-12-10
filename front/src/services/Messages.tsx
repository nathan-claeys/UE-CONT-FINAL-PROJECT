interface User {
    id: string;
    name: string;
  }
  
  interface Message {
    text: string;
    isLeft: boolean;
  }
  
  const mockUsers: User[] = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ];
  
  let mockConversations: Record<string, Message[]> = {
    "1": [
      { text: "Bonjour Alice !", isLeft: false },
      { text: "Salut, comment ça va ?", isLeft: true },
    ],
    "2": [
      { text: "Hey Bob !", isLeft: false },
      { text: "Salut ! Quoi de neuf ?", isLeft: true },
    ],
    "3": [
      { text: "Hello Charlie !", isLeft: false },
      { text: "Salut, tout va bien ?", isLeft: true },
    ],
  };
  
  export const getUsers = async (): Promise<User[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 500));
  };
  
  export const getConversation = async (userId: string): Promise<Message[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockConversations[userId] || []), 500)
    );
  };
  
  export const sendMessage = async (userId: string, text: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockConversations[userId] = [
          ...(mockConversations[userId] || []),
          { text, isLeft: false },
        ];
        resolve();
      }, 500);
    });
  };
  
  export const refreshConversation = async (userId: string): Promise<Message[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockConversations[userId] || []), 500)
    );
  };
  