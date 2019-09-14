const DB = require('../data/db-config.js');

module.exports = {
  findChef,
  findChefById,
  findChefByUser,
  createChef,
  updateChef,
  deleteChef
};

function findChefById(id) {
  return DB('chefs')
    .where({ id })
    .first();
}

function findChef(id) {
  return DB('chefs');
}

//request for login
function findChefByUser(userName) {
  return DB('chefs')
    .where('username', '=', userName)
    .first();
}

function createChef(chefInfo) {
  return DB('chefs').insert(chefInfo);
}

function updateChef(id, newData) {
  return DB('chefs')
    .where({ id })
    .update(newData);
}

function deleteChef(chefId) {
  return DB('chefs')
    .where('id', '=', `${chefId}`)
    .del();
}
