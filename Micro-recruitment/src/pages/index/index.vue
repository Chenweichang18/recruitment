<template>
  <div>
    <!-- 顶部logo和背景区域 -->
    <div class="topBack">
      <img src="/static/tabs/logo.png" class="logo" alt="">
    </div>
    <!-- 中间内容区域 -->
    <div class="middleBody">
      <!-- 搜索栏 -->
      <div class="search" @blur="noHistory">
        <input v-model="searchInput" type="text" class="searchInput" placeholder="搜索职位或公司" @focus="seeHistory" @blur="noHistory">
        <img src="/static/images/search.png" class="searchLogo" alt="" @click="search">
        <!-- <div v-if="openHistory" class="searchHistory">
          <font style="color: #6495ED;position:absolute;left:30rpx;">近期搜索</font>
          <img src="/static/images/delect.png" style="width:40rpx;height:40rpx;position:absolute;right:30rpx;" alt="" @touchstart.stop="searchDelete">
          <div style="width:90%;height:200rpx;position:absolute;left:5%;top:150rpx;">
            <div @touchstart.stop="searchIcon(item)" class="hisicon" v-for="item in historyList" :key="item">{{item}}</div>
          </div>
        </div> -->
      </div>
      <!-- 内容列表 -->
      <div class="content">
        <!-- 内容区域顶部三个按钮：推荐、附近、筛选 -->
        <font style="display:inline-block;" :style="btnType==true?'color: green;':'color:gray;'" @click="tuijian">推荐</font>
        <font style="display:inline-block;" :style="btnType==false?'margin-left:20rpx;color:green;':'margin-left:20rpx;color:gray;'" @click="fujin">附近</font>
        <div class="shaixuan" @click="tcOpen=true">筛选</div>
        <!-- 加载中动画 -->
        <div v-if="loading1">
          <img src="/static/images/loading1.gif" style='width:80%;height:400rpx;margin-left:10%;' alt="载入动画">
        </div>
        <!-- 内容区域求职信息展示 -->
        <div class="xinxi">
          <div class="listone" v-for="item in tableData" :key="item" @click="clickJob(item.id)">
            <font class="name1">{{item.job}}</font>
            <font class="name2">{{item.money}}</font>
            <div style="position: absolute;top:80rpx;left:10rpx;">
              <font class="name3">{{item.company}}</font>
              <font class="name4">{{item.scale}}</font>
            </div>
            <div class="biaoqian">
              <div v-for="(icon,indexs) in item.label" :key="indexs" class="biaoqianOne">{{icon}}</div>
            </div>
              <img src="/static/images/hr.png" style="position: absolute;bottom:5rpx;left:10rpx;width:50rpx;height:50rpx;" alt="">
              <font class="name5">{{item.hr}}</font>
              <font class="name6">{{item.place}}</font>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <!-- 遮罩层 -->
    <div v-if="tcOpen" style='width:100%;height: 100%;background: rgba(128, 128, 128, 0.603);position: fixed;top:0;z-index:9999;'>
      <div style="position:absolute;width:80%;height:90%;left:10%;top:5%;background:white;border-radius:50rpx;overflow-y: auto;">
        <!-- 学历要求 -->
        <div style="font-size:40rpx;margin-top:30rpx;margin-left:5%;">学历要求</div>
        <div style="width:90%;margin-top:20rpx;margin-left:5%;height:200rpx;">
          <div :style="item.educationType?'border:1rpx solid #6495ED;color:#6495ED;':''"
                class="educationIcon" v-for="item in educationList" :key="item.label" @click="changeEducationicon(index)">
           {{item.label}}
          </div>
        </div>
        <!-- 经验要求 -->
        <div style="font-size:40rpx;margin-top:30rpx;margin-left:5%;clear: left;">经验要求</div>
        <div style="width:90%;margin-top:20rpx;margin-left:5%;height:200rpx;">
          <div :style="item.expType?'border:1rpx solid #6495ED;color:#6495ED;':''"
                class="educationIcon" v-for="item in expList" :key="item.label" @click="changeExpicon(index)">
           {{item.label}}
          </div>
        </div>
        <!-- 公司规模要求 -->
        <div style="font-size:40rpx;margin-top:30rpx;margin-left:5%;clear: left;">公司规模</div>
        <div style="width:90%;margin-top:20rpx;margin-left:5%;height:200rpx;">
          <div :style="item.emType?'border:1rpx solid #6495ED;color:#6495ED;':''"
                class="educationIcon" v-for="item in emList" :key="item.label" @click="changeEmicon(index)">
           {{item.label}}
          </div>
        </div>
        <!-- 行业分类要求 -->
        <div style="font-size:40rpx;margin-top:30rpx;margin-left:5%;clear: left;">行业分类</div>
        <div style="width:90%;margin-top:20rpx;margin-left:5%;height:200rpx;">
          <div :style="item.expType?'border:1rpx solid #6495ED;color:#6495ED;':''"
                class="educationIcon" v-for="item in expList" :key="item.label" @click="changeExpicon(index)">
           {{item.label}}
          </div>
        </div>
        <!-- 弹窗确定按钮 -->
        <div @click="tcOpen=false" class="tcBtn" style="display:flex;justify-content:center;align-items:center;">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      //载入动画
      loading1:true,
      //筛选弹窗状态
      tcOpen:false,
      //推荐、附件按钮状态
      btnType:true,
      openHistory:false,
      //历史记录数组
      historyList:['测试','测试','测试'],
      searchInput:'',
      tableData:[],
      //测试数组
      ceshi: [{zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']}],
      educationList:[{educationType:true,label:'不限'},{educationType:false,label:'初中及以下'},{educationType:false,label:'中专/中技'},{educationType:false,label:'高中'},{educationType:false,label:'大专'},{educationType:false,label:'本科'},{educationType:false,label:'硕士'},{educationType:false,label:'博士'}],
      expList:[{expType:true,label:'不限'},{expType:false,label:'实习生'},{expType:false,label:'应届生'},{expType:false,label:'1年以内'},{expType:false,label:'1-3年'},{expType:false,label:'3-5年'},{expType:false,label:'5-10年'},{expType:false,label:'10年以上'}],
      emList:[{emType:true,label:'不限'},{emType:false,label:'0-20人'},{emType:false,label:'20-99人'},{emType:false,label:'100-499人'},{emType:false,label:'500-999人'},{emType:false,label:'1000-9999人'},{emType:false,label:'10000人'}],
      
    }
  },

  components: {
    card
  },

  methods: {
    //搜索框获取焦点事件
    seeHistory(){
      this.openHistory=true
    },
    //搜索框失去焦点事件
    noHistory(){
        this.openHistory=false
    },
    //搜索方法
    search(){
      this.historyList.push(this.searchInput)
      var that = this
      this.$http.get("/work/getMohu",{name:JSON.stringify(this.searchInput)}
          ).then((res)=>{
            //输出请求数据
            res.data.data.forEach(item=>{
              item.label = JSON.parse(item.label)
            })
            that.tableData = res.data.data

            
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    //清除搜索记录
    searchDelete(){
      this.historyList=[]
      /* setTimeout(() => {
        this.seeHistory()
      }, 10); */
    },
    //点击历史记录进行搜索
    searchIcon(name){
      this.searchInput=name
      this.search()
    },
    //推荐方法
    tuijian(){
      this.btnType=true
      this.loading1=true
      this.tableData=[]
      setTimeout(() => {
        this.getAllwork()
      }, 1000);
    },
    //附近方法
    fujin(){
      this.btnType=false
      this.loading1=true
      this.tableData=[]
      setTimeout(() => {
        this.getCitywork()
      }, 1000);
    },
    //修改学历要求按钮状态
    changeEducationicon(index){
      this.educationList.forEach(item=>{
        item.educationType=false
      })
      this.educationList[index].educationType=true;
    },
    //修改经验要求按钮状态
    changeExpicon(index){
      this.expList.forEach(item=>{
        item.expType=false
      })
      this.expList[index].expType=true;
    },
    //修改公司规模要求按钮状态
    changeEmicon(index){
      this.emList.forEach(item=>{
        item.emType=false
      })
      this.emList[index].emType=true;
    },
    //获取所有职位接口
    getAllwork(){
      var that=this
      this.$http.get("/work/getAll",{}
          ).then((res)=>{
            //输出请求数据
            //console.log(res.data)
            res.data.data.forEach(item=>{
              item.label = JSON.parse(item.label)
            })
            that.tableData=res.data.data
            that.loading1=false
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    //获取附近职位接口
    getCitywork(){
      var that=this
      this.$http.get("/work/getCitywork",{city:wx.getStorageSync('city')}
          ).then((res)=>{
            //输出请求数据
            //console.log(res.data)
            res.data.data.forEach(item=>{
              item.label = JSON.parse(item.label)
            })
            that.tableData=res.data.data
            that.loading1=false
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    //职位的点击跳转事件
    clickJob(id){
      wx.navigateTo({
        url: '../details/main?id='+id
    })
    },
  },
  mounted () {
    this.getAllwork()
  },
  created () {
    var that = this
    // let app = getApp()
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          /* that.$http.get("/login/getopenid",{code:res.code}).then((res)=>{
            //输出请求数据
            console.log(res.data)
          }).catch(err=>{
            console.log(err.status,err.message)
          }) */
          wx.request({
            url: 'http://localhost:3000/login/getopenid?code='+res.code,
              success (res) {
              console.log(res.data)
              wx.setStorageSync('openid',res.data.openid)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  }
}
</script>
<style>
page{
  background: rgba(128, 128, 128, 0.068);
}
</style>
<style scoped>
.topBack{
  width:100%;
  height: 200rpx;
  background: #6495ED;
}
.logo{
  width:350rpx;
  height:50rpx;
  position: absolute;
  left:30rpx;
  top:40rpx;
}
.middleBody{
  width: 95%;
  height: 92%;
  background: white;
  position: absolute;
  top: 100rpx;
  left: 2.5%;
  border-radius: 50rpx;
}
.search{
  display: flex;
  align-items: center;
  width:80%;
  position: absolute;
  top: 40rpx;
  left: 10%;
  border-radius: 50rpx;
  background: rgba(128, 128, 128, 0.219);
}
.searchInput{
  width:80%;
  margin-left: 30rpx;
  height:80rpx;
  display: inline-block;
}
.searchLogo{
  width: 40rpx;
  height: 40rpx;
  display: inline-block;
  margin-left: 20rpx;
}
.searchHistory{
  width: 100%;
  height: 300rpx;
  border-radius: 50rpx;
  z-index: 1;
}
.hisicon{
  display: inline-block;
  margin-right: 20rpx;
  margin-bottom: 10rpx;
  color: rgb(233, 77, 103);
}
.content{
  height: 80%;
  margin-top: 150rpx;
  margin-left: 5%;
  width: 90%;
}
.shaixuan{
  float: right;
  margin-right: 20rpx;
  color: orange;
}
.xinxi{
  overflow-y: auto;
  height: 95%;
  margin-top: 30rpx;
}
.listone{
  height: 250rpx;
  border-bottom:5rpx solid rgba(128, 128, 128, 0.185);
  margin-bottom: 5rpx;
  position: relative;
}
.listone .name1{position: absolute;font-size: 46rpx;top:10rpx;left:10rpx;}
.listone .name2{position: absolute;font-size: 30rpx;top:15rpx;right:10rpx;color:#6495ED;}
.listone .name3{font-size: 30rpx;color:rgb(87, 85, 85);}
.listone .name4{font-size: 30rpx;margin-left:20rpx;color:rgb(87, 85, 85);}
.listone .name5{position: absolute;bottom:0rpx;left:50rpx;font-size: 30rpx;margin-left: 20rpx;margin-bottom: 10rpx;}
.listone .name6{position: absolute;font-size: 30rpx;bottom:20rpx;right:10rpx;}
.listone .biaoqian{position: absolute;top:130rpx;left:10rpx;}
.listone .biaoqian .biaoqianOne{display: inline-block;font-size: 30rpx;margin-right: 20rpx;background: rgba(128, 128, 128, 0.082);border-radius: 10rpx;padding-left:10rpx;padding-right: 10rpx;color:rgba(68, 67, 67, 0.808);}
.educationIcon{display:flex;width:170rpx;margin-right:10rpx;margin-bottom:20rpx;height:70rpx;float:left;background:rgb(245,245,245);font-size:26rpx;justify-content: center;align-items: center;}
.tcBtn{position: fixed;width:30%;height:100rpx;background:#6494edb0;bottom:80rpx;left:35%;border-radius:30rpx;}
</style>
