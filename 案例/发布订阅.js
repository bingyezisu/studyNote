var issuer={
    //订阅者列表
   	registerForm:{},
    //订阅
    register(type,subscriber,time="forever"){//默认订阅时间
        var _this=this;
        if(type.split(",").length>1){
        	type.split(",").forEach(item=>{
           		_this.register(item,subscriber,time);
            })
        }else{
            if(time==="forever"){//如果没有指定时间那么长久订阅，将订阅者推送到订阅列表
                let registerForm=this.registerForm[type]||(this.registerForm[type]=[]);
                !registerForm.includes(subscriber)?registerForm.push(subscriber):null;
            }else if(time==="quarter"){//如果指定一个季度，那么季度结束就不再配送
                function quarter(){
                    _this.cancel(type,quarter)
                   subscriber.apply(_this,arguments);
               };
               quarter.name=subscriber; //登记季度订阅者
               (this.registerForm[type]||(this.registerForm[type]=[])).push(quarter);
            }
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
        if(!subscriber){//如果没有传订阅者信息，那么就把对应订阅者的列表清空。
           subscribers && (subscribers.length=0);
        }else{//指定订阅者取消订阅
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
        if(!subscribers||(subscribers.length===0)){return false;}//没有订阅者不推送
        subscribers.forEach(subscriber=>{
            subscriber.apply(this,informations)
        })
        return this;
    },
}
function subscriber1(magazine){
    console.log("我是订阅者1");
}
function subscriber2(magazine){
    console.log("我是订阅者2");
    issuer.cancel();
}
function subscriber3(magazine){
    console.log("我是订阅者3");
}
function subscriber4(magazine){
    console.log("我是订阅者4");
}
issuer.register("fashion",subscriber1);
issuer.register("fashion",subscriber1);
console.log(issuer.registerForm)