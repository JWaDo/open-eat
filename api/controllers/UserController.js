import User from '../models/sequelize/User';

class UserController {};

UserController.get = (req, res) => {
    const users = User.findAll().then(users => {
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

export default UserController;