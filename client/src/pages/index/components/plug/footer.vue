<template>
<div class="footer">
  <div class="layout-copy">
     <div>2016-2018 &copy; 冰空的作品展示 | Design by Kalecgos</div>
    <p class="record">
      <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">
        <div class="record-icon"></div>辽ICP备16019219号-1
      </a>
    </p>
  </div>
</div>
</template>

<script>
	export default {
		name: "my-Footer"
	}
</script>

<style scoped>
.footer{
  width: 100%;
  margin-top: 25px;
  background: rgba(132,142,146,0.3);
}
.layout-copy{
  text-align: center;
  padding: 20px 0 20px 0;
  color: #4b4334;
  text-shadow: 1px 1px #ffffff;
  font-size: 18px;
}
.record{
  color: #372f23;
  font-size: 16px;
}
.record-icon{
  height: 18px;
  width: 18px;
  background-image: url("../../assets/img/beian.png");
  background-size: 100%;
  display: inline-block;
}
</style>
