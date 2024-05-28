const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb://localhost:27017/realestate';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const homeSchema = new mongoose.Schema({
    title: String,
    rooms: Number,
    kitchen: Number,
    bathrooms: Number,
    price: Number,
    description: String,
    image_url: String
});
const Home = mongoose.model('Home', homeSchema);

app.get('/api/homes', async (req, res) => {
    try {
        const homes = await Home.find();
        res.json(homes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/homes/:id', async (req, res) => {
    try {
        const home = await Home.findById(req.params.id);
        if (!home) {
            return res.status(404).json({ error: 'Home not found' });
        }
        res.json(home);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/homes', async (req, res) => {
    try {
        const newHome = new Home(req.body);
        await newHome.save();
        res.status(201).json({ success: true, message: 'Property added successfully', home: newHome });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
