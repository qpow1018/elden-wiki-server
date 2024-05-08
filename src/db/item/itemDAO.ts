import { PoolClient } from "@appTypes";
import { checker, postgresUtils } from "@stdlib";
import query from "./queryPostgres";

async function getItemCategories() {
  "use strict";
  // checker.assertStrings(email, password);
  return await postgresUtils.defaultQuery(async (client : PoolClient)=>{
    return await query.getItemCategories(client);
  });
}

export default {
  getItemCategories,
}