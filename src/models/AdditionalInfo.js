module.exports = (mongoose) => {

    let additionalInfo = new mongoose.Schema({
        fromSector:String,
        toSector:String,
        files:[]
    })

    return mongoose.model("AdditionalInfo", additionalInfo)
}