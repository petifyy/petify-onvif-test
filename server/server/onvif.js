
const onvif = require('onvif')

function buscarCameras() {
  return new Promise((resolve, reject) => {
    const cameras = []
    const discovery = onvif.Discovery

    const temporizador = setTimeout(() => {
      discovery.removeListener('device', receberCamera)
      discovery.removeListener('error', receberErro)
      resolve(cameras)
    }, 5000)

    function receberCamera(camera) {
      const endereco = camera.address || camera.hostname

      if (endereco && !cameras.some(item => item.endereco === endereco)) {
        cameras.push({
          nome: camera.name || 'Câmera ONVIF',
          endereco
        })
      }
    }

    function receberErro(erro) {
      clearTimeout(temporizador)
      discovery.removeListener('device', receberCamera)
      discovery.removeListener('error', receberErro)
      reject(erro)
    }

    discovery.on('device', receberCamera)
    discovery.on('error', receberErro)
    discovery.probe()
  })
}

module.exports = { buscarCameras }
