import express from 'express';

const app = express();
app.use(express.json());

// In-memory "database" - simplest possible
let bugs = [];
let nextId = 1;

// Routes
app.get('/api/bugs', (req, res) => {
  res.json(bugs);
});

app.post('/api/bugs', (req, res) => {
  const bug = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description,
    status: 'open',
    createdAt: new Date()
  };
  bugs.push(bug);
  res.status(201).json(bug);
});

app.put('/api/bugs/:id', (req, res) => {
  const bug = bugs.find(b => b.id === parseInt(req.params.id));
  if (!bug) return res.status(404).json({ error: 'Bug not found' });
  
  bug.title = req.body.title || bug.title;
  bug.description = req.body.description || bug.description;
  bug.status = req.body.status || bug.status;
  
  res.json(bug);
});

app.delete('/api/bugs/:id', (req, res) => {
  const index = bugs.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Bug not found' });
  
  bugs.splice(index, 1);
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(5000, () => console.log('Server running on port 5000'));