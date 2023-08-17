const express = require('express');
const router = express.Router();
const fs = require('fs');

const filePath = './data/data.json'

// GET
router.get('/' , (req, res) =>{
  res.render('index.html', { title: 'My Express Project' });
});


router.get('/all_items', (req, res) => {
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

router.get('/get_firstLevel/:first_id', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        const items = JSON.parse(data);
        const first_id = req.params.first_id;
        const foundObject = items.find((item) => item['Перший рівень'] == first_id);
  
        if (foundObject) {
            res.json(foundObject);
        } else {
            res.json({ message: 'Object not found' });
        }
    });
});


router.get('/get_secondLevel/:first_id/:second_id', (req, res) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        const items = JSON.parse(data);
        const first_id = req.params.first_id;
        const second_id = req.params.second_id;
        const firstObjects = items.find((object) => object['Перший рівень'] == first_id);
        const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
        const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] == second_id);
        // res.json(first_preparedObjects)
    
        if (secondObjects) {
          res.json(secondObjects);
        } else {
          res.json({ message: 'Object not found' });
        }
    });
});


router.get('/get_thirdLevel/:first_id/:second_id/:third_id', (req, res) => {
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
      const firstObjects = items.find((object) => object['Перший рівень'] == first_id);
      const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
      const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] == second_id);
      const second_preparedObjects = secondObjects['Масив елементів третього рівня'];
      const thirdObjects = second_preparedObjects.find((object) => object['Третій рівень'] == third_id);
      if (thirdObjects) {
        res.json(thirdObjects);
      } else {
        res.json({ message: 'Object not found' });
      }
    });
  });


router.get('/get_fourthLevel/:first_id/:second_id/:third_id/:fourth_id', (req, res) => {
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
      const firstObjects = items.find((object) => object['Перший рівень'] == first_id);
      const first_preparedObjects = firstObjects['Масив елементів другого рівня'];
      const secondObjects = first_preparedObjects.find((object) => object['Другий рівень'] == second_id);
      const second_preparedObjects = secondObjects['Масив елементів третього рівня'];
      const thirdObjects = second_preparedObjects.find((object) => object['Третій рівень'] == third_id);
      const thid_preparedObjects = thirdObjects['Масив елементів четвертого рівня'];
      const fourthObjects = thid_preparedObjects.find((object) => object['Четвертий рівень'] == fourth_id);
      if (fourthObjects) {
        res.json(fourthObjects);
      } else {
        res.json({ message: 'Object not found' });
      }
    });
});


// POST
router.post('/post_firstLevel', (req, res) => {
  const newItem = req.body;
  // console.log(newItem)
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const existingItem = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);

    if (existingItem) {
      res.status(409).json({ message: 'Item already exists' });
    }else if (newItem['Другий рівень'] !== "" || newItem['Третій рівень'] !== "" || newItem['Четвертий рівень'] !== "") { 
        res.status(406).json({ message: 'Not Acceptable' });
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


router.post('/post_secondLevel', (req, res) => {
  const newItem = req.body;
  // console.log(newItem)
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const existingItem = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);
    // res.json(existingItem)
    if (!existingItem['Масив елементів другого рівня']) {
      existingItem['Масив елементів другого рівня'] = []; // Create an empty array
    }

    // existingItem['Масив елементів другого рівня'].push(newItem);
    // console.log(existingItem)
    // res.json(existingItem)
    if (!existingItem) {
      res.status(400).json({ message: 'Item already exists' });
    } else if (newItem['Другий рівень'] == ''){
      res.status(400).json({ message: 'This object doesen\'t have [\'Другий рівень\'] ' });
    }else if (newItem['Третій рівень'] !== "" || newItem['Четвертий рівень'] !== "") { 
        res.status(406).json({ message: 'Not Acceptable' });
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


router.post('/post_thirdLevel', (req, res) => {
  const newItem = req.body;
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_element = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);
    second_elements = first_element['Масив елементів другого рівня'];
    // res.json(seconds_element);
    second_element = second_elements.find((item) => item['Другий рівень'] == newItem['Другий рівень']);
    // res.json(second_element);
    if (!second_element['Масив елементів третього рівня']) {
      second_element['Масив елементів третього рівня'] = []; // Create an empty array
    }

    if (!second_element) {
      res.status(400).json({ message: 'Item already exists' });
    } else if (newItem['Третій рівень'] == ''){
      res.status(406).json({ message: 'This object doesen\'t have [\'Третій рівень\'] ' });
    }else if (newItem['Четвертий рівень'] !== "") { 
        res.status(406).json({ message: 'Not Acceptable' });
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


router.post('/post_fourthLevel', (req, res) => {
  const newItem = req.body;
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_element = items.find((item) => item['Перший рівень'] == newItem['Перший рівень']);
    second_elements = first_element['Масив елементів другого рівня'];
    second_element = second_elements.find((item) => item['Другий рівень'] == newItem['Другий рівень']);
    third_elements = second_element['Масив елементів третього рівня'];
    // res.json(third_elements);
    third_element = third_elements.find((item) => item['Третій рівень'] == newItem['Третій рівень']);
    // res.json(third_element);

    if (!third_element['Масив елементів четвертого рівня']) {
      third_element['Масив елементів четвертого рівня'] = []; // Create an empty array
    }
    if (!third_element) {
      res.status(400).json({ message: 'Item already exists' });
    } else if (newItem['Четвертий рівень'] == ''){
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


// PUT
router.put('/update_firstLevel/:first_id', (req, res) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    const items = JSON.parse(data);
    const first_id = req.params.first_id;
    const newItem = req.body;
    const first_object = items.find((item) => item['Перший рівень'] == first_id);
    first_object['Перший рівень'] = newItem['Перший рівень'];
    first_object['Другий рівень'] = newItem['Другий рівень'];
    first_object['Третій рівень'] = newItem['Третій рівень'];
    first_object['Четвертий рівень'] = newItem['Четвертий рівень'];
    first_object['Категорія'] = newItem['Категорія'];
    first_object['Назва об\'єкта українською мовою'] = newItem['Назва об\'єкта українською мовою'];

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


router.put('/update_secondLevel/:first_id/:second_id', (req, res) => {
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
    const first_object = items.find((item) => item['Перший рівень'] == first_id);
    second_elements = first_object['Масив елементів другого рівня'];
    // res.json(second_elements);
    second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
    // res.json(second_element);
    // second_element['Перший рівень'] = newItem['Перший рівень'];
    second_element['Другий рівень'] = newItem['Другий рівень'];
    second_element['Третій рівень'] = newItem['Третій рівень'];
    second_element['Четвертий рівень'] = newItem['Четвертий рівень'];
    second_element['Категорія'] = newItem['Категорія'];
    second_element['Назва об\'єкта українською мовою'] = newItem['Назва об\'єкта українською мовою'];

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


router.put('/update_thirdLevel/:first_id/:second_id/:third_id', (req, res) => {
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
    
        const first_object = items.find((item) => item['Перший рівень'] == first_id);
        second_elements = first_object['Масив елементів другого рівня'];
        second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
        third_elements = second_element['Масив елементів третього рівня'];
        third_element = third_elements.find((item) => item['Третій рівень'] == third_id);
    
        third_element['Третій рівень'] = newItem['Третій рівень'];
        third_element['Четвертий рівень'] = newItem['Четвертий рівень'];
        third_element['Категорія'] = newItem['Категорія'];
        third_element['Назва об\'єкта українською мовою'] = newItem['Назва об\'єкта українською мовою'];
        
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


router.put('/update_fourthLevel/:first_id/:second_id/:third_id/:fourth_id', (req, res) => {
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


// DELETE
router.delete('/delete_firstLevel/:first_id', (req, res) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    const items = JSON.parse(data);
    const first_id = req.params.first_id;
    // console.log(first_id)
    const itemIndexToDelete = items.findIndex((item) => item['Перший рівень'] == first_id);
    // console.log(itemIndexToDelete)
    if (itemIndexToDelete === -1) {
      // console.log(itemIndexToDelete)
      // Item not found
      res.status(404).json({ message: 'Object not found' });
      return;
    }

    new_items = items.filter((item, index) => index !== itemIndexToDelete);

      // Save the updated array back to the file
      fs.writeFile(filePath, JSON.stringify(new_items, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }
        res.json({ message: 'Object deleted successfully' });
      });
  });
});


router.delete('/delete_secondLevel/:first_id/:second_id', (req, res) => {
  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    const items = JSON.parse(data);
    const first_id = req.params.first_id;
    const second_id = req.params.second_id;


    const first_object = items.find((item) => item['Перший рівень'] == first_id);
    const second_elements = first_object['Масив елементів другого рівня'];
    const itemIndexToDelete = second_elements.findIndex((item) => item['Другий рівень'] == second_id);
    // const itemIndexToDelete = items.findIndex((item) => item['Перший рівень'] == first_id);
    // res.json({ message: 'element has founded' });
    console.log(itemIndexToDelete)

    if (itemIndexToDelete === -1) {
      // console.log(itemIndexToDelete)
      // Item not found
      res.status(404).json({ message: 'Object not found' });
      return;
    }
    second_elements.splice(itemIndexToDelete, 1);
    res.json(second_elements)
    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Object deleted successfully' });
    });
  });
});


router.delete('/delete_thirdLevel/:first_id/:second_id/:third_id', (req, res) => {
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

    const first_object = items.find((item) => item['Перший рівень'] == first_id);
    console.log(first_object)
    const second_elements = first_object['Масив елементів другого рівня'];
    // console.log(first_object)
    const second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
    const third_elements = second_element['Масив елементів третього рівня'];

    const itemIndexToDelete = third_elements.findIndex((item) => item['Третій рівень'] == third_id);

    if (itemIndexToDelete === -1) {
      res.status(404).json({ message: 'Object not found' });
      return;
    }

    third_elements.splice(itemIndexToDelete, 1);

    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Object deleted successfully' });
    });
  });
});


router.delete('/delete_fourthLevel/:first_id/:second_id/:third_id/:fourth_id', (req, res) => {
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

    const first_object = items.find((item) => item['Перший рівень'] == first_id);
    if (!first_object) {
      res.status(404).json({ message: 'Object not found1' });
      return;
    }

    const second_elements = first_object['Масив елементів другого рівня'];
    const second_element = second_elements.find((item) => item['Другий рівень'] == second_id);
    if (!second_element) {
      res.status(404).json({ message: 'Object not found2' });
      return;
    }

    const third_elements = second_element['Масив елементів третього рівня'];
    const third_element = third_elements.find((item) => item['Третій рівень'] == third_id);
    if (!third_element) {
      res.status(404).json({ message: 'Object not found3' });
      return;
    }

    const fourth_elements = third_element['Масив елементів четвертого рівня'];
    const itemIndexToDelete = fourth_elements.findIndex((item) => item['Четвертий рівень'] == fourth_id);
    if (itemIndexToDelete === -1) {
      res.status(404).json({ message: 'Object not found4' });
      return;
    }

    fourth_elements.splice(itemIndexToDelete, 1);

    fs.writeFile(filePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Object deleted successfully' });
    });
  });
});
  


module.exports = router;
