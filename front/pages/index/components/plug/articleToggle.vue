<template>
  <div id="toggle" v-if="hasToggle">
    <p class="toggle-name">文章目录</p>
    <!--<ul class="toggle-cat">-->
    <!--<li v-for="item in toggle" :class="`toggle-${item.tagName}`"><a :href="item.href">{{item.text}}</a>-->
    <!--{{item.href}}</li>-->
    <!--</ul>-->
    <section class="toggle-section">
      <Anchor show-ink :affix="false" :offset-top="0" :scroll-offset="0" class="toggle-cat">
        <AnchorLink v-for="(item, key) in toggle"
                    :class="`toggle-${item.tagName}`"
                    :href="item.href"
                    :title="item.text"
                    :key="key"></AnchorLink>
      </Anchor>
    </section>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Anchor, AnchorLink} from 'iview'

  export default {
    name: "article-toggle",
    components: {
      Anchor, AnchorLink
    },
    data () {
      return {
        // hasToggle:this.toggle.length!== 0
      }
    },
    computed: {
      ...mapState({
        toggle: state => state.toggle
      }),
      hasToggle () {
        return this.toggle.length !== 0;
      }
    },
  }
</script>

<style scoped lang="stylus">
  #toggle
    .toggle-name
      /*text-align center*/
      font-size 1.5em
      color #333333
      padding 10px 20px
      border-bottom 1px solid #f0e5e7
    .toggle-section
      padding 3px
      .toggle-cat
        padding 5px 0
        font-size 0.8rem
        .toggle-H1
          margin-left 10px
        .toggle-H2
          margin-left 25px
        .toggle-H3
          margin-left 40px
        .toggle-H4
          margin-left 55px
        .toggle-H5
          margin-left 70px
        .toggle-H6
          margin-left 85px
</style>
