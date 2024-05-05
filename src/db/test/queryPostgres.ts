import { PoolClient } from "@appTypes";
import { error, assert } from "@stdlib";

async function dbTest(client : PoolClient) {
  const resultSet = await client.query (
    `SELECT * FROM test_table `,
    []
  );

  return resultSet;
}

export default {
  dbTest,
}