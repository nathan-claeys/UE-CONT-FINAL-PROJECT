import { FastifyInstance } from 'fastify';
import * as itemController from '../../controller/itemController';

async function items(fastify: FastifyInstance) {
    
  // GET: Voir les items du joueur
  fastify.get('/:userId', {
    schema: {
      description: 'Get all unequipped items of the user',
      tags: ['items'],
      response: {
        200: {
          description: 'List of unequipped items',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              iditem: { type: 'string' },
              equiped: { type: 'boolean' }
            }
          }
        },
        404: {
          description: 'User not found',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, itemController.getCollection);

  // POST: Ajouter un item aux items du joueur
  fastify.post('/:userId', {
    schema: {
      description: 'Add an item to the user collection',
      tags: ['items'],
      body: {
        type: 'object',
        properties: {
          iditem: { type: 'string', description: 'ID of the item' }
        },
        required: ['iditem']
      },
      response: {
        201: {
          description: 'Item added successfully',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              iditem: { type: 'string' },
              equiped: { type: 'boolean' }
            }
          }
        },
        400: {
          description: 'Missing required fields',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, itemController.addToCollection);

  // DELETE: Supprimer un item aux items du joueur
  fastify.delete('/:userId', {
    schema: {
      description: 'Remove an item from the user collection',
      tags: ['items'],
      body: {
        type: 'object',
        properties: {
          iditem: { type: 'string', description: 'ID of the item' }
        },
        required: ['iditem']
      },
      response: {
        200: {
          description: 'Item removed successfully',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              iditem: { type: 'string' },
              equiped: { type: 'boolean' }
            }
          }
        },
        404: {
          description: 'Item not found',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, itemController.deleteFromCollection);

  // POST: Ajouter un item à une créature
  fastify.post('/creature/:userId', {
    schema: {
      description: 'Equip an item to a creature',
      tags: ['items'],
      body: {
        type: 'object',
        properties: {
          iditem: { type: 'string', description: 'ID of the item' },
          idcreature: { type: 'string', description: 'ID of the creature' }
        },
        required: ['iditem', 'idcreature']
      },
      response: {
        200: {
          description: 'Item equipped successfully',
          type: 'object',
          properties: {
            updatedCreature: {
              type: 'object',
              properties: {
                idcreature: { type: 'string' },
                idespece: { type: 'string' },
                items: {
                  type: 'object',
                  properties: {
                    iditem: { type: 'string' },
                    equiped: { type: 'boolean' }
                  }
                }
              }
            },
            updatedItem: {
              type: 'object',
              properties: {
                iditem: { type: 'string' },
                equiped: { type: 'boolean' }
              }
            }
          }
        },
        404: {
          description: 'Item or creature not found',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, itemController.equipItemToCreature);

  // DELETE: Supprimer un item d'une créature
  fastify.delete('/creature/:userId', {
    schema: {
      description: 'Unequip an item from a creature',
      tags: ['items'],
      body: {
        type: 'object',
        properties: {
          iditem: { type: 'string', description: 'ID of the item' },
          idcreature: { type: 'string', description: 'ID of the creature' }
        },
        required: ['iditem', 'idcreature']
      },
      response: {
        200: {
          description: 'Item unequipped successfully',
          type: 'object',
          properties: {
            updatedCreature: {
              type: 'object',
              properties: {
                idcreature: { type: 'string' },
                idespece: { type: 'string' },
                items: { type: 'null' }
              }
            },
            updatedCollectionItem: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  iditem: { type: 'string' },
                  equiped: { type: 'boolean' }
                }
              }
            }
          }
        },
        404: {
          description: 'Item or creature not found',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, itemController.unequipItemFromCreature);
}

export default items;
