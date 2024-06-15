const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

// In-memory array to store stock items
let stock = [{ id: 1, item: 'Milho', quantity: 100 }];

// CREATE
app.post('/stock', (req, res) => {
  const { item, quantity } = req.body;
  const newStockItem = {
    id: stock.length + 1,
    item,
    quantity,
  };

  stock.push(newStockItem);
  res.status(201).send(newStockItem);
});

// READ
app.get('/stock', (req, res) => {
  res.status(200).send(stock);
});

app.get('/stock/:id', (req, res) => {
  const stockItem = stock.find((s) => s.id === parseInt(req.params.id));
  if (!stockItem) return res.status(404).send('Item not found');
  res.send(stockItem);
});

// UPDATE
app.put('/stock/:id', (req, res) => {
  const stockItem = stock.find((s) => s.id === parseInt(req.params.id));
  if (!stockItem) return res.status(404).send('Item not found');

  const { quantity } = req.body;

  const updatedStockItem = {
    ...stockItem,
    quantity,
  };

  stock = stock.map((s) => (s.id === stockItem.id ? updatedStockItem : s));

  res.send(stockItem);
});

// DELETE
app.delete('/stock/:id', (req, res) => {
  const stockItem = stock.find((s) => s.id === parseInt(req.params.id));
  if (!stockItem) return res.status(404).send('Item not found');

  stock = stock.filter((s) => s.id !== parseInt(req.params.id));
  res.send(stockItem);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
