const tsj = require("ts-json-schema-generator")
const fs = require("fs")

function generateSchema() {
  /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
  const config = {
    path: "src/interfaces/*.ts",
    // tsconfig: "tsconfig.json",
    type: "*", // Or <type-name> if you want to generate schema for that one type only
  };

  const outputPath = "src/schemas/all.json";

  const schema = tsj.createGenerator(config).createSchema(config.type);
  const schemaString = JSON.stringify(schema, null, 2).replace(
    /#\/definitions\/(\w+)/g,
    "$1#"
  );

  fs.writeFile(outputPath, schemaString, (err) => {
    if (err) throw err;
  });
}

generateSchema();
