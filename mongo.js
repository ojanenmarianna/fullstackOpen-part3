/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('log something')
  process.exit(1)
}

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length<4) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}