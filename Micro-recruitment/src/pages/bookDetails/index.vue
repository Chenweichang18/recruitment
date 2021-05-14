<template>
 <div>
   <div class="top">
     <img class='img' :src="book.b_img" alt="">
     <div style="margin-top:10rpx;margin-left:10rpx;">
       <div style="display:inline-block;background:red;color:white;border-radius:10rpx;padding:3rpx;">自营</div>
       <div style="display:inline-block;font-weight:550;margin-left:10rpx;font-size:40rpx;">{{book.b_name}}</div>
     </div>
     <div style="color:gray;margin-left:10rpx;margin-top:30rpx;">
       <div style="float:left;">{{book.b_type}}</div>
       <div style='float:left;margin-left:30rpx;margin-right:30rpx;'>|</div>
       <div style="float:left;">销量:{{book.b_buynum}}</div>
       <div style="float:right;color:red;font-size:46rpx;margin-right:50rpx;margin-bottom:20rpx;">￥{{book.b_price}}</div>
     </div>
   </div>
   <div class="bottom">立即购买</div>
 </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      book:{}
     }
  },

  components: {
    card
  },

  methods: {
    //根据书籍id获取书籍详细信息
    getBook(id){
      var that = this
      wx.request({
        url:'http://192.168.0.123:8082/book/getBookById',
        data: {
          b_id:id
        },
        header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.book=res.data
      }
      })
    },
  },

  created () {
    // let app = getApp()
  },
  mounted () {
    this.getBook(this.$mp.query.id)
  }
}
</script>
<style>
page{
  background: rgba(128, 128, 128, 0.068);
}
</style>
<style scoped>
.top{width:100%;height:800rpx;background:white;border-bottom-left-radius: 20rpx;border-bottom-right-radius: 20rpx;}
.top .img{width:100%;height:80%;display:block;}
.bottom{position: fixed;bottom:0;width:100%;height:150rpx;background: rgb(243, 76, 76);color: white;display: flex;justify-content: center;align-items: center;font-size: 40rpx;}
</style>
