<style scoped lang="stylus">
    .gallery-info {
        .gallery-title {
            text-align: center;
        }

        .list {
            display: flex;

            .item {
                margin: 5px;
                cursor: pointer;

                .item-card {
                    width: 300px;
                    height: 300px;
                    overflow: hidden;
                    font-size: 15px;

                    > * {
                        height: 100%;
                    }
                }
            }
        }
    }
</style>

<template>
    <section class="gallery-info">
        <h1 class="gallery-info-title">{{$route.params.title}}相册 -- 照片编辑</h1>
        <ul class="list">
            <li class="item" v-for="(item, index) in imagesListInfo.images" :key="index">
                <Poptip placement="right" width="400" :transfer="true">
                    <Card class="item-card" :padding="0">
                        <image-card
                                :img-uri="imagesListInfo.url + '/' + item.imagePath  + '?imageView2/1/w/900/h/600/interlace/1/q/75|imageslim'"
                                :font-size="15"
                                :update-time="item.updateTime"
                                :image-name="item.imageName"
                                :image-desc="item.imageDesc"
                        />
                        <!--<img :src="imagesListInfo.url + '/' + item.imagePath" alt="" width="300">-->
                    </Card>
                    <div class="api" slot="content">

                        <h4>照片操作:{{item.imageName}}</h4>
                        <Button size="small" type="warning"
                                @click="editPhoto(item._id, item.imageName, item.imageDesc)"
                        >
                            修改照片信息
                        </Button>
                        <Button size="small"
                                type="success"
                                @click="removeImg">
                            设置为封面
                        </Button>
                        <Button size="small"
                                type="error"
                                @click="removeImg">
                            删除照片
                        </Button>
                    </div>
                </Poptip>
            </li>
            <li class="item">
                <Card class="item-card" :padding="0">
                    <addImg></addImg>
                </Card>
            </li>
        </ul>
        <Modal
                :z-index="1100"
                v-model="editPhotoInfo.showModal"
                title="修改照片"
                @on-ok=""
                @on-cancel="changeShowEdit">
            <Form :model="editPhotoInfo" :label-width="80">
                <Form-item label="标题">
                    <label>
                        <Input v-model="editPhotoInfo.iptName" placeholder="请输入标题"></Input>
                    </label>

                </Form-item>
                <Form-item label="描述">
                    <label>
                        <Input v-model="editPhotoInfo.iptDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入描述..."></Input>
                    </label>
                </Form-item>
            </Form>
        </Modal>
    </section>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import addImg from "./plug/addImg";
    import imageCard from "./plug/imageCard";
    import {Card, Poptip, Modal, Form, FormItem, Input} from "iview";

    export default {
        name: "galleryInfoPage",
        components: {
            addImg,
            Card,
            imageCard,
            Poptip,
            Modal, Form, FormItem, Input
        },
        data() {
            return {
                updateImagesInfo: [],
                editPhotoInfo: {
                    showModal: false,
                    iptName: '',
                    iptDesc: '',
                    photoId: ''
                }
            };
        },
        computed: {
            ...mapState('galleryModule', {
                imagesListInfo: state => state.imagesListInfo
            })
        },
        methods: {
            ...mapActions('galleryModule', ["getImageList"]),
            removeImg() {
            },
            editPhoto(photoId, name, desc) {
                this.editPhotoInfo.iptDesc = desc;
                this.editPhotoInfo.iptName = name;
                this.editPhotoInfo.photoId = photoId;
                this.editPhotoInfo.showModal = true
            },
            changeShowEdit() {
                this.editPhotoInfo.showModal = false
            }
        },
        mounted() {
            this.getImageList(this.$route.params.id);
        }
    };
</script>

