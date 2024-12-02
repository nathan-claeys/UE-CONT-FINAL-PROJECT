import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserData, saveUserData } from '../data/db';
import { Team } from '../interfaces';

export const getTeam = async (
    request: FastifyRequest<{ Params: { userId: string } }>, 
    reply: FastifyReply) => {
      const { userId } = request.params;
      const userData = getUserData(userId);
      return reply.status(201).send(userData["team"])
  }

export const addToTeam = async (
req: FastifyRequest<{Params: { userId: string}, Body: { idcreature: string; idespece: string } }>,
reply: FastifyReply
) => {
const { userId } = req.params;
const { idcreature, idespece } = req.body;

// Vérifie les champs obligatoires
if (!idcreature || !idespece) {
    return reply.status(400).send({ error: "idcreature and idespece are required" });
}

try {
    // Récupère les données utilisateur
    const userData = getUserData(userId);
    const userCollection = userData["collectionCreature"]
    const userTeam: Team = userData["team"]
    let teamRemplie = true
    let emptyPlace = ""

    for (const ncreature of ["n1", "n2", "n3", "n4", "n5"]) {
        if (userTeam[ncreature]["idcreature"]== idcreature && userTeam[ncreature]["idespece"]== idespece) {
        return reply.status(400).send({ error: "Creature already added" });
        }
        if (userTeam[ncreature][idcreature]!= "") {
            teamRemplie = false
            emptyPlace=ncreature
            break
        }
    }

    if (teamRemplie) {
        return reply.status(400).send({ error: "Team already full" });
    }

    for (const creature of userCollection) {
        if (creature["idcreature"] == idcreature && creature["idespece"] == idespece) {
            userTeam[emptyPlace] = creature
            saveUserData(userId, userData);
            return reply.status(201).send(userData["team"]);
        }
    }

    
    return reply.status(400).send({ error: "Creature not in collection : cannot be added to the team" });
    
} catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "An error occurred while adding to collection" });
}
};