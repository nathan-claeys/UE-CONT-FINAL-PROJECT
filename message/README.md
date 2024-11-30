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
- **URL:** `/messages/send`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "receiver_id": "user2",
        "content": "Hello, World!",
        "sent_at":  "2024-11-30"
    }
    ```

### Retrieve Messages
- **URL:** `/messages/<user_id>`
- **Method:** `GET`

### Delete a Message
- **URL:** `/messages/<message_id>`
- **Method:** `DELETE`

## License
This project is licensed under the MIT License.

