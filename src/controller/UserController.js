const db = require('../mongo/dbPool')
const User = db.User
const Role = db.Role
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const secretKey = require('../cfg/configJWT')

module.exports.create = async (req, res, next) => {

    const { username, role , email, password } = req.body
    let hashedPassoword
    let roleDoc
    try {
        hashedPassoword = await bcrypt.hash(password, 12)
        roleDoc = await Role.findOne({ name: role })

    } catch (error) {
        return next(error)
    }

    const createdUser = new User({
        username: username,
        password: hashedPassoword,
        email: email,
        roles: roleDoc.id

    })
    try {
        await createdUser.save()
    } catch (error) {
        return next(error)
    }

    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email},
            secretKey.secret,
            { expiresIn: '1h' }
        );
    } catch (err) {
        // const error = new HttpError(
        //     'Signing up failed, please try again later.',
        //     500
        // );
        return next(err);
    }

    res
        .status(201)
        .json({ userId: createdUser.id, email: createdUser.email, token: token });

}

module.exports.singIn = async (req, res, next) => {

    let username = req.body.username
    let password = req.body.password
    let token
    if (username === password) {

    }



}
