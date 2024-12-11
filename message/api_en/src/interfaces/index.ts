export interface MessageSent {
  receiver: number;
  sender: number;
  message: string;
}

export interface ShowMessages {
  receiver: number;
  sender: number;
}
export interface DelMessage {
  id_message: number;
}
