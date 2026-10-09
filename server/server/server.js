const express = require('express')
const cors = require('cors')
const { buscarCameras } = require('./onvif')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    projeto: 'Petify ONVIF',
    status: 'Servidor funcionando'
  })
})

app.get('/cameras/buscar', async (req, res) => {
  try {
    const cameras = await buscarCameras()

    res.json({
      quantidade: cameras.length,
      cameras
    })
  } catch (erro) {
    console.error('Erro ao buscar câmeras:', erro.message)

    res.status(500).json({
      erro: 'Não foi possível procurar câmeras ONVIF.'
    })
  }
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Petify ONVIF iniciado na porta 3000')
})
