# Matching Service Documentation

---

## **Endpoints**

### **1. Gestion des matchs**

#### `GET /matches`
Retrieve a list of all existing matches.
- **Query Parameters**:
  - `status` (optional): Filter matches by status (`created`, `in-progress`, `finished`).
  - `userId` (optional): Filter matches involving a specific user.

#### `POST /matches`
Create a new match.
- **Request Body**:
  ```json
  {
    "creatorId": "12345",
    "opponentId": "67890", // optional
    "matchType": "ranked" // or "casual"
  }
  ```

#### `GET /matches/{matchId}`
Retrieve details of a specific match.

#### `PATCH /matches/{matchId}`
Update the status of a match (e.g., start or finish it).
- **Request Body**:
  ```json
  {
    "status": "in-progress" // or "finished"
  }
  ```

#### `DELETE /matches/{matchId}`
Delete a canceled match.

---

### **2. Gestion des manches (Rounds)**

#### `GET /matches/{matchId}/rounds`
Retrieve the list of rounds for a specific match.

#### `POST /matches/{matchId}/rounds`
Add a new round to an existing match.
- **Request Body**:
  ```json
  {
    "roundNumber": 1,
    "player1Choice": "Pokéchakuchon1",
    "player2Choice": "Pokéchakuchon2"
  }
  ```

#### `GET /matches/{matchId}/rounds/{roundId}`
Retrieve details of a specific round.

#### `PATCH /matches/{matchId}/rounds/{roundId}`
Update the results of a round.
- **Request Body**:
  ```json
  {
    "winnerId": "12345"
  }
  ```

---

### **3. Historique et statistiques**

#### `GET /matches/history`
Retrieve the match history for a user.
- **Query Parameters**:
  - `userId`: The user's ID.

#### `GET /matches/stats`
Retrieve global or user-specific match statistics.
- **Query Parameters**:
  - `userId` (optional): Statistics for a specific user.

---

### **4. Match against AI**

#### `POST /matches/ai`
Create a match against an AI.
- **Request Body**:
  ```json
  {
    "userId": "12345",
    "difficulty": "hard"
  }
  ```

---

## **Technical Notes**
- The Matching Service uses **Typescript**, **Fastify**, and **SQL** for backend implementation.
- API documentation is available via **OpenAPI**.

For further details or issues, refer to the project repository: [GitHub Project](https://github.com/nathan-claeys/UE-CONT-FINAL-PROJECT)
