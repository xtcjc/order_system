import Vue from 'vue'
import App from './App.vue'
import  VueRouter from 'vue-router';
import store from 'store';
import Storage from './assets/model/storage.js'
/*请求数据配置*/
Vue.use(VueRouter);
import VueResource from 'vue-resource';
Vue.use(VueResource);
var roomid=window.location.hash.split('=')[1];
Storage.set('roomid',roomid)
import VueSocketio from 'vue-socket.io';
// Vue.use(VueSocketio, socketio('http://a.itying.com/'));
// Vue.use(VueSocketio,'http://a.itying.com?roomid=a001');/*//http://a.itying.com/为服务器的地址*/
Vue.use(new VueSocketio({
  debug:true,

  connection:'http://a.itying.com?roomid'+roomid,
  vuex:{
    store,
    actionPrefix:'SOCKET_',
    mutationPrefix:'SOCKET_'
  }
}))


/*创建，引入组件*/
import  Start from  './components/Start.vue';
import  Home from  './components/Home.vue';
import  Search from  './components/Search.vue';
import  Cart from  './components/Cart.vue';
import  Order from  './components/Order.vue';
import Hot from  './components/Hot.vue';
import EditPeopleInfo from './components/EditPeopleInfo.vue';
import Pcontent from './components/Pcontent.vue';

const routes=[
  {path:'/start',component:Start},
  {path:'/home',component:Home},
  {path:'/search',component:Search},
  {path:'/cart',component:Cart},
  {path:'/order',component:Order},
  {path:'/hot',component:Hot},
  {path:'/editpeopleinfo',component:EditPeopleInfo},
  {path:'/pcontent',component:Pcontent},
  {path:'*',redirect:'/start'}
]
/*实例化VueRouter*/
const router=new VueRouter({
  routes:routes

})
new Vue({
  el: '#app',
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  router,
  render: h => h(App)
})
