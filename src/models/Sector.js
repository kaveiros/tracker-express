/**
 * Create a Sector Model
 * @param {*} mongoose 
 */
module.exports = (mongoose) => {

    let schema = new mongoose.Schema({
        sector: String,
        administration: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Administration"
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    }, {timestamps:true})

    return mongoose.model("Sector", schema)
}