import copy from "./copy";
import CSS from "../css/application";
import items from "./items";
import { defaultItem } from "./items";
import { cartItems } from "./items";
import { menuLinks } from "./menus";
import { UIsizes } from "./UIsize";

export const data = {
  logo: "https://tyccus.com/assets/img/TYCCUSFXSHADE500.png",
  heroImage:
    "https://cdn.midjourney.com/dcbd5b5f-bdbc-41e4-9108-8a34abd620e2/0_0.png",
  heroCopy: copy,
  items: items,
  defaultItem: defaultItem,
  CSS: CSS,
  cartLogos: { single: "/ticket.svg", multi: "/tickets.svg" },
  cartItems: cartItems,
  menuItems: menuLinks,
  UIsizes:UIsizes,
};
