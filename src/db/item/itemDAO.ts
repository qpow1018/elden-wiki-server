import { PoolClient } from "@appTypes";
import { postgresUtils } from "@stdlib";
import query from "./queryPostgres";

async function getItemMainCategories() {
  "use strict";
  return await postgresUtils.defaultQuery(async (client : PoolClient)=>{
    return await query.getItemMainCategories(client);
  });
}

async function getItemWeapons() {
  "use strict";
  return await postgresUtils.defaultQuery(async (client : PoolClient)=>{
    return await query.getItemWeapons(client);
  });
}

export default {
  getItemMainCategories,
  getItemWeapons,
}