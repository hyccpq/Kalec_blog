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

        >* {
          height: 100%;
        }
      }
    }
  }
}
</style>

<template>
  <section class="gallery-info">
    <h1 class="gallery-info-title">{{$route.params.title}}相册 照片编辑</h1>
    <ul class="list">
      <li class="item" v-for="(item, index) in imagesListInfo.images" :key="index">
        <Poptip placement="right" width="400" :transfer="true">
          <Card class="item-card" :padding="0">
            <image-card
              :img-uri="imagesListInfo.url + '/' + item.imagePath"
              :font-size="15"
              :update-time="item.updateTime"
              :image-name="item.imageName"
              :image-desc="item.imageDesc"
            />
            <!--<img :src="imagesListInfo.url + '/' + item.imagePath" alt="" width="300">-->
          </Card>
          <div class="api" slot="content">
            <table>
              <thead>
                <tr>
                  <th>版本号</th>
                  <th>更新时间</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0.9.5</td>
                  <td>2016-10-26</td>
                  <td>
                    新增信息提示组件
                    <code>Tooltip</code>和
                    <code>Poptip</code>
                  </td>
                </tr>
                <tr>
                  <td>0.9.4</td>
                  <td>2016-10-25</td>
                  <td>
                    新增对话框组件
                    <code>Modal</code>
                  </td>
                </tr>
                <tr>
                  <td>0.9.2</td>
                  <td>2016-09-28</td>
                  <td>
                    新增选择器组件
                    <code>Select</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Poptip>
      </li>
      <li class="item">
        <Card class="item-card" :padding="0">
          <addImg></addImg>
        </Card>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import addImg from "./plug/addImg";
import imageCard from "./plug/imageCard";
import { Card, Poptip } from "iview";
export default {
  name: "galleryInfoPage",
  components: {
    addImg,
    Card,
    imageCard,
    Poptip
  },
  data() {
    return {
      updateImagesInfo: []
    };
  },
  computed: {
    ...mapState('galleryModule', {
      imagesListInfo: state => state.imagesListInfo
    })
  },
  methods: {
    ...mapActions('galleryModule', ["getImageList"]),
    removeImg() {}
  },
  mounted() {
    this.getImageList(this.$route.params.id);
  }
};
</script>

