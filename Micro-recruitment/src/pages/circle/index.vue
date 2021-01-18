<template>
  <div @click="clickHandle">
    <!-- 卡片式轮播图 -->
    <swiper style="padding-top:20rpx;padding-bottom:20rpx;height:400rpx;"
            previous-margin="80rpx" next-margin="80rpx" @change="bindchange"
            :current="swiperIndex" :autoplay='true' :interval='3000' 
            :duration='1000' :circular='true'>
      <swiper-item v-for="item in pic" :key="item.index">
        <div :class="swiperIndex==index?'active':'quiet'">
          <img :src="item.url" mode='widthFix' style="width:100%;">
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      swiperIndex: 1,
      //请求海报测试数组
      pic:[{'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages6.fanpop.com%2Fimage%2Fphotos%2F33500000%2FEmma-Watson-emma-watson-33575961-1920-1200.jpg&refer=http%3A%2F%2Fimages6.fanpop.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613460178&t=0c0f0e71782e6ca08f58b53ceaa75961'},
           {'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ivsky.com%2Fimg%2Fbizhi%2Fpre%2F201401%2F05%2Femma_watson-001.jpg&refer=http%3A%2F%2Fimg.ivsky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613541770&t=2f397fc81ae3d06e0b2ccbff13955fa7'},
           {'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F58ec9b08ec2f1.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613460178&t=3642669eba443e8daee370f1be1aa950'}]
    }
  },

  components: {
    card
  },

  methods: {
    //卡片式轮播图组件方法：获取当前轮播图下标
    bindchange(e) {
      this.swiperIndex=e.mp.detail.current
    
  }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
img{border-radius: 30rpx;}
.active {transform: none;transition: all 0.2s ease-in 0s;} 
.quiet {transform: scale(0.85);transition: all 0.2s ease-in 0s;}
</style>
