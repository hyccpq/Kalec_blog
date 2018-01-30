<template>
  <div id="home">
    <div></div>
    <div class="home-content">
      <div class="home-title">
        <h1>Kalec的个人网站</h1>
        <p>Kalec's Personal Website</p>
      </div>

      <ul class="home-content-center">
        <router-link to="/index"><li>》网络日志(Blog)</li></router-link>
        <li @click.naitve="onClickPt">》相册</li>
      </ul>

      <div class="home-content-bottom">
        <p>kalecgos.top</p><em>|</em><p class="contact">Contact</p>
      </div>

    </div>
    <my-footer class="footer"></my-footer>
  </div>
</template>

<script>
  import myFooter from './plug/footer'
	export default {
		name: "home",
    components:{
		  myFooter
    },
    methods:{
		  onClickPt(){
        this.$Notice.warning({
          title: '抱歉',
          desc: '施工中，敬请期待~'
        })
      }
    },
    mounted(){
      this.$Notice.config({
        top: 80,
        duration: 3
      });
    }
	}
</script>

<style scoped lang="stylus">
#home
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  width: 100%
  height: inherit
  background url("../assets/img/d.cfc8d05.jpg")
  color white
  text-align center
  .home-content
    width: 550px
    height: 350px
    background rgba(40, 40, 40, 0.31)
    border-radius 20px
    padding 10px 60px
    .home-title
      padding 20px 0
      border-bottom rgba(190, 190, 190, 0.5) solid 1px
      h1
        margin 5px
        font-family:Simsun
      h1:hover
        text-decoration underline
        text-shadow 5px 2px 6px #1b1f23
    .home-content-center
      mix-height 200px
      border-bottom rgba(190, 190, 190, 0.5) solid 1px
      padding 10px 0
      li
        height: 35px
        margin 25px 0
        background rgba(27, 31, 35, 0.61)
        border-radius 7px
        text-align left
        padding 0 20px
        line-height 35px
      li:hover
        background white
        color #1b1f23
        text-decoration underline

    .home-content-bottom
      padding 15px 0
      display flex
      flex-direction row-reverse
      text-align right
      p
        padding 0 5px
      .contact:hover
        background white
        color #1b1f23
        text-decoration underline
        border-radius 4px
  /*.footer*/
@media screen and (max-width: 550px)
  #home
    .home-content
      width 100%
      padding 10px 30px
      .home-content-center
        li
          height 48px
          line-height 48px
</style>
