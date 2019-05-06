<template>
    <div>
        <div>hello!</div>
        <preview :slides="slide1" @close="handleClose"></preview>
    </div>
</template>

<script>
    // import vuePreview from "vue-preview"
    import preview from './view/preview'

    export default {
        name: "img_view",
        components: {
            preview
        },
        data() {
            return {
                slide1: [
                    {
                        src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                        msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                        alt: 'picture1',
                        title: 'Image Caption 1',
                        w: 1200,
                        h: 800
                    },
                    {
                        src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                        msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                        alt: 'picture2',
                        title: 'Image Caption 2',
                        w: 1200,
                        h: 800
                    }
                ]
            }
        },
        methods: {
            handleClose() {
                console.log('close event')
            }
        }
    }
</script>

<style scoped>

</style>
