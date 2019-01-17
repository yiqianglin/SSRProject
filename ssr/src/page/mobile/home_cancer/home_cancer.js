/* global baike */
import { mapGetters, mapState } from 'vuex'
import { ActiveBanner } from 'components/activity/activity'
export default {
    data () {
        return {
            activeOps: null,
            tags: [],
            tagIndex: -1,
            authorityList: [],
            paperList: [],
            loaded: false,
            activeTopicOps: null
        }
    },
    components: {
        ActiveBanner
    },
    activated () {
    },
    created: function () {
        var that = this
        that.init()
    },
    asyncData ({ store }) {
      console.log('肿瘤首页的asyncData方法执行')
      return Promise.all([
        store.dispatch('getCancerList')
      ])
    },
    mounted: function () {
      // this.$store.dispatch('getCancerList')
    },
    computed: {
      ...mapState ({
        cancerList: 'cancerList'
      }),
        redpointState () {
            return true
        },

    },
    methods: {
        init: function () {

        },
        toTopic (item) {
            baike.goToUrl('/mobile/active_topic.html')
        },
        toSearch: function () {
            this.$store.dispatch('showMiniSearch')
        },
        toBack: function () {
            baike.goBack()
        },
        toMy: function () {
            baike.goToUrl('/mobile/my.html')
        },
        toCommittee: function () {
            baike.goToUrl('/mobile/cancer_committee.html')
        },
        toWebmd: function () {
            baike.goToUrl('/mobile/authority_wm.html')
        },
        toCancer: function (item) {
            var name = item.name
        },
        toAuthority: function (item) {
            if (item.hospital_id === 27) {
                baike.goToUrl(`/mobile/authority.html?ptag=onco_organization:${item.name}`)
            } else if (item.hospital_id === 47) {
                baike.goToUrl(`/mobile/authority_hw.html?ptag=onco_organization:${item.name}`)
            } else if (item.hospital_id === 1000) {
                baike.goToUrl(`/mobile/authority_wm.html?ptag=onco_organization:${item.name}`)
            } else {
                baike.goToUrl(`/mobile/hospital.html?hospital_id=${item.hospital_id}&ptag=onco_organization:${item.name}`)
            }
        },
        toMore: function () {
            baike.goToUrl('/mobile/disease_list.html?depart=肿瘤科&lib=cancer&ptag=onco_otherdesease_entry')
        },
        clickTag: function (index, report) {
            var that = this
            if (index !== that.tagIndex) {
                that.tagIndex = index
                // that.scrollToTag(index)
                var tag = that.tags[index]
                if (!tag.docs.length) {
                    that.getDocsDataByTags(index, true)
                } else {
                    that.paperList = tag.docs
                    that.loaded = tag.loaded
                }
            }
        },
    }
}
