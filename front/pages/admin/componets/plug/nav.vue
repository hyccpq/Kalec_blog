<template>
  <iMenu mode="horizontal" :theme="'dark'" id="nav" @on-select="onSelect">
    <iMenuItem name="-1" class="nav-menu-button">
      <Icon class="icon-menu" type="md-menu" size="30"></Icon>
    </iMenuItem>
    <iMenuItem name="0" class="nav-title">
      <div>冰空作品管理</div>
    </iMenuItem>
    <Row type="flex" justify="end" class="code-row-bg">
      <iMenuItem name="1" class="set-center">
        <Icon type="ios-home-outline"></Icon><span>{{username}},</span>登出
      </iMenuItem>
    </Row>
  </iMenu>
</template>

<script>
  import { Menu,Row,Icon,MenuItem,Submenu } from 'iview'
  import { mapState } from 'vuex'
  export default {
    name: "my-nav",
    components:{
      iMenu:Menu,
      Row,
      Icon,
      iMenuItem:MenuItem,
      Submenu
    },
    data () {
      return {
        username:localStorage.getItem('admin'),
        theme1: 'light',
      }
    },
    computed:{
      ...mapState({
        tagAndClassicList: state => state.tagAndClassicList.classic
      })
    },
    methods:{
      onSelect(name){
        if(name === '-1'){
          this.$emit('onChangeMenu');
        }
        console.log(name);
        if(name === '1'){
          this.$emit('onLogOut');
        }
      },
      open(){
        this.$emit('onChange');
      }
    }
  }
</script>

<style scoped lang="stylus">
#nav
  .nav-title
    height: 60px
    color: aqua
    font-size 16px
  .nav-menu-button
    display: none
@media screen and (max-width: 1023px)
  #nav
    display flex
    justify-content space-between
    align-items center
    .nav-menu-button
      display flex
      align-self center
    .set-center
      display block
      span
        display none
</style>
