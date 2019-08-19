<template>
  <div id="pcontent">
    <router-link to="/home">
      <div class="back"><p>返回</p></div>
    </router-link>

    <div class="p_content">
      <div class="p_info">
        <img :src="api+list.img_url"/>
        <h2>{{list.title}}</h2>
        <p class="price">¥{{list.price}}/份</p>
      </div>
      <div class="p_detail">
        <h3>商品详情</h3>
        <div class="p_content" v-html="list.content">
          {{list.content}}
        </div>

      </div>
    </div>
    <footer class="pfooter">
      <div class="cart">
        <strong>数量:</strong>
        <div class="cart_num">
          <div class="input_left" @click="desNum()">-</div>
          <div class="input_center">
            <input type="text" readonly="readonly" v-model="num" name="num" id="num">
          </div>
          <div class="input_right" @click="incNum()">+</div>
        </div>
      </div>
      <button class="addCart" @click="addcart()">加入购物车</button>
    </footer>
  </div>
</template>
<script>
  import  Config from '../assets/model/config.js';
  import Storage from  '../assets/model/storage.js';
  export default {
    data(){
      return{
        api:Config.api,
        list:[],
        num:1
      }
    },
    methods:{
      requestData(id){
        var api=this.api+'api/productcontent?id='+id;
        this.$http.get(api).then((response)=>{
          console.log(response);
          this.list=response.body.result[0];
        },(err)=>{
          console.log(err);
        })
      },
      desNum(){

        if(this.num>1){
          --this.num;
        }
      },
      incNum(){
        ++this.num;
      },
      addcart(){
        /*获取数据，加入购物车*/
        //桌子号,扫描二维码从url
        var uid=Storage.get('roomid');
        var api=this.api+'api/addcart';
        this.$http.post(api,{
          uid:uid,
          title:this.list.title,
          price:this.list.price,
          num:this.num,
          product_id:this.list._id,
          img_url:this.list.img_url
        }).then((response)=>{
            console.log(response);
            if(response.body.success){
              this.$socket.emit('addcart','addcart');//加入购物车给服务器广播数据
              this.$router.push({path:'home'});
            }
        },(err)=>{
            console.log(err);
        })
      }
    },
    mounted(){
      var id=this.$route.query.id;
      this.requestData(id);
      // console.log(this.$route.params)
    }
  }
</script>
<style lang="scss">

  .back{
    height: 3.8rem;
    width: 3.4rem;
    line-height: 3.8rem;
    border-radius: 70%;
    background: #000;
    position: fixed;
    top: .5rem;
    left: .5rem;
    color: #fff;
    p{
      position: fixed;
      //text-align: center;
      top: 0.5rem;
      left:1.6rem ;
    }
    &:before{
      content: "";
      display: block;
      width:.8rem ;
      height: .8rem;
      border-left: .2rem solid #fff;
      border-bottom: .2rem solid #fff;
      position: relative;
      top:1.4rem;
      left: .6rem;
      transform: rotate(45deg);
      margin-right: .6rem;
    }
  }
  .p_content{
    .p_info{
      background: #fff;
      img{
        width:100%;
        height: 18rem;
      }
      h2{
        padding: .2rem .5rem;
      }
      .price{
        padding:.2rem .5rem ;
        color: red;
      }
    }
    .p_detail{
      background: #fff;
      margin-top: 1rem;
      h3{
        padding: .5rem;
      }
      .p_content{
        padding: 1rem;
        img{
          max-width: 100%;
          display: block;
          margin: 0 auto;
        }
        *{
          line-height: 1.5;
          color: #666;
        }
      }

    }
  }
  /*底部*/
  /*.pfooter{
    position: fixed;
    bottom: 0rem;
    height: 4.4rem;
    line-height: 4.4rem;
    width: 100%;
    background: #fff;
    left: 0px;
    border-top: 1px solid #eee;

    .cart{
      float: left;
      width: 15rem;
      strong{
        flex: 1;
        font-size: 1.6rem;
        padding: 0rem .5rem;
      }
      .cart_num{
        width: 10rem;
        display: flex;
        margin-top: .5rem;
        .input_left,.input_right{
          flex: 1;
          width: 2.8rem;
          height: 2.8rem;
          line-height: 2.8rem ;
          text-align: center;
          color: red;
          border: 1px solid #eee;
          font-size: 2.4rem;
        }
        .input_center{
          flex: 1;
          input{

            width: 2.8rem;
            height: 2.8rem;
            text-align: center;
            border: none;

          }
        }
      }
      }

    .addCart{
      float: right;
      background:red;
      color: #fff;
      border:none ;
      padding:  0 .5rem;
      border-radius: .5rem;
      margin-top: .5rem;
      margin-right: .5rem;
    }
  }*/
  .pfooter{


    position: fixed;

    bottom: 0px;
    height: 4.4rem;
    line-height: 4.4rem;

    background: #fff;

    left: 0px;

    width: 100%;

    border-top: 1px solid #eee;

    .cart{

      float: left;


      display:flex;

      strong{

        flex: 1;

        font-size: 1.6rem;

        padding: 0rem .5rem;
      }

      .cart_num{

        width: 10rem;

        display: flex;
        margin-top: .8rem;


        .input_left,.input_right{
          flex: 1;

          width: 2.8rem;
          height: 2.8rem;

          line-height: 2.8rem;

          text-align: center;

          color: red;

          border: 1px solid #eee;

          font-size: 2.4rem;
        }

        .input_center{

          flex: 1;

          input{

            width: 2rem;
            text-align: center;
            width: 100%;
            height: 2.8rem;
            border: none;

            border-top: 1px solid #eee;

            border-bottom: 1px solid #eee;

            float: left;
          }
        }
      }

    }

    .addCart{
      a{
        color: #666;
        text-decoration: none;
      }

      float: right;

      background:red;
      color: #fff;
      height: 3rem;
      border: none;
      padding: 0 .5rem;
      border-radius: .5rem;
      margin-top: .8rem;
      margin-right: .5rem;
    }

  }


</style>
