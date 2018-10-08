<template>
    <div class="img-card">
        <div class="img-area" :style="{backgroundImage: `url(${imgUri})`}"></div>
        <div class="img-inf">
            <div class="img-content">
                <h3>{{imageName}}</h3>
                <p>{{updateTime}}</p>
                <p>{{imageDesc}}</p>
            </div>
            <div class="img-option" v-if="true"><Icon type="ios-options" /></div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "imageCard",
        props: {
			imgUri: {
				type: String,
				default: ''
            },
            fontSize: {
				type: Number,
                default: 0
            },
            updateTime: {
				type: String,
                default: ''
            },
            imageName: {
				type: String,
                default: ''
            },
            imageDesc: {
				type: String,
                default: ''
            },
            // imgWidth: {
			// 	type: Number,
            //     default: 0
            // }
        }
	}
</script>

<style scoped lang="stylus">
.img-card
    width: 20em;
    height: 20em;
    overflow hidden
    .img-area
        height 15em
        background-size cover
        background-repeat no-repeat
    .img-inf
        background-color: #f9f9f9;
        padding 0 0.6em
        height 5em
        .img-option
            width 36
            height 36
            float right
        .img-content
            float left
            &:after
                content ''
                visibilitiy hidden
                height 0
                clear both
</style>