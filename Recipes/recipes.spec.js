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
});
