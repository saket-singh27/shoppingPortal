const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


mongoose.connect('mongodb+srv://saketsingh:saket123@cluster0.5gqubm0.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const shoppingSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        unique : true,
        lowercase : true
      },
      description: {
        type : String,
        required : true,
        unique : true,
        lowercase : true
      },
      status: {
        type : String,
        required : true,
        unique : true,
        lowercase : true
      },
      createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{timestamp : true})


const Task = mongoose.model('Task', shoppingSchema);


app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Task not found' });
  }
});


app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Task not found' });
  }
});
app.get('/' ,(req,res)=>{
    res.render('index');
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});