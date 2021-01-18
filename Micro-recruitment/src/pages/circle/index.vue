<template>
  <div @click="clickHandle">
    <!-- 卡片式轮播图-校园宣讲会 -->
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
    <!-- 动态 -->
    <div class="dynamic">
      <!-- 左侧三个按钮组件 动态、面经、题目 -->
      <div class="btn" style="float:left;">
        <div :class="open1?'DT':'DT-active'" @click="changeOpen1">动态</div>
        <div :class="open2?'DT':'DT-active'" @click="changeOpen2">面经</div>
        <div :class="open3?'DT':'DT-active'" @click="changeOpen3">题目</div>
      </div>
      <!-- 右侧内容区域 -->
      <div class="right" style="float: left;">
        <swiper style="padding-top:20rpx;padding-bottom:20rpx;height:480rpx;"
            previous-margin="0rpx" next-margin="0rpx" @change="bindchange2"
            :current="swiperIndex2" :autoplay='true' :interval='8000' :vertical='true'
            :duration='3000' :circular='true'>
          <!--  动态  -->
          <swiper-item v-for="item in listNum" :key="item.index">
            <div :class="swiperIndex2==index?'active':'quiet'">
              <!-- 动态组件 -->
              <div v-if="open1" class="neirong" style="position:relative;">
                  <div style="display:flex;align-items:center;margin-bottom:10rpx;">
                    <img src="/static/images/dongtai.png" style="margin-right:10rpx;width:80rpx;height:80rpx;" alt="">
                    {{item.user}}
                  </div>
                  <p>{{item.text}}</p>
                  <!-- 点赞 -->
                  <!-- +1 -1效果 -->
                  <div style="position:absolute;right:28rpx;bottom:25rpx;">
                    <div :class="item.caiType?'animated fadeOutUp':'xiaoshi'" style="margin-right:70rpx;color:#1296db;">-1</div>
                    <div :class="item.zanType?'animated fadeOutUp':'xiaoshi'" style="color: rgb(255,103,103);">+1</div>
                  </div>
                  <div style="position:absolute;right:20rpx;bottom:10rpx;">
                    <img :class="item.caiType?'animated rubberBand':''" :src="item.caiType?'/static/images/cai-active.png':'/static/images/cai.png'" style="width:50rpx;height:50rpx;margin-right:20rpx;margin-top:10rpx;display:block;float:left;" alt="" @click="caiDT(index)">
                    <img :class="item.zanType?'animated rubberBand':''" :src="item.zanType?'/static/images/zan-active.png':'/static/images/zan.png'" style="width:50rpx;height:50rpx;" alt="" @click="zanDT(index)">
                  </div>
              </div>
              <!-- 面经组件 -->
              <div v-if="open2" class="neirong">
                  <div style="display:flex;align-items:center;margin-bottom:10rpx;">
                    <img src="/static/images/dongtai.png" style="margin-right:10rpx;width:80rpx;height:80rpx;" alt="">
                    {{item.user}}
                  </div>
                  <p>{{item.text}}</p>
              </div>
              <!-- 题目组件 -->
              <div v-if="open3" class="neirong" style="position:relative;">
                  <div style="display:flex;align-items:center;margin-bottom:10rpx;">
                    <img src="/static/images/xiaowei.png" style="margin-right:10rpx;width:80rpx;height:80rpx;" alt="">
                    小微讲知识
                  </div>
                  <p>{{item.text}}</p>
                  <!-- get技能 -->
                  <div style="position:absolute;right:25rpx;bottom:20rpx;" @click="item.get=!item.get">
                    <img :class="item.get?'animated rubberBand':''" :src="item.get?'/static/images/bixin-active.png':'/static/images/bixin.png'" style="width:50rpx;height:50rpx;" alt="" @click="getTM(index)">
                    <div :class="item.get?'fontRed':''" style="display:inline-block;">Get</div>
                  </div>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      swiperIndex: 1,
      swiperIndex2: 0,
      //请求海报测试数组
      pic:[{'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages6.fanpop.com%2Fimage%2Fphotos%2F33500000%2FEmma-Watson-emma-watson-33575961-1920-1200.jpg&refer=http%3A%2F%2Fimages6.fanpop.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613460178&t=0c0f0e71782e6ca08f58b53ceaa75961'},
           {'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ivsky.com%2Fimg%2Fbizhi%2Fpre%2F201401%2F05%2Femma_watson-001.jpg&refer=http%3A%2F%2Fimg.ivsky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613541770&t=2f397fc81ae3d06e0b2ccbff13955fa7'},
           {'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F58ec9b08ec2f1.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613460178&t=3642669eba443e8daee370f1be1aa950'}],
      open1:true,
      open2:false,
      open3:false,
      listNum:[],
      dongtai:[{user:'黎明',text:'今天面试官把我批了一顿!',zanType:false,caiType:false},
               {user:'刘德华',text:'今天面试官把我批了一顿!',zanType:false,caiType:false},
               {user:'张学友',text:'今天面试官把我批了一顿!',zanType:false,caiType:false},
               {user:'郭富城',text:'今天面试官把我批了一顿!',zanType:false,caiType:false}],
      mianjing:[{user:'黎明',text:'面试官老是问我http机制，你们记得复习!'},
               {user:'刘德华',text:'面试官老是问我http机制，你们记得复习!'},
               {user:'张学友',text:'面试官老是问我http机制，你们记得复习!'},
               {user:'郭富城',text:'面试官老是问我http机制，你们记得复习!'}],
      timu:   [{text:'实现居中的方法有flex布局！',get:false},
               {text:'实现居中的方法有flex布局！',get:false},
               {text:'实现居中的方法有flex布局！',get:false},
               {text:'实现居中的方法有flex布局！',get:false}],
      
    }
  },

  components: {
    card
  },

  methods: {
    //卡片式轮播图组件方法：获取当前轮播图下标
    bindchange(e) {
      this.swiperIndex=e.mp.detail.current
    },
    bindchange2(e) {
      this.swiperIndex2=e.mp.detail.current
    },
    //修改动态按钮状态
    changeOpen1(){
      if(this.open2==true||this.open3==true)
      {
        this.open1=true
        this.open2=false
        this.open3=false
        this.listNum=this.dongtai
      }
    },
    changeOpen2(){
      if(this.open1==true||this.open3==true)
      {
        this.open1=false
        this.open2=true
        this.open3=false
        this.listNum=this.mianjing
      }
    },
    changeOpen3(){
      if(this.open1==true||this.open2==true)
      {
        this.open1=false
        this.open2=false
        this.open3=true
        this.listNum=this.timu
      }
    },
    //动态的赞和踩方法
    zanDT(index){
      var node=this.dongtai[index]
      if(node.caiType==false) node.zanType=!node.zanType
      if(node.caiType==true) { node.zanType=!node.zanType; node.caiType=false}
    },
    caiDT(index){
      var node=this.dongtai[index]
      if(node.zanType==false) node.caiType=!node.caiType
      if(node.zanType==true) { node.caiType=!node.caiType; node.zanType=false}
    }
  },

  created () {
    // let app = getApp()
    this.listNum=this.dongtai
  }
}
</script>
<style>
page{
  background: rgba(128, 128, 128, 0.068);
}
</style>
<style scoped>
img{border-radius: 30rpx;}
.active {transform: none;transition: all 0.2s ease-in 0s;} 
.quiet {transform: scale(0.85);transition: all 0.2s ease-in 0s;}
.dynamic{padding-top:20rpx;width:95%;height: 500rpx;background: white;margin-left: 2.5%;margin-top: 50rpx;border-radius: 50rpx;}
.dynamic .btn{width:20%;height:460rpx;padding-top: 20rpx;border-right: 1rpx solid rgba(128, 128, 128, 0.301);}
.DT{margin-left:30rpx;margin-bottom:20rpx;font-size: 36rpx;color: #6495ED;}
.DT-active{margin-left:30rpx;margin-bottom:20rpx;font-size:36rpx;color:gray;}
.dynamic .right{width:70%;margin-left:5%;height:460rpx;border-radius: 30rpx;}
.neirong{padding:20rpx;margin-left:5%;background: #6494ed1c;width:90%;min-height:300rpx;border-radius:30rpx;}
.xiaoshi{display:none;}
.fontRed{color:red;}
</style>
