module.exports = mongoose => {
    const administration = new mongoose.Schema({
        administration:String,
        isActive: Boolean
    }, {timestamps:true})

    return mongoose.model("Administration", administration)
}