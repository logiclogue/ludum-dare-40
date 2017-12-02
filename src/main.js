require! baconjs: Bacon
import \Grass

console.log(new Grass 1, 2);

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
renderer = new THREE.WebGLRenderer()
geometry = new THREE.BoxGeometry(1, 1, 1)

resize = !->
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

animate = !->
    mesh.rotation.x += 0.1
    mesh.rotation.y += 0.1
    mesh.position.z -= 0.1

    renderer.render(scene, camera)

console.log "Hello, World!!!"
material = new THREE.MeshBasicMaterial { color: 0x00FF00 }

mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener(\resize, resize, false)

updateStream = Bacon.interval(1000, "test")
animationStream = Bacon.fromBinder((sink) !->
    f = ->
        requestAnimationFrame(f)
        animate()
        sink("animate")

    f())

updateStream.onValue()
animationStream.onValue()
