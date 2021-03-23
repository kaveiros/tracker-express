const db = require('../mongo/dbPool')
const User = db.User
const Role = db.Role
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const secretKey = require('../cfg/configJWT')
const HttpError = require('../error/Http-Error')

module.exports.create = async (req, res, next) => {

    const { username, role , email, password } = req.body
    let hashedPassoword
    let roleDoc
    try {
        hashedPassoword = await bcrypt.hash(password, 12)
        roleDoc = await Role.findOne({ name: role })

    } catch (error) {
        return next(new HttpError('Failed finding role', 500))
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
            { user:createdUser},
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

    try {

            //throw new HttpError('Failed signing in',500)
            let username = req.body.username
            let password = req.body.password
            let user = await User.findOne({username:username})
            await user.populate('roles').execPopulate();
            let passwordMatch = await bcrypt.compare(password, user.password)
            console.log(passwordMatch)
            if (passwordMatch === true){
                let userData = {
                    userId: user._id,
                    username: user.username,
                    email:user.email,
                    role: user.roles[0].name
                }
                let token = jwt.sign(
                    userData,
                    secretKey.secret,
                    { expiresIn: '1h' }
                );
                return res.status(200).send({token:token})

            }
            else{
                return res.status(422).send({message:"Could not signin user"})
            }
        
    } catch (error) {
        console.log(error)
        return next(new HttpError('Failed signing in',500))
    }




}
