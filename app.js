const express = require('express');
const app = express();

app.use(express.json());

// Mock data (replace with your own data source)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// GET /items - Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET /items/:id - Get a single item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
});

// POST /items - Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);

  res.status(201).json(newItem);
});

// PUT /items/:id - Update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  let foundItem = false;

  items = items.map(item => {
    if (item.id === itemId) {
      foundItem = true;
      return { ...item, ...updatedItem };
    }
    return item;
  });

  if (!foundItem) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(updatedItem);
});

// DELETE /items/:id - Delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const initialLength = items.length;

  items = items.filter(item => item.id !== itemId);

  if (items.length === initialLength) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.sendStatus(204);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
