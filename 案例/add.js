/* function currying(fn,length){
    length=length||fn.length;
    return function(...args){
        if(args.length>=length){
            return fn(...args)
        }
        return currying(fn.bind(null,...args),length-args.length);
    }
}
function add(n1,n2,n3,n4){
    return n1+n2+n3+n4
}
add=currying(add);
console.log(add(1)(2))
console.log(add(1)(2)(3))
console.log(add(1)(2)(3)(4));
console.log(add(1,2)(3,4)); */


/* function fn(x){
    return function(y){
       return x+y;
    }
} */
/* 
    实现链式写法：必须返回的是个函数 return function(){}
    

*/

function add(...outer){
    console.log(typeof fn);
    var fn=function(...inner){
       return outer.concat(inner).reduce((prev,next)=>prev+next);
    }
    return fn;
}
console.log(add(1))
console.log(add(1)(2))
console.log(add(1)(2)(3))