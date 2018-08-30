<template>
    <div>
        <h1 class="markList-title">{{articleInfo.title}}的留言管理&站长回复</h1>
        <ul id="markList-view">
            <li v-if="!articleInfo.markList.length" class="none-mark-view">暂时没有留言</li>
            <li v-for="(value,key) in articleInfo.markList" class="mark-view" :key="key+value">
                <div class="mark-name-floor">
                    <div class="mark-view-name">
                        <span v-text="value.userName"></span>
                        {{value.userEmail ? `(邮箱：${value.userEmail})` : ''}} 说：
                    </div>
                    <div class="mark-view-floor">第<span>{{key+1}}</span>楼</div>
                </div>
                <p v-text="value.markContent" class="mark-view-content"></p>
                <div class="mark-time-reply">
                    <div v-text="$formatTime(value.markTime)" class="mark-view-time"></div>|
                    <div><a href="javascript:void(0)" @click="addReply(key,articleInfo.markList.length)">回复</a></div>|
                    <div><a href="javascript:void(0)" @click="deleteReply(key)">删除</a></div>
                </div>
                <ul class="mark-view-reply" v-if="!!value.replyList.length||isShowReply[key]">
                    <li class="reply-view" v-for="(item,i) in value.replyList" :key="i+item">
                        <div class="reply-view-name">
                            <span v-text="item.replyName"></span>
                            {{item.replyEmail ? `(邮箱：${item.replyEmail})` : ''}}回复：
                        </div>
                        <p v-text="item.replyContent" class="mark-view-content"></p>
                        <div class="mark-time-reply">
                            ----<div v-text="$formatTime(item.replyTime)" class="mark-view-time"></div>|
                            <div><a href="javascript:void(0)" @click="deleteReply(i,value.userName,key)">删除</a></div>
                        </div>
                        <hr style="border:1px dashed #b3b9c6" v-if="i!==value.replyList.length-1">
                    </li>

                    <comment :article-id="articleInfo._id"
                             :mark-id="value._id"
                             :mark-name="value.userName"
                             @updateReply="updateReply"
                             v-if="isShowReply[key]" key="reply">
                    </comment>
                </ul>
            </li>
        </ul>
        <comment :article-id="articleInfo._id" @updateComment="updateComment"></comment>
    </div>
</template>

<script>
	import { mapState,mapActions } from 'vuex'
	import comment from './plug/comment'
	export default {
		name: "commentList",
		components:{
			comment
		},
		data(){
			return {
				isShowReply:[],
				currentKey:0,
                articleInfo: {
					markList: []
                }
			}
		},
		computed:{
			// ...mapState({
			// 	articleInfo: state => state.articleInfo
			// })
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
			},
			deleteReply(num,isReply,key){
				if(isReply){
					this.removeSql('/admin/v0/deleteReply',{
						id:this.$route.params.id,
						markId:this.articleInfo.markList[key]._id,
						replyId:this.articleInfo.markList[key].replyList[num]._id
					}).then(status => {
						if(status === 1){
							this.articleInfo.markList[key].replyList.splice(num,1)
                        }
                    })
				} else {
					this.removeSql('/admin/v0/deleteMark',{
						id:this.$route.params.id,
						markId:this.articleInfo.markList[num]._id
					}).then(status => {
						console.log(status);
						if(status === 1) {
							this.articleInfo.markList.splice(num,1)
                        }
                    })
				}
			},
			removeSql(url,params){
				return this.axios.delete(url,{
					params
				})
					.then(res => {
						if(res.data.status === 1){
							console.log(res.data.data);
							this.$Notice.success({
								title: res.data.msg
							})
						} else {
							this.$Notice.warning({
								title: res.data.msg
							})
						}
						return res.data.status
					}).catch(e=>{
						console.log(e);
					})
			},
		},
		mounted(){
			const self = this;
			// if(this.articleInfo._id === this.$route.params.id){
			// 	return;
			// }
			this.axios({
                url: '/admin/v0/searchOneComment',
				method: 'GET',
                params: {
					id: self.$route.params.id
                }
            }).then(res => {
            	if(res.data.status === 1) {
            		this.articleInfo = res.data.data
                }
            }).catch(e => {
            	console.log(e);
            })
			// this.getArticleList(`${self.$route.params.id}`)
		}
	}
</script>

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
