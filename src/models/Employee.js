module.exports = (mongoose) => {
    const employeeSchema = new mongoose.Schema({
        aa: {type: Number, required: true},
        code: {type: String, required: true},
        address: {type: String, required: true},
        name: {type: String, required: true},
        section: {type: String, required: true},
        sector: {type: String, required: true},
        property: {type: String, required: true},
        specialisedIn: {type: String, required: true},
        expertise: {type: String, required: true},
        costOvertime: {type: Number, required: true},
        costPerDay: {type: Number, required: true},
        //additionalInfo: [{type: mongoose.Schema.Types.ObjectId, ref: "AdditionalInfo"}]

    })
    return mongoose.model("Employee", employeeSchema)
}