<template> 
  <div>
    <font class="fontF1 animated fadeIn">微招聘</font>
    <font class="fontF2 animated fadeIn">一个让你更容易找到工作的平台</font>
    <img style="z-index:-1;position:absolute;width:100%;height:100%;" src="../../../static/images/first.gif" alt="">
   <button class="box1 animated bounceInLeft" open-type='getUserInfo' @getuserinfo="bindGetUserInfo">
     <!-- <img src="../../../static/images/identity1.png" style="width:500rpx;height:250rpx;" alt=""> -->
     授权登录
   </button>
   <div class="box2 animated bounceInLeft" @click="go2()">先看看</div>
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
    //授权登录方法
    bindGetUserInfo(e)
      {
        //console.log(e);
        //判断是否允许
        if(e.mp.detail.userInfo)
        {
          this.userInfo=e.mp.detail.userInfo;
          wx.setStorageSync('userInformation',e.mp.detail.userInfo)
          this.insertSQ(e.mp.detail.userInfo)
        }
      },
    //授权信息插入user表接口方法
    insertSQ(data){
      this.$http.post("/user/empower",
        {
          'openid': wx.getStorageSync('openid'),
          'wx_name':data.nickName,
          'region':data.city,
          'sex':data.gender,
          'url':data.avatarUrl
        }).then((res)=>{
            //输出请求数据
            console.log(res.data)
          }).catch(err=>{
            console.log(err.status,err.message)
          })
          this.go1()
    },
    // 跳转至首页
    go1 () {
      console.log('身份为求职者')
      wx.switchTab({url: '../index/main'})
    },
    go2 () {
      console.log('身份为游客')
      wx.switchTab({url: '../index/main'})
    }
  },
  mounted () {
    if(wx.getStorageSync('userInformation')!='')
      wx.switchTab({url: '../index/main'});
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
  background-color:#6495ED;
  height:102rpx;
  width:40%;
  display:flex;
  justify-content: center;
  align-items:center;
  border-radius: 20rpx;
  float: left;
  position: absolute;
  bottom: 300rpx;
  left: 30%;
  color: aliceblue;
}
.box2{
  color: white;
  border-bottom: 1rpx solid white;
  height:40rpx;
  width:20%;
  display:flex;
  justify-content: center;
  align-items:center;
  position: absolute;
  bottom: 250rpx;
  right: 40%;
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
