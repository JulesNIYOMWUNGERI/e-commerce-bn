import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import db from '../models';
import validateSignup from '../validation/validator.js';

const User = db.User;


//create and save new user
export const createUser = async(req, res) => {

  const {error, value} = validateSignup(req.body);

    if(error){
        return res.send(error.details)
    }

    const hashedPassword = await bcrypt.hash(req.body.password,12);

    const user = {
        fullname: `${req.body.firstname} ${req.body.lastname}`,
        email: req.body.email,
        password: hashedPassword
    };

    User.create(user)
      .then(data => {
         const token = jwt.sign({ email:data.email,id:data.id },process.env.USER_SCREET_KEY);
         res.send({message:"successful signedup",token});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating User."
        });
      });
};

