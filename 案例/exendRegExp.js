~function(){
    function execAll(str=""){
        let _this=this;
            ary=[];
        //两种思路：
        //=>第一种：如果没有设置g，不能进行循环捕获
        //if(!this.global) return this.exec(str);
        //=>第二种：如果没有设置g，就设置g在进行循环捕获
        _this=this.global?this:eval(this+"g");
        let res=_this.exec(str);
        while(res){
            ary.push(res[0]);
            res=_this.exec(str);
        }
        return ary.lenght===0?null:ary;
        
    }
    RegExp.prototype.execAll=execAll;
}()
let str="candy2019study2020work2021more";
let reg=/\d+/;
console.log(reg.execAll(str));//=>[ '2019', '2020', '2021' ]
