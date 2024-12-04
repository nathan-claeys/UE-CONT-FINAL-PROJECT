import { FastifyInstance } from 'fastify'
import * as t from '../../controller/teamController'

async function team(fastify: FastifyInstance) {

  fastify.addSchema({
    $id: 'Creature',
    type: 'object',
    properties: {
      idcreature: {type: 'string'},
      idespece: {type: 'string'},
      item: {type: 'string'},
    },
    required: ['idcreature', 'idespece'],
  })

  fastify.addSchema({
    $id: 'Team',
    type: 'object',
    properties: {
      n1: {type: 'object', properties: {data: {$ref: 'Creature#'}}},
      n2: {type: 'object', properties: {data: {$ref: 'Creature#'}}},
      n3: {type: 'object', properties: {data: {$ref: 'Creature#'}}},
      n4: {type: 'object', properties: {data: {$ref: 'Creature#'}}},
      n5: {type: 'object', properties: {data: {$ref: 'Creature#'}}},
    },
    required: ['n1', 'n2', 'n3', 'n4', 'n5'],
  })

  fastify.get('/:userId', {
    schema: {
      description: 'Get all creatures in the team',
      tags: ['creatures'],
      response: {
        200: {
          description: 'List of creatures in the team',
          type: 'object',
          properties: {
            n1: {
              type: 'object',
              properties: {
                idcreature: { type: 'string' },
                idespece: { type: 'string' },
              },
              required: ['idcreature', 'idespece'],
            },
            n2: {
              type: 'object',
              properties: {
                idcreature: { type: 'string' },
                idespece: { type: 'string' },
              },
              required: ['idcreature', 'idespece'],
            },
            n3: {
              type: 'object',
              properties: {
                idcreature: { type: 'string' },
                idespece: { type: 'string' },
              },
              required: ['idcreature', 'idespece'],
            },
            n4: {
              type: 'object',
              properties: {
                idcreature: { type: 'string' },
                idespece: { type: 'string' },
              },
              required: ['idcreature', 'idespece'],
            },
            n5: {
              type: 'object',
              properties: {
                idcreature: { type: 'string' },
                idespece: { type: 'string' },
              },
              required: ['idcreature', 'idespece'],
            },
          },
          required: ['n1', 'n2', 'n3', 'n4', 'n5'],
        },
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
              type: 'object',
              properties: {
                n1: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n2: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n3: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n4: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n5: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
              },
              required: ['n1', 'n2', 'n3', 'n4', 'n5'],
            },
          },
            }
          },
        t.addToTeam)
    
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
              type: 'object',
              properties: {
                n1: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n2: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n3: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n4: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n5: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
              },
              required: ['n1', 'n2', 'n3', 'n4', 'n5'],
            },
          },
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
              type: 'object',
              properties: {
                n1: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n2: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n3: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n4: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
                n5: {
                  type: 'object',
                  properties: {
                    idcreature: { type: 'string' },
                    idespece: { type: 'string' },
                  },
                  required: ['idcreature', 'idespece'],
                },
              },
              required: ['n1', 'n2', 'n3', 'n4', 'n5'],
            },
          },
        }, }, t.replaceInTeam)
    
}

export default team