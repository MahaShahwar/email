import { Client } from "@elastic/elasticsearch";

export const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
});

export const createUserIndices = async () => {
  await esClient.indices.create(
    {
      index: "users",
      body: {
        mappings: {
          properties: {
            id: { type: "keyword" },
            email: { type: "keyword" },
            name: { type: "text" },
            accessToken: { type: "text" },
            refreshToken: { type: "text" },
          },
        },
      },
    },
    { ignore: [400] }
  );
};

createUserIndices().catch(console.log);
