export interface MessageSent {
  receiver: string;
  sender: string;
  message: string;
}

export interface ShowMessages {
  receiver: string;
  sender: string;
}

export interface DelMessage {
  id_message: number;
}
