// const {findBy} = require('../jokes/jokes-model')
const Jokes = require('../jokes/jokes-model')

// const checkUsernameExists = async (req, res, next) => {

//     try {
//       const [user] = await findBy({username: req.body.username})
//       if(!user) {
//         next({status:401, message:'invalid credentials'})
//       } else {
//         req.user = user
//         next()
//       }
//     } catch(err){
//       next(err)
//     }
//    }

//    async function checkUsernameFree(req,res,next) {
//     try {
//       const users = await Jokes.findBy({username: req.body.username})
//       if(!users) {
//         next()
//       } else {
//         next({message: 'username taken', status: 422})
//       }
//     } catch(err) {
//       next(err)
//     }
//   }

//   async function missingField(req,res,next) {
//     try {
//       const users = await Jokes.findBy({username: req.body.username, password: req.body.password})
//       if(!users.username || !users.password) {
//         next()
//       } else {
//         next({message: 'username and password required', status: 422})
//       }
//     } catch(err) {
//       next(err)
//     }
//   }

  function missingField(req,res,next) {
      const {username,password} = req.body 
      if(username === '' || password === '' ) {
          next(({message: 'username and password required', status: 422 }))
      } else {
          next()
      }
  }

  function checkUsernameFree(req,res,next) {
      Jokes.findBy({username:req.body.username})
      const {username} = req.body
      if(username === undefined) {
          next({message: 'username taken', status: 422})
      } else {
          next()
      }
  }
  
  function checkUsernameExists(req,res,next) {
    const user = Jokes.findBy({username:req.body.username})
        if(!user) {
            next({status: 422, message: 'invalid credentials'})
        }
  }

module.exports = {
checkUsernameExists,
checkUsernameFree,
missingField,
}