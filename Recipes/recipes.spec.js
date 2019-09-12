// const request = require('supertest');

const db = require('../data/db-config');

const Recipes = require('./recipesModel');

//testing if the create recipe works by creating an entrie
describe('recipes model', () => {
  describe('addRecipe()', () => {
    //delete current entries to start test fresh
    beforeEach(async () => {
      await db('recipes').truncate();
    });
    //check if we can insert new entries
    it('it should create one new posts', async () => {
      await Recipes.addRecipe({
        title: 'Pizza',
        meal_type: 'Lunch',
        chef_id: 6,
        recipe_img: 'nijewnce',
        ingredients: 'many',
        instructions: 'cook'
      });
      const newRecipe = await db('recipes');
      expect(newRecipe).toHaveLength(1);
    });
  });
  //check if we can update and entrie
  describe('updateRecipe()', () => {
    //delete current entries to start test fresh
    beforeEach(async () => {
      await db('recipes').truncate();
    });
    //creating entrie to be updated
    it('It should update a post', async () => {
      await Recipes.addRecipe({
        title: 'Pizza',
        meal_type: 'Lunch',
        chef_id: 6,
        recipe_img: 'nijewnce',
        ingredients: 'many',
        instructions: 'cook'
      });
      //updating new entrie
      await Recipes.updateRecipe(1, {
        title: 'Soup'
      });

      const newRecipe = await db('recipes')
        .where('id', '=', 1)
        .first();
      expect(newRecipe.title).toBe('Soup');
    });
  });
  describe('removeRecipe()', () => {
    beforeEach(async () => {
      await db('recipes').truncate();
    });
    //Creating entrie to delete it
    it('Return true if DB is empty', async () => {
      await Recipes.addRecipe({
        title: 'Pizza',
        meal_type: 'Lunch',
        chef_id: 6,
        recipe_img: 'nijewnce',
        ingredients: 'many',
        instructions: 'cook'
      });
      //deleting entrie
      await Recipes.removeRecipe(1);

      const newRecipe = await db('recipes');
      //check if the length is 0 which means db is empty
      expect(newRecipe).toHaveLength(0);
    });
  });
});
