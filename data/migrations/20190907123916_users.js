exports.up = function(knex) {
  return knex.schema
    .createTable("chefs", tbl => {
      tbl.increments();
      tbl
        .text("username", 32)
        .notNullable()
        .unique();
      tbl.text("password").notNullable();
      tbl
        .text("name", 32)
        .notNullable()
        .unique();
      tbl.text("city", 64).notNullable();
      tbl.text("state", 2).notNullable();
      tbl
        .text("email", 72)
        .notNullable()
        .unique();
      tbl.integer("phone", 10);
    })
    .createTable("recipes", tbl => {
      tbl.increments();
      tbl.text("title", 56).notNullable();
      tbl.text("meal_type", 32).notNullable();
      tbl
        .integer("chef_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("chefs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .text("recipe_img")
        .unique()
        .notNullable();
      tbl.text("ingredients", 1000).notNullable();
      tbl.text("instructions", 1500).notNullable();
    });
};

exports.down = function(knex) {
  //ANY TABLES WITH FOREIGN KEYS POINTING TO A CHEF MUST BE DROPPED BEFORE THE CHEFS TABLE
  return knex.schema.dropTableIfExists("recipes").dropTableIfExists("chefs");
};
