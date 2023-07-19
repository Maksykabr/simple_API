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
      const itemId = req.params.id;
      for (step = 0; step<= items.length; step++){
            object = items[step]
            try
            {
              if (object['Перший рівень'] == itemId) {
                res.json(object);
              } else {
                res.json({"object": "cannot find properties"});  
              };
            }
            catch (err)
            {
              console.log(err);
            };
          };
    });
  });


  app.get('/second_level/:id1/:id2', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      const items = JSON.parse(data);
      const first_id = req.params.id1;
      const second_id = req.params.id2;
      for (step = 0; step<= items.length; step++){
            object = items[step]
            try
            {
              if (object['Перший рівень'] == first_id) {
                second_objects = object['Масив елементів другого рівня']
                for (step = 0; step<= second_objects.length; step++) {
                  second_object = second_objects[step]
                  if (second_object['Другий рівень'] == second_id) {
                    res.json(second_object);
                  };
                };
              } else {
                res.json({"object": "cannot find properties"});  
              };
            }
            catch (err)
            {
              console.log(err);
            };
          };
    });
  });

  // app.get('/thirth_level/:id1/:id2/:id3', (req, res) => {
  //   fs.readFile(filePath, 'utf8', (error, data) => {
  //     if (error) {
  //       console.error(error);
  //       res.status(500).json({ message: 'Internal Server Error' });
  //       return;
  //     }
  //     const items = JSON.parse(data);
  //     const first_id = req.params.id1;
  //     const second_id = req.params.id2;
  //     const thirth_id = req.params.id3;
  //     for (step = 0; step<= items.length; step++){
  //       object = items[step]
  //       try
  //       {
  //         if (object['Перший рівень'] == first_id) {
  //           second_objects = object['Масив елементів другого рівня'];
  //           for (step = 0; step<= second_objects.length; step++) {
  //             second_object = second_objects[step]
  //             if (second_object['Другий рівень'] == second_id) {
  //               thirth_objects = second_object['Масив елементів третього рівня']
  //               res.json(thirth_objects)
  //               for (step = 0; step<= thirth_objects.length; step++) {
  //                 thirth_object = thirth_objects[step]
  //                 // console.log(thirth_object)
  //                 // res.json(thirth_object)
  //                 if (thirth_object['Третій рівень'] == thirth_id) {
  //                   console.log(thirth_object)
  //                 //   res.json({"object": "Hello"})

  //                 };
  //               };
  //             };
  //           };
  //         } else {
  //             res.json({"object": "cannot find properties"});  
  //           };
  //         }
  //         catch (err)
  //         {
  //           console.log(err);
  //         };
  //       };
  //   });
  // });

  app.get('/third_level/:id1/:id2/:id3', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      const items = JSON.parse(data);
      const firstId = req.params.id1;
      const secondId = req.params.id2;
      const thirdId = req.params.id3;
  
      let foundObject = null;
  
      for (let i = 0; i < items.length; i++) {
        const object = items[i];
  
        if (object['Перший рівень'] == firstId) {
          const secondObjects = object['Масив елементів другого рівня'];
  
          for (let j = 0; j < secondObjects.length; j++) {
            const secondObject = secondObjects[j];
            // res.json(secondObject);
  
            if (secondObject['Другий рівень'] == secondId) {
              const thirdObjects = secondObject['Масив елементів третього рівня'];
  
              for (let k = 0; k < thirdObjects.length; k++) {
                const thirdObject = thirdObjects[k];
                // res.json(thirdObject);
                if (thirdObject['Третій рівень'] == thirdId) {
                  res.json(thirdObject);
                  foundObject = thirdObject;
                  break;
                }
              }
            }
  
            if (foundObject) {
              break;
            }
          }
        }
  
        if (foundObject) {
          break;
        }
      }
  
      if (foundObject) {
        res.json(foundObject);
      } else {
        res.json({ object: 'cannot find properties' });
      }
    });
  });

  // Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
