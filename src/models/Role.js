module.exports = (mongoose) => {

    const roleSchema = new mongoose.Schema(
        {
            name:String
        }
    )

    return mongoose.model("Role", roleSchema) 
}