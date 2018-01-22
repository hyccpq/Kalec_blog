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
         <li v-for="item in articleInfo.tag"><Tag type="dot" color="#5cadff">{{item.tagName}}</Tag></li>
      </ul>
    </div>
    <article-toggle class="new-toggle"></article-toggle>
    <div>

      <article id="page-view" class="markdown-body"
               v-html="articleInfo.content" ref="post">

      </article>
    </div>
  </div>

</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
  import articleToggle from './plug/articleToggle'
  import loading from './plug/Loading'
  import '../assets/css/markdown.css'
  export default {
		name: "article-page",
    components:{
      articleToggle
    },
    data(){
		  return {
        toggle:[],
      }
    },
    computed:{
      ...mapState({
        articleInfo: state => state.articleInfo,
        onLoading: state => state.onLoading
      })
    },
    methods:{
      ...mapActions([
        'getArticleList'
      ])
    },
    watch:{
		  onLoading(onLoading){
		    console.log('加载中'+onLoading);
      }
    },
    beforeCreate(){

		},
    mounted(){
		  const self = this;
		  if(this.articleInfo.id == this.$route.params.id){
        Array.from(self.$refs.post.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((value, index) => {
          value.id = `T-${value.localName}-${index}`;
          value.insertAdjacentHTML('beforebegin',`<a class="anchor" id="${value.localName}-${index}"></a>`);
        });
        return;
      }
      this.$store.commit('showLoading');
      this.getArticleList(`${self.$route.params.id}&auth1`).then(
        () => {
        this.$nextTick(() => {
          const self = this;
          Array.from(self.$refs.post.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((value, index) => {
            value.id = `T-${value.localName}-${index}`;
            value.insertAdjacentHTML('beforebegin',`<a class="anchor" id="${value.localName}-${index}"></a>`);
            this.toggle.push({
              tagName: value.tagName,
              text: value.innerText,
              href: `#${value.localName}-${index}`,
            })
          });
          this.$store.commit('getToggle',this.toggle)
          this.$store.commit('showLoading');

        });
      }
      );
		}
	}
</script>

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
