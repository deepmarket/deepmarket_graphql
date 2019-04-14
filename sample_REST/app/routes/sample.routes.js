module.exports = (app) => {
    const sample = require('../controllers/sample.controller.js');

    // Create a new Note
    app.post('/sample', sample.create);

    // Retrieve all Notes
    app.get('/sample', sample.findAll);

    // Retrieve a single Note with noteId
    app.get('/sample/:sampleId', sample.findOne);

    // Update a Note with noteId
    app.put('/sample/:sampleId', sample.update);

    // Delete a Note with noteId
    app.delete('/sample/:sampleId', sample.delete);
}
