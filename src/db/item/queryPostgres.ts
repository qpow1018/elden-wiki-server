import { PoolClient } from "@appTypes";
import { error, assert } from "@stdlib";

async function getItemMainCategories(client: PoolClient) {
  const resultSet = await client.query(
    `
      SELECT
        id,
        category_no as "categoryNo",
        name
      FROM
        item_categories;
    `,
    []
  );

  return resultSet.rows;
}

async function getItemSubCategory(client: PoolClient, categoryNo: number) {
  const resultSet = await client.query(
    `
      SELECT
        id,
        category_no as "mainCategoryNo",
        sub_category_no as "subCategoryNo",
        name,
        description
      FROM
        item_sub_categories
      WHERE
        sub_category_no = $1
    `,
    [categoryNo]
  );

  if (resultSet.rowCount === 0) {
    throw error.newInstanceNotFoundData();
  }

  return resultSet.rows[0];
}

async function updateItemSubCategory(client: PoolClient, categoryNo: number, description: string | null) {
  const resultSet = await client.query(
    `
      UPDATE
        item_sub_categories
      SET
        description = $2
      WHERE
        sub_category_no = $1
    `,
    [categoryNo, description]
  );

  console.log('resultSet', resultSet);

  return resultSet;
}

async function getItemWeapons(client: PoolClient) {
  const resultSet = await client.query(
    `
      SELECT
        main.id,
        main.category_no as "mainCategoryNo",
        main.sub_category_no as "subCategoryNo",
        main.name,
        main.description,
        (
          SELECT ARRAY_TO_JSON(array_agg(weapons.*))
          FROM (
            SELECT
              i.id as "itemId",
              i.name as "itemName",
              (
                SELECT ROW_TO_JSON(detail.*)
                FROM (
                  SELECT
                    w.id as "detailId",
                    w.item_id as "detailItemId",
                    w.upgrade_type as "upgradeType",
                    w.image_url as "imageUrl",
                    w.damage_type as "damageType",
                    w.weight,
                    w.default_skill as "defaultSkill",
                    w.damage_physical as "damagePhysical",
                    w.damage_magic as "damageMagic",
                    w.damage_fire as "damageFire",
                    w.damage_lightning as "damageLightning",
                    w.damage_holy as "damageHoly",
                    w.critical,
                    w.defense_physical as "defensePhysical",
                    w.defense_magic as "defenseMagic",
                    w.defense_fire as "defenseFire",
                    w.defense_lightning as "defenseLightning",
                    w.defense_holy as "defenseHoly",
                    w.defense_strength as "defenseStrength",
                    w.effect_scarlet_rot as "effectScarletRot",
                    w.effect_frostbite as "effectFrostbite",
                    w.effect_bleeding as "effectBleeding",
                    w.effect_poison as "effectPoison",
                    w.req_strength as "reqStrength",
                    w.req_dexterity as "reqDexterity",
                    w.req_intelligence as "reqIntelligence",
                    w.req_faith as "reqFaith",
                    w.req_arcane as "reqArcane",
                    w.description
                  FROM item_weapons as w
                  WHERE i.id = w.item_id
                ) as detail
              ) as "detail"
            FROM items as i
            WHERE i.sub_category_no = main.sub_category_no
          ) as weapons
        ) as "weapons"
      FROM item_sub_categories as main
      WHERE category_no = 1
      ORDER BY main.order_no
    `,
    []
  );

  return resultSet.rows;
}

async function sqlTest(client: PoolClient) {
  const resultSet = await client.query(
    `
      SELECT
        id as "subCategoryId",
        category_no as "mainCategoryNo",
        sub_category_no as "subCategoryNo",
        name,
        description,
        (
          WITH items as
            (
              SELECT
                  i.id as "itemId",
                  i.category_no as "categoryNo",
                  i.sub_category_no as "subCategoryNo",
                  i.name,
                  i.order_no as "orderNo",
                  w.id as "weaponDetailId",
                  w.item_id as "weaponDetailItemId",
                  w.upgrade_type as "upgradeType",
                  w.image_url as "imageUrl",
                  w.damage_type as "damageType",
                  w.weight,
                  w.default_skill as "defaultSkill",
                  w.damage_physical as "damagePhysical",
                  w.damage_magic as "damageMagic",
                  w.damage_fire as "damageFire",
                  w.damage_lightning as "damageLightning",
                  w.damage_holy as "damageHoly",
                  w.critical,
                  w.defense_physical as "defensePhysical",
                  w.defense_magic as "defenseMagic",
                  w.defense_fire as "defenseFire",
                  w.defense_lightning as "defenseLightning",
                  w.defense_holy as "defenseHoly",
                  w.defense_strength as "defenseStrength",
                  w.effect_scarlet_rot as "effectScarletRot",
                  w.effect_frostbite as "effectFrostbite",
                  w.effect_bleeding as "effectBleeding",
                  w.effect_poison as "effectPoison",
                  w.req_strength as "reqStrength",
                  w.req_dexterity as "reqDexterity",
                  w.req_intelligence as "reqIntelligence",
                  w.req_faith as "reqFaith",
                  w.req_arcane as "reqArcane",
                  w.description
              FROM items as i
              LEFT JOIN item_weapons as w ON i.id = w.item_id
            )
          SELECT JSON_AGG(items.* ORDER BY "orderNo") as "weapons"
          FROM items
          WHERE s.sub_category_no = "subCategoryNo"
        )
      FROM item_sub_categories as s
      WHERE s.category_no = 1
    `,
    []
  );

  return resultSet.rows;
}

export default {
  getItemMainCategories,
  getItemSubCategory,
  updateItemSubCategory,
  getItemWeapons,
}