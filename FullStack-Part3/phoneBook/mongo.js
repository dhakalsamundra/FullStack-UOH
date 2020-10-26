const mongoose = require('mongoose');
require('dotenv').config();

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', personSchema);

console.log(`Added name ${process.argv[3]} phone number ${process.argv[4]}`);

/*const person = new Person({
  name: ' Anna',
  number: ' 1234567',
});

person.save().then((response) => {
  console.log(
    `added ${person.name} number ${person.number} saved to phonebook.`
  );
  mongoose.connection.close();
});*/

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
