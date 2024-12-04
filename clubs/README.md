# Clubs Management Microservice

This Fastify-based microservice provides endpoints to manage clubs and their members, backed by a MySQL database.

## Endpoints Overview

1. **Add a Club**

   - **POST** `/clubs`: Creates a new club and assigns a creator.
   - Example:
     ```bash
     curl -X POST -H "Content-Type: application/json" -d '{"name": "Chess Club", "user": {"id": 1, "name": "Alice"}}' http://localhost:3000/clubs
     ```

2. **List All Clubs**

   - **GET** `/clubs`: Retrieves all clubs.
   - Example:
     ```bash
     curl http://localhost:3000/clubs
     ```

3. **Get Club by ID**

   - **GET** `/clubs/:id`: Fetches details of a specific club.
   - Example:
     ```bash
     curl http://localhost:3000/clubs/1
     ```

4. **Get Club by Name**

   - **GET** `/clubs/by-name?name=club1`: Fetches a club by its name.
   - Example:
     ```bash
     curl "http://localhost:3000/clubs/by-name?name=Chess%20Club"
     ```

5. **Get Members of a Club**

   - **GET** `/clubs/:id/members`: Lists all members of a specified club.
   - Example:
     ```bash
     curl http://localhost:3000/clubs/1/members
     ```

6. **Add a Member to a Club**

   - **POST** `/clubs/:id/members`: Adds a new member to a specific club.
   - Example:
     ```bash
     curl -X POST -H "Content-Type: application/json" -d '{"id": 2, "name": "Bob"}' http://localhost:3000/clubs/1/members
     ```

7. **Remove a Member from a Club**

   - **DELETE** `/clubs/:id/members/:memberId`: Removes a specific member from a club.
   - Example:
     ```bash
     curl -X DELETE http://localhost:3000/clubs/1/members/2
     ```

8. **Get Club Creator**
   - **GET** `/clubs/:id/creator`: Retrieves the creator of a specified club.
   - Example:
     ```bash
     curl http://localhost:3000/clubs/1/creator
     ```
