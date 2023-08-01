const db = require('../db')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select user_id, email from users')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.register = async (req, res) => {
  const { email, password } = req.body
  try {
    const hashedPassword = await hash(password, 10)

    await db.query('insert into users(email,password) values ($1 , $2)', [
      email,
      hashedPassword,
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
  let user = req.user

  let payload = {
    id: user.user_id,
    email: user.email,
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out succefully',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

//INSERT INTO SHED

exports.insertShed = async (req, res) => {
  const {  shed_id , shed_name  } = req.body
  try {
   

    await db.query('insert into shed(shed_id , shed_name ) values ($1 , $2)', [
      shed_id , shed_name
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.getsheds = async (req, res) => {
  try {
    const { rows } = await db.query('select  shed_id, shed_name from shed')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}


exports.getAnimals = async (req, res) => {
  try {
    const { rows } = await db.query('select  aid, name, breed, type, sex, status, weight, ev, color, height, age, shed_no, date from animals')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getAnimal = async (req, res) => {
  try {
    const {id}=req.params

    const { rows } = await db.query('select  aid, name, breed, type, sex, status, weight, ev, color, height, age, shed_no, date from animals where aid= $1',[id])

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

//UPDATE THE ANIMAL 

exports.updateAnimal = async (req, res) => {
  const { id } = req.params
  const { name, breed, type, sex, status, weight, ev, color, height, age, shed_no } = req.body
  
  try {
    const { aid, name, breed, type, sex, status,weight, ev, color, height, age, shed_no, user_id, date } = req.body;

    const updateAnimalQuery = `
      UPDATE animals 
      SET name = $1, breed = $2, type = $3, sex = $4, status = $5, weight=$6, ev = $7, color = $8, height = $9, age = $10, shed_no = $11, user_id = $12, date = $13 
      WHERE aid = $14
      RETURNING *
    `;

    const { rows } = await db.query(updateAnimalQuery, [name, breed, type, sex, status, weight, ev, color, height, age, shed_no, user_id, date, aid]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Animal not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Animal updated successfully',
      animal: rows[0]
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

//Delete teh animal

exports.deleteAnimal = async (req, res) => {
  try {
    const {id}=req.params

    const { rows } = await db.query('delete from animals where aid= $1',[id])

    return res.status(200).json({
      success: true,
      message: 'Sucessfully deleted',
      users: rows,

    })
  } catch (error) {
    console.log(error.message)
  }
}



exports.sendAnimal = async (req, res) => {
  const {  name , breed , 
    type , sex , status , 
    weight , ev , color ,
    height, age , shed_no ,
    } = req.body
  try {
   

    await db.query('insert into animals(name , breed , type , sex , status , weight , ev , color ,height, age , shed_no ) values ($1 , $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
      name , 
      breed , 
      type , 
      sex , 
      status , 
      weight ,
       ev , 
       color ,
       height, 
       age , 
       shed_no 
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

// INSERTING DATA INTO THE EXPENSES TABLE
exports.sendExpense = async (req, res) => {
  const {discription ,amount , user_id } = req.body
  try {
   

    await db.query('insert into expenses(discription ,amount , user_id ) values ($1 , $2, $3 )', [
      discription ,
      amount , 
      user_id ,
    ])

    return res.status(201).json({
      success: true,
      message: 'The registraion was succefull',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

// GETTING DATA FROM EXPENSES TABLE

exports.getExpense = async (req, res) => {
  try {
    const { rows } = await db.query('select  expense_id,discription ,amount from expenses')

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.deleteExpense = async (req, res) => {
  try {
    const {id}=req.params

    const { rows } = await db.query('delete from expenses where aid= $1',[id])

    return res.status(200).json({
      success: true,
      message: 'Sucessfully deleted',
      users: rows,

    })
  } catch (error) {
    console.log(error.message)
  }
}
  