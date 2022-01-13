module.exports = mongoose => {
    const administration = new mongoose.Schema({
        administration:String,
        isActive: Number
    }, {timestamps:true})

    return mongoose.model("Administration", administration)
}