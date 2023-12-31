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
  geta,
  updateAnimal,
  insertShed,
  getsheds,
  deleteAnimal,
  deleteExpense,
} = require('../controllers/auth')
const {
  validationMiddleware,
} = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middlewares/auth-middleware')
const router = Router()

//routes for shed 

router.post('/sheds',insertShed)
router.get('/get-shed',getsheds)

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
//ROUTES FOR THE ANIMAL TABLE
router.get('/get-animals',getAnimals)
router.get('/get-animal/:id',getAnimal)
router.post('/animals',sendAnimal)
router.put('/get-animal/:id',updateAnimal)
router.delete('/animal/:id',deleteAnimal)
//ROUTES FOR THE EXPENSE TABLE
router.get('/get-expenses',getExpense)
router.post('/expenses',sendExpense)
router.delete('/expense/:id',deleteExpense)


module.exports = router
