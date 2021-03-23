module.exports = (mongoose) => {

    const fileSchema = new mongoose.Schema({
        id: {type:String, required: true},
        selfLink: {type:String, required: true},
        mediaLink: {type:String, required: true},
        name: {type:String, required: true},
        bucket: {type:String, required: true},
        contentType: {type:String, required: true},
        size: {type:String, required: true},
        timeCreated: {type:String, required: true},
        updated: {type:String, required: true},
    })

    return new mongoose.model("File", fileSchema)

}
