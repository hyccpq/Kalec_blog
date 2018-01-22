<template>
  <div>
    <div class="dialog-warp">
      <div class="dialog-cover" v-if="isShowlog" @click="close"></div>
      <transition name="drop">
        <div class="block"  v-if="isShowlog">
          <div class="dialog-content">
            <p class="dialog-close" @click="close">X</p>
            <slot>空</slot>
          </div>
        </div>
      </transition>

    </div>

  </div>
</template>

<script>
  export default {
		name: "login",
    props:{
		  isShowlog:{
		    type: Boolean,
        default:false
      }
    },
    methods:{
		  close(){
		    this.$emit('onChange');
      }
    }
	}
</script>

<style scoped>
.drop-enter {
  transform: translateY(-500px);
}

.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .5s ease;
  transform: translateY(-500px);
}

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.block {
  width: 100%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  top: 20%;
  z-index: 10;
}
.dialog-content {
  width: 360px;
  background: #fff;
  border: 1px solid #464068;
  padding: 1%;
  line-height: 1.6;
  margin: 0 auto;
}
.dialog-close {
  text-align: right;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
