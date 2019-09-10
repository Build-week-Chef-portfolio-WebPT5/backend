const router = require('express').Router();
const DB = require('./chefsModel.js');

//importing bcrypt to hash password
const bcrypt = require('bcryptjs');

// TO FIND A SPECIFIC CHEFS PAGE
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const chef = await DB.findChef(id);
    if (chef) {
      res.status(200).json(chef);
    } else {
      res.status(404).json({ message: 'No account associated with this ID.' });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//TO CREATE A NEW CHEF ACCOUNT
router.post('/register', (req, res) => {
  let chefInfo = req.body;

  //hashing user password
  const hash = bcrypt.hashSync(chefInfo.password, 10);
  //passing the hash password to the body to store in db
  chefInfo.password = hash;

  DB.createChef(chefInfo)
    .then(idArray => {
      res.status(201).json({ chefId: idArray[0] });
    })
    .catch(err => {
      res.status(400).json(err.message);
    });
});

//USER LOGIN REQUEST
router.post('/login', (req, res) => {
  //deconstructing body
  let { username, password } = req.body;

  DB.findChefByUser(username)
    .then(user => {
      //if the user exist and the password matches
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

//UPDATES CHEFS' ACCOUNT INFO.. RETURNS NUMBER OF ROWS UPDATED
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;
  try {
    const update = await DB.updateChef(id, updatedInfo);
    res.status(200).json(update);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//DELETES CHEF FROM DATABASE USING ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await DB.deleteChef(id);
    res.status(204);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
