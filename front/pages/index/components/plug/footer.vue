<template>
<div class="footer">
  <div class="layout-copy">
     <div><span class="footer-nu">2016-2020 &copy; 冰空的作品展示</span> | <span class="footer-nu">Designed by Kalecgos</span></div>
    <p class="record">
      <a href="http://www.beian.miit.gov.cn/">
        滇ICP备20004963
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

<style scoped lang="stylus">
.footer{
  width: 100%;
  margin-top: 25px;
  background: rgba(132,142,146,0.3);
}
.footer-nu {
  display inline-block
}
.layout-copy{
  text-align: center;
  padding: 8px 0;
  color: #4b4334;
  text-shadow: 1px 1px 0 #ffffff;
  font-size: 18px;
}
.record{
  color: #080808;
  font-size: 16px;
  padding 3px 0
}
</style>
