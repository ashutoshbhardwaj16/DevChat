const express= require('express')
const router =express.Router()

//@route GET api/profile
//@access public
//test
router.get('/',(req,res)=>res.send('Profile route'))

module.exports = router;