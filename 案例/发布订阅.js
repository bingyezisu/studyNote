/***
***/
var issuer={
    //订阅者列表
   	registerForm:{},
    //订阅
    register(type,subscriber,time="forever"){//默认订阅时间
        var _this=this;
        if(time==="forever"){//如果没有指定时间那么长久订阅，将订阅者推送到订阅列表
            (this.registerForm[type]||(this.registerForm[type]=[])).push(subscriber);
        }else if(time==="quarter"){//如果指定一个季度，那么季度截至就不再配送
            function quarter(){
                _this.cancel(type,quarter)
               subscriber.apply(_this,arguments);
           };
           quarter.name=subscriber;//
           (this.registerForm[type]||(this.registerForm[type]=[])).push(quarter);
        }
        return this;
    },
    //订阅一个季度
    registerQuarter(type,subscriber){
        this.register(type,subscriber,"quarter");
        return this;
    },
    //取消订阅
    cancel(type,subscriber){
        let subscribers=this.registerForm[type];
        if(!subscribers) return false;
        if(!subscriber){
           subscribers && (subscribers.length=0);
        }else{
            subscribers.forEach((item,index,arr)=>{
                if(item===subscriber||subscriber.name===item){
                    arr.splice(index,1);
                }
            })
        }
        return this;
    },
    //发行
    publish(...arg){
        let [type,...informations]=arg;
        let subscribers=this.registerForm[type];//某个类型的订阅者们
        if(!subscribers||(subscribers.length===0)){return false;}//没有订阅者不派送
        subscribers.forEach(subscriber=>{
            subscriber.apply(this,informations)
        })
        return this;
    },
}
function subscriber1(magazine){
    console.log("我是订阅者1"+magazine);
}
function subscriber2(magazine){
    console.log("我是订阅者2"+magazine);
}
function subscriber3(magazine){
    console.log("我是订阅者3"+magazine);
}
function subscriber4(magazine){
    console.log("我是订阅者4"+magazine);
}
issuer.register("fashion",subscriber1)
issuer.register("art",subscriber2)
issuer.register("fashion",subscriber3)
issuer.registerQuarter("art",subscriber4);

issuer.publish("fashion","时尚头条信息1");
issuer.publish("art","艺术品展览会信息1");
issuer.cancel("fashion",subscriber3)
issuer.publish("fashion","时尚头条信息2");
issuer.publish("art","艺术品展览会信息2");
issuer.cancel("fashion");
issuer.publish("fashion","时尚头条信息3");
issuer.registerQuarter("fashion",subscriber4);
issuer.publish("fashion","时尚头条信息4");

/***
输出：
我是订阅者1时尚头条信息1
我是订阅者3时尚头条信息1
我是订阅者2艺术品展览会信息1
我是订阅者4艺术品展览会信息1
我是订阅者1时尚头条信息2
我是订阅者2艺术品展览会信息2
我是订阅者4时尚头条信息4
***/