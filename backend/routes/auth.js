const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getchusermiddleware = require('../middleware/fetchuser');

const JWT_SECRET = 'thisisajwtsecreatstring';

// crete a user using: POST "/api/auth/register". No login required
router.post('/register', [
    body('name', "Please provide Name of min length 3").isLength({ min: 3 }),
    body('email', "Enter a Valid Email").isEmail(),    // these 3 validations are being added using express-validator packeage
    body('password', "Please provide Password of min length 5").isLength({ min: 5 }),
], async function (req, res) {
    // if there are errors in validation return a bad request and errors corrspoinding the validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    try {
        //check weather the user with the same email exists already
        let user = await User.findOne({ email: req.body.email }); // this goes to DB and check this email exists
        if (user) {
            res.status(400).json({ errors: "Sorry, User with this Email Already Exists", email: req.body.email });
        }

        var salt = await bcrypt.genSaltSync(10);
        secreatPassword = await bcrypt.hash(req.body.password,salt);  // ite returns a promise so making it await
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secreatPassword
        })
        // .then(user => res.json(user))
        //     .catch(err => {
        // console.log(err)
        //         res.json({ error: "Please Enter Unique Email Address", message: err.message });
        //     });

        const data = {
            tkn:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);  // it is a Synchronously signed JWT token so no need of await
        console.log(authToken);

        // res.json({ result: user, email: req.body.email, status: "User Created Stauts Okji" });
        res.json({authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal Server Error occurred");
    }
});

// authonticate a user using: POST "/api/auth/login". No login required
router.post('/login',[
    body('email', "Enter a Valid Email").isEmail(),    // these 3 validations are being added using express-validator packeage
    body('password', "Please cannot be blank").exists(),
], async (req, res)=>{
    // if there are errors in validation return a bad request and errors corrspoinding the validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {email, password} = req.body; // this is called destructoring
    let user = await User.findOne({email});
    console.log(user);
    if (!user) {
       return res.status(400).json({error: "Please enter correct credentials"});
    }

    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare){
        return res.status(400).json({error: "Please enter correct credentials"});
    }
    const data = {
        tkn:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken});

})

// get a user details using: POST "/api/auth/getuser". login required
router.post('/getuser', getchusermiddleware, async (req,res)=>{
    try {
        userid = req.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Some internal Server Error occurred, error: " + error.message);
    }
})


module.exports = router;