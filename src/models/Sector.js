const { mongoose } = require("../DbPool/ConnectionPool");

/**
 * Create a Sector Model
 * @param {*} mongoose 
 */
module.exports = mongoose => {

    var schema = mongoose.Schema({
        sector: String
    }, {timestamps:true})

    const Sector = mongoose.model("Sector", schema)
    return Sector
}