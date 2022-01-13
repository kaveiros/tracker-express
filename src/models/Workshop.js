/**
 * Create a Workshop Model
 * @param {*} mongoose
 */
module.exports = (mongoose) => {

    let schema = new mongoose.Schema({
        workshop: String,
        administration: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Administration"
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        },
        sector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sector"
        }
    }, {timestamps:true})

    return mongoose.model("Workshop", schema)
}