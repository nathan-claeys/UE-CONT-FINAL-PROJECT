import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserData, saveUserData } from '../data/db';


// Renvoi la collection du joueur
export const getCollection = async (
  request: FastifyRequest<{ Params: { userId: string } }>, 
  reply: FastifyReply) => {
    console.log('Dans GET Collection');
    const { userId } = request.params;
    console.log('userId', userId);
    const userData = getUserData(userId);
    return reply.status(201).send(userData["collectionCreature"])
}


// Ajoute créature à la collection
export const addToCollection = async (
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



    for (const creature of userCollection) {
        if (creature["idcreature"]== idcreature) {
          return reply.status(400).send({ error: "Creature already added" });
        }
    }

    const newCreature = {
      idcreature: idcreature,
      idespece: idespece,
    };

    userData["collectionCreature"].push(newCreature);

    saveUserData(userId, userData);

    // Répond avec la collection mise à jour
    return reply.status(201).send(userData["collectionCreature"]);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "An error occurred while adding to collection" });
  }
};

// Supprime une créature à la collection
export const DeleteFromCollection = async (
  req: FastifyRequest<{ Params: { userId: string }; Body: { idcreature: string; idespece: string } }>,
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

    userData["collectionCreature"] = userData["collectionCreature"].filter(creature => creature.idcreature !== idcreature);

    saveUserData(userId, userData);

    // Répond avec la collection mise à jour
    return reply.status(201).send(userData["collectionCreature"]);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "An error occurred while suppressing from collection" });
  }
};

