// Single source of truth: customization name -> Vecteezy image URL.
// Same image source as the menu (static.vecteezy.com) so imagery is aligned
// across the app. Used by lib/seed.ts so a future re-seed keeps the images.
// (The customizations collection's image_url was originally populated by a
// one-off in-app updater that has since been removed.)
// Every URL below was verified to return HTTP 200.
export const CUSTOMIZATION_IMAGE_URLS: Record<string, string> = {
  // Toppings
  "Extra Cheese":
    "https://static.vecteezy.com/system/resources/previews/055/158/430/non_2x/transparent-cheese-slice-png.png",
  "Jalapeños":
    "https://static.vecteezy.com/system/resources/previews/059/252/423/non_2x/green-jalapeno-pepper-on-transparent-background-png.png",
  "Onions":
    "https://static.vecteezy.com/system/resources/previews/025/222/191/non_2x/onion-rings-isolated-on-transparent-background-png.png",
  "Olives":
    "https://static.vecteezy.com/system/resources/previews/048/052/069/non_2x/olives-with-oil-splash-isolated-against-transparent-background-free-png.png",
  "Mushrooms":
    "https://static.vecteezy.com/system/resources/previews/052/332/193/non_2x/fresh-mushrooms-cut-out-isolated-transparent-background-png.png",
  "Tomatoes":
    "https://static.vecteezy.com/system/resources/previews/051/865/794/non_2x/round-tomato-slice-isolated-on-transparent-background-top-view-png.png",
  "Bacon":
    "https://static.vecteezy.com/system/resources/previews/043/348/784/non_2x/bacon-isolated-on-transparent-background-png.png",
  "Avocado":
    "https://static.vecteezy.com/system/resources/previews/050/512/768/non_2x/avocado-with-seed-isolated-on-transparent-background-png.png",

  // Sides
  "Coke":
    "https://static.vecteezy.com/system/resources/previews/051/956/043/non_2x/glass-of-iced-cola-with-lemon-slice-isolated-on-transparent-background-png.png",
  "Fries":
    "https://static.vecteezy.com/system/resources/previews/048/690/583/non_2x/a-bowl-of-french-fries-isolated-on-transparent-background-free-png.png",
  "Garlic Bread":
    "https://static.vecteezy.com/system/resources/previews/054/125/488/non_2x/one-delicious-and-sweet-garlic-bread-transparent-background-png.png",
  "Chicken Nuggets":
    "https://static.vecteezy.com/system/resources/previews/070/650/316/non_2x/chicken-nuggets-isolated-on-transparent-background-png.png",
  "Iced Tea":
    "https://static.vecteezy.com/system/resources/previews/048/232/786/non_2x/glass-of-iced-tea-with-ice-cubes-on-isolated-transparent-background-png.png",
  "Salad":
    "https://static.vecteezy.com/system/resources/previews/021/596/773/non_2x/black-bowl-with-salad-isolated-on-a-transparent-background-png.png",
  "Potato Wedges":
    "https://static.vecteezy.com/system/resources/previews/047/557/066/non_2x/crispy-potato-wedges-png.png",
  "Mozzarella Sticks":
    "https://static.vecteezy.com/system/resources/previews/055/365/133/non_2x/fried-mozzarella-cheese-sticks-isolated-on-transparent-background-png.png",
  "Sweet Corn":
    "https://static.vecteezy.com/system/resources/previews/059/218/129/non_2x/fresh-golden-corn-on-the-cob-isolated-on-transparent-background-png.png",
  "Choco Lava Cake":
    "https://static.vecteezy.com/system/resources/previews/046/828/271/non_2x/delicious-chocolate-lava-cake-isolated-on-transparent-background-png.png",
};
