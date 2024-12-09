# Message Microservice

## Overview

The Message Microservice is responsible for handling all messaging-related operations within the application. It provides endpoints for sending, receiving, and managing messages between users.

## Features

- Send messages between users
- Retrieve conversation with a user
- Delete messages

## Technologies Used

- **Programming Language:** TypeScript
- **Framework:** fastify
- **Database:** json
- **Containerization:** Docker

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/message-microservice.git
   cd message-microservice
   ```

### Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t message-microservice .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 5000:5000 message-microservice
   ```

## API Endpoints

### Send a Message

- **URL:** `/messages`
- **Method:** `GET`
- **Return:**

  ```json
  {
    "messages": [
      {
        "id":1,
        "receiver":"@ewwweee09072002",
        "sender":"@mehdi1021235",
        "content":"Hello world",
        "date":"YYYY-MM-DDTHH:MM:SS.sssZ"
      },
      ...
    ]
  }
  ```

- **URL:** `/messages/send_message`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "receiver": "@ewwweee09072002",
    "sender": "@mehdhi1021235",
    "message": "Hello world"
  }
  ```

- **Return:**

  ```json
  {
    "result": "The message was added to the database"
  }
  ```

- **Results:**
  - 200 : Successful
  - 402 : Failed to retrieve database tables

### Retrieve Messages

- **URL:** `/messages/show_message_user/:receiver/sender/:sender`
- **Method:** `GET`
- **Return:**

```json
{
  "messages": [
    {
      "id":1,
      "receiver_id":"@ewwweee09072002",
      "sender_id":"@medhi1021235",
      "content":"Hello world",
      "date":"YYYY-MM-DDTHH:MM:SS.sssZ",
    },
    ...
  ]
}
```

### Delete a Message

- **URL:** `/delete_message/:id_message`
- **Method:** `DELETE`
- **Results:**
  - 200 : Successful
  - 402 : Failed to retrieve database tables

## License

This project is licensed under the MIT License.

```

```
