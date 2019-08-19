<template>
  <div id="public">
    <div id="footer_nav" class="footer_nav" @click="flag=!flag">
      <img  src="../../assets/images/navigation.png"/>
      <P>导航</P>
    </div>
    <div id="footer_nav_show" class="footer_nav_show" v-if="flag">
      <ul class="list">
        <li>
          <router-link to="/home">
            <img src="../../assets/images/menu.png"/>
            <p>菜单</p>
          </router-link>

        </li>
        <li>

          <router-link to="/order" @click="flag=flag">
            <img src="../../assets/images/order.png"/>
            <p>我的订单</p>
          </router-link>

        </li>
        <li>
          <router-link to="/addcart">
            <img src="../../assets/images/cart.png"/>
            <p>购物车</p>
          </router-link>

        </li>
        <li>
          <img src="../../assets/images/wallet.png"/>
          <p>结账</p>
        </li>
        <li @click="flag=!flag">
          <img src="../../assets/images/close.png" />
          <p>返回</p>
        </li>

      </ul>
    </div>
    <!--<div id="footer_cart" class="footer_cart">-->
      <!--<img src="../../assets/images/cart.png"/>-->
      <!--<P>购物车</P>-->
    <!--</div>-->

  </div>
</template>

<script>
    export default {
        name: "NavFoodfooter",
        data(){
            return{
              msg:'这是公共组件',
              flag:false

            }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>

<style lang="scss">
  .footer_nav
    {
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
</style>
