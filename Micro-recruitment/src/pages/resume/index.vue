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

    <!-- 求职期望区域 -->
    <div class="box3">
      <div style="position:absolute;top:30rpx;width:100%;">
        <font style="font-size:46rpx;font-weight:900;">求职期望</font>
        <img @click="tan3Open=true" src="/static/images/edit2.png" style="width:50rpx;height: 50rpx;margin-right:10rpx;margin-top:1rpx;float:right;" alt="">
      </div>
      <div style="position: absolute;top:120rpx;">
        <font style="font-size:36rpx;color:rgb(87, 87, 87);">{{expect.city}}-{{expect.job}}</font>
      </div>
    </div>

    <!-- 技能特长区域 -->
    <div class="box4">
      <div style="position:absolute;top:30rpx;width:100%;">
        <font style="font-size:46rpx;font-weight:900;">技能特长</font>
        <img @click="tan4Open=true" src="/static/images/edit2.png" style="width:50rpx;height: 50rpx;margin-right:10rpx;margin-top:1rpx;float:right;" alt="">
      </div>
      <div style="position: absolute;top:120rpx;overflow:hidden;height:100rpx;">
        <font style="font-size:36rpx;color:rgb(87, 87, 87);">{{power.label}}</font>
      </div>
    </div>

    <!-- 项目经验区域 -->
    <div class="box5">
      <div style="position:absolute;top:30rpx;width:100%;">
        <font style="font-size:46rpx;font-weight:900;">项目经验</font>
        <img @click="tan5Open=true" src="/static/images/add.png" style="width:60rpx;height: 60rpx;margin-right:10rpx;margin-top:1rpx;float:right;" alt="">
      </div>
    </div>

    <!-- 工作经历区域 -->
    <div class="box6">
      <div style="position:absolute;top:30rpx;width:100%;">
        <font style="font-size:46rpx;font-weight:900;">工作经历</font>
        <img @click="tan6Open=true" src="/static/images/add.png" style="width:60rpx;height: 60rpx;margin-right:10rpx;margin-top:1rpx;float:right;" alt="">
      </div>
    </div>

<!-- 弹窗 -->
    <!-- 个人信息 -->
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
            <input type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;" v-model="tableData[0].name">
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
            <input type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;" v-model="tableData[0].wx_number">
          </div>
          <!-- 邮箱 -->
          <div class="email">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">邮箱</font>
            <input placeholder="选填" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;" v-model="tableData[0].email">
          </div>
        </div>
        
      <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan1Open=false">取消</div>
          <div class="baocun" @click='tan1Open=false' >保存</div>
        </div>
    </div>
    </div>

    <!-- 教育经历 -->
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
            <input v-model="tableData[0].education" placeholder="本科" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">学校名称</font>
            <input v-model="tableData[0].schoolName" placeholder="华南理工大学广州学院" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">专业</font>
            <input v-model="tableData[0].major" placeholder="软件工程" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">时间段</font>
            <input v-model="tableData[0].time_slot" placeholder="2017.09-2021.06" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">在校经历</font>
            <input placeholder="无" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
        </div>
        <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan2Open=false">取消</div>
          <div class="baocun" @click='tan2Open=false'>保存</div>
        </div>
      </div>
    </div>

    <!-- 教育经历 -->
    <!-- 弹窗模态遮罩层实现 -->
    <div v-if="tan3Open" class="zhaozi">
      <!-- 教育经历弹窗 -->
      <div class="tan1 animated slideInRight">
        <!-- 弹窗内上半部分内容，下半部分是两个按钮 -->
        <div class="xinxi">
          <!-- 顶部文字 -->
          <div style="position:relative;width:95%;height:100rpx;margin-left:2.5%;margin-top:30rpx;">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">求职期望</font>
            <font style="position:absolute;top:80rpx;left:20rpx;font-size:26rpx;color:gray;">提示：会根据求职期望进行职位推送</font>
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">工作城市</font>
            <input v-model="tableData[0].expectCity" placeholder="广州" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">期望职位</font>
            <input v-model="tableData[0].expectJob" placeholder="前端开发" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">期望薪酬</font>
            <input v-model="tableData[0].expectMoney" placeholder="10k" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
        </div>
        <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan3Open=false">取消</div>
          <div class="baocun" @click='tan3Open=false'>保存</div>
        </div>
      </div>
    </div>

    <!-- 技能特长 -->
    <!-- 弹窗模态遮罩层实现 -->
    <div v-if="tan4Open" class="zhaozi">
      <!-- 技能特长弹窗 -->
      <div class="tan1 animated slideInRight">
        <!-- 弹窗内上半部分内容，下半部分是两个按钮 -->
        <div class="xinxi">
          <!-- 顶部文字 -->
          <div style="position:relative;width:95%;height:100rpx;margin-left:2.5%;margin-top:30rpx;">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">技能特长</font>
            <font style="position:absolute;top:80rpx;left:20rpx;font-size:26rpx;color:gray;">简洁的写出自己的优势</font>
          </div>
          <div class="tx" style="height:550rpx;">
            <textarea v-model="tableData[0].skill" name="" id="" maxlength='200' autofocus style="width:90%;height:500rpx;position:absolute;left:20rpx;line-height:46rpx;"></textarea>
            <!-- <input type="text" style="width:90%;height:70rpx;position:absolute;left:20rpx;"> -->
          </div>
          <!-- 字数限制 -->
          <div style="position:absolute;bottom:250rpx;right:22rpx;">
            <font style="color:#6495ED;">{{power.label.length}}</font>
            <font style="color:gray;">/200</font>
          </div>
          
        </div>
        <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan4Open=false">取消</div>
          <div class="baocun" @click='tan4Open=false'>保存</div>
        </div>
      </div>
    </div>

    <!-- 项目经验 -->
    <!-- 弹窗模态遮罩层实现 -->
    <div v-if="tan5Open" class="zhaozi">
      <!-- 技能特长弹窗 -->
      <div class="tan1 animated slideInRight">
        <!-- 弹窗内上半部分内容，下半部分是两个按钮 -->
        <div class="xinxi">
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">项目名称</font>
            <input v-model="tableData[0].project_name" placeholder="微招聘小程序" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">担任角色</font>
            <input v-model="tableData[0].project_role" placeholder="前端开发" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">时间段</font>
            <input v-model="tableData[0].project_time" placeholder="2020.12-2021.03" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx" style="height:400rpx;">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">项目内容</font>
            <textarea  v-model="tableData[0].project_content" placeholder="测试测试测试" name="" id="" maxlength='200' autofocus style="width:90%;height:350rpx;position:absolute;top:80rpx;left:20rpx;line-height:46rpx;"></textarea>
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">技术栈</font>
            <input placeholder="vue、mpvue、node" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">作品链接</font>
            <input placeholder="暂无" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
        </div>
        <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan5Open=false">取消</div>
          <div class="baocun" @click='tan5Open=false'>保存</div>
        </div>
      </div>
    </div>

    <!-- 项目经验 -->
    <!-- 弹窗模态遮罩层实现 -->
    <div v-if="tan6Open" class="zhaozi">
      <!-- 技能特长弹窗 -->
      <div class="tan1 animated slideInRight">
        <!-- 弹窗内上半部分内容，下半部分是两个按钮 -->
        <div class="xinxi">
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">公司名称</font>
            <input v-model="tableData[0].work_conName" placeholder="龙玩互娱科技有限公司" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">担任职务</font>
            <input v-model="tableData[0].work_job" placeholder="前端开发实习生" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">时间段</font>
            <input v-model="tableData[0].work_time" placeholder="2020.09-2020.12" type="text" style="width:90%;height:70rpx;position:absolute;top:80rpx;left:20rpx;border-bottom:1rpx solid gray;">
          </div>
          <div class="tx" style="height:400rpx;">
            <font style="position:absolute;top:20rpx;left:20rpx;font-size:36rpx;">工作内容</font>
            <textarea v-model="tableData[0].work_content" placeholder="测试测试测试" name="" id="" maxlength='200' autofocus style="width:90%;height:350rpx;position:absolute;top:80rpx;left:20rpx;line-height:46rpx;"></textarea>
          </div>
        </div>
        <!-- 保存、取消按钮 -->
        <div class="btn1">
          <div class="quxiao" @click="tan6Open=false">取消</div>
          <div class="baocun" @click='tan6Open=false'>保存</div>
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
      //求职期望编辑开关
      tan3Open:false,
      //技能特长编辑开关
      tan4Open:false,
      //项目经验编辑开关
      tan5Open:false,
      //工作经历编辑开关
      tan6Open:false,
      //性别开关
      sexOpen:true,
      //用户授权信息
      wxUserinfo:'',
      //个人信息数据
      personal:{name:'陈伟畅',sex:'男',age:'22',wxNum:'chen12354666',email:''},
      //教育经历数据
      education:{school:'华南理工大学广州学院',grade:'本科'},
      //技能特长数据
      power:{label:"熟练使用HTML、CSS、JS进行页面布局。熟悉jquery，Vue框架技术。熟悉Element组件库开发。熟悉小程序开发，对响应式布局、移动端开发布局有一定了解。 了解bootstrap，弹性盒子布局，AJAX异步通信技术，ES6，能运用Git版本控制管理工具进行团队协作开发，了解svn，了解Webpack,具备良好的代码风格"},
      //求职期望数据
      expect:{city:'广州',job:'web前端',money:'10000'},
      tableData:[]
    }
  },

  components: {
    card
  },

  methods: {
    getData(){
      var that = this
      this.$http.get("/user/getOne",{openid:JSON.stringify(wx.getStorageSync('openid'))}
          ).then((res)=>{
            //输出请求数据
            //console.log(res.data)
            that.tableData = res.data.data
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    }
  },

  created () {
    // let app = getApp()
    //获取缓存中用户的授权信息
    this.wxUserinfo=wx.getStorageSync('userInformation')
    console.log(this.wxUserinfo)
    this.getData()
  }
}
</script>

<style scoped>
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
