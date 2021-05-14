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
                    <img :class="item.get?'animated rubberBand':''" :src="item.get?'/static/images/bixin-active.png':'/static/images/bixin.png'" style="width:50rpx;height:50rpx;" alt="">
                    <div :class="item.get?'fontRed':''" style="display:inline-block;">Get</div>
                  </div>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <!-- 下方区域发布按钮 -->
    <div class="allBtn">
      <div :class="ball?'xianshi animated fadeInUp':'xiaoshi'">
        <div class="fabuBtn" @click="boxOpen1=true">动态</div>
        <div class="fabuBtn" @click="boxOpen2=true">面经</div>
      </div>
      <div :class="ball?'fabu animated jello':'fabu'">
        <img src="/static/images/ball.png" style="width:140rpx;height:140rpx;margin-top:-2rpx;" alt="" @click="fabu">
      </div>
    </div>
    <!-- 发布动态框 -->
    <div :class="boxOpen1?'textBox1 animated fadeInUp':'xiaoshi'">
      <div style="width:80%;border-bottom:2rpx solid gray;margin:10rpx auto;display:flex;justify-content:center;">动态</div>
      <textarea v-model="fabudongtai" name="" id="" cols="30" rows="10" style="border:2rpx solid gray;width:90%;margin:10rpx auto;"></textarea>
      <div style="margin:40rpx auto;width:320rpx;">
        <div style="display:flex;justify-content:center;align-items:center;float:left;background:gray;width:150rpx;height:70rpx;color:white;border-radius:20rpx;" @click="boxOpen1=false">取消</div>
        <div @click="fabule" style="display:flex;justify-content:center;align-items:center;float:right;background:#6495ED;width:150rpx;height:70rpx;color:white;border-radius:20rpx;">发布</div>
      </div>
      
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      fabudongtai:'',
      swiperIndex: 1,
      swiperIndex2: 0,
      //请求海报测试数组
      pic:[{'url':'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1500171548,4027027265&fm=26&gp=0.jpg'},
           {'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fatt3.citysbs.com%2Fm320x%2Fhangzhou%2F2012%2F10%2F25%2F11%2F110819_12101351134499680_453c2d33af5f30c11959416dbfba8072.jpg&refer=http%3A%2F%2Fatt3.citysbs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618161243&t=b448f6f0357eda7e7785b0187965c323'},
           {'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi2.img.969g.com%2Ffs%2Fimgx2011%2F09%2F13%2F114_092450_ccdd2.jpg&refer=http%3A%2F%2Fi2.img.969g.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618161291&t=b24dfd4c5b8d694f443b5b161a8a4b31'}],
      //动态的三个状态控制
      open1:true,
      open2:false,
      open3:false,
      //发布气泡状态控制
      ball:false,
      //动态、面经状态控制
      boxOpen1:false,
      boxOpen2:false,
      listNum:[],
      dongtai:[{user:'小明',text:'今天没复习，好多都忘了，感觉好丢人！！!',zanType:false,caiType:false},
               {user:'小东',text:'今天没复习，好多都忘了，感觉好丢人！！!',zanType:false,caiType:false},
               {user:'小红',text:'今天没复习，好多都忘了，感觉好丢人！！!',zanType:false,caiType:false},
               {user:'小郭',text:'今天没复习，好多都忘了，感觉好丢人！！!',zanType:false,caiType:false}],
      mianjing:[{user:'小芳',text:'面试官老是问我http机制，你们记得复习!'},
               {user:'小西',text:'面试官老是问我http机制，你们记得复习!'},
               {user:'小政',text:'面试官老是问我http机制，你们记得复习!'},
               {user:'小福',text:'面试官老是问我http机制，你们记得复习!'}],
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
    getDT(){
      var that = this
      this.$http.get("/user/getAlldt"
          ).then((res)=>{
            //输出请求数据
            //console.log(res.data)
            that.dongtai = res.data.data
            that.listNum=that.dongtai
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    getMJ(){
      var that = this
      this.$http.get("/user/getAllmj"
          ).then((res)=>{
            //输出请求数据
            //console.log(res.data)
            that.mianjing = res.data.data
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    getTM(){
      var that = this
      this.$http.get("/user/getAlltm"
          ).then((res)=>{
            //输出请求数据
            //console.log(res.data)
            that.timu = res.data.data
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    fabule(){
      var that =this;
      this.$http.post("/user/fabudt",{user:'Chen',text:this.fabudongtai}
          ).then((res)=>{
            //输出请求数据
            //console.log(res.data)
            that.dongtai.push({user:'Chen',text:this.fabudongtai,zanType:false,caiType:false})
            that.boxOpen1=false;
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
      
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
    },
    //发布的方法
    fabu(){this.ball=!this.ball},
  },

  created () {
    // let app = getApp()
    this.getDT()
    this.getMJ()
    this.getTM()
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
.xianshi{display: block;}
.xiaoshi{display:none;}
.fontRed{color:red;}
.fabu{width:140rpx;height:137rpx;border-radius:50%;background:#6495ED;margin:0 auto;}
.allBtn{position:fixed;margin:auto;left:0;right:0;bottom:0rpx;width:260rpx;}
.fabuBtn{display:inline-block;background:rgba(128, 128, 128, 0.39);color:white;margin-left:13.9rpx;border-radius:20rpx;margin-bottom:20rpx;font-size:36rpx;padding:20rpx;}
.textBox1{position: absolute;width:60%;height:500rpx;left:20%;top:200rpx;background:#bbdee4;border-radius: 30rpx;}
</style>
