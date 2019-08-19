<template>
  <div id="order_main">
    <div class="order_content">
      <div content="order_info">
        <div class="order_top">
          <img src="../assets/images/timer.png"/>
          <div class="order_info_right">
            <h2>118号桌待门店接单</h2>
            <p>请及时联系服务员确认菜品信息！</p>
          </div>
        </div>
        <h3>已点菜品{{list.total_num}}份，合计:<span class="price">{{list.total_price}}元</span></h3>
      </div>
      <div class="order_list">
        <h3>菜品详情</h3>
        <ul>
          <li v-for="item in list.items">
            <div class="title">{{item.title}}</div>
            <div class="num">{{item.num}}份</div>
            <div class="price">¥{{item.price}}</div>
          </li>
        </ul>
      </div>
    </div>
    <v-navfooter></v-navfooter>
    <div id="footer_book" class="footer_book" style="left:auto;right:5px;">
      <router-link to="/home">
        <img src="../assets/images/book.png"/>
        <p>菜单</p>
      </router-link>
    </div>
  </div>
</template>
<script>
  import NavFooter from './public/NavFoodfooter.vue';
  import Config from '../assets/model/config.js';
  import Storage from  '../assets/model/storage.js';
  export default {
    data(){
      return{
        api:Config.api,
        list:[]
      }
    },
    components:{
      'v-navfooter':NavFooter
    },
    methods:{
      getOrder(){
        var uid=Storage.get('roomid');
        var api=this.api+'api/getOrder?uid='+uid;
        this.$http.get(api).then((response)=>{
          console.log(response);
          this.list=response.body.result[0];
        },(err)=>{
          console.log(err);
        })
      }
    },
    mounted(){
      this.getOrder();
    }
  }
</script>
<style lang="scss">
.order_content{
  padding: 1rem;
  .order_info{
    background: #fff;
    border-radius: .5rem;
    .order_top{
      dispaly:flex;//盒子是弹性布局
      img{
        width: 5.6rem;
        height: 5.6rem;
      }
      .order_info_right{
        flex:1;
        padding-top: .5rem;
      }

    }
    h3{
      line-height: 2;
      padding: .5rem;
      .price{
        font-size: 2rem;
        color: red;
      }
    }
  }
  .order_list{
    background-color: #fff;
    border-radius: .5rem;
    margin-top: 1rem;
    padding: .5rem;
    h3{
      line-height: 2;
    }
    .list{
      li{
        dispaly:flex;
        line-height: 2;
        padding: .5rem 0rem;
        .title{
          flex:2
        }
        .num{
          flex:1;
          text-align: center;

        }
      }
    }
  }
}
  .footer_book{
    height: 4.4rem;
    width: 4.4rem;
    background: #000;
    position: fixed;
    color: #fff;
    bottom: .5rem;
    left: .5rem;
    border-radius: 50%;
    text-align: center;
    img {
      width: 1.8rem;
      height: 1.8rem;
      margin-top: .5rem;

    }
    p {
      position: relative;
      margin-top: -0.5rem;
    }
  }
.footer_nav {
  height: 4.4rem;
  width: 4.4rem;
  background: #000;
  position: fixed;
  color: #fff;
  bottom: .5rem;
  left: .5rem;
  border-radius: 50%;
  text-align: center;
  img {
    width: 1.8rem;
    height: 1.8rem;
    margin-top: .5rem;

  }
  p {
    position: relative;
    margin-top: -0.5rem;
  }
}
</style>
