# Clubs Management Microservice

This Fastify-based microservice enables the management of clubs and their members, leveraging a MySQL database for persistence.

## Features

- **Authentication**: Validates API requests with a Bearer token using a pre-handler hook.
- **Clubs Management**: Create, retrieve, and list clubs.
- **Membership Management**: Add and remove members, list club members, and identify club creators.

---

## How to Start the App

1. Navigate to the `/clubs` directory.
2. Use Docker Compose to build and run the application:

   ```bash
   docker-compose up --build
   ```

3. The app will be available at `http://localhost:3000`.

---

## API Endpoints

### Authentication

All endpoints require a valid Bearer token passed in the `Authorization` header.

---

### Clubs Endpoints

#### 1. Add a Club

- **POST** `/clubs`
- **Description**: Creates a new club and assigns a creator.
- **Request Body**:
  ```json
  {
    "name": "Chess Club",
    "user": { "id": 1, "name": "Alice" }
  }
  ```
- **Example**:
  ```bash
  curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"name": "Chess Club", "user": {"id": 1, "name": "Alice"}}' http://localhost:3000/clubs
  ```

---

#### 2. List All Clubs

- **GET** `/clubs`
- **Description**: Retrieves all clubs.
- **Example**:
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/clubs
  ```

---

#### 3. Get Club by ID

- **GET** `/clubs/:id`
- **Description**: Fetches details of a specific club by its ID.
- **Example**:
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/clubs/1
  ```

---

#### 4. Get Club by Name

- **GET** `/clubs/by-name?name=club1`
- **Description**: Fetches details of a club by its name.
- **Example**:
  ```bash
  curl -H "Authorization: Bearer <token>" "http://localhost:3000/clubs/by-name?name=Chess%20Club"
  ```

---

#### 5. Get Clubs a User Belongs To

- **GET** `/clubs/user/:id`
- **Description**: Lists all clubs a specific user is a member of.
- **Example**:
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/clubs/user/1
  ```

---

#### 6. Get Members of a Club

- **GET** `/clubs/:id/members`
- **Description**: Lists all members of a specific club.
- **Example**:
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/clubs/1/members
  ```

---

#### 7. Add a Member to a Club

- **POST** `/clubs/:id/members`
- **Description**: Adds a new member to a specific club.
- **Request Body**:
  ```json
  { "id": 2, "name": "Bob" }
  ```
- **Example**:
  ```bash
  curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"id": 2, "name": "Bob"}' http://localhost:3000/clubs/1/members
  ```

---

#### 8. Remove a Member from a Club

- **DELETE** `/clubs/:id/members/:memberId`
- **Description**: Removes a specific member from a club.
- **Example**:
  ```bash
  curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:3000/clubs/1/members/2
  ```

---

#### 9. Get Club Creator

- **GET** `/clubs/:id/creator`
- **Description**: Retrieves the creator of a specific club.
- **Example**:
  ```bash
  curl -H "Authorization: Bearer <token>" http://localhost:3000/clubs/1/creator
  ```

---

## Database Schema

### Clubs Table

| Column | Type         | Description |
| ------ | ------------ | ----------- |
| id     | INT          | Primary key |
| name   | VARCHAR(255) | Club name   |

### Club Members Table

| Column    | Type         | Description               |
| --------- | ------------ | ------------------------- |
| club_id   | INT          | Foreign key to `clubs.id` |
| user_id   | INT          | User ID                   |
| user_name | VARCHAR(255) | User's name               |
| creator   | TINYINT(1)   | `1` if creator, else `0`  |

---
