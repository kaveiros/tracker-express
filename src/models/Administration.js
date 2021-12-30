module.exports = mongoose => {

    const administration = new mongoose.Schema({
        administration:String
    }, {timestamps:true})

    return mongoose.model("Administration", administration)
}