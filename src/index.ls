scene = new THREE.Scene
camera = new THREE.PerspectiveCamera 75, window.innerWidth / window.innerHeight, 0.1, 1000
renderer = new THREE.WebGLRenderer
geometry = new THREE.BoxGeometry 1, 1, 1
material = new THREE.MeshMasicMaterial { color: 0x00FF00 }

console.log "Hello, World"

mesh = new THREE.Mesh geometry, material

scene.add mesh

render.setPixelRatio window.devicePixelRatio
render.setSize window.innerWidth, window.innerHeight

document.body.appendChild renderer.domElement

window.addEventListener \resize, resize, false

animate

resize = !->
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix

    renderer.setSize window.innerWidth, window.innerHeight

animate = !->
    requestAnimateFrame animate

    mesh.rotation.x += 0.1
    mesh.rotation.y += 0.1

    renderer.render scene, camera
