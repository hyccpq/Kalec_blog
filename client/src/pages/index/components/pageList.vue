<template>
  <div>
    <div >
      <Content class="left-content">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem><router-link to="/">HOME</router-link></BreadcrumbItem>
          <BreadcrumbItem>首页</BreadcrumbItem>
        </Breadcrumb>
        <div  v-for="(item,index) in articleList">
          <Card class="article-list"
                :style="{marginTop:index===0?'0px':'30px',marginBottom:index===articleList.length-1?'0px':'30px'}">
            <h2>{{item.title}}</h2>
            <span>发布时间：{{item.time}}</span>
            <p>{{item.intr}}......</p>
            <router-link :to="`/article/${item.id}`">
              <Button type="primary" shape="circle">查看更多</Button>
            </router-link>
          </Card>
        </div>
        <Page :total="articleListNum" @on-change="onChange" :current="current"></Page>
      </Content>

    </div>
    <!--<p>{{articleList}}</p>-->
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "page-list",
    data(){
      return {

      }
    },
    methods:{
      // ...mapActions(['getIndexList'])
      onChange(page){
        this.$store.commit('showLoading');
        let data = new Date();
        // console.log(page);
        this.$router.push({path:`/index?第${page}页`});
        this.$store.dispatch('getIndexList',page-1)
          .then(()=>{
          this.$store.commit('showLoading');
        })
      }
    },
    computed:{
      ...mapState({
        articleList: state => state.indexPageList.articleList,
        articleListNum: state => state.indexPageList.allArticleList,
        current: state => state.indexPageList.currentPage?state.indexPageList.currentPage+1:1
      })
    },
    mounted(){
      if(!this.articleList){
        this.$store.commit('showLoading');
        this.$store.dispatch('getIndexList')
          .then(()=>{
            this.$store.commit('showLoading');
          })
      }

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


</style>
