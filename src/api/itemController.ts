import { RouterParameters, GuestApiParams, DefaultGuestApiParams } from "@appTypes";
import { checker, error, utils } from "@stdlib";
import itemDAO from "@/db/item/itemDAO";

export default function route({ api }: RouterParameters) {
  api.guest.get   ("/api/item/main-categories",                       getItemMainCategories);
  api.guest.get   ("/api/item/sub-categories/:categoryNo",            getItemSubCategory);
  api.guest.put   ("/api/item/sub-categories/:categoryNo",            updateItemSubCategory);
  api.guest.get   ("/api/item/weapons",                               getItemWeapons);
}

// ------------------------------------------------------

async function getItemMainCategories() {
  return await itemDAO.getItemMainCategories();
}

async function getItemSubCategory({ params }: DefaultGuestApiParams) {
  const categoryNo = Number(params.categoryNo);
  checker.checkRequiredPositiveIntegerParameters(categoryNo);

  return await itemDAO.getItemSubCategory(categoryNo);
}

async function updateItemSubCategory({ params, body }: GuestApiParams<{ description: string | null }>) {
  const categoryNo = Number(params.categoryNo);
  checker.checkRequiredPositiveIntegerParameters(categoryNo);
  checker.checkOptionalStringParameters(body.description);

  const description = body.description !== undefined ? body.description : null;

  await itemDAO.updateItemSubCategory(categoryNo, description);
}

async function getItemWeapons() {
  return await itemDAO.getItemWeapons();
}

