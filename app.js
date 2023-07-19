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

  // Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
