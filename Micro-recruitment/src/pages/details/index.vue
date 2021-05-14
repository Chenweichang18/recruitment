<template>
  <div @click="clickHandle">
    <div class="header">
      <div class="job">{{tableData.job}}</div>
      <div class="money">{{tableData.money}}k</div>
      <div class="fujia">
        <img src="/static/images/dw.png" style="display:block;width:50rpx;height:50rpx;float:left;" alt="">
        <div style="float:left;margin-left:10rpx;width:30%;">{{tableData.place}}</div>
        <img src="/static/images/exp.png" style="display:block;width:40rpx;height:40rpx;float:left;margin-left:20rpx;margin-top:5rpx;" alt=""> 
        <div style="float:left;margin-left:10rpx;">{{tableData.exp}}</div>
        <img src="/static/images/xl.png" style="display:block;width:40rpx;height:40rpx;float:right;margin-left:20rpx;margin-top:5rpx;" alt=""> 
        <div style="float:left;margin-left:10rpx;">学历:{{tableData.edu}}</div>
      </div>
    </div>
    <div class="hr">
      <div style="height:120rpx;width:100%;">
        <img src="/static/images/hr2.png" style="width: 120rpx;height: 120rpx;border-radius:50%;display:block;float:left;margin-left:10rpx;" alt="">
        <div style="float:left;margin-left:10rpx;position:relative;width:70%;">
          <div style="position:absolute;left:20rpx;top:5rpx;">
            <div style="display:inline-block;font-weight: 800;font-size:40rpx;">{{tableData.hr}}</div>
            <font style="font-size:30rpx;margin-left:10rpx;color:gray;">3日内活跃</font>
          </div>
          <div style="position:absolute;left:20rpx;top:75rpx;font-size:32rpx;">{{tableData.company}}-经理</div>
        </div>
      </div>
    </div>
    <!-- 职能详情 -->
    <div style="height:500rpx;width:90%;margin-left:5%;margin-top:50rpx;">
      <div style="font-size:46rpx;font-weight:900;">职能详情</div>
      <p style="color:gray;margin-top:20rpx;font-size:36rpx;" v-for="item in skill" :key="item">{{item.id}}.{{item.label}}</p>
      <div class="biaoqian">
        <div v-for="(icon,indexs) in tableData.label" :key="indexs" class="biaoqianOne">{{icon}}</div>
      </div>
    </div>
    <!-- 底部按钮组合 -->
    <div style="width:100%;padding-left:5%;position:fixed;bottom:0;height:160rpx;background:white;display:flex;align-items:center;">
      <button open-type="share" style="position:absolute;left:25rpx;bottom:30rpx;width:100rpx;height:100rpx;opacity:0;z-index:1;" hover-class='none'></button>
      <div style="float:left;margin-left:10rpx;">
        <img src="/static/images/fx.png" style="width:60rpx;height:60rpx;display: block;" alt="">
        <div style="font-size:30rpx;">分享</div>
      </div>
      <div style="float:left;margin-left:50rpx;">
        <img @click="demo" class="animated bounceIn" :src="colType?'/static/images/sc-active.png':'/static/images/sc.png'" style="width:60rpx;height:60rpx;display: block;" alt="">
        <div style="font-size:30rpx;">收藏</div>
      </div>
      <div @click="toudi" style="font-size:40rpx;color:white;display: flex;align-items: center;justify-content:center;float:left;margin-left:60rpx;width:60%;height:60%;background:#6495ED;border-radius:10rpx;">
        投递简历
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      ceshi: [
              {id:1,label:'了解前端，热爱前端，能够积极主动地学习'},
              {id:2,label:'了解前端，热爱前端，能够积极主动地学习'},
              {id:3,label:'了解前端，热爱前端，能够积极主动地学习'},
              {id:4,label:'了解前端，热爱前端，能够积极主动地学习'},
              {id:5,label:'了解前端，热爱前端，能够积极主动地学习'},
              {id:6,label:'了解前端，热爱前端，能够积极主动地学习'},
             ],
      tableData:{},
      skill:[],
      biaoqian:['vue','react','axios'],
      colType:false
    }
  },

  components: {
    card
  },
  onShareAppMessage() {
    return {
      title: '微招聘小程序',
      desc: '最具人气的求职联盟!',
      path: '../details/main'
    }
  },
  methods: {
    toudi(){
      var that = this
      wx.showModal({
         title: '简历投递',
         content: '确定要向' + this.tableData.company + '公司投递简历吗',
         showCancel: true,//是否显示取消按钮
         cancelText:"否",//默认是“取消”
         cancelColor:'skyblue',//取消文字的颜色
         confirmText:"是",//默认是“确定”
         confirmColor: 'skyblue',//确定文字的颜色
         success: function (res) {
            if (res.cancel) {
               //点击取消,默认隐藏弹框
            } else {
               //点击确定
               that.$http.post("/work/touJL",{
                 id: that.tableData.id,
                 openid: wx.getStorageSync('openid')
               }
                ).then((res)=>{
                  //输出请求数据
                  wx.showToast({
                    title: '投递成功',//提示文字
                    duration:2000,//显示时长
                    mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
                    icon:'success', //图标，支持"success"、"loading"  
                    success:function(){ },//接口调用成功
                    fail: function () { },  //接口调用失败的回调函数
                    complete: function () { } //接口调用结束的回调函数  
                  })
                }).catch(err=>{
                  console.log(err.status,err.message)
                })
               
            }
         },
      })
    },
    
    demo(){
      var that=this
      this.$http.get("/work/colIn",{openid:JSON.stringify(wx.getStorageSync('openid')),workid:this.$mp.query.id}
          ).then((res)=>{
            //输出请求数据
            if(res.data.msg=="收藏成功") that.colType=true;
            if(res.data.msg=="已取消收藏") that.colType=false;

          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    //根据职位id初始化数据
    getDetails(id){
      this.skill=[]
      var that=this
      this.$http.get("/work/getDetailed",{id:id}
          ).then((res)=>{
            //输出请求数据
            console.log(res.data.data[0])
            res.data.data[0].label = JSON.parse(res.data.data[0].label)
            that.tableData=res.data.data[0]
            that.skill.push({id:1,label:res.data.data[0].skill1})
            that.skill.push({id:2,label:res.data.data[0].skill2})
            that.skill.push({id:3,label:res.data.data[0].skill3})
            that.skill.push({id:4,label:res.data.data[0].skill4})
            that.skill.push({id:5,label:res.data.data[0].skill5})
            //console.log(that.skill)
          }).catch(err=>{
            console.log(err.status,err.message)
          })
    },
    //查询是否收藏该职位
    getIfcol(workid){
      var that=this
      this.$http.get("/work/ifcol",{openid:JSON.stringify(wx.getStorageSync('openid')),workid:workid}
          ).then((res)=>{
            //输出请求数据
            if(res.data.msg=="已收藏") that.colType=true;
            if(res.data.msg=="未收藏") that.colType=false;


          }).catch(err=>{
            console.log(err.status,err.message)
          })
    }
  },
  mounted () {
    //根据上一页传过来的id调用查询信息接口
    this.getDetails(this.$mp.query.id)
    this.getIfcol(this.$mp.query.id)
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.header{position: relative;width: 90%;height:200rpx;margin-left: 5%;}
.header .job{font-size: 50rpx;position: absolute;top:20rpx;left: 0rpx;font-weight: 800;}
.header .money{position: absolute;right:20rpx;top:28rpx;color: #6495ED;font-size: 40rpx;}
.header .fujia{position: absolute;left:0rpx;top:120rpx;display:flex;align-content: center;width: 100%;}
.hr{display: flex;align-items: center;width: 90%;height:200rpx;margin-left: 5%;margin-top:30rpx;border-top: 2rpx solid rgb(175, 175, 175);border-bottom: 2rpx solid rgb(175, 175, 175);}
.biaoqian{height:300rpx;margin-top: 30rpx;}
.biaoqian .biaoqianOne{display: inline-block;font-size: 36rpx;margin-right: 20rpx;background: rgba(128, 128, 128, 0.082);border-radius: 10rpx;padding:15rpx;color:rgba(68, 67, 67, 0.808);}
</style>
