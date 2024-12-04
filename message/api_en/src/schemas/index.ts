export const showDatabaseSchema = {
  tags: ["messages"],
  summary: "List all the messages from the database",
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        messages: {
          type: "array",
          items: {
            $ref: "IMessage#",
          },
        },
      },
    },
    402: {
      description: "Failed to retrieve database tables",
    },
  },
};

export const sendMessageSchema = {
  tags: ["messages"],
  summary:
    "Send a message from the sender to the receiver and store it in the database",
  requestBody: {
    description: "Message details to be sent and stored",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            receiver: { type: "string", example: "@ewwweee09072002" },
            sender: { type: "string", example: "@mehdhi1021235" },
            message: { type: "string", example: "Hello world" },
          },
          required: ["receiver", "sender", "message"],
        },
      },
    },
  },
  response: {
    200: {
      description: "Message successfully added to the database",
      type: "object",
      properties: {
        result: {
          type: "string",
          example: "The message was added to the database",
        },
      },
    },
    402: {
      description: "Failed to retrieve database tables",
    },
  },
};

export const showMessagesSchema = {
  tags: ["messages"],
  summary: "Retrieve messages between a specific receiver and sender",
  parameters: [
    {
      name: "receiver",
      in: "path",
      description: "The ID of the message receiver",
      required: true,
      schema: {
        type: "string",
        example: "@ewwweee09072002",
      },
    },
    {
      name: "sender",
      in: "path",
      description: "The ID of the message sender",
      required: true,
      schema: {
        type: "string",
        example: "@medhi1021235",
      },
    },
  ],
  response: {
    200: {
      description: "Messages retrieved successfully",
      type: "object",
      properties: {
        messages: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              receiver_id: { type: "string", example: "@ewwweee09072002" },
              sender_id: { type: "string", example: "@medhi1021235" },
              content: { type: "string", example: "Hello world" },
              date: {
                type: "string",
                format: "date-time",
                example: "2024-12-04T14:23:05.000Z",
              },
            },
          },
        },
      },
    },
    402: {
      description: "Failed to retrieve database tables",
    },
  },
};

export const deleteMessageSchema = {
  tags: ["messages"],
  summary: "Delete a message by its ID",
  parameters: [
    {
      name: "id_message",
      in: "path",
      description: "The ID of the message to delete",
      required: true,
      schema: {
        type: "integer",
        example: 1,
      },
    },
  ],
  response: {
    200: {
      description: "Message successfully deleted",
      type: "object",
      properties: {
        result: { type: "string", example: "Message successfully deleted" },
      },
    },
    402: {
      description: "Failed to retrieve database tables",
      type: "object",
      properties: {
        error: {
          type: "string",
          example: "Failed to retrieve database tables",
        },
      },
    },
  },
};
