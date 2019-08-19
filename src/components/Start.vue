<template>
  <div id="start_one">
        <div class="start_content" v-show="!showLoading">
          <header class="header">
            <img src="../assets/images/canju.png"/><span class="user">用餐人数</span>
          </header>
          <p class="notice">请选择正确的用餐人数，小二马上给你送餐具</p>
          <div class="start-list">
            <ul class="user_list">
              <li  v-for="(item ,key) in userList" :class="{'active':key==0}">
                <span>{{item}}</span>
              </li>

            </ul>
          </div>
          <div class="mark_input">
            <input type="text" placeholder="请输入你的口味要求，忌口(可不写)" v-model="p_mark"/>
          </div>

            <ul class="mark_list">
              <li>
                  <span>
                    打包带走
                  </span>
              </li>
              <li>
                  <span>
                    微辣
                  </span>
            </li>
              <li>
                  <span>
                    不要辣椒
                  </span>
              </li>
            </ul>


            <div id="start" class="start" @click="addPeopleInfo()" >
              <span>
                      开始点菜
                  </span>
            </div>


        </div>
  </div>
</template>
<script>
  import Config from '../assets/model/config.js';
  import  Storage from '../assets/model/storage.js';
  export default {
    data(){
      return{
        p_num:'1人',
        p_mark:'',
        api:Config.api,
        userList: [],
        showLoading:true
      }
    },
    methods:{
      addPeopleInfo(){
        var  uid=Storage.get('roomid');
        var api=this.api+'api/addPeopleInfo';
        this.$http.post(api,{
          uid:uid,
          p_num:this.p_num,
          p_mark:this.p_mark
        }).then((response)=>{
          console.log(response);
          if(response.body.success){
            this.$router.push({path:'home'});
          }
        },(err)=>{
          console.log(err);
        })

      },
      addChangeEvent(){
        var that=this;//保存this
        var lis=document.querySelectorAll('.user_list li');
        for (var i = 0; i <lis.length ; i++) {
          lis[i].onclick=function(){
            //去掉所有的li的class，让当前点击的li的class显示active
            for (var j = 0; j <lis.length ; j++) {
              lis[j].className='';
            }
            this.className='active';//this是li这个dom节点
            that.p_num=this.querySelector('span').innerHTML.trim();
            console.log(that.p_num)
          }
        }
        var lis_mark=document.querySelectorAll('.mark_list li');
        for (var i = 0; i <lis_mark.length ; i++) {
          lis_mark[i].onclick=function () {
            for (var j = 0; j <lis_mark.length ; j++) {
              lis_mark[j].className='';
            }
            this.className='active';
            that.p_mark=that.p_mark+" "+this.querySelector('span').innerHTML.trim();
          }
        }
      },
      getPeopleInfoList() {
        var uid=Storage.get('roomid');
        var api = this.api + 'api/peopleInfoList?uid='+uid;
        this.$http.get(api).then((response) => {
          this.showLoading=false ;
          console.log(response);
          this.peopleList = response.body.result[0];
          if(response.body.result.length>1){
            this.$router.push({path:'home'});
          }

        }, (err) => {
          console.log(err);
        })
      }
    },
    created(){
      this.getPeopleInfoList();

      //判断有没有用餐信息
    }
    ,
    mounted(){
      for (var i = 0; i <12 ; i++) {
        this.userList.push(i+1+'人');
      }
      this.$nextTick(function(){
        this.addChangeEvent();
      });

    }
  }
</script>
<style lang="scss">
  /*@charset "UTF-8";*/
  .start_content{
    .header{
      height:3.2rem;
      width:10rem;
      line-height: 3.2rem;
      background:#000;
      color: #fff;
      margin:5rem auto 0rem auto;
      border-radius: .5rem;
      .user{
        margin-left:0.5rem;
      }
    }
    .notice{
      color:red;
      text-align:center;
      margin: 1rem 0rem ;
    }

    img{
      height: 2.2rem;
      line-height: 2.2rem;
      position: relative;
      top:0.5rem;
      margin-left:1rem;
    }

  }
  .mark_input{

    padding: 1rem;
    input{
      height: 3rem;
      line-height: 3rem;
      width: 95%;
      margin-left: .5rem;
    }
  }
  .user_list,.mark_list{
    display: flex;
    flex-wrap: wrap;
    padding: .5rem;
    li{
      width:25%;
      padding: .5rem;
      box-sizing: border-box;/*加了这句格子由3个变4个*/
      span{
        display: block;
        width: 100%;
        height: 3.2rem;
        line-height: 3.2rem;
        text-align: center;
        background: #fff;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
      }
    }
    li.active{
      span{
        background: red;
        border: 1px solid red;
        color: #fff;
      }
    }
  }
  /*.user_list{

    display: flex;

    flex-wrap: wrap;
    padding: .5rem;

    li{

      width: 25%;
      padding: .5rem;
      box-sizing: border-box;   !*盒子的宽度=盒子本身宽度    默认 盒子的宽度=盒子的宽度+padding+border*!

      span{

        display: block;

        width: 100%;
        height: 3.2rem;

        line-height: 3.2rem;
        text-align: center;
        background: #fff;
        border-radius: .5rem;
        border: 1px solid #ccc;
      }

    }


  }*/


  .start{
    position:fixed;
    bottom:5rem;
    left:40%;
    margin-left: -2.2rem;
    width:6rem;
    height: 6rem;
    background: red;
    color:#fff ;
    border-radius:50%;
    span{
      display: block;
      width:2rem;
      margin: 0 auto;
      position: relative;
      top:1.5rem;
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
  }


</style>
