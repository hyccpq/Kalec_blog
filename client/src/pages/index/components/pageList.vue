<template>
  <div>
    <div >
      <i-content class="left-content">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem><router-link to="/">HOME</router-link></BreadcrumbItem>
          <BreadcrumbItem><span v-if="!isClassicOrTag">首页</span>
          <router-link v-if="isClassicOrTag" to="/index">首页</router-link>
          </BreadcrumbItem>
          <BreadcrumbItem v-if="isClassicOrTag">{{decodeURIComponent($route.path.split('/')[2])}}</BreadcrumbItem>
        </Breadcrumb>
        <div  v-for="(item,index) in articleList">
          <Card class="article-list"
                :style="{marginTop:index===0?'0px':'30px',marginBottom:'30px'}">
            <h2>{{item.title}}</h2>
            <span>发布时间：{{item.time}}</span>
            <p>{{item.intr}}......</p>
            <router-link :to="`/article/${item.id}`">
              <i-button type="primary" shape="circle">查看更多</i-button>
            </router-link>
          </Card>
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
  import { Button,Page,Card,Content,Breadcrumb,BreadcrumbItem } from 'iview'
  import '../assets/css/markdown.css'

  export default {
    name: "page-list",
    data(){
      return {
        listChange:true
      }
    },
    components:{
      iButton:Button,
      Page,
      Card,
      iContent:Content,
      Breadcrumb,
      BreadcrumbItem
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
      loadPage(){
        let classic = this.$route.params.class;
        let tag = this.$route.params.tag;
        this.$store.commit('showLoading');
        if(classic){
          this.$store.dispatch('getClassicList',{
            params:classic,
            page:this.$route.params.page-1
          })
            .then(()=>{
              this.$store.commit('showLoading');
            })
        } else if(tag) {
          this.$store.dispatch('getTagList',{
            params:tag,
            page:this.$route.params.page-1
          })
            .then(()=>{
              this.$store.commit('showLoading');
            })
        } else {
          console.log(this.$route.params.page-1);
          this.$store.dispatch('getIndexList',{
            page:this.$route.params.page-1
          })
            .then(()=>{
              this.$store.commit('showLoading');
            })
        }
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
        this.loadPage();
      }
    },
    mounted(){
      this.loadPage();
    }
  }
</script>

<style scoped lang="stylus">
.article-list
  width 100%
h2
  padding 20px 0
p
  padding 10px 0
.page-block
  display flex
  justify-content center


</style>
