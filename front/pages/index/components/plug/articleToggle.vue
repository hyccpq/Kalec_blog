<template>
    <div id="toggle" v-if="hasToggle">
        <p class="toggle-name">文章目录</p>

        <section class="toggle-section">
            <!--<Anchor show-ink :affix="false" :offset-top="0" :scroll-offset="0" class="toggle-cat">-->
            <!--<AnchorLink v-for="(item, key) in toggle"-->
            <!--:class="`toggle-${item.tagName}`"-->
            <!--:href="item.href"-->
            <!--:title="item.text"-->
            <!--:key="key"></AnchorLink>-->
            <!--</Anchor>-->
            <ul class="toggle-cat">
                <li v-for="(item, index) in toggle"
                    :class="[
                    `toggle-${item.tagName}`,
                    scrollTop >= item.total &&
                    (toggle[index + 1] ? scrollTop < toggle[index + 1].total : true)
                    ? 'active' : 'freeze'
                    ]">
                    <a @click.prevent="gotoToggle(item.total,item.href)">{{item.text}}</a>
                </li>
            </ul>
        </section>

    </div>
</template>

<script>
	import {mapState} from 'vuex'
    import { Anchor, AnchorLink } from 'iview'
    import { scrollAnimate } from '../../../../modules/util/animate'

	export default {
		name: "article-toggle",
        components: {
			Anchor, AnchorLink
        },
		data () {
			return {
				// hasToggle:this.toggle.length!== 0
			}
		},
        mounted() {
			// window.addEventListener('scroll', () => {
			// 	this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
            // })
        },
		computed: {
			...mapState({
				toggle: state => state.toggle,
                scrollTop: state => state.scrollTop
			}),
			hasToggle () {
				return this.toggle.length !== 0;
			}
		},
        methods: {
			gotoToggle(total, hash) {
				this.$nextTick(() => {
					let currentClickAnchor = document.querySelector(`#T-${hash}`)
                    total = currentClickAnchor.offsetTop
                    scrollAnimate(total - 60, document.documentElement.scrollTop).then(res => {
                        console.log(res);
                        window.pageYOffset = res;
                        window.history.replaceState({}, '', `#${hash}`)
                        // window.location.hash = hash;
                    })

                })

            }
        }
	}
</script>

<style scoped lang="stylus">
    #toggle
        .toggle-name
            /*text-align center*/
            font-size 1.5em
            color #333333
            padding 10px 20px
            border-bottom 1px solid #f0e5e7
        .toggle-section

            .toggle-cat
                line-height 1.2rem
                padding 5px 10px
                font-size 0.8rem
                .toggle-H1
                    padding-left 10px
                .toggle-H2
                    padding-left 25px
                .toggle-H3
                    padding-left 40px
                .toggle-H4
                    padding-left 55px
                .toggle-H5
                    padding-left 70px
                .toggle-H6
                    padding-left 85px
                .active
                    border-left 3px solid blue
                    background-color: rgba(185, 248, 255, 0.26)
                .freeze
                    border-left 3px solid transparent
</style>
