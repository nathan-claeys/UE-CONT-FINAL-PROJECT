import { FastifyInstance } from 'fastify'
import * as t from '../../controller/teamController'

async function team(fastify: FastifyInstance) {

  fastify.get('/:userId', {
    schema: {
      description: 'Get all creatures in the team',
      tags: ['creatures'],
      response: {
        201: {
          description: 'List of creatures in the team',
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
    }, }, t.getTeam)

    fastify.post('/:userId', {
        schema: {
          description: 'Add a creature to the team',
          tags: ['creatures'],
          body: {
            type: 'object',
            properties: {
              idcreature: { type: 'string', description: 'ID of the creature to remove' },
              idespece: { type: 'string', description: 'ID of the espece to remove'}
            },
            required: ['idcreature', 'idespece']
          },
          response: {
            201: {
              description: 'List of creatures in the team',
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
        }, }, t.addToTeam)
    
    fastify.delete('/:userId', {
        schema: {
        description: 'Remove a creature from the team',
        tags: ['creatures'],
        body: {
            type: 'object',
            properties: {
              idcreature: { type: 'string', description: 'ID of the creature to remove' },
              idespece: { type: 'string', description: 'ID of the espece to remove'}
            },
            required: ['idcreature', 'idespece']
          },
        response: {
            201: {
            description: 'List of creatures in the team',
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
        }, }, t.removeFromTeam)
    
    fastify.put('/:userId', {
        schema: {
        description: 'Replace a creature in the team',
        tags: ['creatures'],
        body: {
            type: 'object',
            properties: {
              idcreature1: { type: 'string', description: 'ID of the creature to remove' },
              idespece1: { type: 'string', description: 'ID of the espece to remove'},
              idcreature2: { type: 'string', description: 'ID of the creature to add' },
              idespece2: { type: 'string', description: 'ID of the espece to add'}
            },
            required: ['idcreature1', 'idespece1', 'idcreature2', 'idespece2']
          },
        response: {
            201: {
            description: 'List of creatures in the team',
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
        }, }, t.replaceInTeam)
    
}

export default team