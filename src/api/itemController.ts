import { RouterParameters, GuestApiParams, DefaultGuestApiParams } from "@appTypes";
import { checker, error, utils } from "@stdlib";
import itemDAO from "@/db/item/itemDAO";

export default function route({ api }: RouterParameters) {
  api.guest.get   ("/api/item/main-categories",                   getItemMainCategories);
  api.guest.get   ("/api/item/weapons",                           getItemWeapons);
}

// ------------------------------------------------------

async function getItemMainCategories() {
  return await itemDAO.getItemMainCategories();
}

async function getItemWeapons() {
  return await itemDAO.getItemWeapons();
}

