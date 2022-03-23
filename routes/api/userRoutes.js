const router = require ('express').Router();  
const { User } = require( './user')

//GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)

    } catch (err) {
    console.log("err", err)
    res.status(500).json();
    } 
}); 

module.exports = router; 