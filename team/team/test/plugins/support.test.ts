import { test } from 'node:test'
import * as assert from 'node:assert'

import Fastify from 'fastify'
import cors from 'fastify'
import Support from '../../src/plugins/support'


test('support works standalone', async (t) => {
  const fastify = Fastify()
  await fastify.register(cors,{})
  void fastify.register(Support)
  await fastify.ready()

  assert.equal(fastify.someSupport(), 'hugs')
})
