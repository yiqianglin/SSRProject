/* global baike */

import Vue from 'vue'
import '~/static/libs/swiper/swiper.min.css'

if (process.client) {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    Vue.use(VueAwesomeSwiper /* { default global options } */)
}

export default {
    props: {
        options: {
            type: Object,
            default: function () {
                return {
                    list: [],
                    maxCnt: 5,
                    dom: '',
                    area: ''
                }
            }
        }
    },
    data () {
        return {
            eventBound: false,
            bannerIdx: 0,
            swiperOps: null
        }
    },
    created: function () {},
    computed: {
        list () {
            this.$nextTick(() => {
                this.stopBanner()
                this.initBanner()
            })
            return ((this.options && this.options.list) || []).slice(0, this.options.maxCnt || 5)
        }
    },
    watch: {},
    mounted: function () {
        setTimeout(() => {
            if (this.eventBound) return
            this.startBanner()
        }, 500)
    },
    methods: {
    // common
        report: function (action, index) {
            var area = this.options.area || ''
            var type = 'banner'
            var key = area + (type === 'banner' ? 'bn' : 'bc') + '_' + action
            if (type === 'consultant') {
                key = 'main_consult_' + action
            } else if (area === 'main' && type === 'banner') {
                key = 'main_bn_' + action
                key = 'main_consult_' + action
            } else if (area === 'health_recommend') {
                key = action === 'clk' ? 'health_recommend_bannerX' : ''
            } else if (area === 'home_cancer') {
                key = action === 'clk' ? 'onco_hotzone' : ''
            }
        },
        // banner
        initBanner: function () {
            if (this.list && this.list.length) {
                this.bannerIdx = 0
                this.swiperOps = {
                    swiperContainer: (this.options.area || '') + '_swiper',
                    direction: 'horizontal',
                    autoplay: 5000,
                    speed: 500,
                    loop: this.list.length > 1,
                    initialSlide: this.bannerIdx,
                    autoplayDisableOnInteraction: false,
                    onClick: () => {
                        if (this.swiper) {
                            this.toBanner(this.list[this.swiper.realIndex], this.swiper.realIndex)
                        }
                    },
                    onInit: (swiper) => {
                        this.swiper = swiper
                    },
                    onTransitionEnd: (swiper) => {
                        this.bannerIdx = swiper.realIndex
                        // this.report('show', swiper.realIndex)
                    }
                }
                this.startBanner()
            }
        },
        startBanner (index) {
            if (!this.swiper) return
            index = index || 0
            this.swiper.slideTo(this.swiper.activeIndex + (index - this.swiper.realIndex), 0, false)
            this.swiper.startAutoplay()
            this.eventBound = true
            this.bannerIdx = index
        },
        stopBanner () {
            if (!this.swiper) return
            this.swiper.stopAutoplay()
            this.eventBound = false
            this.swiperOps = null
        },
        toBanner ({
            h5url
        }, index) {
            this.report('clk', index)
        }
    }
}
