/* 
    单例设计模式 singleton pattern
        1.表现形式
            var obj={
                xxx:xxx,
                ...
            }
            在单列设计模型中，obj不仅仅是对象名，它被称为“命名空间[NameSpace]”,
            把描述事物的属性存放到命名空间中，多个命名空间是独立分开的，互不冲突
        2.作用
            =>把描述同一件事物的属性和特征进行“分组、归类”（存储再同一个堆内存空间中），
            因此避免了全局变量之间的冲突和污染
            var pattern1={name:"xxx"}
            var pattern2={name:"xxx"}
        3.单例设计模式命名的又来
            =>每一个命名空间都是JS中Object这个内置基类的实例，而实例之间是相互独立互不干扰的，
            所以我们称它为：“单例：单独的实例”
*/

/* 
    高级单例模式
        1.在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个私有作用域AA（不销毁的栈内存），在AA中创建一个堆内存，把堆内存地址赋值给命名空间
        2.这种模式的好处：我们完全可以在AA中创建很多内容（变量or函数），哪些需要供外面调取使用的，我们暴露到返回的对象中（模块化实现的一种思想）
*/
/* var nameSpace=(function(){
    var n=12;
    function fn(){
        //...
    }
    return {
        fn:fn
    }
})()


var nameSpace=(function(){
    var n=12;
    function fn(){

    }
    return {
        fn:fn,
    }
})() */

var n=2;
var obj={
    n:3,
    fn:(function(n){
        n*=2;
        this.n+=2;
        var n=5;
        return function(m){
            console.log(this);
            this.n*=2;
           console.log(m+(++n));
        }
    })(n)
};
var fn=obj.fn;
fn(3);
//obj.fn(3);
//console.log(n,obj.n);