<template>
    <section>
        <h1>{{$route.params.title}} 照片编辑</h1>
        {{$route.params.id}}
        <!--<Button size="default" @click="getUpdateToken">test</Button>-->
        {{qiniuToken}}
        <ul>
            <li v-for="(item, index) in imagesListInfo.images"
                :key="index"
                style="height: 100px;overflow: hidden">
                <img :src="imagesListInfo.url + '/' + item.imagePath" alt="" height="100" width="100">
            </li>
        </ul>

        <imageUpdate @updateImageList="updateImageList"></imageUpdate>
        <!--<img :src="" alt="">-->
        <ul>
            <li v-for="(item, index) in willUpdateImageList"
                :key="index"
                style="height: 100px;overflow: hidden">
                <img :src="item.localUrl" alt="" height="50" width="50">
                <div>{{item.percent}}</div>
            </li>
        </ul>
        <Button size="default" @click="startUpdate">点击上传</Button>
    </section>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import imageUpdate from './plug/imageUpdate'
    import * as qiniu from 'qiniu-js'
    import nanoId from 'nanoid'
	export default {
		name: "galleryInfoPage",
        data() {
			return {
				files: '',
                willUpdateImageList: [],
                updateImagesInfo: []
            }
        },
        components: {
			imageUpdate
        },
        computed: {
            ...mapState({
                qiniuToken: state => state.qiniuToken,
                imagesListInfo: state => state.imagesListInfo
            }),
        },
        methods: {
            ...mapActions(['getQiniuUpdateToken', 'postImagesList', 'getImageList']),
			// async getUpdateToken() {
            //     await this.getQiniuUpdateToken()
            // },
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
	            // this.willUpdateImageList.forEach(this.updateImageToQiniu)
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
                } catch (e) {
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
        },
        mounted () {
			this.getImageList(this.$route.params.id)
        }
	}
</script>

<style scoped>

</style>