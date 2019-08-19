<template>
  <div id="home">
    <header class="index_header">

        <div class="hlist">
          <img src="../assets/images/rexiao.png"/>
          <router-link to="/hot"><p>热销榜</p>  </router-link>
        </div>



        <div class="hlist">
          <img src="../assets/images/caidan.png"/>
          <router-link to="/order"><p>点过的菜</p> </router-link>
        </div>


       <div class="hlist">
         <img src="../assets/images/sousuo.png"/>
         <router-link to="/search"><p>搜你喜欢</p> </router-link>
       </div>


    </header>
    <aside id="left_cate" class="left_cate">
      <ul >
        <li v-for="(item,key) in list " @click="changeList(key)">{{item.title}}</li>
      </ul>
      <div id="nav_cate" class="nav_cate">
        <img src="../assets/images/nav.png"/>
        <p>菜单</p>
      </div>
    </aside>

    <div class="=content">
      <div class="item" v-for="item in list">
        <h3 class="item_cate">
          {{item.title}}
        </h3>
        <ul class="item_list">
          <li v-for="food in item.list">
            <div class="inner">
              <router-link :to="'/pcontent?id='+food._id">
                <img :src="api+food.img_url">
                <p class="title">{{food.title}}</p>
                <p class="price">¥{{food.price}}</p>
              </router-link>
            </div>
          </li>
        </ul>
        <div id="bg" class="bg"></div>
      </div>
    </div>
    <v-navfooter></v-navfooter>
    <div id="footer_cart" class="footer_cart">
      <router-link to="/cart">
        <img src="../assets/images/cart.png">
        <p>购物车</p>
        <span class="num" v-if="cartNum">{{cartNum}}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
  import NavFooter from  './public/NavFoodfooter.vue';
  import Config from  '../assets/model/config.js';
  import Storage from '../assets/model/storage.js';

  export default {
    data(){
      return{
        list:[],
        api:Config.api,
        cartNum:0
      }
    },
      sockets:{
      addcart: function(){
        //更新购物车的数量
        this.getCartCount();
      }
    },
    methods:{
      requestData(){
        var api=this.api+'api/productlist';
        this.$http.get(api).then((response)=>{
          this.list=response.body.result;
          console.log(response)
        },(errors)=>{
          console.log(errors);
        })
        // this.$http.jsonp(api).then(function (response) {
        //   console.log(response)
        //
        // },function (err) {
        //
        // console.log(err)})
      },
      asideDomInit(){
        /*按钮*/
        var navCate=document.getElementById('nav_cate');
        /*分类*/
        var leftCate=document.getElementById('left_cate');
        /*背景*/
        var bg=document.getElementById('bg');
        var flag=true;
        leftCate.onclick=function(){
          if(flag){
            flag=false;
            leftCate.style.transform='translate(0,0)';
            bg.style.display='block';
          }else{
            flag=true;
            leftCate.style.transform='translate(-100%,0)';
            bg.style.display='none';
          }
        }
      },
      changeList(key){
        // alert(key);
        /*itemCateDom[key].offsetTop表示获取右边分类距离顶部的高度*/
        var itemCateDom=document.querySelectorAll('.item_cate');
        document.documentElement.scrollTop=itemCateDom[key].offsetTop;

        var leftCate=document.getElementById('left_cate');
        var bg=document.getElementById('bg');
        leftCate.style.transform='translate(-100%,0)';
        bg.style.display='none';
      },
      getCartCount(){
        var uid=Storage.get('roomid');
        var api=this.api+'api/cartCount?uid='+uid;
        this.$http.get(api).then((response)=>{
          // console.log(response.body.result);
          this.cartNum=response.body.result;
        },(err)=>{
          console.log(err);
        })
      }
    },

    mounted(){
      this.asideDomInit();
      this.requestData();
      this.getCartCount();

    },
    components:{
      'v-navfooter':NavFooter
    }
  }
</script>
<style lang="scss">

  .index_header{
    width: 96%;
    margin: 0 auto;
    height: 4.4rem;
    //line-height: 0.5rem;
    border-radius: .5rem;
    background: #fff;
    margin-top:1rem;
    display: flex;
    .hlist{
      flex:1;
      text-align: center;
      padding-top: 0.2rem;
      border-right: 1px solid #eee;
      img{
        width:  2rem;
        height: 2rem;
        margin: 0 auto;

      }
      &:last-child{//&代表.hlist
        border-right:none;
      }
    }
  }
  .item{
    .item_cate {
      text-align: center;
      padding: .5rem;
    }
    .item_list{
      display: flex;
      flex-wrap: wrap;
      padding: 0px .5rem;
      li{
        list-style-type:none;
        width: 33.3%;
        padding: .5rem;
        box-sizing: border-box;

        .inner{
          background: #fff;
          width: 100%;
          border-radius: .5rem;
          overflow:hidden ;
          a{
            color:#666;
            text-decoration: none;
          }
          img{
            width: 100%;
            height: 6rem;
          }
          p{
            padding:.2rem .5rem ;
          }
          .title{
            font-weight:bold ;
          }
        }
      }
    }
  }
  /*侧边栏*/
  .left_cate{
    /*css运动效果  加过度*/
    transition: all .3s;
    transform: translate(-100%,0);
    width:6rem;/*60px*/

    height: 100%;
    position:fixed;/*固定定位*/
    background: #eee;
    top: 0px;
    left: 0px;
    z-index: 2;
    ul{
      position: absolute;
      height: 100%;
      padding: .5rem;
      z-index: 3;
      background: #eee;
      li{
        line-height: 4.4rem;
        list-style-type: none;
      }
    }
    .nav_cate{
      position: absolute;

      right: -3.5rem;

      background: rgba(132,128,128,0.9);

      top: 42%;
      width: 4.5rem;
      height: 4rem;
      text-align: center;
      border-radius: 0rem 50% 50% 0rem;
      z-index: 2;
      img{
        width: 1.8rem;
        height: 1.8rem;
        margin-left: 1rem;
        margin-top: .5rem;
      }
      p{
        color: #fff;
        margin-left: .8rem;
        margin-top: -0.4rem;
      }

    }
  }
  .bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(132,128,128,0.4);
    left: 0px;
    top: 0px;
    z-index: 1;
    display: none;
  }
  /*首页，导航*/

  .footer_nav{
    height: 4.4rem;
    width: 4.4rem;
    background: #000;
    position: fixed;
    color: #fff;
    bottom: .5rem;
    left: .5rem;
    border-radius: 50%;
    text-align: center;
    img{
      width: 1.8rem;
      height: 1.8rem;
      margin-top: .5rem;

    }
    p{
      position: relative;
      margin-top: -0.5rem;
    }
  }

  .footer_nav_show{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0rem;
    left: 0px;
    background: rgba(0,0,0,0.6);
    .list{
      li{
        list-style: none;
        height: 4.4rem;
        width:4.4rem ;
        background:#000;
        position: absolute;
        color: #fff;
        left:5rem;
        text-align: center;
        border-radius: 50%;
        img{
          width: 1.8rem;
          height: 1.8rem;
          margin-top: .4rem;
        }
        p{
          position: relative;
          margin-top: -0.3rem;
        }
        &:nth-child(1){
          bottom: 12.4rem;
          left: 0rem;
        }
        &:nth-child(2){
          bottom: 10.4rem;
          left: 25%;
          margin-left: -2.2rem;
        }
        &:nth-child(3){
          bottom: 6.4rem;
          left: 40%;
          margin-left: -2.2rem;
        }
        &:nth-child(4){
          bottom: .5rem;
          left: 50%;
          margin-left: -2.2rem;
        }
        &:nth-child(5){
          bottom: .5rem;
          left: .5rem;;
        }
      }

    }

  }
  .footer_cart{
    height: 4.4rem;
    width: 4.4rem;
    background: red;
    color: #fff;
    position: fixed;
    bottom: .5rem;
    right: .5rem;
    text-align: center;
    border-radius: 50%;
    img{
      width: 1.8rem;
      height: 1.8rem;
      margin-top: .5rem;
    }
    p{
      /*position: relative;*/
      margin-top: -0.5rem;
    }
    .num{
      position: absolute;
      display: inline-block;
      width: 2rem;
      height: 2rem;
      border-radius: .5rem;
      line-height:  2rem;
      top: -.5rem;
      right: -.5rem;
      background: red;
      color: #fff;
    }
    a{
      color: #fff;
      text-decoration: none;
    }
  }

</style>
