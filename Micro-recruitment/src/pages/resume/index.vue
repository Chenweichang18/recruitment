<template>
  <div @click="clickHandle">

    <!-- 个人信息区域 -->
    <div class="box1">
      <div style="position:absolute;top:30rpx;">
        <font style="font-size:56rpx;font-weight:900;">{{personal.name}}</font>
        <img @click="tan1Open=true" src="/static/images/edit2.png" style="width:40rpx;height: 50rpx;margin-left:10rpx;padding-top:10rpx;" alt="">
      </div>
      <img class="touxiang" :src="wxUserinfo.avatarUrl" alt="用户授权头像">
      <div style="position: absolute;top:120rpx;">
        <font style="font-size:36rpx;color:rgb(87, 87, 87);">{{personal.age}}岁-{{personal.sex}}</font>
      </div>
    </div>

    <!-- 教育经历区域 -->
    <div class="box2">
      <div style="position:absolute;top:30rpx;width:100%;">
        <font style="font-size:46rpx;font-weight:900;">教育经历</font>
        <img @click="tan2Open=true" src="/static/images/add.png" style="width:60rpx;height: 60rpx;margin-right:10rpx;margin-top:1rpx;float:right;" alt="">
      </div>
      <div style="position: absolute;top:120rpx;">
        <font style="font-size:36rpx;color:rgb(87, 87, 87);">{{education.school}}-{{education.grade}}</font>
      </div>
    </div>

    <!-- 弹窗模态遮罩层实现 -->
    <div v-if="tan1Open" class="zhaozi">
      <!-- 个人信息弹窗 -->
      <div class="tan1 animated slideInRight">
        <!-- 弹窗内上半部分内容，下半部分是两个按钮 -->
        <div class="xinxi">
          <!-- 头像 -->
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">头像</font>
            <font style="position:absolute;top:80rpx;left:20rpx;font-size:26rpx;color:gray;">提示：点击头像进行修改</font>
            <img :src="wxUserinfo.avatarUrl" style="position:absolute;top:10rpx;right:10rpx;width:120rpx;height:120rpx;border-radius:50%;" alt="">
          </div>
          <!-- 姓名 -->
          <div class="xm">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">姓名</font>
            <input type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;" v-model="personal.name">
          </div>
          <!-- 性别 -->
          <div class="sex">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">性别</font>
            <div style="position:absolute;top:20rpx;right:20rpx;width:200rpx;height:50rpx;background:white;border:1rpx solid black;">
              <div :class="sexOpen?'sexBlue':''" @click="sexOpen=true" style="float:left;width:50%;height:100%;display:flex;justify-content:center;border-right:1rpx solid black;">男</div>
              <div :class="sexOpen?'':'sexBlue'" @click="sexOpen=false" style="float:left;width:50%;height:100%;display:flex;justify-content:center;">女</div>
            </div>
          </div>
          <!-- 出生年月 -->
          <div class="createTime">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">出生年月</font>
          </div>
          <!-- 微信号 -->
          <div class="wxNum">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">微信号码</font>
            <input type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;" v-model="personal.wxNum">
          </div>
          <!-- 邮箱 -->
          <div class="email">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">邮箱</font>
            <input placeholder="选填" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;" v-model="personal.email">
          </div>
        </div>
        
      <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan1Open=false">取消</div>
          <div class="baocun">保存</div>
        </div>
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
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">教育经历</font>
            <font style="position:absolute;top:80rpx;left:20rpx;font-size:26rpx;color:gray;">提示：只需填写最高学历</font>
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">学历</font>
            <input placeholder="后续需改成选择器" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">学校名称</font>
            <input placeholder="后续需改成选择器" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">专业</font>
            <input placeholder="后续需改成选择器" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">时间段</font>
            <input placeholder="后续需改成选择器" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">在校经历</font>
            <input placeholder="后续需改成选择器" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
        </div>
        <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan2Open=false">取消</div>
          <div class="baocun">保存</div>
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
      //个人信息编辑开关
      tan1Open:false,
      //教育经历编辑开关
      tan2Open:false,
      //性别开关
      sexOpen:true,
      //用户授权信息
      wxUserinfo:'',
      //个人信息数据
      personal:{name:'陈伟畅',sex:'男',age:'22',wxNum:'chen12354666',email:''},
      //教育经历数据
      education:{school:'清华大学',grade:'本科'}
    }
  },

  components: {
    card
  },

  methods: {
    
  },

  created () {
    // let app = getApp()
    //获取缓存中用户的授权信息
    this.wxUserinfo=wx.getStorageSync('userInformation')
    console.log(this.wxUserinfo)
  }
}
</script>

<style scoped>
.zhaozi{width:100%;height: 100%;background: rgba(128, 128, 128, 0.603);position: fixed;top:0;}
.xiaoshi{display:none;}
.box1{position: relative;width:90%;height: 230rpx;background: white;margin-left:5%;border-bottom: 4rpx solid rgba(128, 128, 128, 0.356);}
.box1 .touxiang{border-radius:50%;width:160rpx;height:160rpx;position: absolute;right:10rpx;top:20rpx;}
.box2{position: relative;width:90%;height: 230rpx;background: white;margin-left:5%;border-bottom: 4rpx solid rgba(128, 128, 128, 0.356);}
.tan1{position:absolute;width: 80%;height: 85%;left:10%;top:5%;border: 1rpx solid black;border-radius: 30rpx;background: #c9d8f3ee;}
.tan1 .xinxi{width: 100%;height: 90%;border-bottom: 1rpx solid #6495ED;border-radius: 30rpx;background: #c9d8f3ee;overflow-y: auto;}
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
