const mongoose = require('mongoose')
const Titulo = require('../models/titulo')

const getAll = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio')
  res.status(200).json(titulos)
}

const findByIdTitulo = async (req, res) => {
  try{

    const  idRequerido = req.params.id

    const titulo = await Titulo.findById(idRequerido)
    
    if (titulo == null){
      return res.status(404).json({message: "titulo  não encontrado"})
    }
    res.status(200).json({titulo})
}catch (err){
  res.status(400).json({ message: err.message})
}
}

const getAllPixar = async (req, res) =>{
const titulos = await Titulo.find().populate('estudio')
const titulosFiltrados = titulos.filter(titulo => titulo.estudio.nome == "Pixar")
res.json(titulosFiltrados)
}

const getAllMarvel = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio')
  const titulosFiltrados = titulos.filter(titulo => titulo.estudio.nome = "Marvel")
  res.json(titulosFiltrados)
}

const getAllGhibli = async (req, res) => {
  const titulos = await Titulo.find().populate('estudio')
  const titulosFiltrados = titulos.filter(titulo => titulo.estudio.nome = "Ghibli")
  res.json(titulosFiltrados)
}

const createTitle = async (req, res) => {
  const titulo = new Titulo({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm
  })
  //TODO : criar validação se filme já existe
  const tituloJaExiste = await Titulo.findOne({nome: req.body.nome})
  if (tituloJaExiste) {
    return res.status(409).json({error: 'Titulo ja cadastrado.'})
  }
  try {
    const novoTitulo = await titulo.save()
    res.status(201).json(novoTitulo)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}

const updateOneTitulo = async (req, res) => {
  try{
    const titulo = await Titulo.findById(req.params.id)
    if (titulo == null){
      return res.status(404).json({message: "Titulo  não encontrado"})
    }

    if (req.body.descricao != null){
      titulo.descricao = req.body.descricao
    }

    const tituloAtualizado = await titulo.save()
    res.status(200).json({tituloAtualizado})

  }catch (err){
    res.status(500).json({message: err.message})
  }
}

const updateAnythingTitulo = async (req, res) => {
  try{
    const titulo = await Titulo.findById(req.params.id)
    if (titulo == null){
      return res.status(404).json({message: "Titulo não encontrado"})
    }
    const updatedTitulo = req.body

    if (updatedTitulo != null){

      let keyList = Object.keys(updatedTitulo)
      keyList.forEach((conteudo) => {
        console.log('chave', conteudo);
        titulo[conteudo] = updatedTitulo[conteudo];
    });
    
    }
    const tituloAtualizado = await titulo.save()
    res.status(200).json({tituloAtualizado})


  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

const removeOneTitulo = async (req, res) => {
  try{
    const titulo = await Titulo.findById(req.params.id)
    if (titulo == null){
      return res.status(404).json({message: "Titulo  não encontrado"})
    }
    titulo.remove()
    res.status(200).json({"mensagem":"Titulo removido com sucesso"})

  }catch (err){
    res.status(500).json({message: err.message})
  }
}



module.exports = {
  getAll,
  getAllPixar,
  getAllMarvel,
  getAllGhibli,
  updateOneTitulo,
  updateAnythingTitulo,
  removeOneTitulo,
  findByIdTitulo,
  createTitle

}