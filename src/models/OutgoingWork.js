module.exports = mongoose => {

    var schema = mongoose.Schema({
        aa: Number,
        workCode:String,
        workDate: Date,
        workType: String,
        contractor: String,
        jobCode:String,
        jobStartDate: Date,
        jobEndDate: Date
    },{timestamps:true})

    const OutWork = mongoose.model('Outwork', schema)
    return OutWork
}