import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserData, saveUserData } from '../data/db';
import { UserTeam, Team } from '../interfaces';

export const getTeam = async (
    request: FastifyRequest<{ Params: { userId: string } }>, 
    reply: FastifyReply) => {
      const { userId } = request.params;
      const userData = getUserData(userId);
      return reply.status(201).send(userData["team"])
  }

export const addToTeam = async (
    req: FastifyRequest<{
        Params: { userId: string };
        Body: { idcreature: string; idespece: string };
    }>,
    reply: FastifyReply
) => {
    const { userId } = req.params;
    const { idcreature, idespece } = req.body;

    // Validation des entrées
    if (!idcreature || !idespece) {
        return reply.status(400).send({ error: "idcreature and idespece are required" });
    }

    try {
        // Récupère les données utilisateur
        const userData = getUserData(userId) as UserTeam;
        const { collectionCreature, team } = userData;

        // Vérifie si la créature est déjà dans l'équipe
        const isCreatureInTeam = Object.values(team).some(
            (creature) =>
                creature.idcreature === idcreature && creature.idespece === idespece
        );
        if (isCreatureInTeam) {
            return reply.status(400).send({ error: "Creature already in the team" });
        }

        // Trouve une place vide dans l'équipe
        const emptySpot = Object.keys(team).find(
            (key) => team[key as keyof Team].idcreature === ""
        );
        if (!emptySpot) {
            return reply.status(400).send({ error: "Team is already full" });
        }

        // Vérifie si la créature existe dans la collection
        const creatureInCollection = collectionCreature.find(
            (creature) =>
                creature.idcreature === idcreature && creature.idespece === idespece
        );
        if (!creatureInCollection) {
            return reply.status(400).send({
                error: "Creature not found in collection. Cannot be added to the team.",
            });
        }

        // Ajoute la créature à l'emplacement vide
        team[emptySpot as keyof Team] = creatureInCollection;

        // Sauvegarde les données mises à jour
        saveUserData(userId, userData);

        return reply.status(201).send(team);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "An error occurred while adding to the team" });
    }
};

export const removeFromTeam = async (
    req: FastifyRequest<{
        Params: { userId: string };
        Body: { idcreature: string; idespece: string };
    }>,
    reply: FastifyReply
) => {
    const { userId } = req.params;
    const { idcreature, idespece } = req.body;

    // Validation des entrées
    if (!idcreature || !idespece) {
        return reply.status(400).send({ error: "idcreature and idespece are required" });
    }

    try {
        // Récupère les données utilisateur
        const userData = getUserData(userId) as UserTeam;
        const { team } = userData;

        // Recherche de la créature dans l'équipe
        const teamSpot = Object.keys(team).find(
            (key) =>
                team[key as keyof UserTeam["team"]].idcreature === idcreature &&
                team[key as keyof UserTeam["team"]].idespece === idespece
        );

        // Si la créature n'est pas trouvée
        if (!teamSpot) {
            return reply.status(400).send({ error: "Creature not found in the team" });
        }

        // Supprime la créature de l'équipe
        team[teamSpot as keyof UserTeam["team"]] = { idcreature: "", idespece: "" };

        // Sauvegarde les données mises à jour
        saveUserData(userId, userData);

        return reply.status(201).send(team);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "An error occurred while removing from the team" });
    }
};

export const replaceInTeam = async (
    req: FastifyRequest<{
        Params: { userId: string };
        Body: { idcreature1: string; idespece1: string; idcreature2: string; idespece2: string };
    }>,
    reply: FastifyReply
) => {
    const { userId } = req.params;
    const { idcreature1, idespece1, idcreature2, idespece2 } = req.body;

    // Validation des entrées
    if (!idcreature1 || !idespece1 || !idcreature2 || !idespece2) {
        return reply.status(400).send({
            error: "Parameters are missing: idcreature1, idespece1, idcreature2, idespece2 are required",
        });
    }

    try {
        // Récupère les données utilisateur
        const userData = getUserData(userId) as UserTeam;
        const { collectionCreature, team } = userData;

        // Trouve la créature à remplacer dans l'équipe
        const teamSpot = Object.keys(team).find(
            (key) =>
                team[key as keyof UserTeam["team"]].idcreature === idcreature1 &&
                team[key as keyof UserTeam["team"]].idespece === idespece1
        );

        // Si la créature à remplacer n'est pas trouvée
        if (!teamSpot) {
            return reply.status(400).send({ error: "Creature 1 not in team: cannot be replaced" });
        }

        // Vérifie si la nouvelle créature existe dans la collection
        const newCreature = collectionCreature.find(
            (creature) =>
                creature.idcreature === idcreature2 && creature.idespece === idespece2
        );

        if (!newCreature) {
            return reply.status(400).send({
                error: "Creature 2 not found in collection: cannot be added to the team",
            });
        }

        // Remplace la créature dans l'équipe
        team[teamSpot as keyof UserTeam["team"]] = newCreature;

        // Sauvegarde les données mises à jour
        saveUserData(userId, userData);

        return reply.status(201).send(team);
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "An error occurred while replacing in the team" });
    }
};