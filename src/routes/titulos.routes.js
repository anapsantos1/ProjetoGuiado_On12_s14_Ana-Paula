const express = require('express')
const router = express.Router()
const controller = require('../controllers/tituloController')

//listar todos os titulos/get/find

router.get('/pixar', controller.getAllPixar)
router.get('/marvel', controller.getAllMarvel)
router.get('/ghibli', controller.getAllGhibli)
router.get('/', controller.getAll)

//criar um novo titulo/post/save
router.post('/', controller.createTitle)

//listar um titulo/get/findById
router.get('/:id', controller.findByIdTitulo)

//atualizar uma informacao especifica num titulo/patch/findById/save
router.patch('/:id', controller.updateOneTitulo)
router.patch('/anything/:id', controller.updateAnythingTitulo)

//deletar um titulo/delete/findById/remove
router.delete('/:id', controller.removeOneTitulo)

module.exports = router