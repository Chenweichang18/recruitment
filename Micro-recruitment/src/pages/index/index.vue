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
        <div v-if="openHistory" class="searchHistory">
          <font style="color: #6495ED;position:absolute;left:30rpx;">近期搜索</font>
          <img src="/static/images/delect.png" style="width:40rpx;height:40rpx;position:absolute;right:30rpx;" alt="" @touchstart.stop="searchDelete">
          <div style="width:90%;height:200rpx;position:absolute;left:5%;top:150rpx;">
            <div @touchstart.stop="searchIcon(item)" class="hisicon" v-for="item in historyList" :key="item">{{item}}</div>
          </div>
        </div>
      </div>
      <!-- 内容列表 -->
      <div class="content">
        <!-- 内容区域顶部三个按钮：推荐、附近、筛选 -->
        <font style="color: green;">推荐</font>
        <font style="margin-left:20rpx;color:gray;">附近</font>
        <div class="shaixuan">筛选</div>
        <!-- 内容区域求职信息展示 -->
        <div class="xinxi">
          <div class="listone animated bounceInUp" v-for="item in ceshi" :key="item.gongsi">
            <font class="name1">{{item.zhiwei}}</font>
            <font class="name2">{{item.xinzi}}/天</font>
            <div style="position: absolute;top:80rpx;left:10rpx;">
              <font class="name3">{{item.gongsi}}</font>
              <font class="name4">{{item.guimo}}</font>
            </div>
            <div class="biaoqian">
              <div v-for="(icon,indexs) in item.biaoqian" :key="indexs" class="biaoqianOne">{{icon}}</div>
            </div>
              <img src="/static/images/hr.png" style="position: absolute;bottom:5rpx;left:10rpx;width:50rpx;height:50rpx;" alt="">
              <font class="name5">{{item.hr}}</font>
              <font class="name6">{{item.dizhi}}</font>
          </div>
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
      openHistory:false,
      //历史记录数组
      historyList:['测试','测试','测试'],
      searchInput:'',
      //测试数组
      ceshi: [{zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']},
              {zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马云',biaoqian:['vue','react','axios']}]
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
  margin-bottom: 20rpx;
}
.searchHistory{
  width: 100%;
  height: 300rpx;
  border-radius: 50rpx;
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
</style>
