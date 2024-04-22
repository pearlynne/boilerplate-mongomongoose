require("dotenv").config({ path: "./process.env" });

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Person = require("./models/person.js");

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "hello",
    age: 21,
    favoriteFoods: ["pasta", "carrots"],
  });

  newPerson.save(function (error, data) {
    if (error) {
      console.log(error);
      return done(error);
    }
    done(null, data); //need to figure this out!
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (error, data) {
    if (error) {
      console.log(error);
      return done(error);
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (error, data) {
    if (error) {
      console.log(error);
      return done(error);
    }
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (error, data) {
    if (error) {
      console.log(error);
      return done(error);
    }
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (error, data) {
    if (error) {
      console.log(error);
      return done(error);
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({ _id: personId }, function (error, personFound) {
    if (error) {
      console.log(error);
    } else {
      personFound.favoriteFoods.push(foodToAdd);
      personFound.save(function (error, data) {
        //need to figure this out!
        if (error) {
          console.log(error);
          return done(error);
        }
        done(null, data);
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function (error, data) {
      //need to figure this out!
      if (error) {
        console.log(error);
        return done(error);
      }
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (error, data) {
    if (error) {
      console.log(error);
      return done(error);
    }
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (error, results) {
    if (error) {
      console.log(error);
      return done(error);
    }
    done(null, results);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
		.select("name favourteFoods")
    .exec(function (error, data) {
			if (error) {
				console.log(error);
				return done(error);
			} done(error, data)
}); 
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
