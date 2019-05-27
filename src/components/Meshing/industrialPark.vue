<template>
  <div class='contain'>
    <div class='mask-disc-circle'></div>
    <div class='mask-line-circle'></div>
    <div id='container'>
    </div>
  </div>
</template>
<script>
import '@/assets/css/Meshing/industrialPark.css'
import * as THREE from 'three'
import pic from '@static/img/earth.png'
export default {
  name: 'IndustrialPark',
  methods: {
    init () {
      var container, loader
      var camera, scene, renderer
      var earth, width, height
      // 获取画布的宽
      width = document.getElementById('container').clientWidth
      // 获取画布的高
      height = document.getElementById('container').clientHeight
      container = document.getElementById('container')
      // renderer
      renderer = new THREE.WebGLRenderer({ alpha: true })
      renderer.setClearColor(0xffffff, 0)
      renderer.setSize(width, height)
      container.appendChild(renderer.domElement)
      // camera
      camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 700
      scene = new THREE.Scene()

      loader = new THREE.TextureLoader()
      loader.load(pic, function (texture) {
        var geometry = new THREE.SphereGeometry(200, 20, 20)
        var material = new THREE.MeshBasicMaterial({
          map: texture,
          overdraw: 0.5
        })
        earth = new THREE.Mesh(geometry, material)
        scene.add(earth)
        scene.rotation.y = THREE.Math.degToRad(170)
        scene.rotation.x = 0.4
        render()
      })

      function render () {
        requestAnimationFrame(render)
        scene.rotation.y += 0.005
        renderer.render(scene, camera)
      }
    }
  },
  mounted () {
    this.init()
  }
}

</script>
