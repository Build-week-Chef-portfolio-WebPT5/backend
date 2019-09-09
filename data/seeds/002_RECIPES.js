exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          id: 1,
          title: "Cheezy mac",
          meal_type: "dinner",
          chef_id: 1,
          recipe_img: "../photos/macNchz.jpg",
          ingredients:
            "1 box of pasta, 1/2 lb. cheddar cheese, salt, pepper, 2 tablespoons of butter, 1/2 cup of heavy cream",
          instructions:
            "Boil pasta al dente, mix in cheese and heavy cream and butter while hot, add salt and pepper and bake 14 minutes at 295°F."
        }
      ]);
    });
};
