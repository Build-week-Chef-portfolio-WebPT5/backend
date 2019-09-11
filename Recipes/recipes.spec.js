// const request = require('supertest');

const db = require('../data/db-config');

const Recipes = require('./recipesModel');

describe('recipes model', () => {
  describe('insert()', () => {
    //delete current entries to start test fresh
    beforeEach(async () => {
      await db('recipes').truncate();
    });
    //check if we can insert new entries
    it('it should create two new posts', async () => {
      await Recipes.addRecipe({
        title: 'Go to the GYM',
        meal_type: 'Lunch',
        chef_id: 6,
        recipe_img: 'nijewnce',
        ingredients: 'many',
        instructions: 'cook'
      });
      const todo = await db('recipes');
      expect(todo).toHaveLength(1);
    });
  });
});
