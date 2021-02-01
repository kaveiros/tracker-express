/**
 * Create a Person Model
 * @param {*} mongoose 
 */
module.exports = mongoose => {

    const schema = new mongoose.Schema(
        {
            aa: Number,
            code: String,
            address: String,
            name: String,
            department: String,
            section: String,
            attribute1: String,
            expertise: String,
            costPerDay: Number,
            costPerHour: Number,
            notes: String
        },
        { timestamps: true }
    )

    const Person = mongoose.model('Person', schema)
    return Person
}