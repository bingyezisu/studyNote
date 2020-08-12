# 初识JS

## JS中的变量 variable

>变量：可变的量，在编程语言中，变量其实就是一个名字，用来存储和代表不同值的东西。

```javascript
//ES3
var a=12;
a=13;
console.log(a);//=>输出的是a代表的值13

//ES6
let b=100;
b=200;

const c=1000;
c=2000;//=>报错：CONST创建的变量，存储的值不能被修改（可以理解为常量）

//创建函数也相当于在创建变量
function fn(){}
//创建类也相当于创建变量
class A{}
//ES6的模块导入也可以创建变量
import B from "./B.js";
//Symbol创建唯一值
let n=Symbol(100);
let m=Symbol(100);
n==m;//=>false;
```
## JS中的命名规范

- 严格区分大小写
```javascript
let Test=100;
console.log(test);//=>报错：test is not defined
```
- 使用数字、字母、下划线、$,数字不能作为开头
```javascript
let $box;//=>一般用JQ获取的以$开头
let _box;//=>一般公共变量都是_开头
let 1box;//=>不可以，但是可以写box1
```
- 使用驼峰命名法：首字母小写，其余每一个有意义单词的首字母都要大写（命名尽可能语义化明显，使用英文单词）
```javascript
let studentInfo;
/***
常用的缩写：
add/insert/create/new(新增)
update(修改)
delete/del/remove/rm(删除)
sel/select/query/get(查询)
info(信息)
***/
```
- 不能使用关键字和保留字
```javascript
//当下有特殊含义的是关键字，未来可能会成为关键字的叫做保留字
//var let const function...
//=>代码强迫症（代码洁癖）：良好的编程习惯，极客精神
```
## JS中常用的数据类型



- 基本数据类型 
    + *数字number* ：常规数字和NaN
    + *字符串string* ：所有用""、''、``包起来的都是字符串
    + *布尔boolean* ：true/false
    + *空对象指针null*
    + *未定义undefined*
- 引用数据类型
    + *对象数据类型object*

        ```txt
        {}普通对象
        []数组对象
        /^[+-]?(\d|([1-9]\d+))(\.\d+)?/正则对象
        Math数学函数对象
        日期对象
        ...
        ```

    + *函数数据类型function*

**基本数据类型按值操作，引用数据类型操作的是堆内存的空间地址**

### Number

>  包含数字和NaN

`NaN` （not a number）  不是一个数，但它隶属于数字类型
**NaN和任何值（包括自己）都不相等：NaN!=NaN,所以我们不能用相等的方式判断是否为有效数字**

`isNaN` 检测一个值是否为有效数字，如果不是有效数字返回TRUE，反之是有效数字返回FALSE

**在使用isNaN进行检测的时候，首先会验证检测的值是否为数字类型，如果不是，先基于Number()这个方法，把值转换为数字类型，然后再检测**

#### 把其它值转换为Number的方法

`Number([val])`

```javascript
//把字符串转换为数字，只要字符串中包含任意一个非有效数字（第一个点除外）结果都是NaN，空字符串会变成数字0
Number("12");//=>12
Number("12px");//=>NaN
Number("");//=>0
Number(" ");//=>0

//布尔转换为数字
Number(true);//=>1
Number(false);//=>0
isNaN(false);//=>false
isNaN(true);//=>false

Number(null);//=>0
Number(undefined);//=>NaN

//把引用数据类型转换为数字，是先把他基于toString方法转换为字符串，然后在转换为数字
Number({name:"10"});//=>NaN
Number({});//=>NaN
//{}/{xxx:"xxx"} .toString()
Number([]);//=>"0"
Number([12]);//=>"12"
Number([12,23]);//=>NaN

```
`parseInt/parseFloat([val],[进制])`

```javascript
/***
转换为数字的方法，对于字符串来说，它是从左到右依次查找有效数字字符，直到遇到非有效数字字符,停止查找（不管后面是否还有数字，都不在找了），把找到的当做数字返回
***/
parseInt("12.5px");//=>12;
parseFloat("12.5px");//=>12.5
parseFloat("width:12.5px");//=>NaN
parseFloat("12.5.5");//=>12.5
```
**Number和parseInt/parseFloat的运行机制不一样，Number是浏览器内置的方法，运行的是v8引擎的底层机制**

`==` 

```txt
转换为数字的方法，对于字符串来说，它是从左到右依次查找有效数字字符，直到遇到非有效数字字符,停止查找（不管后面是否还有数字，都不在找了），把找到的当做数字返回
```

### String

> 所有用'',"",``(ES6模板字符串)包起来的都是字符串
#### 其它值转换成String的方法

`[val].toString()`和`字符串拼接`

```javascript
(12).toString();//=>'12'
(NaN).toString();//=>'NaN'
(1>2).toString();//"false"
(false).toString();//"false"
(null).toString();//=>报错
//null和undefined可以转换为字符串，结果就是"null/undefined"，但是禁止直接toString的
({}).toString();//=>"[object Object]"
//普通对象.toString()的结果是"[object Object]"=>?Object.prototype.toString方法不是转换为字符串，而是用来检测数据类型的

//四则运算法则中，除加法之外，其余都是数学计算，只有加法可能存在字符串拼接（一旦遇到字符串，则不是数学运算，而是字符串拼接）
console.log("10"+10);//=>"1010"
console.log("10"-10);//=>0
console.log("10px"-10);//=>NaN

let a=10+null+true+[]+undefined+"candy"+null+[]+10+false;
console.log(a);//=>"11undefinedcandynull10false"
/***
10+0->10+0->10
10+true->10+11->11
11+[]->11+""->"11" 空数组变为数字，先要经历变为空字符串，遇到字符串啥也别想了，直接变为字符串拼接
***/
```
### Boolean

> 只有两个值 true/false
#### 其他类型转换为布尔类型

**只有0、NaN、''、null、undefined 五个值转换为FALSE，其余都转换为TRUE（而且没有任何特殊情况）**

`Boolean([val])` `!/!!` `条件判断`

```javascript
//!:取反(先转为布尔，然后取反)
//!!:取反再取反，只相当于转换为布尔<=>Boolean
console.log(!1);//=>false
```
```javascript
//如果条件只是一个值，不是==/===/!=/>=等这些比较，是要把这个值先转换为布尔类型，然后在验证真假
if(1){
    console.log("haha")
}
if("2px"+2){
    //=>"2px2"
    console.log("hehe")
}
if("3px"-3){
    //=>NaN
    console.log("xixi")
}
```
### null/undefined

> null和undefined都代表的是没有 
`null` 意料之中（一般都是开始不知道值，我们手动设置为null，后期再给予赋值操作）

```javascript
let num=null;//=>let num=0;一般最好用null作为初始的空值，因为0不是空值，它在栈内存中有自己的存储空间（占了位置）
...
num=12;
```
`undefined `意料之外（不是我能决定的）

```javascript
let num;//=>创建一个变量没有赋值，默认值是undefined
```
### Object

>{[key]:[val],...} 任何一个对象都是有零到多组键值对(属性名：属性值)组成的（并且属性名不能重复）
```javascript
let person={
    name:"candy",
    age:30,
    height:"185CM",
    weight:"52KG",
    1:100}
//删除属性
//=>真删除：把属性彻底干掉
delete person[1];
//=>假删除：属性还在，值为空
person.weight=null;
//设置属性名属性值
//属性名不能重复，如果属性名已经存在，不属于新增属于修改属性值
person.sister="candices";
console.log(person['sister']);
person.name='daisy';
console.log(person['name']);
//获取属性名对应属性值
//=>对象.属性名
//=>对象[属性名] 属性名是数字或者字符串格式的
//=>如果当前属性名不存在，默认的属性值是undefined
//=>如果属性名是数字，则不能使用点的方式获取属性值
console.log(person.name);//=>"candy"
console.log(person['age']);//=>30
console.log(person.sex);//=>undefined;
console.log(person[1]);//=>100
console.log(person.1);//=>SyntaxError：语法错误
```
> 数组是特殊的对象数据类型
```javascript
/*
 * 数组是特殊的对象
 *  1.中括号中设置的是属性值，它的属性名是默认生成的数字，从零开始递增，而且这个数字代表每一项的位置，我们把其成为“索引”=>从零开始，连续递增，代表每一项位置的数字属性名
 *  2.天生默认一个属性名length,存储数组的长度
 */
let ary=[12,"haha",true,13];
console.log(ary.length);//=>4
console.log(ary['length']);//=>4
console.log(ary[1]);//=>'haha'
console.log(ary[0]);//第一项
console.log(ary[ary.length-1]);//最后一项
//向数组末尾追加内容
ary[ary.length]=100;
```

```javascript
let a=12;
let b=a;
b=13;
console.log(a);//=>12;

let n={name:"candy"};
let m=n;
m.name="daisy";
console.log(n.name)//=>daisy

let n=[10,20];
let m=n;
let x=m;
m[0]=100;
x=[30,40];
x[0]=200;
m=x;
m[1]=300;
n[2]=400;
console.log(n,m,x);//=>[100,20,400],[200,300],[200,300]

//阿里面试题
let a={
    n:1
}
let b=a;
a.x=a={
    n:2
};
//=>联等：a.x={n:2};a={n.2}
console.log(a.x);//=>undefined
console.log(b);;//=>{n:1,x:{n:2}}

```
### Function

> 函数就是一个方法或者一个功能题，函数就是把实现某个功能的代码放到一起进行分装，以后想要操作实现这个功能，只需要把函数执行即可=>"封装":减少页面中的冗余代码，提高代码重复使用率（`低耦合高内聚`）

```txt
类比：洗衣机就是一个函数，生产洗衣机就是封装一个函数（把实现某些功能的代码封装进来），生产的时候，不知道用户洗衣服的时候放什么水，衣服，洗衣液，我们需要提供出入口（提供的入口在函数中叫做形参，执行的时候放的具体东西函数中叫做实参）,洗完衣服需要能拿出来，洗衣机提供一个出口（在函数中叫做返回值:把函数处理后的结果能够返回给外面用）
```

```txt
学习函数的四个维度：
    创建函数：形参 实参
    执行函数：实参
    arguments
    函数底层运行机制
```

#### 创建函数

```javascript
function[函数名]([形参变量1],...){
    //函数体：基于JS完成需要实现的功能
    return [处理后的结果]
}
[函数名]([实参1],...)

//创建函数的时候我们设置了形参变量，但如果执行的时候并没有给传递对应的实参值，那么形参变量默认值是undefined
//函数执行的时候，函数体内不创建的变量我们是无法获取和操作的，如果要想获取内部的信息，我们需要基于RETURN返回值机制，把信息返回才可以
//没有写RETURN，函数默认返回值是undefined
function sum(n,m){
    let result=n+m;
    result*=10;
    result/=2;
    console.log(result);
}
sum();//=>NaN
sum(10);//=>NaN
sum(10,20);//=>150
sum(10,20,30)//=>150

function sum(n,m){
    if(n===undefined || m===undefined){
        //函数体重遇到RETURN，后面代码则不再执行了
        return;
    }
    let result=n+m;
}

//===================匿名函数
//匿名函数值函数表达式：把一个匿名函数本身作为值赋值给其他东西，这种函数一般不是手动触发执行，而是靠其他程序驱动执行（例如:触发某个事件的时候把它执行了）
document.body.onclick=function(){}
setTimeout(function(){},1000);
//匿名函数之自执行函数：创建完一个匿名函数，紧接着就把当前函数加小括号执行
(function(n){
    console.log(n);
})(100)
```

*自定义属性编程思想：前期把一些值存储到元素的自定义属性上，后期需要用到的时候直接从属性上获得这些值即可*

#### arguments 

>函数内置的实参集合

+ 类数组集合，集合中存储着所有函数执行是，传递的实参信息
+ 无论是否设置形参，arguments都存在
+ 无论是否传递实参，arguments都存在
  arguments.callee:存储的是当前函数本身（一般不用的，JS严格模式下禁止使用这些属性）

#### arrow function箭头函数

> 简单

```javascript
function sum(n,m){
    return n+m;
}
//改写成箭头函数
let sum=(n,m)=>{
    return n+m;
}
//=>等价于
let sum=(n+m)=>n+m;
//如果函数体重只有一行RETURN，可以省略RETURN和大括号
console.log(sum(10,20));

function fn(n){
    return function(m){
        return n+m;
    }
}
//=>等价于
fn=n=>m=>n+m

```

> 形参赋值默认值：当没有给形参传递实参的时候，执行默认值

```javascript
function sum(n,m){
    if(typeof n==="undefied"){
        n=0;
    }
     if(typeof m==="undefied"){
        m=0;
    }
    return n+m;
}
//等价于
let sum=(n=0,m=0)=>n+m;
```

> 箭头函数中没有arguments

```javascript
//我们可以使用剩余运算符获取到传递的实参集合（它是数组，比arguemnts操作更方便）
let sum=(...arg)=>evel(arg.join('+'))
sum(1,2,3,4);
```

## JS中的数据类型检测

`typeof([val])`用来检测数据类型的运算符

`instanceof`用来检测当前实例是否隶属于某个类

`constructor`基于构造函数检测数据类型（也是基于类的方式）

`Object.prototype.toString.call()`检测数据类型最好的办法

```javascript
/*
 * 基于typeof检测出来的结果
 *  1.首先是一个字符串
 *  2.字符串中包含对应的类型
 * 局限性
 *  1.typeof null=>"object" 但是null并不是对象
 *  2.基于typeof无法细分出当前值是普通对象还是数组对象等，因为只要是对象数据类型，返回的结果都是“object”
 */
 
console.log(typeof 1);//=>"number"
let a=NaN;
console.log(typeof a);//=>"number"
console.log(typeof undefined);//=>"undefined"
console.log(typeof typeof typeof []);//=>string;
```



## JS中的操作语句

### 条件判断

	>条件成立做什么？不成立做什么？

`if/else if/else`

```javasc
if(条件){
    条件成立执行
}else if(条件2){
    条件2成立执行
}
...
else{
    以上条件都不成立
}
```

`三元运算符`

*简单IF/ELSE的特殊处理方式 `条件？条件成立处理的事情：条件不成立处理的事情*

+ 如果处理的事情比较多，我们用括号包起来，每一件事情用逗号分隔
+ 如果不需要处理事情，可以用null/undefined占位

```javascript
let a=10;
a>=10?console.log("hehe"):console.log("haha");
a>0 &&a<20?(a++,console.log(a)):null;

if(a>0){
    if(a<10){
        a++;
    }else{
        a--;
    }
}else{
    if(a>-10){
        a+=2
    }
}
a>0 ?(a<10 ? a++ :a--):(a>-10 ? a+=2 : null)
```

`switch case`

*一个变量在不通知情况下的不同操作*

```javascript
//1.每一种CASE情况结束后最好都加上BREAK
//2.default等价于else，以上都不成立干的事情
//3.每一种case情况的比较用的是===“绝对相等”
let a=10;
switch(a){
     case 1:
        console.log("呵呵");
        break;
    case 5:
        console.log("哈哈");
        break;
    case 10:
        console.log("嘿嘿");
        break;
    default:
        console.log("嘻嘻");
}
//不加break，当前条件成立执行完成后，后面条件不论是否成立都要执行，知道遇到break为止（不加break可以实现变量在某些值的情况下做相同的事情=>编程开发人员要具备探索尝试之心）
switch(a){
    case 1:
        a++;
    case 5:
        a+=2;
        break;
    default:
        a--;
}
console.log(a);//=>4
```

### 循环

> 重复做某些事情就是循环 

`for循环` `for in循环` `for of循环(ES6)` `while循环` `do While循环`

```javascript
/* 
    1.创建循环初始值
    2.设置（验证）循环执行的条件
    3.条件成立执行循环体中的内容
    4.当前循环结束这行步长累积操作
 */
 for(var i=0;i<5;i++){
     console.log(i);//=>0 1 2 3 4 
 }
 console.log(i);//=>5

 for(var i=10;i>3;i-=2){
     if(i<7){
         i++;
     }else{
         i--;
     }
 }
 console.log(i);//=>3

```
**循环体中的两个关键词**:

`continue`：结束当前这轮循环（continue后面的代码不在执行，继续执行下一轮循环）

`break`：强制结束整个循环（break后面代码也不在执行），而且整个循环啥也不干直接结束

```javascript
for(var i=0;i<10;i++){
    if(i>=2){
        i+=2;
        continue;//
    }
    if(i>=6){
        i--;
        break;
    }
    i++;
    console.log(i);//1
}
console.log(i); //11
//0=>1+1=>2=>+2=>4+1=>5 +2=>7 +1=>8  +2 10  +1=>11

for(var i=0;i<10;i++){
    if(i>=2){
        i+=2;
        break;
    }
    if(i>=6){
        i--;
       continue;
    }
    i++;
    console.log(i);//1
}
console.log(i); //4


// 扩展题：
let box=document.getElementById("box");
let AA=box.style;
AA.color="red"; 
//=>可以实现:修改的是堆内存中的值（只要堆内存中的值被修改，浏览器会基于DOM映射机制把页面中的元素进行重新渲染）
let BB=box.style.color;
BB="red";
//=>不能实现
```
**for in循环 **

+ 用来循环遍历对象中的键值对（continue和break同样适用）

+ for in在遍历的时候，优先循环数字属性名(从小到大)

```javascript
var obj={
    name:"Lucy",
    age:30,
    friends:"Yang,Json",
    1:20,
    2:149,
    3:140
}
//for(var 变量(key) in 对象)
//对象中有多少组键值对，循环就执行几次（除非break结束）
for(var key in obj){
    //每一次循环key变量存储的值：当前对象的属性名
    //获取属性值：obj[key]=>obj[key] 
    console.log(`属性名：${key},属性值：${obj[key]}`)
}
/* 
    //=>
    属性名：1,属性值：20
    属性名：2,属性值：149
    属性名：3,属性值：140
    属性名：name,属性值：Lucy
    属性名：age,属性值：30
    属性名：friends,属性值：Yang,Json
*/
```
浏览器常用的输出方式:
+ 控制台输出console.log/dir/table
+ 浏览器窗口弹窗 window.alert/confirm/prompt
    - 三种方式输出的结果都必先经过toString转换为字符串
    - 三种方式会阻断JS代码的执行，只有当窗口关掉，JS才会继续运行
+ document.write在页面中写入信息(和alert一样，输出的结果是字符串)

*JS中的加减乘除本应是进行数学运算（如果遇到的值不是数字类型，也需要基于Number()方法把其转换为数字，再进行运算）：但是JS中加法有特殊情况：相加过程中遇到字符串直接变为字符串拼接*

```javascript
let i="10";
console.log(i++);//=>10
console.log(a);//=>11
//console.log(i+=1);//=>"101"
//console.log(i=i+1);//=>"101"
//i++ 是纯粹的数学运算
```
*i++和++i都会是数学运算中的累加1，区别是计算的顺序*
```javascript
let i=1;
5+(i++) //=>先算5+1=>6 i自己累加1 i=>2

i=1;
5+(++i)//=>先算++i=>2 然后5+2=>7 i=>2

let i=3;
console.log(5+(++i)+(i++)+3-2+(--i)+(i--)-2);//20
//5+4=>9 +4 13+3-2=>14+4=>18+4-2=>20
//i=4;i=5;i=4;i=3
console.log(i);//3
```

```javascript
//变态题
!(!"Number(undefined)");
isNaN(parseInt(new Date()))+Number([1])+typeof undefined;
Boolean(Number(""))+!isNaN(Number(null))+Boolean("parseInt([])")+typeof !(null);
parseFloat("1.6px")+parseInt("1.2px")+ typeof parseInt(null);
isNaN(Number(!!Number(parseInt("0.8"))));
console.log(1+"2"+"2");
!typeof parseFloat("0");
Number("");
typeof "parseInt(null)"+12+!!Number(NaN)
!typeof (isNaN(""))+paseInt(NaN)
typeof !parseInt(null)+!isNaN(null);
```
# JS中常用的属性和方法

## Math

### Math常用的属性和方法

`Math.abs([numberValue]) `

> 获取绝对值（绝对值是正数或者零）

```javascript
console.log(Math.abs(-12));//=>12
console.log(Math.abs(10));//=>10;
//传递的不是数字类型的值，先基于Number()进行转换
console.log(Math.abs('-1'));//=>1
console.log(Math.abs("-12px"));//=>NaN
console.log(Math.abs(true));//=>1
```

`Math.ceil/floor([numberValue])`

> 把一个数向上取整或向下取整

```javascript
console.log(Math.ceil(12));//12
console.log(Math.ceil(12.1));//13
console.log(Math.ceil(12.9));//13
console.log(Math.ceil(-12.1));//-12
console.log(Math.ceil(-12.1));//-12

console.log(Math.floor(12));//12
console.log(Math.floor(12.1));//12
console.log(Math.floor(12.9));//12
console.log(Math.floor(-12.1));//-13
console.log(Math.floor(-12.1));//-13
```

`Math.round([numberValue])`

> 四舍五入

```javascript
console.log(Math.round(12));//12
console.log(Math.round(12.1));//12
console.log(Math.round(12.5));//13 正数中，5属于如
console.log(Math.round(12.9));//13
console.log(Math.round(-12.1));//-12
console.log(Math.round(-12.5));//-12 负数中，5属于舍
console.log(Math.round(-12.6));//-13 
```

`Math.max/min（[val1],[val2],...）`

> 获取一堆数中的最大值和最小值

```javascript
console.log(Math.max(12,5,68,23,45,3,27));//=>68
console.log(Math.max(12,5,68,23,45,3,27));//=>3
//思考题：如何基于Math.max/min获取数组中的最大值最小值
Math.max([12,5,68,23,45,3,27])//=>NaN 
//解析：传递了一个值，是个数组，和内置的语法要求不符
```

`Math.sqrt/pow()`

> sqrt：给一个数开平方 
>
> pow：计算一个数的指数幂

```javascript
Math.sqrt(18);//=>4.242640687119285
Math.sqrt(9);//=>3
Math.sqrt(-9);//=>NaN 负数开不了平方
Math.pow(2,10);//=>1024
```

`Math.random()`

> 获取0~1之间的随机小数(没有n也没有m)

扩展：

```javascript
//获取[n-m]之间的随机整数（包含n,m）
Math.round(Math.random()*(m-n)+n)
```

## Array

### 数组及数组中常用的方法

#### 实现数组增删改的方法

> 这一部分方法都会修改原有的数据

`push`

```javascript
/***
	push()
	向数组末尾追加内容
	@params  多个任意类型
	@return  新增后数组的长度
***/
let ary=[10,20]
let res=ry.push(30,"AA");
//基于原生JS
ary[ary.length]=[10,20]
```

`unshift`

```javascript
/***
	unshift()
	向数组开始位置增加内容
	@params 多个任意值
	@return 新增后数组的长度
***/
let ary=[10,20];
let res=ary.unshift(30,"AA");
//基于原生ES6展开运算符，把原有的ary克隆一份，在新的数组中创建第一项，其余的内容使用原始ary中的信息即可，也算实现了向开始追加的效果
ary=[100,...ary];
console.log(ary);
```

`shift`

```javascript
/***
	shift()
	删除数组中的第一项
	@params 无
	@return 删除的那一项
***/
let ary=[10,20,30,40];
let res=ary.shift();
console.log(res,ary);//10,[20,30,40]
//基于原生JS中的delete，把数组当做普通的对象，确实可以删除掉某一项内容，但是不会影响数组本身的结构特点（length长度不会跟着修改），真实项目中杜绝这样的删除使用
delete ary[0];
console.log(ary);
```

`pop`

```javascript
/***
	pop()
	删除数组中的最后一项
	@params 无
	@return 删除的那一项
***/
let ary=[10,20,30,40];
let res=ary.shift();
console.log(res,ary);//40,[10,20,30]
//基于原生JS，将数组长度减少一位，默认减少的就是最后一项
ary.length--;//=>ary.length=ary.length-1
```

`splice`

```javascript
/***
	splice
	实现数组的增加，删除，修改
	（删除）
	@params 
		n,m 都是数字 从索引n开始删除m个元素（m不写，是删除到末尾）
	@return 把删除的部分用新数组存储起来返回
	（增加，修改）
	@params 
		n,m,x 从索引n开始删除m个，用x占用删除的部分（修改）
		n,0,x 从索引n开始删除0个，把x放到n的前面（增加）
	@return 把删除的部分用新数组存储起来返回
***/
let ary=[10,20,30,40];
let res=ary.splice(2,1);//=>
console.log(res,ary)//=>30,[10,20,40]

//基于这种方法可以清空一个数组，把原始数组中的内容以新数组存储起来（有点类似数组的克隆：把原来数组克隆一份一模一样的给新数组）
ary.splice(0);
console.log(res，ary);//=>[10,20,40]，[]

//删除最后一项和第一项
ary.splice(ary.length-1)
ary.splice(0,1);
//向数组末尾追加
ary.splice(ary.length,0,"abc");
//向数组开头新增
ary.splice(0,0,"abc");
```

#### 数组的查询和拼接

> 此组学习的方法，原来数组不会改变

`slice`

```javascript
/***
	slice()
	实现数组的查询
	@params 
		n,m 都是数字 从索引n开始，找到索引为m的地方（不包含m这一项）
	@return 
		把找到的内容以一个新数组的形式返回
***/
let ary=[10,20,30,40,50];
let res=ary.slice(1,3);
console.log(res)=>//[20,30]
//m不写是找到末尾
res=ary.slice(1);
console.log(res)=>[20,30,40,50]
//数组的克隆，参数0不写也可以
res=ary.slice(0);
console.log(res);//=>[10,20,30,40,50]
//思考：1.如果n/m为负数会怎么样，如果n>m了会怎样，如果是小数会怎样，如果是非有效数字会怎样，如果n或者m的值比最大索引大会怎样？2.这种克隆方式叫做浅克隆，可以回去先看看深度克隆如何处理？
ary.slice(5,1);//=>[];
ary.slice(1.2,5);//=>[20,30,40,50]
ary.slice(1.6,5);//=>[20,30,40,50]
ary.slice(1.6,4.3)//=>[20,30,40]
ary.slice(-1,2);//[]
ary.slice(-1,5);//[50]
ary.slice(1,-2)//=>[20,30]
ary.slice(-1,-2);//[]
ary.slice(1,"12px");//=>[]
ary.slice("abc",4)//=>[10,20,30,40]
```

`concat`

```javascript
/***
	concat()
	实现数组的查询
	@params 多个任意类型
	@return 拼接后的新数组（原来的数组不变） 
***/
let ary1=[1,2,3];
let ary2=[4,5,6];
let res=ary1.concat(ary2,"candy","daisy")
console.log(res);
```

#### 把数组转换成字符串

> 原有数组不变

`toString`

```javascript
/***
	toString()
	把数组转换为字符串
	@params 无
	@return 转换成字符串,每一项用逗号分隔（原数组不变）
***/
let ary=[10,20];
let res=ary.toString();
console.log(res);//=>"10,20"
console.log([].toString);//=>""
console.log([12],toString);//="12"
```

`join`

```javascript
/***
	join()
	把数组转换为字符串
	@params 指定的分隔符，为字符串
	@return 转换成字符串（原数组不变）
***/
let ary=[1,2,3]
let res=ary.join();//=>"1,2,3";
res=ary.join("");//=>"123";
res=ary.join("|")//=>"1|2|3"
res=ary.join("+")//=>"1+2+3";
console.log(eval(res))//=>60 eval把字符串变为js表达式
```

#### 检测数组中是否包含某一项

`indexOf/lastIndexOf`

```javascript
/***
	indexOf/lastIndexOf()
	检测当前想在数组中第一次或者最后一次出现位置的索引值（在IE6~8中不兼容）
	@params 要检索的这一项内容
	@return 这一项出现的位置索引值（数字），如果数组中没有这一项，返回的结果是-1
***/
let ary=[1,2,3,1,2,3];
console.log(ary.indexOf(1));//=>0
console.log(ary.lastIndexOf(1))//=>3

//想验证ary中是否包含"candy"
if(ary.indexOf("candy")===-1){
    //不包含
}else{
    //包含
}
//也可以直接使用ES6新提供的includes方法判断
if(ary.includes("candy")){
    //包含:如果存在返回值是true
}
```

#### 数组的排序或者排列

`reverse`

```javascript
/***
	reverse()
	把数组倒过来排列
	@params 
	@return 排列后的新数组 原来数组改变
***/
let ary=[12,15,9,28,10,22]
ary.reverse();
console.log(ary);//=>[22, 10, 28, 9, 15, 12]
```

`sort`

```javascript
/***
	sort()
	实现数组的排序
	@params 
		可以没有，也可以是个函数
	@return 排序后的新数组
***/
let ary=[8,7,3,4,6,5,9,2,1]
ary.sort();
console.log(ary);//=>[1, 2, 3, 4, 5, 6, 7, 8, 9]
//sort方法中如果不传递参数，是无法处理10以上数字的
ary=[12,15,9,28,10,22];
ary.sort();
console.log(ary);[10, 12, 15, 22, 28, 9]

//ary.sort(function(a,b){return ...})

ary.sort((a,b)=>{
    //a和b是相邻的两项
    return a-b
});// [9, 10, 12, 15, 22, 28]
ary.sort((a,b)=>{
    return b-a;
});// [28, 22, 15, 12, 10, 9]
//想要实现多位数正常排序，需要给sort传递一个函数，函数做返回a-b实现升序，返回b-a实现降序（原因？需要先了解冒泡排序的机制）
```

#### 遍历数组中每一项的方法

*forEach map filter find reduce some every....*

`forEach`

```javascript
/***
	forEach()
	遍历数组中的每一项内容 原数组不改变
	@params 
		回调函数
	@return undefined 
***/
let ary=[12,15,9,28,10,22]
//基于原生JS中的循环可以实现
for(let i=0;i<ary.length;i++){
    console.log("索引："：+i+",内容："+ary[i] )
}
ary.forEach((item,index)=>{
    //数组中有多少项，函数就会被默认执行多少次
    //每一次执行函数：item是数组中当前要操作的这一项，index是当前项的索引
     console.log("索引："：+index+",内容："+item )
})
//不兼容IE6~8
```

**数组去重**

```javascript
//方法1：建立空白新数组方法
let ary=[1,2,3,1,2,1,2,3,1,1,2,3];
let newAry=[];
for(let i=0;i<ary.length;i++){
   let curItem=ary[i];
   /*if(newAry.indexOf(curItem)===-1){
      newAry.push(curItem);//不存在就添加
   }*/
    if(newAry.includes(curItem)){
        continue;//存在跳出当前循环
    }
    newAry.push(curItem);
 }
//=>等价于
ary.forEach(item=>{
    if(newAry.includes(item)) return;
    newAry.push(item);
})
console.log(newAry);//=>[1, 2, 3]
```

```javascript
//方法2:（兼容IE6~8）
var ary=[1,2,3,1,2,1,2,3,1,1,2,3];
//删后面的办法
for(let i=0;i<ary.length;i++){
    for(let n=i+1;n<ary.length;n++){
        if(ary[i]===ary[n]){
            ary.splice(j,1);//原来数组已经改变
            j--;//防止数组塌陷
         }
     }
}
//删前面的办法
for(let i=0;i<ary.length;i++){
    for(let n=i+1;n<ary.length;n++){
        if(ary[i]===ary[n]){
            ary.splice(i,1);//原来数组已经改变
            i--;//防止数组塌陷
         }
     }
}
//=>想了一个超级别扭的方法来写，好虐！
//删后面的
for(var i=0;i<ary.length;i++){
    //item:每一次循环拿出来的当前项
    //itemAfter:当前项后面所有的内容(新数组)
    var item=ary[i];
    var itemAfter=ary.slice(i+1);
    for(var j=0;j<itemAfter.length;j++){
       if(item===itemAfter[j]){
          ary.splice(j+1,1);
          i--;
        }
     }
}
//删前面的
for(var i=0;i<ary.length;i++){
    //item:每一次循环拿出来的当前项
    //itemAfter:当前项后面所有的内容(新数组)
    var item=ary[i];
    var itemAfter=ary.slice(i+1);
    for(var j=0;j<itemAfter.length;j++){
       if(item===itemAfter[j]){
           ary.splice(i,1);
           i--;
           break;
        }
    }
}
console.log(ary);
```

```javascript
//方法3：设置对象属性方法,兼容所有浏览器！
var ary=[1,2,3,1,2,1,2,3,1,1,2,3];
let obj={};
for(let i=0;i<ary.length;i++){
    let item=ary[i];
    if(obj[item]!==undefined){
        ary.splice(i,1);
        i--;
        //=>根据i--的赋值原理，可以改写成:
        //ary.splice(i--,1);
        continue;

    }
    obj[item]=item;
}
console.log(ary);
//基于splice实现删除性能不好，当前项被删后，后面每一项的索引都要向前提一位，如果后面内容过多，一定会影响性能
for(let i=0;i<ary.length;i++){
    let itme=ary[i];
    if(obj[item]!==undefined){
        ary[i]=ary[ary.length-1];
        ary.length--;
        i--;
        continue;
    }
     obj[item]=item;
}
//用最后一项替换当前项，把最后一项删除，然后再比较替换后的当前项
```

```javascript
/***
	unique:实现数组去重的方法
	@params：
		ary [Array] 要去重的数组
	@return：
		ary [Array] 去重后的数组
	by candy on 20200811
***/
function unique(ary){
    let obj={};
    for(let i=0;i<ary.length;i++){
        let item=ary[i];
        if(obj[item]!==undefined){
            ary[i]=ary[ary.length-1];
            ary.length--;
            i--;
            continue;
        }
        obj[item]=item;
    }
    return ary;
}
let res=unique([12,23,32,43,46,32,17,12,23,34,48]);
 console.log(res);
```

```javascript
//方法4：基于正则匹配方法实现的数组去重
let ary=[1,2,3,1,2,1,2,3,1,1,2,3];
ary.sort((a,b)=>a-b);
let  str=ary.join('@')+'@';
let reg=/(\d+@)\1*/g;
ary=[];
str.replace(reg,(n,m)=>{
   m=Number(m.slice(0,m.length-1));
   ary.push(m);
})
console.log(ary);
```

```javascript
//基于ES6的Set(对应的Map)实现去重
let ary=[1,2,3,1,2,1,2,3,1,1,2,3];
ary=[...new Set(ary)];
console.log(ary);
```

## String

	#### 字符串中常用的方法

> 所有用单引号，双引号，反引号 包起来的都是字符串

```javascript
let str="candywangdisaywangxixihahahehe";
//每一个字符串都是由0到多个字符组成的
str.length//=>字符串长度
str[0]//=>获取索引为0（第一个字符）
str[str.length-1]//=>获取最后一个字符 str.length-1最后一项索引
str[10000]//=>undefined 不存在这个索引

//循环输出字符串中的每一个字符
for(let i=0;i<str.length;i++){
    let char=str[i];
    console.log(char);
}
```

`charAt/charCodeAt`

```javascript
/***
	charAt:根据索引获取指定位置的字符
	charCodeAt:获取指定字符的ASCII码值（Unicode编码值）
	@params
		n [number] 获取字符串指定的索引
	@return
		返回查找到的字符
		找不到返回的是空字符串不是undefined,或者对应的编码值
***/
let str="candywangdisaywangxixihahahehe";
console.log(str.charAt(0));//=>c
console.log(str.charAt(10000));//=>""
console.log(str.[10000]);//=>undefined

console.log(str.charCodeAt(0));//=>99
console.log(String.fromCharCode(99));//=>"c"
```

`substr/substring/slice` 

```javascript
/***
	都是为了实现字符串的截取（在原来字符串中查找到自己想要的）
		substr(n,m):从索引n开始截取m个字符，m如果不写截取到末尾（后面方法也是）
		substring(n,m):从索引n开始找到索引m处（不含m）
		slice(n,m):和substring一样，都是找到索引为m处，但是slice可以支持负数作为索引，其余两个方法不可以的
***/
let str="candywangdisaywangxixihahahehe";
str.substr(0,5);//=>"candy"
str.substring(0,5);//=>"candy"
str.substring(3,1000);//=>"dywangdisaywangxixihahahehe"

console.log(str.substring(5,9));//=>"wang"
console.log(str.slice(5,9));//=>"wang"
console.log(str.substring(-9,-5));//=>"" substring不支持负数索引
console.log(str.slice(-9,-5));//=>"ihah" sublice支持负数索引 快捷查找：负数索引，我们可以按照STR.LENGTH+负数索引 的方式查找

```

`indexOf/lastIndexOf/includes`

```javascript
/***
	验证字符是否存在
	 indexOf(x,y):获取x第一次出现位置的索引，y是控制查找的起始位置索引
	 lastIndexOf(x):最后一次出现位置的索引
	 =>没有这个字符，返回的结果是-1
***/

console.log(str.indexof("n"));//=>2
console.log(str.indexOf("n",3));//=>7

console.log(str.lastIndexOf("h"));//=>28
console.log(str.indexOf('@'));//=>-1 不存在
console.log(str.indexOf("xi"));//=>18 验证整体第一次出现的位置，返回的索引是第一个字符所在位置的索引值
console.log(str.includes("z"));
```

`toUpperCase/toLowerCase`

```javascript
/***
	toUpperCase():转大写
	topLowerCase():转小写
***/
let str="candywangdisaywangxixihahahehe";
console.log(str.toUpperCase());//=>"CANDYWANGDISAYWANGXIXIHAHAHEHE"
```

`split`

```javascript
/***
	split([分隔符])：把字符串按照指定的分隔符拆分成数组（和数组中的join对应）
	split支持传递正则表达式
***/
let str="candy!wang!disay!wang!xixi!haha!hehe";
console.log(str.split("!"));//=> ["candy", "wang", "disay", "wang", "xixi", "haha", "hehe"]
console.log(str.split("!").join(","));//=>"candy,wang,disay,wang,xixi,haha,hehe"
```

`replace`

```javascript
/***
	replace(老字符,新字符)：实现字符串的替换（经常伴随着正则而应用）
***/
let str="candy@daisy@lucy";     console.log(str.replace("@","|"));//=>"candy|daisy@lucy" 在不使用正则表达式的情况下，执行一次replace只能替换一次字符
console.log(str.replace(/@/g,"|"));//=>"candy|daisy|lucy"
```

`match`

11111