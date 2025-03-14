/**
 * HOW TO USE (if you want to upload your recipes by yourself; if not, just message me - Breiah)
 * 1. Make sure you have node.js installed (https://nodejs.org/en/download)
 *      1.1 Open your powershell terminal and copy-paste the commands (isa-isa) in the download page
 * 2. Get your service account key and put it into the secrets folder (message benedict or me to give you admin access)
 *      2.1 Go here https://console.firebase.google.com/u/6/project/tokyowebapp/overview
        2.2 Open Settings (ung gear sa tabi ng Project Overview)
        2.3 Click Service Accounts.
 *      2.4 Click Generate New Private Key, then confirm by clicking Generate Key.
        2.5 Save the file to the secrets folder
        2.6 Copy the file name and replace the text inside require() (make sure na ilagay muna ung ../secrets/ before ung actual file name)
 * 3. Press Ctrl+` and run the following command in the terminal (isa-isa):
 *      cd firestore-upload
 *      npm install
 *      node upload.js
 *      
 * 4. Check https://console.firebase.google.com/u/6/project/tokyowebapp/firestore/databases/-default-/data/~2Frecipes~2FBxW75LbquY0SglsM4iRF 
 * to see the uploaded recipes
 * 
 * Notes:
 * - If may gusto kang i-edit, okay lang na i-run mo ulit node upload.js after mong iedit ung recipe,
 *   basta unchanged ung recipeID ng recipe na inedit mo
 * - Do not move the recipes.json file
 * - Do not commit anything in the secrets folder
 * - Do not commit node_modules
 * - Do not change the structure of the recipes.json file
 * 
 *  Structure template for JSON (just change the values):
    {
        "_recipeID": "recipe-0",
        "mealImage": "",
        "_name": "Spaghetti Carbonara",
        "ingredients": [
            {
                "name": "Spaghetti",
                "amount": "200g"
            },
            {
                "name": "Egg yolks",
                "amount": "2"
            },
            {
                "name": "Pancetta",
                "amount": "100g"
            },
            {
                "name": "Parmesan",
                "amount": "50g"
            },
            {
                "name": "Black pepper",
                "amount": "to taste"
            }
        ],
        "category": "Pasta"
    },

 * Categories: 	
    - Appetizers
	- Salads
	- Soups
	- Main Courses: Meat dishes
    - Main Courses: Seafood
	- Main Courses: Vegetarian options
	- Pasta
	- Pizzas
	- Sides
	- Desserts
	- Beverages
 */

const admin = require("firebase-admin");
const recipes = require("./recipes.json");

// replace the text inside require() with the path to your service account key
// Example
// const serviceAccount = require("../secrets/tokyowebapp-bla-blab-abla.json");
const serviceAccount = require("../secrets/tokyowebapp-firebase-adminsdk-hjast-b342420c64.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// uploads recipes to Firestore
async function uploadRecipes() {
  try {
    for (const recipe of recipes) {
      await db.collection("recipes").doc(recipe._recipeID).set(recipe);  // uses the recipeID as the document ID
      console.log(`Added recipe: ${recipe._name} with ID: ${recipe._recipeID}`);
    }
    console.log("All recipes uploaded successfully!");
  } catch (error) {
    console.error("Error uploading recipes: ", error);
  }
}

uploadRecipes();