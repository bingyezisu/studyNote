
let str="Hello,I'm Ccndy Candy!This is my Note";
let t="Candy";
/* ~function(){
    function myIndexOf(t){
        let lenT=t.length,
            lenS=this.length;
        if(lenT>lenS) return -1;
        for(let i=0;i<=lenS-lenT;i++){
            if(this.substr(i,lenT)===t){
                return i;
            }
        }
        return -1;
    }
    String.prototype.myIndexOf=myIndexOf;
}(); */
~function(){
    function myIndexOf(t){
        let ary=eval('/'+t+'/').exec(this);
        return ary?ary.index:-1;
    }
    String.prototype.myIndexOf=myIndexOf;
}();
let a=str.myIndexOf(t);
console.log(a);

