<template>
  <div class="all-express">
    <div class="express">
      <h1 class="title">毕业季快递小助手</h1>

      <div class="attion">
        <i-Button type="success" @click="goToHome()">《 点击此处返回首页</i-Button>
        <i-Button type="info" @click="goToImg()">加群点击此处</i-Button>

        <p>注意：这里数据仅供参考，一切以实际运费为准，服务提供至月底。单位(元)</p>
      </div>

      <div class="from-title">寄往地区选择：</div><i-select v-model="model1">
      <i-option v-for="item in province" :value="item.value" :key="item.value">{{ item.label }}</i-option>
    </i-select>
      <div class="from-title">寄送物品的重量（斤）：</div>
      <i-input
        v-model="height"
        placeholder="输入重量"
        :clearable="true"
        :number="true"
        :autofocus="true"
      ></i-input>

      <ul v-if="!!model1" class="express-list">
        <li><div>德邦价格：{{ debanmon }}</div></li>
        <li><div>中通价格：{{ zhongtongmon }}</div></li>
        <li><div>顺丰价格：{{ shunfengmon }}</div></li>
        <li><div>邮政价格：{{ youzhenmon }}</div></li>
      </ul>


    </div>
  </div>

</template>

<script>
  import { Arr } from './config'
  import { Select, Option, Input, Button } from 'iview'
  export default {
    name: "express",
    components: {
      iSelect: Select,
      iOption: Option,
      iInput: Input,
      iButton: Button
    },
    data() {
      return {
        province: Arr,
        model1: null,
        height: 0
      }
    },
    mounted(){
      document.title = '毕业季快递查询助手'
    },
    computed:{
      // iptHeight: {
      //   get() {
      //     return this.height
      //   },
      //   set(value) {
      //     if(typeof value !== 'Number') {
      //       this.$Notice.warning({
      //         title: '警告',
      //         desc: '请输入正确的格式'
      //       })
      //     }
      //   }
      // },
      debanmon (){
        let me = this.province[this.model1 - 1]
        if(this.height < 20) {
          if(this.height == 0)return 0;
          return me.deban1[Math.ceil(this.height) - 1]
        } else {
          return (me.deban2 * this.height).toFixed()
        }
      },
      zhongtongmon () {
        let me = this.province[this.model1 - 1]
        if(this.height == 0)return 0;
        return me.zhongtong ? (me.zhongtong * this.height + 10).toFixed() : '无法送达'
      },
      shunfengmon () {
        let me = this.province[this.model1 - 1]
        if(this.height <= 40) {
          if(this.height == 0)return me.shunfeng1 ? 0 : '无法送达'
          return me.shunfeng1 ? me.shunfeng1 : '无法送达'
        } else {
          return me.shunfeng2 ? (me.shunfeng2 * (this.height - 40) + me.shunfeng1).toFixed() : '无法送达'
        }
      },
      youzhenmon (){
        let me = this.province[this.model1 - 1]
        if(this.height == 0) return 0;
        return (me.youzhen * this.height).toFixed()
      }

    },
    methods:{
      goToHome(){
        this.$router.push('/')
      },
      goToImg(){
        this.$router.push('/express/img')
      }
    }
  }
</script>

<style scoped lang="stylus">
.all-express
  background-color: #f9ffd0
  height 100%
  /*position relative*/
  .express
    padding 10px
    .title
      padding 50px 0
      text-align center
    .from-title
      padding 10px 0
      font-size 1rem
    .express-list
      width: 140px
      margin 0 auto
      padding 30px 0
      font-size 1rem
      li
        padding 10px 0
    .attion
      /*position absolute*/
      /*bottom 10px*/

</style>
