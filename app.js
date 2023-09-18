const express = require('express');
const bodyParser = require('body-parser');
const jayson = require('jayson');
const fs = require('fs');

const filePath = './data/data.json'


// get methods
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


// post methods
const post_firstLevel = {
  post_firstObject: function(params, callback) {
    const newItem = params;
    console.log(params)
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
  
      const existingItem = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);
      if (existingItem) {
        const message = 'Item already exists';
        console.log(`${message}`);
        callback(null, `${message}`);
      } else if (params['Другий рівень'] !== "" || params['Третій рівень'] !== "" || params['Четвертий рівень'] !== "") {
        const message = 'Not Acceptable';
        console.log(`${message}`);
        callback(null, `${message}`);
      } else {
        items.push(newItem);
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.error(err);
            callback(null, { message: 'Internal Server Error' });
            return;
          }
          callback(null, )
        });
      }
    });
  }
};


const post_secondLevel = {
  post_secondObject: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;
      const existingItem = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);
      if (!existingItem['Масив елементів другого рівня']) {
        existingItem['Масив елементів другого рівня'] = []; // Create an empty array
      }

      if (!existingItem) { 
        const message = 'Item already exists';
        console.log(`${message}`);
        callback(null, `${message}`);
      } else if (newItem['Другий рівень'] == ''){
        const message = 'This object doesen\'t have [\'Другий рівень\'] ';
        console.log(`${message}`);
        callback(null, `${message}`);
      }else if (newItem['Третій рівень'] !== "" || newItem['Четвертий рівень'] !== "") { 
        const message = 'Not Acceptable';
        console.log(`${message}`);
        callback(null, `${message}`);
      } else {
        existingItem['Масив елементів другого рівня'].push(newItem);
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.error(err);
            callback(null, { message: 'Internal Server Error' });
            return;
          }
          callback(null, `${params}`)
        });
      }
    });
  }
};


const post_thirdLevel = {
  post_thirdObject: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      const first_element = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);
      second_elements = first_element['Масив елементів другого рівня'];
      second_element = second_elements.find((item) => item['Другий рівень'] == newItem['Другий рівень']);

      if (!second_element['Масив елементів третього рівня']) {
        second_element['Масив елементів третього рівня'] = []; // Create an empty array
      }

      if (!second_element) {
        const message = 'Item already exists';
        console.log(`${message}`);
        callback(null, `${message}`);
      } else if (newItem['Третій рівень'] == ''){
        const message = 'This object doesen\'t have [\'Третій рівень\'] ';
        console.log(`${message}`);
        callback(null, `${message}`);
      }else if (newItem['Четвертий рівень'] !== "") { 
        const message = 'Not Acceptable';
        console.log(`${message}`);
        callback(null, `${message}`);
      } else {
        second_element['Масив елементів третього рівня'].push(newItem);
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.error(err);
            callback(null, { message: 'Internal Server Error' });
            return;
          }
          callback(null, `${params}`)
        });
      }
    });
  }
};


const post_fourthLevel = {
  post_fourthObject: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }

      const items = JSON.parse(data);
      const newItem = params;

      const first_element = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);
      second_elements = first_element['Масив елементів другого рівня'];
      second_element = second_elements.find((item) => item['Другий рівень'] == newItem['Другий рівень']);
      third_elements = second_element['Масив елементів третього рівня'];
      third_element = third_elements.find((item) => item['Третій рівень'] == newItem['Третій рівень']);

      if (!third_element['Масив елементів четвертого рівня']) {
        third_element['Масив елементів четвертого рівня'] = []; // Create an empty array
      }
      if (!third_element) {
        const message = 'Item already exists';
        console.log(`${message}`);
        callback(null, `${message}`);
      } else if (newItem['Четвертий рівень'] == ''){
        const message = 'This object doesen\'t have [\'Четвертий рівень\'] ';
        console.log(`${message}`);
        callback(null, `${message}`);
      } else {
        third_element['Масив елементів четвертого рівня'].push(newItem);
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.error(err);
            callback(null, { message: 'Internal Server Error' });
            return;
          }
          callback(null, `${params}`);
        });
      }
    });
  }
};


const put_firstLevel = {
  put_firstObject: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      const first_object = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);
      first_object['Перший рівень'] = newItem['Перший рівень'];
      first_object['Другий рівень'] = newItem['Другий рівень'];
      first_object['Третій рівень'] = newItem['Третій рівень'];
      first_object['Четвертий рівень'] = newItem['Четвертий рівень'];
      first_object['Категорія'] = newItem['Категорія'];
      first_object['Назва об\'єкта українською мовою'] = newItem['Назва об\'єкта українською мовою'];

      if (first_object) {
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.error(err);
            callback(null, { message: 'Internal Server Error' });
            return;
          }
          callback(null, `${params}`);
        });
  
      } else {
        const message = 'Object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
      }
    });
  }
}

const put_secondLevel = {
  put_secondObject: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      
      const first_id = newItem['Перший рівень'];
      const second_id = newItem['Другий рівень'];
      
      const first_object = items.find((item) => item['Перший рівень'] == first_id);
      second_elements = first_object['Масив елементів другого рівня'];
      second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
      second_element['Другий рівень'] = newItem['Другий рівень'];
      second_element['Третій рівень'] = newItem['Третій рівень'];
      second_element['Четвертий рівень'] = newItem['Четвертий рівень'];
      second_element['Категорія'] = newItem['Категорія'];
      second_element['Назва об\'єкта українською мовою'] = newItem['Назва об\'єкта українською мовою'];


      if (first_object) {
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.error(err);
            callback(null, { message: 'Internal Server Error' });
            return;
          }
          callback(null, `${params}`);
        });
  
      } else {
        const message = 'Object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
      }
    });
  }
}

const put_thirdLevel = {
  put_thirdObject: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      
      const first_id = newItem['Перший рівень'];
      const second_id = newItem['Другий рівень'];
      const third_id = newItem['Третій рівень'];
      
      const first_object = items.find((item) => item['Перший рівень'] == first_id);
      second_elements = first_object['Масив елементів другого рівня'];
      second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
      third_elements = second_element['Масив елементів третього рівня'];
      third_element = third_elements.find((item) => item['Третій рівень'] == third_id);
    
      third_element['Третій рівень'] = newItem['Третій рівень'];
      third_element['Четвертий рівень'] = newItem['Четвертий рівень'];
      third_element['Категорія'] = newItem['Категорія'];
      third_element['Назва об\'єкта українською мовою'] = newItem['Назва об\'єкта українською мовою'];
        
      if (third_element) {
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.error(err);
            callback(null, { message: 'Internal Server Error' });
            return;
          }
          callback(null, `${params}`);
        });

      } else {
        const message = 'Object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
      }
    });
  }
}

const put_fourthLevel = {
  put_fourthObject: function(params, callback) {
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      const first_id = newItem['Перший рівень'];
      const second_id = newItem['Другий рівень'];
      const third_id = newItem['Третій рівень'];
      const fourth_id = newItem['Четвертий рівень'];
      
      const first_object = items.find((item) => item['Перший рівень'] == first_id);
      second_elements = first_object['Масив елементів другого рівня'];
      second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
      third_elements = second_element['Масив елементів третього рівня'];
      third_element = third_elements.find((item) => item['Третій рівень'] == third_id);
      fourth_elements = third_element['Масив елементів четвертого рівня'];
      fourth_element = fourth_elements.find((item) => item['Четвертий рівень'] == fourth_id);
    
      fourth_element['Четвертий рівень'] = newItem['Четвертий рівень'];
      fourth_element['Категорія'] = newItem['Категорія'];
      fourth_element['Назва об\'єкта українською мовою'] = newItem['Назва об\'єкта українською мовою'];
      
      if (fourth_element) {
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
          if (err) {
            console.error(err);
            callback(null, { message: 'Internal Server Error' });
            return;
          }
          callback(null, `${params}`);
        });

      } else {
        const message = 'Object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
      }
    });
  }
}


const delete_firstLevel = {
  delete_firstObject: function(params, callback){
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      const first_id = newItem['Перший рівень'];

      const itemIndexToDelete = items.findIndex((item) => item['Перший рівень'] == first_id);
    // console.log(itemIndexToDelete)
      if (itemIndexToDelete === -1) {
        const message = 'Object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
        return;
      }

      new_items = items.filter((item, index) => index !== itemIndexToDelete);

      // Save the updated array back to the file
      fs.writeFile(filePath, JSON.stringify(new_items, null, 2), (err) => {
        if (err) {
          console.error(err);
          callback(null, { message: 'Internal Server Error' });
          return;
        }
        callback(null, `${params}`);
      });
    });
  }
}


const delete_secondLevel = {
  delete_secondObject: function(params, callback){
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      const first_id = newItem['Перший рівень'];
      const second_id = newItem['Другий рівень'];

      const first_object = items.find((item) => item['Перший рівень'] == first_id);
      const second_elements = first_object['Масив елементів другого рівня'];
      const itemIndexToDelete = second_elements.findIndex((item) => item['Другий рівень'] == second_id);
      // console.log(itemIndexToDelete)

      if (itemIndexToDelete === -1) {
        const message = 'Object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
        return;
      }
      second_elements.splice(itemIndexToDelete, 1);
      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error(err);
          callback(null, { message: 'Internal Server Error' });
          return;
        }
        callback(null, `${params}`);
      });
    });
  }
}

const delete_thirdLevel = {
  delete_thirdObject: function(params, callback){
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      const first_id = newItem['Перший рівень'];
      const second_id = newItem['Другий рівень'];
      const third_id = newItem['Третій рівень'];
      
      const first_object = items.find((item) => item['Перший рівень'] == first_id);
      console.log(first_object)
      const second_elements = first_object['Масив елементів другого рівня'];
      const second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
      const third_elements = second_element['Масив елементів третього рівня'];

      const itemIndexToDelete = third_elements.findIndex((item) => item['Третій рівень'] == third_id);

      if (itemIndexToDelete === -1) {
        const message = 'Object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
        return;
      }

      third_elements.splice(itemIndexToDelete, 1);

      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error(err);
          callback(null, { message: 'Internal Server Error' });
          return;
        }
        callback(null, `${params}`);
      });
    });
  }
}

const delete_fourthLevel = {
  delete_fourthObject: function(params, callback){
    fs.readFile(filePath, 'utf8', (error, data) =>{
      if (error) {
        console.log(error);
      }
      const items = JSON.parse(data);
      const newItem = params;

      const first_id = newItem['Перший рівень'];
      const second_id = newItem['Другий рівень'];
      const third_id = newItem['Третій рівень'];
      const fourth_id = newItem['Четвертий рівень'];

      
      const first_object = items.find((item) => item['Перший рівень'] == first_id);
      if (!first_object) {
        const message = 'First object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
        return;
      }

      const second_elements = first_object['Масив елементів другого рівня'];
      const second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
      if (!second_element) {
        const message = 'Second object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
        return;
      }

      const third_elements = second_element['Масив елементів третього рівня'];
      const third_element = third_elements.find((item) => item['Третій рівень'] == third_id);
      if (!third_element) {
        const message = 'Third object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
        return;
      }

      const fourth_elements = third_element['Масив елементів четвертого рівня'];
      const itemIndexToDelete = fourth_elements.findIndex((item) => item['Четвертий рівень'] == fourth_id);
      if (itemIndexToDelete === -1) {
        const message = 'Fourth object not found';
        console.log(`${message}`);
        callback(null, `${message}`);
        return;
      }

      fourth_elements.splice(itemIndexToDelete, 1);

      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error(err);
          callback(null, { message: 'Internal Server Error' });
          return;
        }
        callback(null, `${params}`);
      });
    });
  }
}

const cats = {
    speak: function(args, callback) {
      console.log('done')
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
app.post('/post_firstLevel', jayson.server(post_firstLevel).middleware())
app.post('/post_secondLevel', jayson.server(post_secondLevel).middleware())
app.post('/post_thirdLevel', jayson.server(post_thirdLevel).middleware())
app.post('/post_fourthLevel', jayson.server(post_fourthLevel).middleware())
// PUT
app.post('/put_firstLevel', jayson.server(put_firstLevel).middleware())
app.post('/put_secondLevel', jayson.server(put_secondLevel).middleware())
app.post('/put_thirdLevel', jayson.server(put_thirdLevel).middleware())
app.post('/put_fourthLevel', jayson.server(put_fourthLevel).middleware())
// DELETE
app.post('/delete_firstLevel', jayson.server(delete_firstLevel).middleware())
app.post('/delete_secondLevel', jayson.server(delete_secondLevel).middleware())
app.post('/delete_thirdLevel', jayson.server(delete_thirdLevel).middleware())
app.post('/delete_fourthLevel', jayson.server(delete_fourthLevel).middleware())

app.post('/cats', jayson.server(cats).middleware());
app.post('/dogs', jayson.server(dogs).middleware());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});

