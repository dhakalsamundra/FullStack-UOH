// const mongoose = require('mongoose')

// //Mongoose's findOneAndUpdate() long pre-dates the MongoDB driver's
// // findOneAndUpdate() function, so it uses the MongoDB driver's
// //findAndModify() function

// const commentSchema = new mongoose.Schema({
//   content: {
//     type: String
//   },
//   blog: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Blog'
//   }
// })


// // removing and changing the  __v and _id from the api persons data
// commentSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   },
// })

// module.exports = mongoose.model('Comment', commentSchema)