import { FastifyInstance } from 'fastify'
import * as c from '../../controller/creatureControllers'

async function collection(fastify: FastifyInstance) {

  fastify.get('/:userId', {
    schema: {
      description: 'Get all creatures in the user collection',
      tags: ['creatures'],
      response: {
        200: {
          description: 'List of creatures in the collection',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              idcreature: { type: 'string' },
              idespece: { type: 'string' }
            }
          }
        }
      }
    }, }, c.getCollection)

    fastify.post('/:userId', {
        schema: {
          description: 'Add a creature to the user collection',
          tags: ['creatures'],
          body: {
            type: 'object',
            properties: {
              idcreature: { type: 'string', description: 'ID of the creature' },
              idespece: { type: 'string', description: 'ID of the species' }
            },
            required: ['idcreature', 'idespece']
          },
          response: {
            201: {
              description: 'Creature added successfully',
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  idcreature: { type: 'string' },
                  idespece: { type: 'string' }
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
        },}, c.addToCollection
    );

    fastify.delete('/:userId', {
        schema: {
          description: 'Remove a creature from the user collection',
          tags: ['creatures'],
          body: {
            type: 'object',
            properties: {
              idcreature: { type: 'string', description: 'ID of the creature to remove' }
            },
            required: ['idcreature']
          },
          response: {
            200: {
              description: 'Creature removed successfully',
              type: 'object',
              properties: {
                idcreature: { type: 'string' },
                message: { type: 'string' }
              }
            },
            400: {
              description: 'Creature not found',
              type: 'object',
              properties: {
                error: { type: 'string' }
              }
            }
          }
        },}, c.DeleteFromCollection
    );

}

export default collection