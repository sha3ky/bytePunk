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
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export function initPlanet(containerEl) {
  if (!containerEl) return () => {}

  // Variables para la velocidad de rotación
  let textRotationSpeed = 0.005
  let textRotationSpeedX = 0.001

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
  camera.position.z = 5

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight1.position.set(5, 5, 5)
  scene.add(directionalLight1)

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
  directionalLight2.position.set(-5, -5, -5)
  scene.add(directionalLight2)

  // Controles
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = false
  controls.autoRotate = false

  // Variable para el objeto de texto (se inicializará dentro del callback)
  let bytePunkText = null

  // --- CARGA Y CREACIÓN DEL TEXTO 3D ---
  const loader = new FontLoader()

  loader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
    // Todo este código solo se ejecuta cuando la fuente está cargada.
    const textGeometry = new TextGeometry('bytePunk', {
      font: font,
      size: 0.5, // Reducir un poco el tamaño
      height: 0.1, // Reducir la profundidad
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01, // Reducir el biselado
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 5,
    })

    // Centrar la geometría es clave para la rotación y el posicionamiento
    textGeometry.center()

    // Material dorado
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.4,
    })

    // Asignamos el objeto a la variable del ámbito superior
    bytePunkText = new THREE.Mesh(textGeometry, goldMaterial)
    scene.add(bytePunkText)
  }) // Fin del loader.load

  // Handlers
  const onResize = () => {
    const w = containerEl.offsetWidth
    const h = containerEl.offsetHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

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

  // Loop (Animación)
  let stopped = false
  const animate = () => {
    if (stopped) return
    requestAnimationFrame(animate)

    // Solo rota el texto si ya se ha cargado y existe (es decir, no es null)
    if (bytePunkText) {
      bytePunkText.rotation.y += textRotationSpeed
      bytePunkText.rotation.x += textRotationSpeedX
    }

    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // Cleanup (Nota: Debes asegurarte de que los materiales y geometrías sean accesibles aquí si los usas)
  return function destroy() {
    stopped = true
    window.removeEventListener('resize', onResize)
    renderer.domElement.removeEventListener('mousedown', onMouseDown)
    renderer.domElement.removeEventListener('mouseup', onMouseUp)
    controls.dispose()
    // Los siguientes solo se deben llamar si el objeto de texto fue creado
    if (bytePunkText) {
      bytePunkText.geometry.dispose()
      bytePunkText.material.dispose()
    }
    renderer.dispose()
    containerEl.innerHTML = ''
  }
}
