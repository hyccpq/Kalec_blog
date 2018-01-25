<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
  import admin from './componets/admin'
	export default {
		name: "app",
    components:{
		  admin
    }
	}
</script>

<style>
html,body,#app{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
  .content-input-wrapper{
    overflow: auto;
  }
</style>
