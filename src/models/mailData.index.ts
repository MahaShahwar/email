import { Client } from "@elastic/elasticsearch";

const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
});

const createIndices = async () => {
  await esClient.indices.create(
    {
      index: "mailboxes",
      body: {
        mappings: {
          properties: {
            userId: { type: "keyword" },
            mailboxId: { type: "keyword" },
            name: { type: "text" },
            totalEmails: { type: "integer" },
            unreadEmails: { type: "integer" },
          },
        },
      },
    },
    { ignore: [400] }
  );
};

createIndices().catch(console.log);
