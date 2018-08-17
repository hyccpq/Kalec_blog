<template>
    <div class="dialog-warp">
        <div class="dialog-cover" v-if="isShowlog" @click="close"></div>
        <transition name="drop">
            <div class="block"  v-if="isShowlog">
                <div class="dialog-content">
                    <div class="dialog-close">
                        <Icon type="md-close" class="dialog-close-click" @click="close">X</Icon>
                    </div>

                    <slot>空</slot>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import { Icon } from 'iview'
	export default {
		name: "login",
        components: {
			Icon
        },
		props:{
			isShowlog:{
				type: Boolean,
				default:false
			}
		},
		methods:{
			close(){
				this.$emit('onChange');
			}
		}
	}
</script>

<style scoped lang="stylus">
    .drop-enter {
        transform: translateY(-500px);
    }

    .drop-enter-active {
        transition: all .5s ease;
    }
    .drop-leave-active {
        transition: all .5s ease;
        transform: translateY(-500px);
    }

    .dialog-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .dialog-cover {
        background: #000;
        opacity: .3;
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .block {
        width: 100%;
        position: fixed;
        max-height: 50%;
        overflow: auto;
        top: 20%;
        z-index: 10;
    }
    .dialog-content {
        width: 360px;
        background: #fff;
        border: 1px solid #aca6cc;
        border-radius: 10px;
        padding: 1%;
        line-height: 1.6;
        margin: 0 auto;
        min-height: 100px;
    }
    .dialog-close:after {
        content: '';
        visibility: hidden;
        display: block;
        height: 0;
        clear: both;
    }
    .dialog-close-click {
        float: right;
        cursor: pointer;
    }
    .dialog-close-click:hover {
        color: #4fc08d;
    }
</style>
