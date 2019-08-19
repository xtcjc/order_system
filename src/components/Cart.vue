<template>
  <div id="cart">
    <div class="cart_content">
      <div class="cart_info" >
        <h2>购物车</h2>
        <div class="p_number">
          <div class="p_number_left">
            <p>用餐人数：{{peopleList.p_num}}</p>
            <p>备注:
            <span v-if="!peopleList.p_mark">无</span>
            <span v-if="peopleList.p_mark">{{peopleList.p_mark}}</span>
            </p>
          </div>
          <div class="p_number_right">
              <router-link to="/editpeopleinfo">
              <img src="../assets/images/edit.png"/>
              <p>修改</p>
            </router-link>
          </div>
        </div>
        <div class="cart_num1">
          <p>您的购物车里有{{allNum}}个菜</p>
          <p>合计:<span class="price">¥{{allPrice}}</span> </p>
        </div>

      </div>
      <div class="cart_list" v-if="allNum">
        <ul>
          <li class="item" v-for="(item,key) in list">
            <div class="left_food">
              <img :src="api+item.img_url">
              <div class="food_info">
                <p>{{item.title}}</p>
                <p class="price">¥{{item.price}}</p>
              </div>
            </div>
            <div class="food_right">
              <div class="cart_num">
                <div class="input_left" @click="decNum(item,key)">-</div>
                <div class="input_center">
                  <input type="text" readonly="readonly" v-model="item.num" name="num" id="num"/>
                </div>
                <div class="input_right" @click="incNum(item,key)">+</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!allNum" class="cart_empty">您的购物车空空的，点击菜单开始点菜</div>
      <div class="hot_food1">
        <h3>本店最受欢的菜</h3>
        <div class="item_outer">
          <ul class="item_list">

          <li>
            <div class="inner">
              <img src="../assets/images/1.jpg"/>
              <p class="title">大蒜炒肉</p>
              <p class="price">¥26</p>
            </div>
          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/2.jpg"/>
              <p class="title">家乡扣肉</p>
              <p class="price">¥30</p>
            </div>
          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/3.jpg"/>
              <p class="title">炝炒生菜</p>
              <p class="price">¥12</p>
            </div>

          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/4.jpg"/>
              <p class="title">橙汁</p>
              <p class="price">¥15/瓶</p>
            </div>

          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/5.jpg"/>
              <p class="title">小笼包</p>
              <p class="price">¥30</p>
            </div>

          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/6.jpg"/>
              <p class="title">三角饼</p>
              <p class="price">¥30</p>
            </div>

          </li>
          <li>
            <div class="inner">
              <img src="../assets/images/7.jpg"/>
              <p class="title">鸡肉</p>
              <p class="price">¥35</p>
            </div>

          </li>
        </ul>
        </div>
      </div>

     <v-navfooter></v-navfooter>
      <div id="footer_book" class="footer_book">
        <router-link to="/home">
          <img src="../assets/images/book.png"/>
          <p>菜单</p>
        </router-link>
      </div>
      <div id="footer_cart" class="footer_cart" @click="addOrder()">

        <img src="../assets/images/doorder.png"/>
        <p>下单</p>
      </div>

    </div>
  </div>
</template>
<script>
  import NavFooter from '../components/public/NavFoodfooter.vue';
  import Config from  '../assets/model/config.js';
  import Storage from '../assets/model/storage.js';
  export default {
    data(){
      return{
        api:Config.api,
        list:[],
        peopleList:[],
        allPrice:0,
        allNum:0
      }
    },
    sockets:{
      addcart: function(){
        //更新购物车的数量
        this.getCartData();//更新购物车的数据
      }
      },
    methods: {
      /*增加或减少购物车需要在服务器端删除数据*/
      decNum(item, key) {
        var uid=Storage.get('roomid');
        var product_id = item.product_id;
        var num = item.num;

        var api = this.api + 'api/decCart?uid='+uid+'&product_id=' + product_id + '&num=' + num;


        this.$http.get(api).then((response) => {
          console.log(response);
          this.$socket.emit('addcart','addcart1');/*//数据变化时需要接听服务器的广播*/
          this.getTotalResult();
        }, (err) => {
          console.log(err);
        });
        if (item.num == 1) {
          this.list.splice(key, 1);

        } else {
          --item.num;
        }
      },
      incNum(item, key) {
        var product_id = item.product_id;
        var num = item.num;
        var uid=Storage.get('roomid');
        var api = this.api + 'api/inCart?uid='+uid+'&product_id=' + product_id + '&num=' + num;

        this.$http.get(api).then((response) => {
          console.log(response);
          this.$socket.emit('addcart','addcart1');/*//数据变化时需要接听服务器的广播*/
          this.getTotalResult();
        }, (err) => {
          console.log(err);
        });
        ++item.num;

      },
      getCartData() {
        var uid=Storage.get('roomid');
        var api = this.api + 'api/cartlist?uid='+uid;
        this.$http.get(api).then((response) => {
          console.log(response);
          this.list = response.body.result;
          this.getTotalResult();
        }, (err) => {
          console.log(err);
        })
      },
      getTotalResult() {
        var allPrice = 0;
        var allNum = 0;
        for (var i = 0; i < this.list.length; i++) {
          allPrice += parseFloat(this.list[i].price * this.list[i].num);
          allNum += this.list[i].num;
        }
        this.allPrice = allPrice;
        this.allNum = allNum;
      },
      getPeopleInfoList() {
        var uid=Storage.get('roomid');
        var api = this.api + 'api/peopleInfoList?uid='+uid;
        this.$http.get(api).then((response) => {
          console.log(response);
          this.peopleList = response.body.result[0];
          this.getTotalResult();
        }, (err) => {
          console.log(err);
        })
      },
      addOrder(){
        var uid=Storage.get('roomid');
        var p_num=this.peopleList.p_num;
        var p_mark=this.peopleList.p_mark;
        var total_price=this.allPrice;
        var total_num=this.allNum;
        var order=JSON.stringify(this.list);
        var api=this.api+'api/addOrder';
        this.$http.post(api,{
          uid:uid,
          p_num:p_num,
          p_mark:p_mark,
          total_price:total_price,
          total_num:total_num,
          order:order
        }).then((response)=>{
          console.log(response);
          if(response.body.success){
            this.$router.push({path:'order'})
          }else{
            alert('提交数据有无');
          }
        },(err)=>{
          console.log(err);
        })
        }
      },
      mounted() {
        this.getCartData();
        this.getPeopleInfoList();
      },
      components: {
        'v-navfooter': NavFooter
      }
    }
</script>
<style lang="scss">

  .cart_content{
    padding: 1rem;
    .cart_info{
      background: #fff;
      border-radius: .5rem;
      padding: .5rem;
      h2{
        text-align: center;
        font-size: 1.6rem;
        padding: .4rem 0;
        border-bottom: 1px solid #eee;
      }
      .p_number{
        display: flex;

        .p_number_left{
          flex: 1;
          border-bottom: 1px solid #eee;
          padding: .5rem 0;
          p{
            line-height: 2rem;
            &:first-child{
              color: red;
            }
          }
        }
        .p_number_right{
          width: 4rem;
          height: 4rem;
          img{
            width: 1.8rem;
            height: 1.8rem;
            margin: 0 auto;
          }

        }
      }
      .cart_num1{
        p{
          line-height: 2rem;
          .price{
            font-size: 2rem;
            color: red;
          }
        }
      }
    }
    .cart_list{
      margin-top: 1rem;
      background: #fff;
      padding: .5rem;
      border-radius: .5rem;

      display: flex;
      ul{
        width: 100%;
        //height: 2rem;
        .item{
          border-bottom: 1px solid #eee;
          display: flex;
          width: 100%;

          border-bottom:1px solid #eee ;
          padding: 1rem 0px;
          .left_food{
            flex: 1;
            display: flex;
            img{
              width: 4rem;
              height: 4rem;
              border-radius: 10%;
              margin-right: .8rem;
            }

          }
          .food_right{
            width: 10rem;
            .cart_num{

              width: 10rem;

              display: flex;
              margin-top:.8rem;
              margin-left: .8rem;


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
        }
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
    .footer_book{
      height: 4.4rem;
      width: 4.4rem;
      background: #000;
      position: fixed;
      color: #fff;
      bottom: .5rem;
      left: 40% ;
      margin-left: -2.2re;
      text-align: center;
      border-radius: 50%;
      img{
        width: 1.9rem;
        height: 1.9rem;
        margin-top: .5rem;
      }
      p{
        position: relative;
        margin-top: -.5rem;
      }
      a{
        color: #fff;
        text-decoration: none;
      }
    }
    .hot_food1{

      background: #fff;
      margin-top:1rem ;
      border-radius: .5rem;
      margin-bottom: 2rem;
      h3{
        font-size: 1.4rem;
        padding: .5rem 0px;
      }
      .item_outer{
        width: 100%;
        overflow-x: auto;
        .item_list{
          //flex-wrap:wrap;
          padding: 0px .5rem;
          width: 100rem;
          li{
            list-style: none;
            width: 6rem;
            padding: .5rem;
            box-sizing: border-box;
            float: left;
            .inner{
              background: #fff;
              width: 100%;
              border-radius: .5rem;
              overflow: hidden;
              img{
                width: 100%;
              }
              p{
                top: -1rem;
              }
            }
          }
        }
      }
    }
  }
  /*购物车空*/
  .cart_empty{
    text-align:center ;
    line-height: 3;
    h3{
      font-size: 1.8rem;
    }

  }



</style>
