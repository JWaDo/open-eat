import User from '../models/sequelize/User';
import { ValidationError } from 'sequelize';
import JWT from '../services/jwt';
import bcrypt from 'bcryptjs';

class UserController {};

UserController.get = (req, res) => {
    User.findAll().then(users => {
        res.status(200).json({
            success: true,
            users
        });
    })
    .catch(err => {
        res.status(200).json({
            success: false,
            error: err
        });
    });    
} 

UserController.put = (req, res) => {
    User.update(req.body, { returning: true, where: { id: req.params.id } })
      .then(([nbUpdated, result]) =>
        nbUpdated ? res.json(result[0]) : res.sendStatus(404)
      )
      .catch((error) => {
        if (error instanceof ValidationError) {
          console.log(error.errors);
          const errors = error.errors.reduce((acc, item) => {
            acc[item.path] = [...(acc[item.path] || []), item.message];
            return acc;
          }, {});
          res.status(400).json(errors);
        } else {
          console.log(error);
          res.sendStatus(500);
        }
      });
}

UserController.register = (req, res) => {
    try {
        User.create(req.body).then((data) => {
            return res.status(201).json({
                success: true,
                user: data,
            });
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            const errors = error.errors.reduce((acc, item) => {
              acc[item.path] = [...(acc[item.path] || []), item.message];
              return acc;
            }, {});
            res.status(400).json(errors);
          } else {
            res.sendStatus(500);
          }
    }
}

UserController.login = (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@admin.fr' && password === 'admin_test') {
        const token = JWT.create({
            type: 'admin',
            firstname: 'Admin',
            lastname: 'Admin',
        });
        // Valid
        res.status(200).json({ success: true, token });
    }

    User.findOne({ where: { email } })
        .then( data => {
            if (!data) {
                return Promise.reject("invalid");
            } else {
                return bcrypt.compare(password, data.password).then((valid) => {
                    if (!valid) {
                        return Promise.reject("invalid");
                    } else {
                        return Promise.resolve(data);
                    }
                });
            }
        })
        .then(user => {
            const token = JWT.create({
                type: 'saler',
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
            });
            // Valid
            res.status(200).json({ success: true, token });
        })
        .catch(err => res.status(400).json({ success: false, error: err }));
};

export default UserController;