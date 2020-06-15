const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')

const gravator = require('gravatar')
const bycrypt = require('bcryptjs')


//@route GET api/users
//@access public
//test
//router.get('/',(req,res)=>res.send('User route'))

//@route POST api/users
//@access public
//register user
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'please include email').isEmail(),
    check('password', 'enter the password with 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        console.log(req.body);
        const { name, email, password } = req.body;
        try {

            //see if user exists
            let user = await User.findOne({ email })
            if(user){
                res.status(400).json({ errors: [{ msg: 'User already exists'}] })
            }
            //get users gravator
            const avatar =gravator.url(email,{
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            user = new User({
                name,
                email,
                avatar,
                password
            })
            //encrypt password
            const salt= await bycrypt.genSalt(10);
            user.password = await bycrypt.hash(password,salt);
            await user.save()
            //return jsonwebtoken
            res.send('User registered')
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }

    });


module.exports = router;
