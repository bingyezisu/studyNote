function Fn(){
    var n=100;
    this.AA=function(){
        console.log("AA[私]");
    };
    this.BB=function(){
        console.log("BB[私]");
    }
}
Fn.prototype.AA=function(){
    console.log("AA[公]");
}
var f1=new Fn;
var f2=new Fn;

console.log(f1.n);//undefined;