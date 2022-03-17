const { Router } = require('express');
const router = Router();

const notesCtrl = require ('../controllers/notes.controllers')

//mew Note
router.get('/notes/add', notesCtrl.renderNotesForm);

router.post('/notes/new-note', notesCtrl.createNewNote);

//get all note
router.get('/notes', notesCtrl.renderNotes);

//Edit Notes
router.get('/notes/edit/:id', notesCtrl.renderEditForm)

router.put('/notes/edit/:id', notesCtrl.updateNotes)

//delete notes
router.delete('/notes/delete/:id', notesCtrl.deleteNotes)

module.exports = router