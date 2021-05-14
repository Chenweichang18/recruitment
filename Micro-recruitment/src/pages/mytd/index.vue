<template>
  <div>
      <!-- 内容列表 -->
      <div class="content">
        <!-- 内容区域求职信息展示 -->
        <div class="xinxi">
          <div class="listone" v-for="(item,index) in tableData" :key="item" @click="clickJob(item.id)">
            <font class="name1">{{item.job}}
              <font v-if="list1[index].type == 'true'" style="border:1rpx solid white;color:blue;font-size:26rpx;">通过初筛</font>
              <font v-if="list1[index].type == 'false'" style="border:1rpx solid white;color:red;font-size:26rpx;">未通过</font>
              <font v-if="list1[index].type == 'unde'" style="border:1rpx solid white;color:lightgreen;font-size:26rpx;">等待通知</font>
            </font>
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
              <font class="name6">{{item.address}}</font>
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
      list1:[],
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
      ceshi: [{zhiwei:'前端工程师',gongsi:'阿里巴巴',xinzi:'100-150',guimo:'5000-9999人',dizhi:'杭州',hr:'马先生',biaoqian:['vue','react','axios'],type:'已回复'},
              {zhiwei:'前端工程师',gongsi:'腾讯',xinzi:'100-150',guimo:'5000-9999人',dizhi:'深圳',hr:'陈先生',biaoqian:['vue','react','axios'],type:'未回复'},
              {zhiwei:'前端工程师',gongsi:'京东',xinzi:'100-150',guimo:'5000-9999人',dizhi:'北京',hr:'林先生',biaoqian:['vue','react','axios'],type:'未回复'},
              ],
      educationList:[{educationType:true,label:'不限'},{educationType:false,label:'初中及以下'},{educationType:false,label:'中专/中技'},{educationType:false,label:'高中'},{educationType:false,label:'大专'},{educationType:false,label:'本科'},{educationType:false,label:'硕士'},{educationType:false,label:'博士'}],
      expList:[{expType:true,label:'不限'},{expType:false,label:'实习生'},{expType:false,label:'应届生'},{expType:false,label:'1年以内'},{expType:false,label:'1-3年'},{expType:false,label:'3-5年'},{expType:false,label:'5-10年'},{expType:false,label:'10年以上'}],
      emList:[{emType:true,label:'不限'},{emType:false,label:'0-20人'},{emType:false,label:'20-99人'},{emType:false,label:'100-499人'},{emType:false,label:'500-999人'},{emType:false,label:'1000-9999人'},{emType:false,label:'10000人'}],
      
    }
  },

  components: {
    card
  },

  methods: {
    searchIcon(name){
      this.searchInput=name
      this.search()
    },
    //推荐方法
    tuijian(){
      this.btnType=true
    },
    //附近方法
    fujin(){
      this.btnType=false
    },
    //修改学历要求按钮状态
    changeEducationicon(index){
      this.educationList.forEach(item=>{
        item.educationType=false
      })
      this.educationList[index].educationType=true;
    },
    //获取所有职位接口
    getColwork(){
      var that=this
      var idList = []
      this.$http.get("/work/getYid",{openid:JSON.stringify(wx.getStorageSync('openid'))}
          ).then((res)=>{
            //输出请求数据
            //console.log(res.data)
            that.list1 = res.data.data
            res.data.data.forEach(item=>{
              idList.push(item.id)
            })
            this.$http.get("/work/qzCom",{idList:JSON.stringify(idList)}
              ).then((res)=>{
                //输出请求数据
                //console.log(res.data)
                res.data.data.forEach(item=>{
                  item.label = JSON.parse(item.label)
                })
                that.tableData = res.data.data
                
                
              }).catch(err=>{
                console.log(err.status,err.message)
              })
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
    this.getColwork()
  },
  created () {
    
  }
}
</script>
<style scoped>
.content{
  height: 80%;
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
