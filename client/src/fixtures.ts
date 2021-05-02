export const testBin = {
  name: "Large Closet",
  dim: "5x10",
  w: 60,
  l: 60,
  h: 96,
};

export interface boxTemplate {
  id: number;
  brand: string;
  displayName: string;
  size: string;
  l: number;
  w: number;
  h: number;
  imgUrl: string;
  count?: number;
  assetUrl?: string;
}

export const allBoxes: boxTemplate[] = [
  {
    id: 9,
    brand: "furniture",
    displayName: "Desk",
    size: "",
    l: 42,
    w: 24,
    h: 24,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/60645045e49a2a813b207633_Dimensions-Furniture-Desks-Marisa-Desk-Icon.svg",
    assetUrl: "assets/working_table.obj",
  },
  {
    id: 10,
    brand: "furniture",
    displayName: "Mattress",
    size: "",
    l: 38,
    w: 75,
    h: 4,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/5c317efb32c18750af04a544_Dimensions-Guide-Furniture-Beds-Twin-Single-Beds-Dimensions.svg",
    assetUrl: "assets/mattress.obj",
  },
  {
    id: 11,
    brand: "furniture",
    displayName: "Drawer",
    size: "",
    l: 17,
    w: 35,
    h: 52,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/5cc3e8a37c5efa28e5d1d64f_Dimensions-Guide-Furniture-Dressers-Chests-IKEA-Hemnes-3-Drawer-Chest-Icon.svg",
    assetUrl: "assets/drawer.obj",
  },
  {
    id: 12,
    brand: "furniture",
    displayName: "Fridge",
    size: "",
    l: 34,
    w: 39,
    h: 71,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/5c1ad73f74ec73147a6847f5_Dimensions-Guide-Fixtures-Refrigerators-Single-Door-Icon.svg",
    assetUrl: "assets/fridge.obj",
  },
  {
    id: 13,
    brand: "furniture",
    displayName: "Couch",
    size: "",
    l: 30,
    w: 33,
    h: 28,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/5cf7fed1df6b328626634d53_Dimensions-Guide-Furniture-Armchairs-Bevel-Armchair-Icon.svg",
    assetUrl: "assets/armchair.obj",
  },
  {
    id: 14,
    brand: "furniture",
    displayName: "Chair",
    size: "",
    l: 18,
    w: 17,
    h: 33,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/5e42d8b0da3a65cf0d1ba074_Dimensions-Guide-Furniture-Side-Chairs-Salt-Chair-Icon.svg",
    assetUrl: "assets/chair.obj",
  },
  {
    id: 15,
    brand: "furniture",
    displayName: "Floor Lamp",
    size: "",
    l: 12,
    w: 12,
    h: 63,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/5dc4bcbca996bb051cfd74d3_Dimensions-Guide-Furniture-Floor-Lamps-IKEA-Alang-Floor-Lamp-Icon.svg",
    assetUrl: "assets/floor_lamp.obj",
  },
  {
    id: 16,
    brand: "furniture",
    displayName: "Cove Bed",
    size: "",
    l: 44,
    w: 84,
    h: 20,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/5ca634683b0f598c9e7b315a_Dimensions-Guide-Furniture-Bed-Frames-Cove-Bed-Icon.svg",
    assetUrl: "assets/bed.obj",
  },
  {
    id: 17,
    brand: "furniture",
    displayName: "Nightstand",
    size: "",
    l: 15.5,
    w: 19,
    h: 18,
    count: 0,
    imgUrl:
      "https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/604987435f2405a5424e29a4_Dimensions-Furniture-Nightstands-Envelo-Nightstand-Icon.svg",
    assetUrl: "assets/nightstand.obj",
  },
  {
    id: 0,
    brand: "homeDepot",
    displayName: "Home Depot Box",
    size: "s",
    l: 15,
    w: 12,
    h: 12,
    count: 0,
    imgUrl:
      "https://images.thdstatic.com/productImages/d5298557-21a2-49b1-b0af-a66bc00dee3b/svn/the-home-depot-moving-boxes-smbx25-77_600.jpg",
  },
  {
    id: 1,
    brand: "homeDepot",
    displayName: "Home Depot Box",
    size: "m",
    l: 22,
    w: 16,
    h: 16,
    count: 0,
    imgUrl:
      "https://images.thdstatic.com/productImages/c7046f19-a477-402f-8710-da09065f0783/svn/the-home-depot-moving-boxes-mdmvebx-64_400.jpg",
  },
  {
    id: 2,
    brand: "homeDepot",
    displayName: "Home Depot Box",
    size: "l",
    l: 28,
    w: 15,
    h: 16,
    count: 0,
    imgUrl:
      "https://images.thdstatic.com/productImages/b66f9b82-2a11-459e-aec4-882690272f3e/svn/the-home-depot-moving-boxes-lgbox2020-64_400.jpg",
  },
  {
    id: 3,
    brand: "homeDepot",
    displayName: "Home Depot Box",
    size: "xl",
    l: 22,
    w: 22,
    h: 21,
    count: 0,
    imgUrl:
      "https://images.thdstatic.com/productImages/4e63e413-9972-44de-a1a5-85af0931a6e7/svn/the-home-depot-moving-boxes-1001015-64_400.jpg",
  },
  {
    id: 4,
    brand: "homeDepot",
    displayName: "Home Depot Box",
    size: "t",
    l: 24,
    w: 24,
    h: 44,
    count: 0,
    imgUrl:
      "https://images.thdstatic.com/productImages/f3ab65d4-3f5e-4377-b144-e2dea603f2c9/svn/the-home-depot-moving-boxes-1001020-64_400.jpg",
  },
  {
    id: 5,
    brand: "uHaul",
    displayName: "U-Haul Box",
    size: "m",
    l: 18,
    w: 18,
    h: 16,
    count: 0,
    imgUrl:
      "https://www.uhaul.com/MovingSupplies/Image/GetMedia/?id=2793&media=7962",
  },
  {
    id: 6,
    brand: "uHaul",
    displayName: "U-Haul Box",
    size: "s",
    l: 12,
    w: 16,
    h: 12,
    count: 0,
    imgUrl:
      "https://www.uhaul.com/MovingSupplies/Image/GetMedia/?id=2753&media=7961",
  },
  {
    id: 7,
    brand: "uHaul",
    displayName: "U-Haul Box",
    size: "l",
    l: 18,
    w: 18,
    h: 24,
    count: 0,
    imgUrl:
      "https://www.uhaul.com/MovingSupplies/Image/GetMedia/?id=2753&media=7961",
  },
  {
    id: 8,
    brand: "uHaul",
    displayName: "U-Haul Box",
    size: "xl",
    l: 18,
    w: 24,
    h: 24,
    count: 0,
    imgUrl:
      "https://www.uhaul.com/MovingSupplies/Image/GetMedia/?id=3588&media=7955",
  },
];

export const itemDict = {
  box: 0,
  desk: 9,
  table: 9,
  chair: 14 /*need to change*/,
  couch: 13,
  bed: 10,
  mattress: 10,
  drawer: 11,
  closet: 11,
  fridge: 12,
  refrigerator: 12,
};

export const cardboardURL =
  "https://d39l2hkdp2esp1.cloudfront.net/img/eps/E3167_2x/c/E3167_00.jpg?20160907020411";
