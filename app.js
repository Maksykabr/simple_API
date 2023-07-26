const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const filePath = './data/data.json';


// GET /items - Get all items
app.get('/items', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
  
      const items = JSON.parse(data);
      res.json(items);
    });
  });


  app.get('/first_level/:id', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      const items = JSON.parse(data);
      const first_id = req.params.id;
      const foundObject = items.find((item) => item['Перший рівень'] === first_id);
  
      if (foundObject) {
        res.json(foundObject);
      } else {
        res.json({ message: 'Object not found' });
      }
    });
  });

  app.get('/second_level/:first_id/:second_id', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      const items = JSON.parse(data);
      const first_id = req.params.first_id;
      const second_id = req.params.second_id;
      const firstObjects = items.find((object) => object['Перший рівень'] === first_id);
      const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
      const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] === second_id);
      // res.json(first_preparedObjects)
  
      if (secondObjects) {
        res.json(secondObjects);
      } else {
        res.json({ message: 'Object not found' });
      }
    });
  });


  app.get('/third_level/:first_id/:second_id/:third_id', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      };
      const items = JSON.parse(data);
      const first_id = req.params.first_id;
      const second_id = req.params.second_id;
      const third_id = req.params.third_id;
      const firstObjects = items.find((object) => object['Перший рівень'] === first_id);
      const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
      const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] === second_id);
      const second_preparedObjects = secondObjects['Масив елементів третього рівня'];
      const thirdObjects = second_preparedObjects.find((object) => object['Третій рівень'] === third_id);
      if (thirdObjects) {
        res.json(thirdObjects);
      } else {
        res.json({ message: 'Object not found' });
      }
    });
  });


  app.get('/fourth_level/:first_id/:second_id/:third_id/:fourth_id', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      };
      const items = JSON.parse(data);
      const first_id = req.params.first_id;
      const second_id = req.params.second_id;
      const third_id = req.params.third_id;
      const fourth_id = req.params.fourth_id;
      const firstObjects = items.find((object) => object['Перший рівень'] === first_id);
      const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
      const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] === second_id);
      const second_preparedObjects = secondObjects['Масив елементів третього рівня'];
      const thirdObjects = second_preparedObjects.find((object) => object['Третій рівень'] === third_id);
      const thid_preparedObjects = thirdObjects['Масив елементів четвертого рівня'];
      const fourthObjects = thid_preparedObjects.find((object) => object['Четвертий рівень'] === fourth_id);
      if (fourthObjects) {
        res.json(fourthObjects);
      } else {
        res.json({ message: 'Object not found' });
      }
    });
  });


app.post('/new_item', (req, res) => {
  const newItem = req.body;
  // console.log(newItem)
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const existingItem = items.find((item) => item['Перший рівень'] === newItem['Перший рівень']);

    if (existingItem) {
      res.status(409).json({ message: 'Item already exists' });
    } else {
      items.push(newItem);
      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        res.status(201).json(newItem);
      });
    }
  });
});


app.post('/new_item2', (req, res) => {
  const newItem = req.body;
  // console.log(newItem)
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const existingItem = items.find((item) => item['Перший рівень'] === newItem['Перший рівень']);
    // res.json(existingItem)
    if (!existingItem['Масив елементів другого рівня']) {
      existingItem['Масив елементів другого рівня'] = []; // Create an empty array
    }

    // existingItem['Масив елементів другого рівня'].push(newItem);
    // console.log(existingItem)
    // res.json(existingItem)
    if (!existingItem) {
      res.status(400).json({ message: 'Item already exists' });
    } else if (newItem['Другий рівень'] === ''){
      res.status(400).json({ message: 'This object doesen\'t have [\'Другий рівень\'] ' });
    } else {
      existingItem['Масив елементів другого рівня'].push(newItem);
      res.json(existingItem);
      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        // res.status(201).json(newItem);
      });
    }
  });
});

app.post('/new_item3', (req, res) => {
  const newItem = req.body;
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_element = items.find((item) => item['Перший рівень'] === newItem['Перший рівень']);
    second_elements = first_element['Масив елементів другого рівня'];
    // res.json(seconds_element);
    second_element = second_elements.find((item) => item['Другий рівень'] === newItem['Другий рівень']);
    // res.json(second_element);
    if (!second_element['Масив елементів третього рівня']) {
      second_element['Масив елементів третього рівня'] = []; // Create an empty array
    }

    if (!second_element) {
      res.status(400).json({ message: 'Item already exists' });
    } else if (newItem['Другий рівень'] === ''){
      res.status(400).json({ message: 'This object doesen\'t have [\'Третій рівень\'] ' });
    } else {
      second_element['Масив елементів третього рівня'].push(newItem);
      res.json(first_element);
      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        // res.status(201).json(newItem);
      });
    }
  });
});


app.post('/new_item4', (req, res) => {
  const newItem = req.body;
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_element = items.find((item) => item['Перший рівень'] === newItem['Перший рівень']);
    second_elements = first_element['Масив елементів другого рівня'];
    second_element = second_elements.find((item) => item['Другий рівень'] === newItem['Другий рівень']);
    third_elements = second_element['Масив елементів третього рівня'];
    // res.json(third_elements);
    third_element = third_elements.find((item) => item['Третій рівень'] === newItem['Третій рівень']);
    // res.json(third_element);

    if (!third_element['Масив елементів четвертого рівня']) {
      third_element['Масив елементів четвертого рівня'] = []; // Create an empty array
    }
    if (!third_element) {
      res.status(400).json({ message: 'Item already exists' });
    } else if (newItem['Четвертий рівень'] === ''){
      res.status(400).json({ message: 'This object doesen\'t have [\'Четвертий рівень\'] ' });
    } else {
      third_element['Масив елементів четвертого рівня'].push(newItem);
      res.json(first_element);
      fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        // res.status(201).json(newItem);
      });
    }

  });
});


app.put('/update_first_level/:id', (req, res) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_id = req.params.id;
    const newItem = req.body;
    const first_object = items.find((item) => item['Перший рівень'] === first_id);
    first_object['Перший рівень'] = newItem['Перший рівень'];
    first_object['Другий рівень'] = newItem['Другий рівень'];
    first_object['Третій рівень'] = newItem['Третій рівень'];
    first_object['Четвертий рівень'] = newItem['Четвертий рівень'];
    // res.json(first_object);

    if (first_object) {
      res.json(first_object);

    } else {
      res.json({ message: 'Object not found' });
    }
    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      // res.status(201).json(newItem);
    });
  });
});



app.put('/update_second_level/:first_id/:second_id', (req, res) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_id = req.params.first_id;
    const second_id = req.params.second_id;
    const newItem = req.body;
    const first_object = items.find((item) => item['Перший рівень'] === first_id);
    second_elements = first_object['Масив елементів другого рівня'];
    // res.json(second_elements);
    second_element = second_elements.find((item) => item['Другий рівень'] === second_id);
    // res.json(second_element);
    // second_element['Перший рівень'] = newItem['Перший рівень'];
    second_element['Другий рівень'] = newItem['Другий рівень'];
    second_element['Третій рівень'] = newItem['Третій рівень'];
    second_element['Четвертий рівень'] = newItem['Четвертий рівень'];
    // res.json(second_element);
    if (first_object) {
      res.json(first_object);

    } else {
      res.json({ message: 'Object not found' });
    }
    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      // res.status(201).json(newItem);
    });
  });
});


app.put('/update_third_level/:first_id/:second_id/:third_id', (req, res) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_id = req.params.first_id;
    const second_id = req.params.second_id;
    const third_id = req.params.third_id;
    const newItem = req.body;

    const first_object = items.find((item) => item['Перший рівень'] === first_id);
    second_elements = first_object['Масив елементів другого рівня'];
    second_element = second_elements.find((item) => item['Другий рівень'] === second_id);
    third_elements = second_element['Масив елементів третього рівня'];
    third_element = third_elements.find((item) => item['Третій рівень'] === third_id);

    third_element['Третій рівень'] = newItem['Третій рівень'];
    third_element['Четвертий рівень'] = newItem['Четвертий рівень'];
    // res.json(third_element);

    if (third_element) {
      res.json(third_element);

    } else {
      res.json({ message: 'Object not found' });
    }
    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      // res.status(201).json(newItem);
    });
  });
});


app.put('/update_fourth_level/:first_id/:second_id/:third_id/:fourth_id', (req, res) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_id = req.params.first_id;
    const second_id = req.params.second_id;
    const third_id = req.params.third_id;
    const fourth_id = req.params.fourth_id;
    const newItem = req.body;

    const first_object = items.find((item) => item['Перший рівень'] === first_id);
    second_elements = first_object['Масив елементів другого рівня'];
    second_element = second_elements.find((item) => item['Другий рівень'] === second_id);
    third_elements = second_element['Масив елементів третього рівня'];
    third_element = third_elements.find((item) => item['Третій рівень'] === third_id);
    fourth_elements = third_element['Масив елементів четвертого рівня'];
    fourth_element = fourth_elements.find((item) => item['Четвертий рівень'] === fourth_id);

    fourth_element['Четвертий рівень'] = newItem['Четвертий рівень'];
    // res.json(fourth_element);

    if (fourth_element) {
      res.json(fourth_element);

    } else {
      res.json({ message: 'Object not found' });
    }
    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      // res.status(201).json(newItem);
    });

  });
});

  // Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
