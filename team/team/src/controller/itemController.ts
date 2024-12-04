import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserData, saveUserData } from '../data/db'; // Supposons que vous avez ces fonctions dans votre db.ts

// Renvoi la collection du joueur
export const getCollection = async (
    request: FastifyRequest<{ Params: { userId: string } }>, 
    reply: FastifyReply) => {
      const { userId } = request.params;
      const userData = getUserData(userId);
      return reply.status(201).send(userData["collectionItem"])
  }

// Ajouter un item aux items du joueur
export const addToCollection = async (
    req: FastifyRequest<{Params: { userId: string}, Body: { iditem: string} }>,
    reply: FastifyReply
  ) => {
    const { userId } = req.params;
    const { iditem } = req.body;
  
    // Vérifie les champs obligatoires
    if (!iditem) {
      return reply.status(400).send({ error: "iditem is required" });
    }
  
    try {
      // Récupère les données utilisateur
      const userData = getUserData(userId);
  
      const newItem = {
        iditem: iditem,
        equiped: false,
      };
  
      userData["collectionItem"].push(newItem);
  
      saveUserData(userId, userData);
  
      // Répond avec la collection mise à jour
      return reply.status(201).send(userData["collectionItem"]);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "An error occurred while adding to collection" });
    }
  };

// Supprimer un item des items du joueur
export const deleteFromCollection = async (
  req: FastifyRequest<{ Params: { userId: string }; Body: { iditem: string } }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  const { iditem } = req.body;

  // Vérifie les champs obligatoires
  if (!iditem) {
    return reply.status(400).send({ error: "iditem is required" });
  }

  try {
    // Récupère les données utilisateur
    const userData = getUserData(userId);

    // Vérifie si l'item est équipé par une créature
    for (const creature of userData.collectionCreature) {
      if (creature.items?.iditem === iditem) {
        creature.items = undefined;
        break;
      }
    }

    // Supprime l'item de la collection d'items
    userData["collectionItem"] = userData["collectionItem"].filter(item => item.iditem !== iditem);

    // Sauvegarde les données utilisateur mises à jour
    saveUserData(userId, userData);

    // Répond avec la collection mise à jour
    return reply.status(201).send(userData["collectionItem"]);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "An error occurred while suppressing from collection" });
  }
};

  
// Ajouter un item à une créature  
export const equipItemToCreature = async (
  request: FastifyRequest<{ Params: { userId: string }; Body: { iditem: string; idcreature: string } }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;
  const { iditem, idcreature } = request.body;

  if (!iditem || !idcreature) {
    return reply.status(400).send({ error: 'iditem and idcreature are required' });
  }

  const userData = getUserData(userId);

  // Vérifier que l'item et la créature existent et que l'item peut être équipé
  const item = userData.collectionItem.find(i => i.iditem === iditem);
  if (!item) {
    return reply.status(404).send({ error: 'Item not found in collectionItem' });
  }

  if (item.equiped) {
    return reply.status(400).send({ error: 'Item is already equipped' });
  }

  const creature = userData.collectionCreature.find(c => c.idcreature === idcreature);
  if (!creature) {
    return reply.status(404).send({ error: 'Creature not found in collectionCreature' });
  }
  if (creature.items) {
    return reply.status(400).send({ error: 'Creature already has an item equipped' });
  }

  // Equiper l'item à la créature
  creature.items = { ...item, equiped: true };
  item.equiped = true;

  // Sauvegarder les modifications
  saveUserData(userId, userData);
  return reply.status(200).send({ creature, item });
};

// Supprimer un item à une créature 
export const unequipItemFromCreature = async (
  request: FastifyRequest<{ Params: { userId: string }; Body: { iditem: string; idcreature: string } }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;
  const { iditem, idcreature } = request.body;

  if (!iditem || !idcreature) {
    return reply.status(400).send({ error: 'iditem and idcreature are required' });
  }

  const userData = getUserData(userId);
  if (!userData) {
    return reply.status(404).send({ error: 'User not found' });
  }

  // Vérifier que la créature existe et qu'elle a bien cet item
  const creature = userData.collectionCreature.find(c => c.idcreature === idcreature);
  if (!creature) {
    return reply.status(404).send({ error: 'Creature not found in collectionCreature' });
  }
  if (!creature.items || creature.items.iditem !== iditem) {
    return reply.status(400).send({ error: 'Item not equipped on this creature' });
  }

  // Déséquiper la créature
  const itemToUnequip = creature.items;
  creature.items = undefined;
  const item = userData.collectionItem.find(i => i.iditem === iditem);
  if (item) {
    item.equiped = false;
  }
  
  // Sauvegarder les modifications
  saveUserData(userId, userData);

  return reply.status(200).send({
    message: 'Item unequipped successfully',
    updatedCreature: creature,
    updatedCollectionItem: userData.collectionItem,
  });
};
