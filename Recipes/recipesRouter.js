const express = require('express');
const router = express.Router();
const DB = require('./recipesModel.js');

const restricted = require('../auth/restricted-middleware');

//FINDS RECIPES FOR ONE CHEF with authentication
router.get('/myrecipes', restricted, async (req, res) => {
  // const id = req.params.id;
  //getting the user ID from the decoded token
  //from the(restricted mitddleware) to
  //show only the post from current user only
  const id = req.decodedJwt.subject;
  try {
    const recipes = await DB.getChefRecipes(id);
    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//Shows all recipes for a user without auth
router.get('/', async (req, res) => {
  try {
    const recipes = await DB.getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//ADDS RECIPE TO THE DB, CHEF ID MUST BE SUPPLIED IN THE BODY OF REQUEST
router.post('/', async (req, res) => {
  const recipeInfo = req.body;
  // const id = req.decodedJwt.subject;
  // console.log(id);
  try {
    const recipe = await DB.addRecipe(recipeInfo);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//UPDATES RECIPE BY ID, RETURNS COUNT OF ROWS UPDATED
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;
  try {
    const update = await DB.updateRecipe(id, updatedInfo);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//REMOVES RECIPE BY RECIPE ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await DB.removeRecipe(id);
    res.status(204);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
