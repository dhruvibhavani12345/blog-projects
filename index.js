const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usermodel = require('./models/usermodel');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');



mongoose.connect('mongodb://localhost/movieSite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


  mongoose.connect('mongodb://localhost/movieSite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));


app.get('/', async (req, res) => {
  try {
    const movies = await usermodel.find();
    res.render('index', { movies });
  } catch (err) {
    console.log(err);
    res.send('Error fetching blog');
  }
});


app.get('/add', (req, res) => {
  res.render('add_blog');
});


app.post('/add', async (req, res) => {
  const { title, description, image } = req.body;
  
  try {
    const newMovie = new usermodel({ title, description, image });
    await newMovie.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send('Error adding blog');
  }
});


app.get('/edit/:id', async (req, res) => {
  try {
    const movie = await usermodel.findById(req.params.id);
    res.render('edit_blog', { movie });
  } catch (err) {
    console.log(err);
    res.send('Error fetching blog for editing');
  }
});


app.post('/edit/:id', async (req, res) => {
  const { title, description, image } = req.body;
  
  try {
    await usermodel.findByIdAndUpdate(req.params.id, { title, description, image });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send('Error updating blog');
  }
});

app.get('/delete/:id', async (req, res) => {
  try {
    await usermodel.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send('Error deleting blog');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
