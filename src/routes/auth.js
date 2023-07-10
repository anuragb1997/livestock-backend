const { Router } = require('express')
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  getAnimal,
  sendAnimal,
  getExpense,
  sendExpense,
  getAnimals,
} = require('../controllers/auth')
const {
  validationMiddleware,
} = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
//ROUTES FOR THE ANIMAL TABLE
router.get('/get-animals',getAnimals)
router.get('/get-animal/:id',getAnimal)
router.post('/animals',sendAnimal)

//ROUTES FOR THE EXPENSE TABLE
router.get('/get-expenses',getExpense)
router.post('/expenses',sendExpense)


module.exports = router
