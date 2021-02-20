/**
 * Create a Sector Model
 * @param {*} mongoose 
 */
module.exports = (mongoose) => {

    let schema = new mongoose.Schema({
        sector: String
    }, {timestamps:true})

    return mongoose.model("Sector", schema)
}