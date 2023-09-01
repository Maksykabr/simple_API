const express = require('express');
const bodyParser = require('body-parser');
const jayson = require('jayson');
const fs = require('fs');

const filePath = './data/data.json'

const all_data = {
  get_data: function(args, callback){
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      console.log('ok1');
      const items = JSON.parse(data);
      console.log(items)
      callback(null, `${items}`)
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
        console.log(foundObject)
        callback(null, `${foundObject}`)
      } else {
        callback(null, 'Object not found');
      }

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
app.post('/get_data', jayson.server(all_data).middleware());
app.post('/get_firstLevel', jayson.server(get_firstLevel).middleware());

app.post('/cats', jayson.server(cats).middleware());
app.post('/dogs', jayson.server(dogs).middleware());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});

