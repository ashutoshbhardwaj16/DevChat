const express= require('express')
const router =express.Router()

//@route GET api/posts
//@access public
//test
router.get('/',(req,res)=>res.send('posts route'))

module.exports = router;