Object.create=function(obj){
    function Fn(){}
    Fn.prototype=obj;
    return new Fn();
}