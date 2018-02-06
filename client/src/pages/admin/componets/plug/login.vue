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
  z-index: 1600;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.block {
  width: 300px;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2000;
}
.dialog-content {
  width: 300px;
  background: #fff;
  border: 1px solid #464068;
  border-radius: 10px;
  padding: 6%;
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
