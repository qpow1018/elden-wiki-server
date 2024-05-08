import { PoolClient } from "@appTypes";
import { error, assert } from "@stdlib";

async function getItemCategories(client : PoolClient) {
  const resultSet = await client.query(
    `SELECT * FROM item_categories `,
    []
  );

  return resultSet;
}

export default {
  getItemCategories,
}