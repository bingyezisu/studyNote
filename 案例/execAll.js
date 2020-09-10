 ~function(){
    function execAll(str=""){
        //str:要匹配的字符串
        //this:RegExp的实例 (当前操作的正则)
        //=>进来后的第一件事，事验证当前正则是否设置了g，不设置不能进行循环捕获，否则会出现死循环
        if(!this.global) return this.exec(str);
        let ary=[],
            res=this.exec(str);
        while(res){
            ary.push(res[0])
            res=this.exec(str);
        }
        return ary.length===0?null:ary;
    }
    RegExp.prototype.execAll=execAll; 
 }();
 let str="candy2019study2020work2021more";
 let reg=/\d+/g;
 console.log(reg.execAll(str));
 
 console.log(str.match(reg));