<template>
    <!--<img src="./assets/logo.png">-->
    <transition name="main-animation">
      <router-view class="all-router"></router-view>
    </transition>
</template>

<script>

  import { BLOG_TITLE } from "../../utils/util";

  export default {
  	metaInfo:{
  		title: BLOG_TITLE
    },
    name: 'app',
  }
</script>

<style scoped lang="stylus">
/*.all-router*/
  /*position absolute*/
.main-animation-enter-active, .main-animation-leave-active
  transition all .3s
.main-animation-leave-to
  opacity: .2

</style>

<style lang="stylus">
@import "~nprogress/nprogress.css"

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

.anchor {
  display: block;
  position: relative;
  top: -60px;
  visibility: hidden;
}
.verify{
  width: 18px;
  height: 18px;
  background: url("./assets/svg/verify.svg");
  background-size: 100%;
}
.touch-move {
  overflow: hidden;
}
//html{
//  scroll-behavior: smooth;
//  -webkit-overflow-scrolling: touch;
//  overflow-x: hidden;
//}
html,body,#app {
  height: 100%;
  width: 100%;
}
</style>
