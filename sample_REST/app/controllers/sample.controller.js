const Sample = require('../models/sample.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
      if(!req.body.content) {
          return res.status(400).send({
              message: "Content can not be empty"
          });
      }

      // Create a Sample
      const note = new Sample({
          title: req.body.title || "Untitled Sample",
          content: req.body.content
      });

      // Save Sample in the database
      note.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Sample."
          });
      });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Sample.find()
      .then(notes => {
          res.send(notes);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving Sample."
          });
      });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Sample.findById(req.params.sampleId)
      .then(note => {
          if(!note) {
              return res.status(404).send({
                  message: "Sample not found with id " + req.params.sampleId
              });
          }
          res.send(note);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Sample not found with id " + req.params.sampleId
              });
          }
          return res.status(500).send({
              message: "Error retrieving Sample with id " + req.params.sampleId
          });
      });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Sample content can not be empty"
        });
    }

    // Find note and update it with the request body
    Sample.findByIdAndUpdate(req.params.sampleId, {
        title: req.body.title || "Untitled Sample",
        content: req.body.content
    }, {new: true})
    .then(sample => {
        if(!sample) {
            return res.status(404).send({
                message: "Sample not found with id " + req.params.sampleId
            });
        }
        res.send(sample);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sample not found with id " + req.params.sampleId
            });
        }
        return res.status(500).send({
            message: "Error updating Sample with id " + req.params.sampleId
        });
    });

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Sample.findByIdAndRemove(req.params.sampleId)
      .then(sample => {
          if(!sample) {
              return res.status(404).send({
                  message: "Sample not found with id " + req.params.sampleId
              });
          }
          res.send({message: "Sample deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Sample not found with id " + req.params.sampleId
              });
          }
          return res.status(500).send({
              message: "Could not delete sample with id " + req.params.sampleId
          });
      });
};
