<template>
  <div>
    <!-- 顶部登录状态栏 -->
    <div class='login'>
      <div class="loginLeft">
        <font class="loginFont1">{{userInfo.nickName?userInfo.nickName:'未登录'}}</font>
        <div v-if="userInfo.nickName" @click="goOnline">
          <img src="/static/images/edit.png" style="width:40rpx;height:40rpx;float:left;" alt="">
          <font class="loginFont2">&nbsp;我的在线简历</font>
        </div>
        <font class="loginFont2" v-if="!userInfo.nickName">点击头像进行登录</font>
      </div>
      <button class="loginRight" open-type='getUserInfo' @getuserinfo="bindGetUserInfo">
        <img class="loginImg" :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/images/loginUser.png'" alt="未登录时头像">
      </button>
    </div>
    <!-- 中间层功能模块标签 -->
    <div class="middle">
      <div style="margin-top:30rpx;" @click="goOnline">
        <img style="width:100rpx;height:100rpx;margin-left:10rpx;" src="../../../static/images/resume.png" alt="">
        <p style="font-size:30rpx;">在线简历</p>
      </div>
      <div style="margin-top:30rpx;">
        <img style="width:100rpx;height:100rpx;margin-left:10rpx;" src="../../../static/images/enclosure.png" alt="" @click="uploadFile">
        <p style="font-size:30rpx;">我的附件</p>
      </div>
      <div style="margin-top:30rpx;">
        <img style="width:100rpx;height:100rpx;margin-left:10rpx;" src="../../../static/images/interview.png" alt="">
        <p style="font-size:30rpx;">我的面试</p>
      </div>
      <div style="margin-top:30rpx;">
        <img style="width:100rpx;height:100rpx;margin-left:10rpx;" src="../../../static/images/Collection.png" alt="">
        <p style="font-size:30rpx;">我的收藏</p>
      </div>
    </div>
    <!-- Bottom层 -->
    <div class="bottom">
      <button class="btn1" open-type="contact" bindcontact="handleContact">
        <img src="../../../static/images/kefu.png" class='btnImg' alt="">
        <font style="font-size:36rpx;">在线客服</font>
        <img src="../../../static/images/right.png" class="jiantou" alt="">
      </button>
      <div class="btn1">
        <img src="../../../static/images/userbook.png" class='btnImg' alt="">
        <font style="font-size:36rpx;">用户手册</font>
        <img src="../../../static/images/right.png" class="jiantou" alt="">
      </div>
      <button class="btn1" open-type='feedback'>
        <img src="../../../static/images/diss.png" class='btnImg' alt="">
        <font style="font-size:36rpx;">意见反馈</font>
        <img src="../../../static/images/right.png" class="jiantou" alt="">
      </button>
      <div class="btn1">
        <img src="../../../static/images/callus.png" class='btnImg' alt="">
        <font style="font-size:36rpx;">联系我们</font>
        <img src="../../../static/images/right.png" class="jiantou" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      userInfo:[]
    }
  },

  components: {
    card
  },

  methods: {
    //授权登录方法
    bindGetUserInfo(e)
      {
        console.log(e);
        //判断是否允许
        if(e.mp.detail.userInfo)
        {
          this.userInfo=e.mp.detail.userInfo;
          wx.setStorageSync('userInformation',e.mp.detail.userInfo)
        }
      },
    //上传文件方法
    uploadFile(){
    
    },
    //客服消息
    handleContact (e) {
        console.log(e.detail.path)
        console.log(e.detail.query)
    },
    //跳转到在线简历页面
    goOnline(){
      wx.navigateTo({
        url: '../resume/main'
      })
    }
  },
mounted () {
   wx.getUserInfo({
        success:(res)=>{
          console.log(res);
          this.userInfo=res.userInfo;
          wx.setStorageSync('userInformation',res.userInfo)
        },
        fail:(res)=>{
          console.log(res);
          console.log('还未授权');
        }
      })
},
  created () {
    // let app = getApp()
  }
}
</script>
<style>
page{
  background: rgba(128, 128, 128, 0.068);
}
</style>
<style scoped>
.login{
  width:100%;
  height: 200rpx;
  background: #6495ED;
  display: flex;
  justify-content: space-between;
}
.loginLeft{
  margin-top: 40rpx;
  margin-left: 40rpx;
}
.loginFont1{
  color: white;
  font-size: 56rpx;
}
.loginFont2{
  color: white;
  font-size: 30rpx;
  display: block;
  margin-top: 5rpx;
}
.loginRight{
  background: #6495ED;
  margin-top: 18rpx;
  margin-right: 40rpx;
}
.loginRight::after{
  border: none;
}
.loginImg{
  border: none;
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
}
.middle{
  width: 100%;
  height: 230rpx;
  background: white;
  display: flex;
  justify-content: space-around;
}
.bottom{
  width: 100%;
  height: 600rpx;
  background: white;
  margin-top: 10rpx;
}
.bottom .btn1{
  background: transparent;
  width: 100%;
  height: 120rpx;
  display: flex;
  align-items: center;
  padding-left: 30rpx;
}
.bottom .btn1::after{
  border:none;
}
.bottom .btnImg{
  width:60rpx;
  height: 60rpx;
  margin-right: 30rpx;
}
.bottom .jiantou{
  position: absolute;
  right: 30rpx;
  width: 40rpx;
  height: 40rpx;
}
</style>
