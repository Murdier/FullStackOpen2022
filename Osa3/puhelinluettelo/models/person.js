const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(() => { console.log('connected to MongoDB') })
  .catch((error) =>
  {
    console.log('error connecting to MongoDB:', error.message)
  })


function validationFunctionForPhoneNumber(val) {
  let valAsString = val.toString()
  let dashCount = 0

  if (valAsString.indexOf('-') !== 2 && valAsString.indexOf('-') !== 3)
    return false


  for (var i = 0; i < valAsString.length; i++) {
    if (isNaN(valAsString[i]) && valAsString[i] !== '-')
      return false
    else if (valAsString[i] === '-')
      dashCount++
  }

  if (dashCount !== 1)
    return false

  return true
}
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minlength: [8, 'Number must be at least 8 characters long'],
    validate: validationFunctionForPhoneNumber,
    required: [true, 'User phone number required']
  },
  id: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('person', personSchema)