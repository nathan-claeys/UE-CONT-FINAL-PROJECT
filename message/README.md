# Message Microservice

## Overview
The Message Microservice is responsible for handling all messaging-related operations within the application. It provides endpoints for sending, receiving, and managing messages between users.

## Features
- Send messages between users
- Retrieve messages for a user
- Mark messages as read/unread
- Delete messages

## Technologies Used
- **Programming Language:** Python
- **Framework:** Flask
- **Database:** PostgreSQL
- **Messaging Queue:** RabbitMQ
- **Containerization:** Docker

## Getting Started

### Prerequisites
- Python 3.8+
- Docker
- PostgreSQL
- RabbitMQ

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/message-microservice.git
    cd message-microservice
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up the database:
    ```bash
    flask db upgrade
    ```

5. Run the application:
    ```bash
    flask run
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
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "sender_id": "user1",
        "receiver_id": "user2",
        "content": "Hello, World!"
    }
    ```

### Retrieve Messages
- **URL:** `/messages/<user_id>`
- **Method:** `GET`

### Mark Message as Read
- **URL:** `/messages/<message_id>/read`
- **Method:** `PATCH`

### Delete a Message
- **URL:** `/messages/<message_id>`
- **Method:** `DELETE`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact [your-email@example.com].
