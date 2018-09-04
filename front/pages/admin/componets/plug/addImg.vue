<style scoped lang="stylus">
.add-area
    height: 100%
    .add-button
        height 100%
        display flex
        flex-direction column
        justify-content center
        align-items center
    .add-update
        width: 600px;
        cursor default
        .update-list
            display flex
            .update-card
                font-size 12px
                position relative;
                .cover
                    position absolute
                    top 0
                    bottom 0
                    left 0
                    right 0
                    padding auto
                    text-align center
                    line-height 240px
                    font-size 30px
                    background-color: rgba(0, 0, 0, 0.73);
                    color #e6e6e6


</style>

<template>
    <section class="add-area">
        <div class="add-button" @click="openImgModal">
            <Icon type="md-add" size="64" />
            <div>添加照片</div>
        </div>

        <update-modal :is-showlog="isShowModal" @onChange="closeImgModal">
            <div class="add-update">
                <h3>添加照片</h3>
                <p>注意：填写完整信息后提交，若需单独修改，请提交后修改。</p>
                <imageUpdate @updateImageList="updateImageList"></imageUpdate>
                <ul class="update-list">
                    <li v-for="(item, index) in willUpdateImageList"
                        :key="index"
                        class="update-card"
                    >
                        <!--<img :src="" alt="" height="50" width="50">-->
                        <image-card :img-uri="item.localUrl"
                                :update-time="$formatTime(Date.now())"
                                :image-name="item.imageName"
                                :image-desc="item.imageDesc"
                        />
                        <div class="cover">{{item.percent}}%</div>
                    </li>
                </ul>
                <Button size="default" type="warning" @click="startUpdate">确定上传</Button>
                <Button size="default" style="margin-left: 8px" @click="closeImgModal">取消</Button>
            </div>

        </update-modal>

    </section>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import { Icon } from 'iview'
    import modal from './modal'
    import imageCard from './imageCard'
    import imageUpdate from './imageUpdate'
    import * as qiniu from 'qiniu-js'
    import nanoId from 'nanoid'
	export default {
		name: "galleryInfoPage",
        data() {
			return {
				files: '',
                willUpdateImageList: [],
                updateImagesInfo: [],
                isShowModal: false
            }
        },
        components: {
			imageUpdate,
            imageCard,
            Icon,
            updateModal: modal,
            imageDesc: '',
            imageName: ''
        },
        computed: {
            ...mapState({
                qiniuToken: state => state.qiniuToken,
            }),
        },
        methods: {
            ...mapActions(['getQiniuUpdateToken', 'postImagesList']),

            openImgModal () {
            	this.isShowModal = true
            },

            closeImgModal () {
            	this.willUpdateImageList = []
                this.isShowModal = false
            },

            async updateImageList(files) {
            	try {
		            await this.getQiniuUpdateToken()
                    for(let file of files) {
                    	let localUrl = window.URL.createObjectURL(file)
                        let key = nanoId()
                    	this.willUpdateImageList.push({
                            localUrl,
                            key,
                            file,
                            updating: false,
                            percent: 0
                        })
                    }
	            } catch (e) {
                    console.log(e);
	            }

            },

            async startUpdate () {
                try {
	                for (let i = 0; i < this.willUpdateImageList.length; i++) {
		                let res = await this.updateImageToQiniu(this.willUpdateImageList[i], i)
                            console.log(res);
		                this.updateImagesInfo.push({
                            imageDesc: 'test',
                            imagePath: res.key,
                            imageName: 'test'
                        })
	                }

                    await this.postImagesList({
                        id: this.$route.params.id,
                        imageList: this.updateImagesInfo
                    })

                    this.closeImgModal()

                    this.$Notice.success({
                        title: '恭喜，上传成功'
                    })
                } catch (e) {
                	this.$Notice.error({
                        title: '抱歉，上传出现错误'
                    })
                    console.log(e);
                }

            },

            updateImageToQiniu (item, index) {
            	return new Promise((resolve, reject) => {
            		let observable = qiniu.upload(item.file, item.key, this.qiniuToken)

                    let next = (res) => {
            		    this.willUpdateImageList[index].percent = res.total.percent
                    }
                    let error = (err) => {
            			reject(err)
                    }
                    let complete = (res) => {
            			resolve(res)
                    }
                    observable.subscribe(next, error, complete)
                })

            }
        }
	}
</script>

