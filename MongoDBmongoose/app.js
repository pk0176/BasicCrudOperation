const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/fruitsDB" , {useNewUrlParser: true, useUnifiedTopology: true})

const fruitSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, "Please check your data entry, no name specified!"]

    },
    // name : String
    ratting : {
        type : Number,
        min : 1,
        max : 10
    },
    review : String
});

const Fruit = mongoose.model("Fruit",fruitSchema);
//here the prural form of Fruit  is connection of fruitsDB
const fruits = new Fruit({
    name : "Apple",
    ratting : 10,
    review : "Peaches here."
});

// fruits.save();  ---> as the code runer again and again Apple doc get add on 
// fruits.save();

const personSchema = new mongoose.Schema({
    name : String,
    age: Number,
    favourateFruits: fruitSchema
});

const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    score : 9,
    review : "Great  fruit"
})
// pineapple.save();
const Mango = new Fruit({
    name : "Mango",
    score :10,
    review : "better than every food"
});

// Mango.save();

const person = new Person({
    name : "Amy",
    age : 12,
    favorateFruits: pineapple
});
//  person.save();

// const kiwi = new Fruit({
//     name: "kiwi",
//     ratting : 10,
//     review : "THe best food"
// });
// const orange = new Fruit({
//     name: "orange",
//     ratting : 6,
//     review : "Too sour for me"
// });
// const banana = new Fruit({
//     name: "banana",
//     ratting : 9,
//     review : "weird shape"
// });


// Fruit.insertMany([kiwi,orange,banana], function(err, result) {
//     if(err){
//         console.log(err);
//     }else {
//         console.log("Sucessfully save to current DB")
//     }
// });

Fruit.find(function(err, result) {
    if(err){
        console.log(err);
    }else {

        mongoose.connection.close();
        result.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});

Person.updateOne({_id:"60c0de46d30ea130849a74be"},{favorateFruits: Mango},function(err){
    if(err) {
        console.log(err);
    }else {
        console.log("Sucessfully Updated!");
    }
})

// Fruit.updateOne({_id: "60c0db6870831c329ce9aacd"}, {name: "Peach"},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully updated")
//     }
// });

// Fruit.deleteOne({name: "Peach"},function(err){});

// Person.deleteMany({name:"jhon"},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Sucessfully deleted");
//     }
// });