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
      <h2>留言</h2>
      <ul id="markList-view">
        <li v-if="!articleInfo.markList.length" class="none-mark-view">暂时没有留言，来留下你的留言吧！</li>
        <li v-for="(value,key) in articleInfo.markList" class="mark-view">
          <div class="mark-name-floor">
            <div class="mark-view-name"><span v-text="value.userName"></span>说：</div>
            <div class="mark-view-floor">第<span>{{key+1}}</span>楼</div>
          </div>
          <p v-text="value.markContent" class="mark-view-content"></p>
          <div class="mark-time-reply">
            <div v-text="value.markTime" class="mark-view-time"></div>|
            <div><a href="javascript:void(0)" @click="addReply(key,articleInfo.markList.length)">回复</a></div>
          </div>
          <ul class="mark-view-reply" v-if="value.replyList.length||isShowReply[key]">
            <li class="reply-view" v-for="(item,i) in value.replyList" >
              <div class="reply-view-name"><span v-text="item.replyName"></span>回复：</div>
              <p v-text="item.replyContent" class="mark-view-content"></p>
              <div class="mark-time-reply">
                ----<div v-text="value.markTime" class="mark-view-time"></div>
              </div>
              <hr style="border:1px dashed #b3b9c6" v-if="i!==value.replyList.length-1">
            </li>
            <comment :article-id="articleInfo.id"
                     :mark-id="value.markId"
                     :mark-name="value.userName"
                     @updateReply="updateReply"
                     v-if="isShowReply[key]">
            </comment>
          </ul>
        </li>
      </ul>
      <comment :article-id="articleInfo.id" @updateComment="updateComment"></comment>
    </div>
  </div>
</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
  import articleToggle from './plug/articleToggle'
  import comment from './plug/comment'
  import { Breadcrumb,BreadcrumbItem,Icon } from 'iview'
  import Tag from './plug/Tag'
  import 'highlight.js/styles/solarized-light.css'
  import '../assets/css/markdown.css'
  export default {
		name: "article-page",
    components:{
      articleToggle,
      comment,
      Breadcrumb,BreadcrumbItem,Icon,Tag
    },
    data(){
		  return {
        toggle:[],
        isShowReply:[],
        currentKey:0
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
      ]),
      updateComment(value){
        this.articleInfo.markList.push(value);
      },
      updateReply(value){
        this.articleInfo.markList[this.currentKey].replyList.push(value);
      },
      addReply(key,len){
        this.isShowReply.length = len;
        if(key !== this.currentKey){
          this.isShowReply.fill(false);
          this.currentKey = key;
        }
        this.$set(this.isShowReply,key,!this.isShowReply[key]);
        console.log(this.isShowReply);
      }
    },
    mounted(){
		  const self = this;
		  if(this.articleInfo.id == this.$route.params.id){
        return;
      }
      this.$store.commit('showLoading');
      this.getArticleList(`${self.$route.params.id}`).then(
        () => {
        this.$nextTick(() => {
          const self = this;
          Array.from(self.$refs.post.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((value, index) => {
            this.toggle.push({
              tagName: value.tagName,
              text: '•\n'+value.innerText,
              href: `#${value.localName}-${index}`,
            })
          });
          this.$store.commit('getToggle',this.toggle);
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
  #markList-view
    border-top 1px solid #ccd8f8
    margin 20px auto
    .none-mark-view
      padding 20px 10px
    .mark-view
      padding 20px 10px
      border-bottom 1px dashed #ccd8f8
      display flex
      flex-direction column
      .mark-name-floor
        display flex
        justify-content space-between
        .mark-view-name
          font-size 18px
          font-weight bolder
      .mark-view-content
        padding 10px 20px
      .mark-time-reply
        display flex
        justify-content flex-end
        font-size 14px
        >div
          padding 0 8px
      .mark-view-reply
        background #efefef
        padding 10px 20px
        border-radius 15px
        margin-left 50px
        .reply-view
          padding 5px 0
          .reply-view-name
            font-weight bold
</style>
