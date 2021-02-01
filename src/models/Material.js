/**
 * Create a Material Model
 * @param {*} mongoose 
 */
module.exports = mongoose => {

    var schema = new mongoose.Schema({
        numberCode: Number,
        code: String,
        kind: String,
        description: String,
        quantity: {
            type: Number,
            required: [true, 'A name is required.'],
        },
        section: String,
        name: String,
        restDetails: String,
        sector: String
    }
        , { timestamps: true }
    )

    const Material = mongoose.model('Material', schema)
    return Material
}