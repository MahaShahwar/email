import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";

dotenv.config();

export const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
});

export const createEmailIndex = async () => {
  await esClient.indices.create(
    {
      index: "emails",
      body: {
        mappings: {
          properties: {
            userId: { type: "keyword" },
            emailId: { type: "keyword" },
            subject: { type: "text" },
            body: { type: "text" },
            from: { type: "text" },
            to: { type: "text" },
            dateReceived: { type: "date" },
            isRead: { type: "boolean" },
            isFlagged: { type: "boolean" },
          },
        },
      },
    },
    { ignore: [400] }
  );
};

createEmailIndex().catch(console.log);
