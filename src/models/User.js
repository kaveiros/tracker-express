module.exports = (mongoose)=>{

    const UserSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        role:String,
        //keep for reference
        // roles: [
        //   {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Role"
        //   }
        // ]
    })

    return mongoose.model("User", UserSchema)
}