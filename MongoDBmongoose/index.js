// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/harry', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
//   console.log("we are connected!");
});

const kittySchema = new mongoose.Schema({
    name: String
  });

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    const greeting ="My name is " + this.name
    console.log(greeting);
  }
  


const Kitten = mongoose.model('harryKitty', kittySchema);

const harryKitty = new Kitten({ name: 'harryKitten' });
const harryKitty2 = new Kitten({ name: 'harryKitty2'});
// console.log(harryKitty.name); // 'Silence'

// harryKitty.speak();

harryKitty.save();
harryKitty2.save();



Kitten.find({name: 'harryKitty2'},function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })