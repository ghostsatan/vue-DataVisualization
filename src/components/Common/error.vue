<template>
  <div class="content">
    <div class="logo">
        <div class="hideCeng"></div>
    </div>
  </div>
</template>
<style scoped>
html,body,#app{
  width:100%;
  height: 100%;
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #5660D5;
}

.logo {
  position: absolute;
  width: 1200px;
  height: 800px;
  left: 50%;
  margin-left: -600px;
  top: 50%;
  margin-top: -400px;
  background-image: url(../../../static/img/error.gif);
  background-size: 100% 100%;
}
.hideCeng{
    width: 190px;
    height: 50px;
    position: absolute;
    left: 562px;
    background-color: #EDEEF4;
    top: 451px;
}
</style>
