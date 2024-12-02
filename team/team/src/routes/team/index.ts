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
    
}

export default team