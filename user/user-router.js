const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const restricted = require('./restricted-middleware.js');

const Users = require('./user-model.js')

router.post('/register', (req,res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saveU => {
            // const token = generateToken(saved)
            // res.status(201).json({
            //     user: saveU,
            //     token
            // })
            res.status(201).json(saveU)
        })
        .catch(error => {
            res.status(500).json({ message: 'cannot add the user' });
          });
})

router.post('/login', (req,res) => {
    let { username, password } = req.body;

    Users.findBy({username})
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                  });
            }
            else{
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

//using restricted-middleware: restricted
router.get('/users', restricted, (req,res) => {
    Users.getAll()
        .then(allUsers => {
            res.json(allUsers);
          })
        .catch(error => {
            res.status(500).json({error: `You are not allowed to see this content`});
        })
})


function generateToken(user){
    const payload = {
        username: user.username,
        subject:user.id,
        department: user.department
    };
    const options ={
        expiresIn: '1d'
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;