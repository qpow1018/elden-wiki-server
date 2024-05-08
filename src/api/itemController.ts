import { DefaultUserApiParams, RouterParameters, UserApiParams, UserInfo } from "@appTypes";
import { checker, error, utils } from "@stdlib";
import itemDAO from "@/db/item/itemDAO";

export default function route({ api }: RouterParameters) {
  api.guest.get   ("/api/item/item-categories",               getItemCategories);
}

// ------------------------------------------------------
async function getItemCategories() {
  return await itemDAO.getItemCategories();
}
