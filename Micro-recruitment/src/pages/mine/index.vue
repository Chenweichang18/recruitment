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
      <button class="loginRight" open-type='getUserInfo' @click="getUserProfile">
        <img class="loginImg" :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/images/loginUser.png'" alt="未登录时头像">
      </button>
    </div>
    <!-- 中间层功能模块标签 -->
    <div class="middle">
      <div style="margin-top:30rpx;" @click="goOnline">
        <img style="width:100rpx;height:100rpx;margin-left:10rpx;" src="../../../static/images/resume.png" alt="">
        <p style="font-size:30rpx;">在线简历</p>
      </div>
      <div style="margin-top:30rpx;" @click="goTD">
        <img style="width:100rpx;height:100rpx;margin-left:10rpx;" src="../../../static/images/enclosure.png" alt="" @click="uploadFile">
        <p style="font-size:30rpx;">我的投递</p>
      </div>
      <div style="margin-top:30rpx;" @click="goMS">
        <img style="width:100rpx;height:100rpx;margin-left:10rpx;" src="../../../static/images/interview.png" alt="">
        <p style="font-size:30rpx;">我的面试</p>
      </div>
      <div style="margin-top:30rpx;" @click="goCol">
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
      <div class="btn1" @click="chenwei">
        <img src="../../../static/images/user.png" class='btnImg' alt="">
        <font style="font-size:36rpx;">成为招聘者</font>
        <img src="../../../static/images/right.png" class="jiantou" alt="">
      </div>
    </div>
    <!-- 弹窗模态遮罩层实现 -->
    <div v-if="tan2Open" class="zhaozi">
      <!-- 教育经历弹窗 -->
      <div class="tan1 animated slideInRight">
        <!-- 弹窗内上半部分内容，下半部分是两个按钮 -->
        <div class="xinxi">
          <!-- 顶部文字 -->
          <div style="position:relative;width:95%;height:100rpx;margin-left:2.5%;margin-top:30rpx;">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">注册：填写相关信息</font>
            <font style="position:absolute;top:80rpx;left:20rpx;font-size:26rpx;color:gray;">提示：信息完善通过率大哦</font>
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">申请人姓名</font>
            <input v-model="form.username" placeholder=" " type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">公司名称</font>
            <input v-model="form.company" placeholder=" " type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">法人</font>
            <input v-model="form.person" placeholder=" " type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">公司邮箱</font>
            <input v-model="form.email" placeholder=" " type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">企业地址</font>
            <input v-model="form.address" placeholder=" " type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
        </div>
        <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan2Open=false">取消</div>
          <div class="baocun" @click="tijiao">提交审核</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      form:{},
      tan2Open:false,
      userInfo:[],
      sum:0
    }
  },

  components: {
    card
  },

  methods: {
    chenwei(){
       this.$http.get("/apply/ifRegister",{openid:JSON.stringify(wx.getStorageSync('openid'))}
          ).then((res)=>{
            //输出请求数据
            if(res.data.data=='')
            {
              this.tan2Open = true
            }
            else
            {
              if(res.data.data[0].type == 'unde')
              {
                wx.showToast({
                title: '管理员正在审核中',
                icon: 'loading',
                duration: 1500
              })
              }
              if(res.data.data[0].type == 'true')
              {
                wx.showModal({
                  title: '审核通过',
                  content: '通过网站http://localhost:8080登录注册账号!',
                  showCancel: false,//是否显示取消按钮
                  cancelText:"否",//默认是“取消”
                  cancelColor:'skyblue',//取消文字的颜色
                  confirmText:"确定",//默认是“确定”
                  confirmColor: 'skyblue',//确定文字的颜色
                  success: function (res) {
                      if (res.cancel) {
                        //点击取消,默认隐藏弹框
                      } else {
                        //点击确定
                        temp.splice(index, 1),
                        that.setData({
                            tempFilePaths: temp,
                        })
                      }
                  },
                })
                
              }
              if(res.data.data[0].type == 'false')
              {
                wx.showToast({
                title: '审核不通过',
                duration: 1500
              })
              }
            }
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    tijiao(){
      var that = this
      this.form.openid = wx.getStorageSync('openid')
      this.$http.post("/apply/insertZP",this.form
          ).then((res)=>{
            wx.showToast({
              title: '提交成功',//提示文字
              duration:2000,//显示时长
              mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon:'success', //图标，支持"success"、"loading"
            })
            that.tan2Open = false
          }).catch(err=>{
            console.log(err.status,err.message)
          })
      
      
    },
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
      getUserProfile(e) {
        wx.getUserProfile({
          desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            wx.setStorageSync('userInfo',res.userInfo)
            wx.setStorageSync('city','广州')
            this.userInfo=res.userInfo;
            this.insertSQ(res.userInfo)
          }
        })
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
          console.log(data)
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
    },
    goCol(){
      wx.navigateTo({
        url: '../mycol/main'
      })
    },
    goTD(){
      wx.navigateTo({
        url: '../mytd/main'
      })
    },
    goMS(){
      wx.navigateTo({
        url: '../mianshi/main'
      })
    },
  },
mounted () {
   if(wx.getStorageSync('userInfo')!=null)
   {
     this.userInfo = wx.getStorageSync('userInfo')
   }
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
.zhaozi{width:100%;height: 100%;background: rgba(128, 128, 128, 0.603);position: fixed;top:0;}
.xiaoshi{display:none;}
.box1{position: relative;width:90%;height: 230rpx;background: white;margin-left:5%;border-bottom: 4rpx solid rgba(128, 128, 128, 0.356);}
.box1 .touxiang{border-radius:50%;width:160rpx;height:160rpx;position: absolute;right:10rpx;top:20rpx;}
.box2{position: relative;width:90%;height: 230rpx;background: white;margin-left:5%;border-bottom: 4rpx solid rgba(128, 128, 128, 0.356);}
.box3{position: relative;width:90%;height: 230rpx;background: white;margin-left:5%;border-bottom: 4rpx solid rgba(128, 128, 128, 0.356);}
.box4{position: relative;width:90%;height: 250rpx;background: white;margin-left:5%;border-bottom: 4rpx solid rgba(128, 128, 128, 0.356);}
.box5{position: relative;width:90%;height: 130rpx;background: white;margin-left:5%;border-bottom: 4rpx solid rgba(128, 128, 128, 0.356);}
.box6{position: relative;width:90%;height: 130rpx;background: white;margin-left:5%;border-bottom: 4rpx solid rgba(128, 128, 128, 0.356);}
.tan1{position:absolute;width: 80%;height: 85%;left:10%;top:5%;border: 1rpx solid black;border-radius: 30rpx;background: #c9d8f3ee;}
.tan1 .xinxi{width: 100%;height: 90%;border-bottom: 1rpx solid #6495ED;border-radius: 30rpx;background: white;overflow-y: auto;}
.tan1 .tx{position:relative;width:95%;height:160rpx;margin-left:2.5%;margin-top:30rpx;border:1rpx solid gray;border-radius:20rpx;background:white;}
.tan1 .xm{position:relative;width:95%;height:160rpx;margin-left:2.5%;margin-top:30rpx;border:1rpx solid gray;border-radius:20rpx;background:white;}
.tan1 .sex{position:relative;width:95%;height:100rpx;margin-left:2.5%;margin-top:30rpx;border:1rpx solid gray;border-radius:20rpx;background:white;}
.tan1 .sex .sexBlue{background:#6495ED;}
.tan1 .createTime{position:relative;width:95%;height:160rpx;margin-left:2.5%;margin-top:30rpx;border:1rpx solid gray;border-radius:20rpx;background:white;}
.tan1 .wxNum{position:relative;width:95%;height:160rpx;margin-left:2.5%;margin-top:30rpx;border:1rpx solid gray;border-radius:20rpx;background:white;}
.tan1 .email{position:relative;width:95%;height:160rpx;margin-left:2.5%;margin-top:30rpx;border:1rpx solid gray;border-radius:20rpx;background:white;margin-bottom:30rpx;}
.tan1 .btn1{width:80%;height:80rpx;margin-left:10%;margin-top:10rpx;}
.tan1 .btn1 .quxiao{border:1rpx solid gray;border-radius:20rpx;background:rgb(177, 177, 177);float:left;width:45%;height:100%;color:white;display:flex;justify-content:center;align-items:center;}
.tan1 .btn1 .baocun{border:1rpx solid gray;border-radius:20rpx;background:#6495ED;float:right;width:45%;height:100%;color:white;display:flex;justify-content:center;align-items:center;}
</style>
