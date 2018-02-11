<template>
  <div>
    <h2 class="markList-title">留言</h2>
    <ul id="markList-view">
      <li v-if="!articleInfo.markList.length" class="none-mark-view">暂时没有留言，来留下你的留言吧！</li>
      <transition-group name="markanimation" tag="li">
        <li v-for="(value,key) in articleInfo.markList" class="mark-view" :key="key+value">
          <div class="mark-name-floor">
            <div class="mark-view-name"><span v-text="value.userName"></span>说：</div>
            <div class="mark-view-floor">第<span>{{key+1}}</span>楼</div>
          </div>
          <p v-text="value.markContent" class="mark-view-content"></p>
          <div class="mark-time-reply">
            <div v-text="value.markTime" class="mark-view-time"></div>|
            <div><a href="javascript:void(0)" @click="addReply(key,articleInfo.markList.length)">回复</a></div>
          </div>
          <ul class="mark-view-reply" v-if="!!value.replyList.length||isShowReply[key]">
            <transition-group name="markanimation" tag="li">
              <li class="reply-view" v-for="(item,i) in value.replyList" :key="i+item">
                <div class="reply-view-name"><span v-text="item.replyName"></span>回复：</div>
                <p v-text="item.replyContent" class="mark-view-content"></p>
                <div class="mark-time-reply">
                  ----<div v-text="item.replyTime" class="mark-view-time"></div>
                </div>
                <hr style="border:1px dashed #b3b9c6" v-if="i!==value.replyList.length-1">
              </li>

              <comment :article-id="articleInfo.id"
                       :mark-id="value.markId"
                       :mark-name="value.userName"
                       @updateReply="updateReply"
                       v-if="isShowReply[key]" key="reply">
              </comment>
            </transition-group>
          </ul>
        </li>
      </transition-group>
    </ul>
    <comment :article-id="articleInfo.id" @updateComment="updateComment"></comment>
  </div>
</template>

<script>
  import comment from './comment'
	export default {
		name: "commentList",
    components:{
      comment
    },
    props:{
		  articleInfo:{
        default:{
          markList:[]
        },
        type:Object
      }
    },
    data(){
		  return {
        isShowReply:[],
        currentKey:0
      }
    },
    methods:{
		  updateComment(value){
        console.log(value);
        this.articleInfo.markList.push(value);
      },
      updateReply(value){
        this.articleInfo.markList[this.currentKey].replyList.push(value);
        this.addReply(this.isShowReply.length,this.currentKey);
      },
      addReply(key,len){
        this.isShowReply.length = len;
        if(key !== this.currentKey){
          this.isShowReply.fill(false);
          this.currentKey = key;
        }
        this.$set(this.isShowReply,key,!this.isShowReply[key]);
      }
    },
	}
</script>

<style scoped>
.markanimation-enter-active, .list-leave-active{
  transition: all .6s;
}
.markanimation-enter, .list-leave-to{
  transform: translateX(-50px);
  opacity: 0;
}
</style>
<style scoped lang="stylus">
  .markList-title
    margin-top 40px
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
