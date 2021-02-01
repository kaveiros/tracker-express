module.exports = (mongoose)=>{

    const UserSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
          }
        ]
    })

    return mongoose.model("User", UserSchema)
}