const db = require('../mongo/dbPool')
const User = db.User
const Role = db.Role
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const secretKey = require('../cfg/configJWT')
const HttpError = require('../error/Http-Error')
 const LOGGER = require('../loggers/WinstonLogger')



module.exports.create = async (req, res, next) => {

    const { username, role , email, password } = req.body
    let hashedPassword
    let roleDoc
    try {
        hashedPassword = await bcrypt.hash(password, 12)
        roleDoc = await Role.findOne({ name: role })

    } catch (error) {
        return next(new HttpError('Failed finding role', 500))
    }

    const createdUser = new User({
        username: username,
        password: hashedPassword,
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
            let user = await User.findOne({username:username}).exec()
        console.log(user)
            let roles = await user.populate('roles').execPopulate();
            let passwordMatch = bcrypt.compareSync(password, user.password)
            console.log(passwordMatch)
            if (passwordMatch === true){

                let secureData = {
                    userId: user._id,
                    username: user.username,
                    email:user.email,
                    role: user.roles[0].name
                }

                let userData = {
                    username: user.username,
                    email:user.email,
                    role: user.roles[0].name
                }

                let token = jwt.sign(
                    secureData,
                    secretKey.secret,
                    { expiresIn: '1h' }
                );

                let userToken = jwt.sign(userData,
                    secretKey.secret,
                    {expiresIn: '1h'})

                res.cookie('token', token, {httpOnly:true})
                return res.status(200).send({token:userToken})

            }
            else{
                LOGGER.error("Could not signin user")
                return res.status(422).send({message:"Could not signin user"})
            }
        
    } catch (error) {
        console.log(error)
        return next(new HttpError('Failed signing in',500))
    }




}


module.exports.setRole = async (req, res) => {

    try {

        const {employeeId, roleId} = req.body
        console.log(req.body)
        const user = await User.findOneAndUpdate(
            { _id: employeeId },
            { $push: { roles: roleId }},(err, result) =>{
                if (err) {
                    LOGGER.error("Σφάλμα στην προσθήκη ρόλου.")
                    return res.status(500).send({message: "Σφάλμα στην προσθήκη ρόλου."})
                }
                else {
                    return res.status(200).send({message:"Ο ρόλος προστέθηκε επιτυχώς."})
                }
            }
        )

    }
    catch (exp) {
        console.log(exp)
        LOGGER.error("Σφάλμα στην προσθήκη ρόλου.")
        return res.status(500).send({message: "Σφάλμα στην προσθήκη ρόλου."})
    }

    //return res.status(200).send({message:"Ο ρόλος προστέθηκε επιτυχώς."})

//push
    //pull
}

module.exports.getAll = async (req, res) => {

    try {
        const users = await User.find()
        return  res.status(200).send(users)
    }
    catch (exception) {
        LOGGER.error({message: "Σφάλμα στην ανάκτηση χρηστών."})
        return res.status(500).send({message: "Σφάλμα στην ανάκτηση χρηστών."})
    }
}


module.exports.search = async(req, res) => {

    const { username } =  req.body

    try {
        const user = await User.find({username: username})
        return res.status(200).send(user)
        
    } catch (error) {
        res.status(500).send({message: "Σφάλμα στην ανάκτηση χρήστη."})
    }
}

