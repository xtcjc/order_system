var storage={
  get:function (key) {
    return JSON.parse(localStorage.getItem(key));//反序列化

  },
  set:function (key,value) {
    localStorage.setItem(key,JSON.stringify(value));//JSON.stringify(value)序列化
  },
  remove:function(key){
    localStorage.removeItem(key);
  }
}

export  default storage;
