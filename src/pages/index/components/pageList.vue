<template>
  <div>
    <div>
      <i-content class="left-content">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem><router-link to="/">HOME</router-link></BreadcrumbItem>
          <BreadcrumbItem><span v-if="!isClassicOrTag">首页</span>
          <router-link v-if="isClassicOrTag" to="/index">首页</router-link>
          </BreadcrumbItem>
          <BreadcrumbItem v-if="isClassicOrTag">
            {{decodeURIComponent($route.path.split('/')[2])}}
          </BreadcrumbItem>
        </Breadcrumb>
        <div  v-for="(item,index) in articleList">
          <div class="article-list"
                :style="{marginTop:index===0?'0px':'40px',marginBottom:'40px'}">
            <router-link :to="`/article/${item.id}`">
              <h2 class="article-title">{{item.title}}</h2>
            </router-link>
            <div class="article-time">
              <div class="icon"><Icon type="calendar" class="about-info-icon"></Icon>  {{item.time}}</div>
              <div class="icon icon-black"><Icon type="android-textsms"></Icon>  {{item.markNum}}</div>
            </div>

            <p class="article-summery">{{item.intr}}......</p>
            <router-link :to="`/article/${item.id}`">
              <span class="article-show">>继续阅读</span>
            </router-link>
            <div class="article-line" v-if="index===articleList.length - 1 ? false : true"></div>
          </div>
        </div>
        <div class="page-block">
          <Page :total="articleListNum" @on-change="onChange" :current="current" class="arcticle-page"></Page>
        </div>

      </i-content>

    </div>
    <!--<p>{{articleList}}</p>-->
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Page,Content,Breadcrumb,BreadcrumbItem,Icon } from 'iview'

  export default {
    name: "page-list",
    data(){
      return {
        listChange:true
      }
    },
    components:{
      Page,
      iContent:Content,
      Breadcrumb,
      BreadcrumbItem,
      Icon
    },
    methods:{
      // ...mapActions(['getIndexList'])
      onChange(page){
        let classic = this.$route.params.class;
        let tag = this.$route.params.tag;
        if(classic){
          this.$router.push({name: '文章类别列表',params:{page}});
        } else if(tag) {
          this.$router.push({name: '文章标签页',params:{page}});
        } else {
          this.$router.push({name: '主文章页面',params:{page}});
        }

      },
      loadPage(page=0,classic='',tag=''){
        this.$store.commit('showLoading');
        if(classic){
          this.$store.dispatch('getClassicList',{
            params:classic,
            page
          })
            .then(()=>{
              this.$store.commit('showLoading');
            })
        } else if(tag) {
          this.$store.dispatch('getTagList',{
            params:tag,
            page
          })
            .then(()=>{
              this.$store.commit('showLoading');
            })
        } else {
          this.$store.dispatch('getIndexList',{
            page
          })
            .then(()=>{
              this.$store.commit('showLoading');
            })
        }
      },
      updateTitle(){
        document.title = `冰空的作品展示 -
        ${ this.$route.params.class || this.$route.params.tag
          ? this.$route.params.class || this.$route.params.tag
          : '文章'}
          第
        ${ this.$route.params.page } 页`
      }
    },
    computed:{
      ...mapState({
        articleList: state => state.indexPageList.articleList,
        articleListNum: state => state.indexPageList.allArticleList,
        current: state => state.indexPageList.currentPage?state.indexPageList.currentPage+1:1
      }),
      isClassicOrTag(){
        let listType=this.$route.path.split('/')[1];
        return listType==='classic'||listType==='tag';
      }
    },
    watch:{
      articleList(){
        this.listChange = true;
      },
      '$route'(to,from){
        this.updateTitle()
        let self = this
        this.loadPage(self.$route.params.page-1,self.$route.params.class,self.$route.params.tag);
      }
    },
    beforeMount(){
      let self = this
      this.loadPage(self.$route.params.page-1,self.$route.params.class,self.$route.params.tag);
    },
    mounted() {
      this.updateTitle()
    },
    preFetch(store) {
      let classic = store.state.route.params.classic;
      let tag = store.state.route.params.tag;
      let page = store.state.route.params.page-1;
        if(classic){
          return store.dispatch('getClassicList',{
            params:classic,
            page
          })
        } else if(tag) {
          return store.dispatch('getTagList',{
            params:tag,
            page
          })
        } else {
          return store.dispatch('getIndexList',{
            page
          })
        }
    },
  }
</script>

<style scoped lang="stylus">
.article-list
  width 100%
  .article-title
    padding 20px 0
    font-size 1.6em
  .article-summery
    padding 10px 0
    font-size 1.2em
    line-height 26px
  .article-time
    color: #727272
    .icon
      display inline-block
    .icon-black
      padding-left 16px
  .article-show
    color #4755f0
    font-size 1.2em
    padding-top 20px
  .article-line
    width: 200px
    height: 0
    margin-top 40px
    border 1px solid #e1e1e1
.page-block
  display flex
  justify-content center


</style>
