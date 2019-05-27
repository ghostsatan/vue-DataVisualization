<template>
  <div id='app'>
    <Meshing></Meshing>
  </div>
</template>
<script>
import '@/assets/css/Meshing/common.css'
import Meshing from '@/components/Meshing/Meshing'
export default {
  name: 'app',
  components: {
    Meshing
  },
  created () {
  }
}
</script>
