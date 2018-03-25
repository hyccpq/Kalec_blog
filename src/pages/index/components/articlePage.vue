<template>
<div>
  <div class="left-content" v-show="!onLoading">
    <Content>
      <Breadcrumb :style="{margin: '20px 0'}">
        <BreadcrumbItem><router-link to="/">HOME</router-link></BreadcrumbItem>
        <BreadcrumbItem><router-link to="/index">首页</router-link></BreadcrumbItem>
        <BreadcrumbItem>{{articleInfo.title}}</BreadcrumbItem>
      </Breadcrumb>
    </Content>
    <h1 class="article-title">{{articleInfo.title}}</h1>
    <div class="article-about">
      <div class="about-info"><Icon type="cube" class="about-info-icon"></Icon>{{articleInfo.classic}}</div>
      <div class="about-info"><Icon type="calendar" class="about-info-icon"></Icon>{{articleInfo.time}}</div>
      <ul class="about-info"><Icon type="ios-pricetags-outline" class="about-info-icon"></Icon>
         <li v-for="item in articleInfo.tag">
           <Tag :tag-name="item.tagName"></Tag>
         </li>
      </ul>
    </div>
    <article-toggle class="new-toggle"></article-toggle>
    <div>

      <article id="page-view" class="markdown-body"
               v-html="articleInfo.content" ref="post" v-highlight>

      </article>
      <comment-list :article-info="articleInfo"></comment-list>
    </div>
  </div>
</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
  import articleToggle from './plug/articleToggle'
  import commentList from './plug/commentModule/commentList'
  import { Breadcrumb,BreadcrumbItem,Icon } from 'iview'
  import Tag from './plug/Tag'
  export default {
		name: "article-page",
    components:{
      articleToggle,
      commentList,
      Breadcrumb,BreadcrumbItem,Icon,Tag
    },
    data(){
		  return {
        toggle:[]
      }
    },
    computed:{
      ...mapState({
        articleInfo: state => state.articleInfo,
        onLoading: state => state.onLoading
      })
    },
    methods: {
      ...mapActions([
        'getArticleList'
      ]),
      createToggle(){
        this.$nextTick(() => {
          const self = this;
          Array.from(self.$refs.post.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((value, index) => {
            this.toggle.push({
              tagName: value.tagName,
              text: '•\n'+value.innerText,
              href: `#${value.localName}-${index}`,
            })
          })
        })
      }
    },
    beforeMount(){
		  const self = this;
		  if(this.articleInfo.id == this.$route.params.id){
		    this.createToggle();
		    this.$store.commit('getToggle', this.toggle);
        return;
      }
      this.$store.commit('showLoading');
      this.getArticleList(`${self.$route.params.id}`).then(
        () => {
          this.createToggle();
          this.$store.commit('getToggle', this.toggle);
          this.$store.commit('showLoading');
        }
      );
		},
    preFetch(store){
		  return store.dispatch('getArticleList',store.state.route.params.id);
    }
	}
</script>

<style lang="stylus">
  @import "../assets/css/solarized-light.css"
  @import "../assets/css/markdown.css"
</style>

<style scoped lang="stylus">

.left-content
  .article-title
    padding 10px 0
    border-bottom 1px solid #f0e5e7
  .article-about
    margin 10px 0
    .about-info
      display flex
      padding 2px
      align-items center
      .about-info-icon
        margin-right 10px
</style>
