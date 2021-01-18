<template> 
  <div>
    <font class="fontF1 animated fadeIn">微招聘</font>
    <font class="fontF2 animated fadeIn">一个让你更容易找到工作的平台</font>
    <img style="z-index:-1;position:absolute;width:100%;height:100%;" src="../../../static/images/first.gif" alt="">
   <div class="box1 animated bounceInLeft" @click="go1()">
     <!-- <img src="../../../static/images/identity1.png" style="width:500rpx;height:250rpx;" alt=""> -->
     <font class="font1">求职</font>
   </div>
   <div class="box2 animated bounceInRight" @click="go2()">
     <!-- <img src="../../../static/images/identity2.png" style="width:500rpx;height:250rpx;" alt=""> -->
     <font class="font1">招聘</font>
   </div>
   <img @click="go1()" class="img1 animated bounceInLeft" src="../../../static/images/identity1.png" alt="">
   <img @click="go2()" class="img2 animated bounceInRight" src="../../../static/images/identity2.png" alt="">
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data () {
    return {
    }
  },

  components: {
    card
  },

  methods: {
    // 跳转至首页
    go1 () {
      console.log('身份为求职者')
      wx.switchTab({url: '../index/main'})
    },
    go2 () {
      console.log('身份为招聘者')
      wx.switchTab({url: '../index/main'})
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>
<style>
page{
}
</style>
<style scoped>
.box1{
  background-color:#808080;
  height:102rpx;
  width:40%;
  display:flex;
  justify-content: center;
  align-items:center;
  border-radius: 20rpx;
  float: left;
  position: absolute;
  bottom: 100rpx;
  left: 60rpx;
}
.box2{
  background-color:#808080;
  height:102rpx;
  width:40%;
  display:flex;
  justify-content: center;
  align-items:center;
  border-radius: 20rpx;
  float: left;
  position: absolute;
  bottom: 100rpx;
  right: 60rpx;
}
.img1{
  position: absolute;
  width: 400rpx;
  height: 300rpx;
  bottom: 200rpx;
  left: 20rpx;
}
.img2{
  position: absolute;
  bottom: 200rpx;
  width: 400rpx;
  height: 300rpx;
  right: 20rpx;
}
.fontF1{
  position: absolute;
  top:60rpx;
  left: 50rpx;
  font-size: 106rpx;
  font-family:'华文彩云';
  color: rgba(0, 0, 0, 0.548);
}
.fontF2{
  position: absolute;
  top:200rpx;
  left: 250rpx;
  font-size: 32rpx;
  font-family:'华文行楷';
  color: rgba(0, 0, 0, 0.548);
}
.font1{
  font-size: 66rpx;
  font-family:'华文琥珀';
  color: aliceblue;
}
</style>
