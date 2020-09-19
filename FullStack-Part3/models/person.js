const mongoose = require('mongoose')

//Mongoose's findOneAndUpdate() long pre-dates the MongoDB driver's
// findOneAndUpdate() function, so it uses the MongoDB driver's
//findAndModify() function
mongoose.set('useFindAndModify', false)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true ,
  },
  number: {
    type: Number,
    minlength: 8,
    unique: true,
    required: true
  }
})

// removing and changing the  __v and _id from the api persons data
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)