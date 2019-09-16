const DB = require('../data/db-config');

module.exports = {
  getAllRecipes,
  getChefRecipes,
  addRecipe,
  updateRecipe,
  removeRecipe
};

function getAllRecipes(chefId) {
  return DB('recipes');
}

function getChefRecipes(chefId) {
  return DB('recipes').where('chef_id', '=', `${chefId}`);
}

function addRecipe(recipeInfo) {
  return DB('recipes').insert(recipeInfo);
}

function updateRecipe(id, changes) {
  return DB('recipes')
    .where({ id })
    .update(changes);
}

function removeRecipe(id) {
  return DB('recipes')
    .where({ id })
    .del();
}
