const PENDING="PENDING";
const FULFILLED="FULFILLEF";
const REJECTED="REJECTED";

const resolvePromise=(promise2,x,resolve,reject)=>{
    if(promise2===x){
        return reject(new TypeError("Chaining cycle detected for promise #<Promise>"))
    }
    let called;
    if((typeof x==="object" && x!=null)||typeof x==="function"){
        try{
            let then=x.then;
            if(typeof then === "function"){
                then.call(x,y=>{
                    if(called) return;
                    called=true;
                    resolvePromise(promise2,y,resolve,reject);
                },r=>{
                    if(called) return;
                    called=true;
                    reject(r);
                });
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called=true;
            reject(e);
        }
    }else{
        resolve(x);
    }
}

class myPromise{
    constructor(executor){
        this.status=PENDING;
        this.value=undefined;
        this.reason=undefined;

        this.onResolvedCallbacks=[];
        this.onRejectedCallbacks=[];

        let resolve=(value)=>{
            if(this.status===PENDING){
                this.status=FULFILLED;
                this.value=value;
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        }
        let reject=(reason)=>{
            if(this.status===PENDING){
                this.status=REJECTED;
                this.reason=reason;
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        }
        try{
            executor(resolve,reject);
        }catch(error){
            reject(error)
        }
    }
    then(onFulfilled,onRejected){
        onFulfilled=typeof onFulfilled==="function"?onFulfilled:v=>v;
        onRejected=typeof onRejected==="function"?onRejected:err=>{throw err};
        let promise2=new Promise((resolve,reject)=>{
            if(this.status===FULFILLED){
                setTimeout(()=>{
                    try{
                        let x=onFulfilled(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    } 
                },0)
            }
            if(this.status===REJECTED){
                setTimeout(()=>{
                    try{
                        let x=onRejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            }
            if(this.status===PENDING){
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x= onFulfilled(this.value)
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x= onRejected(this.reason)
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                })
            }
        })
        return promise2; 
    }

}
const promise = new myPromise((resolve, reject) => {
    setTimeout(()=>{
        resolve("成功");
    },1000)
  }).then(
    (data) => {
      console.log('success', data)
    },
    (err) => {
      console.log('faild', err)
    }
  ).then(
    (data) => {
        console.log('success', data)
      },
      (err) => {
        console.log('faild', err)
      }
  )
  
