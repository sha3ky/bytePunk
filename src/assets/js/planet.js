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
/*
// planet.js — Texto 3D simple que gira
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export function initPlanet(containerEl) {
  if (!containerEl) return () => {}

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(containerEl.offsetWidth, containerEl.offsetHeight)
  containerEl.appendChild(renderer.domElement)

  // Scene
  const scene = new THREE.Scene()

  // Cámara perspectiva básica
  const camera = new THREE.PerspectiveCamera(
    45,
    containerEl.offsetWidth / containerEl.offsetHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 0, 5)
  camera.lookAt(0, 0, 0)

  // Luz
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(2, 2, 5)
  scene.add(light)

  let textMesh = null

  // Fuente + texto
  const loader = new FontLoader()
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const geo = new TextGeometry('bytePunk', {
      font,
      size: 1, // tamaño frontal
      height: 0.1, // grosor
      curveSegments: 12,
    })
    geo.center()

    const mat = new THREE.MeshStandardMaterial({ color: 0xffff00 })
    textMesh = new THREE.Mesh(geo, mat)
    scene.add(textMesh)
  })

  // Resize handler
  const onResize = () => {
    const w = containerEl.offsetWidth
    const h = containerEl.offsetHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)

  // Animación
  let stopped = false
  const animate = () => {
    if (stopped) return
    requestAnimationFrame(animate)

    if (textMesh) {
      textMesh.rotation.y += 0.01
    }

    renderer.render(scene, camera)
  }
  animate()

  // Cleanup
  return () => {
    stopped = true
    window.removeEventListener('resize', onResize)
    renderer.dispose()
    containerEl.innerHTML = ''
  }
}
 */

// planet.js — Planeta futurista neon cyberpunk
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function initPlanet(containerEl) {
  if (!containerEl) return () => {}

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(containerEl.offsetWidth, containerEl.offsetHeight)
  containerEl.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    60,
    containerEl.offsetWidth / containerEl.offsetHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 0, 5)

  // Luces fuertes estilo neon
  const ambient = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambient)

  const light1 = new THREE.PointLight(0x00ffff, 3, 50)
  light1.position.set(5, 5, 5)
  scene.add(light1)

  const light2 = new THREE.PointLight(0xff00ff, 3, 50)
  light2.position.set(-5, -5, -5)
  scene.add(light2)

  // Geometría planeta
  const geometry = new THREE.SphereGeometry(1, 128, 128)

  // Material base con neon
  const material = new THREE.MeshStandardMaterial({
    color: 0x111122,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x220044,
    emissiveIntensity: 2.0,
  })
  const planet = new THREE.Mesh(geometry, material)
  scene.add(planet)

  // Wireframe de circuitos (más fuerte)
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  })
  const planetWire = new THREE.Mesh(geometry, wireMaterial)
  scene.add(planetWire)

  // Aura (más intensa y grande)
  // --- Aura (más sutil) ---
  const glowGeo = new THREE.SphereGeometry(1.2, 64, 64) // apenas más grande que el planeta
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    transparent: true,
    opacity: 0.3, // mucho más baja
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
  const glow = new THREE.Mesh(glowGeo, glowMat)
  scene.add(glow)

  // Controles
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.5

  controls.enableDamping = false
  controls.enableZoom = false
  controls.enableRotate = false // 👈 bloquea rotación manual
  controls.enablePan = false // 👈 bloquea pan

  // extra: anula botones y gestos táctiles
  controls.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }
  controls.touches = { ONE: null, TWO: null }

  // Resize
  /*   const onResize = () => {
    const w = containerEl.offsetWidth
    const h = containerEl.offsetHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize) */

  // Animación
  let stopped = false
  const animate = () => {
    if (stopped) return
    requestAnimationFrame(animate)

    planet.rotation.y += 0.003
    planetWire.rotation.y += 0.003
    glow.rotation.y += 0.001

    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // ✅ Cleanup completo
  return function destroy() {
    stopped = true
    /*     window.removeEventListener('resize', onResize)
     */ controls.dispose()

    geometry.dispose()
    material.dispose()
    wireMaterial.dispose()
    glowGeo.dispose()
    glowMat.dispose()

    renderer.dispose()
    containerEl.innerHTML = ''
  }
}
