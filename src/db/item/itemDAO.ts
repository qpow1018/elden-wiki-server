import { PoolClient } from "@appTypes";
import { postgresUtils } from "@stdlib";
import query from "./queryPostgres";

async function getItemMainCategories() {
  "use strict";
  return await postgresUtils.defaultQuery(async (client : PoolClient)=>{
    return await query.getItemMainCategories(client);
  });
}

async function getItemSubCategory(categoryNo: number) {
  "use strict";
  return await postgresUtils.defaultQuery(async (client : PoolClient)=>{
    return await query.getItemSubCategory(client, categoryNo);
  });
}

async function updateItemSubCategory(categoryNo: number, description: string | null) {
  "use strict";
  await postgresUtils.defaultQuery(async (client : PoolClient)=>{
    await query.updateItemSubCategory(client, categoryNo, description);
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
  getItemSubCategory,
  updateItemSubCategory,
  getItemWeapons,
}