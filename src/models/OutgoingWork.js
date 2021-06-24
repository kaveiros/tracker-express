module.exports = mongoose => {

    let schema = mongoose.Schema({
        aa: Number,
        workCode:String,
        workDate: Date,
        workType: String,
        contractor: String,
        jobCode:String,
        jobStartDate: Date,
        jobEndDate: Date,
        fromSector: [{type: mongoose.Schema.Types.ObjectId, ref: "Sector"}],
        fromSectorLeader: String,
        toSector: [{type: mongoose.Schema.Types.ObjectId, ref: "Sector"}],
        toSectorLeader: String,
        additionalInfo: [{type: mongoose.Schema.Types.ObjectId, ref: "AdditionalInfo"}]


    },{timestamps:true})

     return mongoose.model('Outwork', schema)

}
