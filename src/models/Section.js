module.exports = mongoose => {

    const section = new mongoose.Schema({
        section:String
    }, {timestamps:true})

    return mongoose.model("Section", section)
}
