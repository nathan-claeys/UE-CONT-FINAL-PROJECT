import { FastifyInstance } from "fastify";
import { readFileSync } from "fs";
import { join } from "path";
import { resolvers } from "./resolvers"; // Assurez-vous d'importer les résolveurs

export const creaturesController = async (fastify: FastifyInstance) => {
  // Charge le schéma GraphQL depuis le fichier .graphql
  const schema = readFileSync(join(__dirname, "creature.graphql"), "utf-8");

  // Enregistrer le plugin GraphQL
  fastify.register(require("@fastify/graphql"), {
    schema,
    rootValue: resolvers,
    graphiql: true, // Active l'interface GraphiQL pour tester
  });
};
