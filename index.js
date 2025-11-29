const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/info', (req, res) => {
    res.json({
        app: 'Deploy Test Application',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        node_version: process.version
    });
});

app.get('/api/greet/:name', (req, res) => {
    const name = req.params.name;
    res.json({
        message: `Hello, ${name}! Welcome to Azure App Service.`,
        timestamp: new Date().toISOString()
    });
});

app.post('/api/echo', (req, res) => {
    res.json({
        received: req.body,
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
