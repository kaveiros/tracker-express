module.exports = mongoose => {
    const warehouse = new mongoose.Schema({
        aa: {type: Number, required: true},
        code: String,
        kind: String,
        description: String,
        quantity: String,
        section: String,
        sector: String,
        nameOfPersonAccepted: String,
        uniqueVersion:{type:String, required:true},
        additionalInfo: [{type: mongoose.Schema.Types.ObjectId, ref: "AdditionalInfo"}]
    })

    return mongoose.model("Warehouse", warehouse)

}
