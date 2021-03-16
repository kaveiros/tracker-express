module.exports = (mongoose) => {

    let additionalInfo = new mongoose.Schema({
        uniqueVersion:String,
        fromSector:String,
        toSector:String,
        description:String,
        files:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        }]
    })

    return mongoose.model("AdditionalInfo", additionalInfo)
}