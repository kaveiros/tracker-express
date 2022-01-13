module.exports = mongoose => {

    const section = new mongoose.Schema({
        section:String,
        administration: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Administration"
        }
    }, {timestamps:true})

    return mongoose.model("Section", section)
}
