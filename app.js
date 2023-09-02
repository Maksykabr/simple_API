const express = require('express');
const bodyParser = require('body-parser');
const jayson = require('jayson');
const fs = require('fs');
const { error } = require('console');

const filePath = './data/data.json'

const all_data = {
  get_data: function(args, callback){
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      console.log('ok1');
      // const items = JSON.parse(data);
      console.log(data)
      callback(null, `${data}`)
    });
  }
};


const get_firstLevel = {
  get_object: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      console.log('ok1');
      const items = JSON.parse(data);
      const first_id = params.first_id;
      const foundObject = items.find((item) => item['Перший рівень'] == first_id);
      if (foundObject){
        foundedObject = JSON.stringify(foundObject)
        console.log(foundedObject)
        callback(null, `${foundedObject}`)
      } else {
        callback(null, 'Object not found');
      }

    });
  }
};


const get_secondLevel = {
  get_secondObjects: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      console.log('ok1');
      const items = JSON.parse(data);
      const first_id = params.first_id;
      const second_id = params.second_id;
      const firstObjects = items.find((item) => item['Перший рівень'] == first_id);
      const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
      const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] == second_id);
      if (secondObjects) {
        foundedObjects = JSON.stringify(secondObjects)
        console.log(foundedObjects)
        callback(null, `${foundedObjects}`)
      } else {
        callback(null, 'Object not found');
      }
    })
  }
}


const get_thirdLevel = {
  get_thirdObjects: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      console.log('ok1');
      const items = JSON.parse(data);
      const first_id = params.first_id;
      const second_id = params.second_id;
      const third_id = params.third_id;
      const firstObjects = items.find((item) => item['Перший рівень'] == first_id);
      const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
      const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] == second_id);
      const second_preparedObjects = secondObjects['Масив елементів третього рівня'];
      const thirdObjects = second_preparedObjects.find((object) => object['Третій рівень'] == third_id);
      if (thirdObjects) {
        foundedObjects = JSON.stringify(thirdObjects);
        console.log(foundedObjects);
        callback(null, `${foundedObjects}`);
      } else {
        callback(null, 'Object not found');
      }
    });
  }
};


const get_fourthLevel = {
  get_fourthObjects: function(params, callback){
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      console.log('ok1');
      const items = JSON.parse(data);
      const first_id = params.first_id;
      const second_id = params.second_id;
      const third_id = params.third_id;
      const fourth_id = params.fourth_id;

      const firstObjects = items.find((item) => item['Перший рівень'] == first_id);
      const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
      const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] == second_id);
      const second_preparedObjects = secondObjects['Масив елементів третього рівня'];
      const thirdObjects = second_preparedObjects.find((object) => object['Третій рівень'] == third_id);
      const thid_preparedObjects = thirdObjects['Масив елементів четвертого рівня'];
      const fourthObjects = thid_preparedObjects.find((object) => object['Четвертий рівень'] == fourth_id);
      if (fourthObjects) {
        foundedObjects = JSON.stringify(fourthObjects);
        console.log(foundedObjects);
        callback(null, `${foundedObjects}`);
      } else {
        callback(null, 'Object not found');
      };
    });
  }
};

const cats = {
    speak: function(args, callback) {
        callback(null, 'meow')
    }
};
const dogs = {
    speak: function(args, callback) {
        callback(null, 'woof')
    }
};

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// get
app.post('/get_data', jayson.server(all_data).middleware());
app.post('/get_firstLevel', jayson.server(get_firstLevel).middleware());
app.post('/get_secondLevel', jayson.server(get_secondLevel).middleware());
app.post('/get_thirdLevel', jayson.server(get_thirdLevel).middleware());
app.post('/get_fourthLevel', jayson.server(get_fourthLevel).middleware())
// post

app.post('/cats', jayson.server(cats).middleware());
app.post('/dogs', jayson.server(dogs).middleware());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});

