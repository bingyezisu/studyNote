let _subscribe=(function(){
    //=>Sub：发布订阅类
    class Sub{
        constructor(){
            //=>创建一个事件池，用来存储后期需要执行的方法
            this.$pond=[];
        }
        //=>向事件池中追加方法(去重处理)
        add(func){
            let flag=this.$pond.some(item=>{ 
                return item===func;
            })
            !flag?this.$pond.push(func):null;
        }
        //=>从事件池中移除方法
        remove(func){
            let $pond=this.$pond;
            for(var i=0;i<$pond.length;i++){
                let item=$pond[i];
                if(item==func){
                    $pond[i]=null;
                    break;
                }
            }
        }
        //=>通知事件池中的方法按照顺序依次执行
        fire(...args){
            let $pond=this.$pond;
            for(var i=0;i<$pond.length;i++){
                let item=$pond[i];
                if(typeof item!=="function"){
                    continue;
                }
                item.call(this,...args);
            }
        }
    }
   return function subscribe(){
       return 
   }
})();

