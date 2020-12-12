const { Client } = require("@elastic/elasticsearch");

async function main() {
  const client = new Client({ node: "http://127.0.0.1:9200" });

  // Index data.
  await client.index({
    index: "startup",
    body: {
      name: "HIRE",
      description: "A hr startup"
    }
  });

  // Force index refresh.
  await client.indices.refresh({
    index: "startup"
  });

  const { body } = await client.search({
    index: "startup",
    body: {
      query: {
        match: {
          name: "hire"
        }
      }
    }
  });
  console.log(body.hits.hits);
}

main().catch(console.error);
