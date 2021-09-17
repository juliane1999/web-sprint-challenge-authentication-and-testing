const {findBy} = require('../jokes/jokes-model')
const Jokes = require('../jokes/jokes-model')

const checkUsernameExists = async (req, res, next) => {

    try {
      const [user] = await findBy({username: req.body.username})
      if(!user) {
        next({status:401, message:'invalid credentials'})
      } else {
        req.user = user
        next()
      }
    } catch(err){
      next(err)
    }
   }

   async function checkUsernameFree(req,res,next) {
    try {
      const users = await Jokes.findBy({username: req.body.username})
      if(!users.length) {
        next()
      } else {
        next({message: 'username taken', status: 422})
      }
    } catch(err) {
      next(err)
    }
  }
  

module.exports = {
checkUsernameExists,
checkUsernameFree,
}