<template>
  <div id="hot">
    <header class="hot_header">
      <div class="title">
        本店热销榜
      </div>
    </header>
    <div class="hot_content">

      <ul class="item_list_clearfix">
        <li>
          <img src="../assets/images/1.jpg"/>
          <div class="inner">
            <h3 class="title">大蒜腊肉</h3>
            <p class="price">¥26</p>
            <span>已售：351份</span>
          </div>
        </li>
        <li>
          <img src="../assets/images/2.jpg"/>
          <div class="inner">
            <h3 class="title">白菜豆腐</h3>
            <p class="price">¥18</p>
            <span>已售：210份</span>
          </div>

        </li>
        <li>
          <div class="inner">
            <img src="../assets/images/3.jpg"/>
            <h3 class="price">炝炒生菜</h3>
            <span>已售:200份</span>
          </div>
        </li>
      </ul>
    </div>
    <div id="footer_nav" class="footer_nav">
      <img src="../assets/images/navigation.png"/>
      <p>导航</p>
    </div>
    <div id="footer_cart" class="footer_cart">
      <img src="../assets/images/cart.png"/>
      <p>菜单</p>
    </div>
    <div id="footer" class="footer_book">
      <img src="../assets/images/book.png"/>
      <p>购物车</p>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    }
  }
</script>
<style lang="scss">
  .hot_header{
    height: 5rem;
    line-height: 5rem;
    width: 100%;
    text-align: center;
  }
  .hot_content{
    background: #fff;
    .item_list{
      padding:  0rem .5rem;
      list {
        list-style: none;
        display: flex;
        img{
          width: 6rem;
          height: 6rem;
          border-bottom: 1px solid #EEE;
          padding-top: 1rem;
        }
        .inner{
          flex: 1;
          padding-left: 1rem;
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
    left: 45% ;
    margin-left: -2.2re;
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
  }
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
      margin-top: .4rem;

    }
    p{
      position: relative;
      margin-top: -0.3rem;
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
      position: relative;
      margin-top: -0.5rem;
    }
  }
</style>
