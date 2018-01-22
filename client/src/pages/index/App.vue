<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->

    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style>
html, body, div, span, iframe,
/*h1, h2, h3, h4, h5, h6, p,*/
dl, dt, dd, ol, ul, li, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  font-size: 100%;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
.v-note-panel{
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
}
.my-nav{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
}
.anchor {
  display: block;
  position: relative;
  top: -60px;
  visibility: hidden;
}
html{
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
}
html,body,#app {
  height: 100%;
  width: 100%;
}
</style>
