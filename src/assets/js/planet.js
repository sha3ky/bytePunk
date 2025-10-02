/* // planet.js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function initPlanet(containerEl) {
  if (!containerEl) return () => {}

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(containerEl.offsetWidth, containerEl.offsetHeight)
  containerEl.appendChild(renderer.domElement)

  // Scene & Camera
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    containerEl.offsetWidth / containerEl.offsetHeight,
    0.1,
    1000,
  )
  camera.position.z = 3

  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5, 5, 5)
  scene.add(light)

  // Planet
  const geometry = new THREE.SphereGeometry(1, 64, 64)
  const texture = new THREE.TextureLoader().load(
    'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg',
  )
  const material = new THREE.MeshStandardMaterial({ map: texture })
  const planet = new THREE.Mesh(geometry, material)
  scene.add(planet)

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5

  // Handlers
  const onResize = () => {
    const w = containerEl.offsetWidth
    const h = containerEl.offsetHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  const onMouseDown = () => (controls.autoRotateSpeed = 3)
  const onMouseUp = () => (controls.autoRotateSpeed = 0.5)
  renderer.domElement.addEventListener('mousedown', onMouseDown)
  renderer.domElement.addEventListener('mouseup', onMouseUp)

  // Loop
  let stopped = false
  const animate = () => {
    if (stopped) return
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // Cleanup
  return function destroy() {
    stopped = true
    window.removeEventListener('resize', onResize)
    renderer.domElement.removeEventListener('mousedown', onMouseDown)
    renderer.domElement.removeEventListener('mouseup', onMouseUp)
    controls.dispose()
    geometry.dispose()
    material.dispose()
    texture.dispose?.()
    renderer.dispose()
    containerEl.innerHTML = ''
  }
}
 */

// planet.js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js' // Necesitamos un cargador de fuentes
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js' // Y la geometría de texto

export function initPlanet(containerEl) {
  if (!containerEl) return () => {}

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(containerEl.offsetWidth, containerEl.offsetHeight)
  containerEl.appendChild(renderer.domElement)

  // Scene & Camera
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    containerEl.offsetWidth / containerEl.offsetHeight,
    0.1,
    1000,
  )
  camera.position.z = 5 // Ajustamos la posición de la cámara para que quepa el texto

  // Lights (Ajustadas para un efecto dorado)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // Luz ambiental suave
  scene.add(ambientLight)

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight1.position.set(5, 5, 5)
  scene.add(directionalLight1)

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
  directionalLight2.position.set(-5, -5, -5)
  scene.add(directionalLight2)

  // --- TEXTO 3D EN VEZ DEL PLANETA ---
  const loader = new FontLoader()

  // Carga una fuente JSON. Aquí estoy usando una fuente de Three.js.
  // Es CRÍTICO que la ruta a la fuente sea correcta.
  // Si esta fuente no se carga, el texto no aparecerá.
  // Puedes descargar otras fuentes Three.js JSON o convertir tus propias TTF/OTF.
  // Sugiero colocar la fuente en tu carpeta 'public' o 'assets' y referenciarla adecuadamente.
  // Por ejemplo, si la pones en '/public/fonts/helvetiker_regular.typeface.json'
  loader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('bytePunk', {
      font: font,
      size: 1, // Tamaño del texto
      height: 0.2, // Profundidad del texto (extrusión)
      curveSegments: 12, // Suavidad de las curvas
      bevelEnabled: true, // Biselado (bordes redondeados)
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    })

    // Centrar la geometría del texto después de su creación
    textGeometry.center()

    // Material dorado
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700, // Color oro (hexadecimal)
      metalness: 0.9, // Muy metálico
      roughness: 0.4, // Algo de brillo, no un espejo perfecto
    })

    const bytePunkText = new THREE.Mesh(textGeometry, goldMaterial)
    scene.add(bytePunkText)

    // Ajustar el objeto para que rote (antes rotaban los controles, ahora rotará el texto)
    // No necesitamos controls.autoRotate si queremos rotar el texto directamente.
    // Esto es opcional, si quieres que el texto rote solo, sin mover la cámara automáticamente.
    // Si prefieres que la cámara rote alrededor del texto, puedes dejar los controles.
    // Para simplificar, haremos que el texto rote.

    // Controles (para que puedas manipularlo si quieres, pero lo haremos auto-rotar)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = false // Desactivamos la auto-rotación de los controles
    // controls.autoRotateSpeed = 0.5 // Esta ya no afectará al texto

    // Animación (ahora rotamos el texto)
    let stopped = false
    const animate = () => {
      if (stopped) return
      requestAnimationFrame(animate)

      // -----------------------------------------------------
      // FIX: USE THE VARIABLES HERE!
      // -----------------------------------------------------
      bytePunkText.rotation.y += textRotationSpeed
      bytePunkText.rotation.x += textRotationSpeedX

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handlers (ahora los botones para acelerar pueden no tener tanto sentido si rotamos el texto)
    // Los mantenemos pero se aplicarán a la cámara si usas autoRotate = true en controls
    // Si quieres que aceleren el texto, necesitarías una variable para la velocidad del texto.
    const onResize = () => {
      const w = containerEl.offsetWidth
      const h = containerEl.offsetHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // Si quieres que el texto acelere:
    let textRotationSpeed = 0.005
    let textRotationSpeedX = 0.001

    const onMouseDown = () => {
      textRotationSpeed = 0.03
      textRotationSpeedX = 0.005
    }
    const onMouseUp = () => {
      textRotationSpeed = 0.005
      textRotationSpeedX = 0.001
    }
    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mouseup', onMouseUp)

    // Cleanup
    return function destroy() {
      stopped = true
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('mousedown', onMouseDown)
      renderer.domElement.removeEventListener('mouseup', onMouseUp)
      controls.dispose()
      textGeometry.dispose()
      goldMaterial.dispose()
      renderer.dispose()
      containerEl.innerHTML = ''
    }
  }) // Fin del loader.load
}
