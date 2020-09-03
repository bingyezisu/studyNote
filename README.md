

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

>{[key]:[val],...} 任何一个对象都是由零到多组键值对(属性名：属性值)组成的（并且属性名不能重复）
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

> 函数就是一个方法或者一个功能体，函数就是把实现某个功能的代码放到一起进行封装，以后想要操作实现这个功能，只需要把函数执行即可=>"封装":减少页面中的冗余代码，提高代码重复使用率（`低耦合高内聚`）

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
/***
	typeof:用来检测数据类型的运算符
		typeof [value]
	@return 
		首先是一个字符串
		字符串包含对应的数据类型，例如："number","object","undefined","function","boolean","symbol"...
	@局限性
		typeof null=>"object"
		//不能具体区分对象数据类型的值
		typeof []=>"object"
		typeof {}=>"object"
		typeof /^$/=>"object"
	@优势
	 	使用方便，所以在真实项目中，我们也会大量应用它来检测，尤其是在检测基本类型值（除null之外）和函数类型值的时候，他还是很方便的
***/
function func(n,m,callback){
    //ES6（形参赋值默认值）: function(n=0,m=0)
    //=>检测形参的值是否为undefined
    //n===undefined?n=0:null
    //typeof m==="undefined"?m=0:null
    //=>基于逻辑或和逻辑与处理(瑕疵：不仅仅是不传赋值默认值，如果传递的值是假也会处理称为默认真)
    n=n||0;
    m=m||0;
    //回调函数执行
    typeof callback==="function"?callback():null
    //callback && callback();//=>瑕疵：传递的为真即可执行，不一定是一个函数，这样些事开发者心理已经知道，要不然不传，要传就是一个函数
}
func(10,20,function(){
    
})
```

```javascript
/***
	instanceof:本意是用来检测实例是否隶属于某个类的运算符，也可以用来做某些数据类型的检测，例如：数组、正则等
	@局限性
		不能处理基本数据类型值
		只要在当前实例的原型链(__proto__)中出现的类，检测结果都是true（用户可能会手动修改原型链的指向example.__proto__或者在类的继承中 等情况		
***/
let arr=[];
let reg=/^$/;
console.log(arr instanceof Array);//=>true
console.log(reg instanceof Array);//=>false
console.log(reg instanceof RegExp);//=>true
console.log(reg instanceof Object);//=>true

function func(){
    //arguments类数组
    arguments.__proto__=Array.prototype;
    console.log(arguments instanceof Array);//=>true  
}
func();
```

```javascript
/***
	constructor:构造函数
		@原理：在类的原型上一般都会带有constructor属性，我们也是利用这一点，获取某实例constructor属性值，验证是否为所属的类，从而进行数据类型检测
		@局限性：constructor属性值太容易被修改了
***/
let n=12,
    arr=[];
console.log(n.constructor===Number);//=>true
console.log(arr.constructor===Array);//=>true
console.log(arr.constructor===Object);//=>false
arr.constructor=111;
console.log(arr.constructor===Array);//false
Func.prototype={};//=>这样原型上没有constructor属性（重构了）
```

```javascript
/***
	Object.prototype.toString.call([value])
		@原理：调用Object原型上的toString方法，让方法执行的时候，方法中的this是要检测的数据类型，从而获取到数据类型所属类的信息
		@信息的模板 "[object 所属类]",例："[object Array]"
	在所有的数据类型中，他们的原型上都有toString方法，除Object.prototype.toString不是把数据值转换为字符串，其余的都是转换为字符串，而Object原型上的toString是检测当前实例隶属类的详细信息的（检测数据类型）...	
	obj.toString()
        1.首先基于原型链查找机制，找到Object.prototype.toString
        2.把找到的方法执行，方法中的this->obj
        3.方法内部把this（obj）的所属类信息输出
        =>方法执行，方法中的this是谁，就是检测谁的谁的所属类信息
	这个方法很强大，所有数据类型隶属的类信息检测的一清二楚
***/
function func(n,m){
    return n+m;
}
let obj1={},obj2={name:"candy"};
console.log([12,23].toString());//=>"12,23"
console.log(/^$/.toString());//=>"/^$/"
console.log(func.toString());//=>"function func..."
console.log(obj1.toString());//=>"[object Object]"

let _obj={};
_obj.toString.call(100);//=>"[object Number]"
```

```javascript
var _obj={
            isNumberic:"Number",
            isBoolean:"Boolean",
            isString:"String",
            isNull:"Null",
            isUndefined:"Undefined",
            isSymbol:"Symbol",
            isPlainObject:"Object",
            isArray:"Array",
            isRegExp:"RegExp",
            isDate:"Date",
            isFunction:"Function",
            isWindow:"Window",
        },
  _toString=_obj.toString,
  _type={};
  for(var key in _obj){
    if(!_obj.hasOwnProperty(key)) break;
      	_type[key]=(function(){
            let reg=new RegExp("\\[object "+_obj[key]+"\\]");
            return function anonymous(val){
            	return reg.test(_toString.call(val));
            }
       })()
   }
console.log(_type.isNumberic(1));
```



## JS中的类型转换

+ null和undefined和其他类型惊醒比较返回的都是false
+ 对象和对象比较都是false，因为对象指向的是引用空间
+ NaN和任何类型比较都不相等
+ 对象和字符串 数字 symbol比较的时候，会把对象转换成原始数据类型



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
//方法1：基于ES6扩展运算符
var ary=[12,5,68,23,45,3,27]
console.log(Math.max(...ary))
//方法2：使用apply方法
console.log(Math.max.apply(null,ary));
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

#### 实现一些常用的需求

> 时间字符串的处理

```javascript
let time="2019-7-24 12:6:23"
//=>变为自己需要呈现的格式,例如：
// "2019年07月24日 12时06分23秒"

//方案1：一路replace
time=time.replace("-","年").replace("-","月").replace(" ","日")
   		.replace(":","时").replace(":","分")+"秒";
console.log(time);
//方案2：获取到年月日小时分钟秒这几个值后，最后项拼成什么效果就拼成什么
//获取值的方法：基于indexOf获取指定符号索引，基于substring一点点截取
time="2019-7-24 12:6:23";
let m=time.indexOf("-");
let n=time.lastIndexOf("-");
let x=time.indexOf(" ");
let y=time.indexOf(":");
let z=time.lastIndexOf(":");
time=time.substring(0,m)+"年"+time.substring(m+1,n)+"月"+time.substring(n+1,x)+"日"+time.substring(x+1,y)+"时"+time.substring(y+1,z)+"分"+time.substring(z+1)+"秒";
console.log(time);

//获取值的方法：基于split一项项的拆分
time="2019-7-24 12:6:23";
m=time.split(" ");//["2019-7-24",'12:6:23']
n=m[0].split("-");//["2019","7","24"];
x=m[1].split(":");//["12","6","23"];
time=n[0]+"年"+n[1]+"月"+n[2]+"日"+x[0]+"时"+x[1]+"分"+x[2]+"秒";
console.log(time);

//不足十位不灵
let addZero=val=>val=val.length<2?"0"+val:val;

//获取值的方法：基于正则表达式的拆分
time="2019-7-24 12:6:23";
let ary=time.split(/(?: |-|:)/g);
//=>["2019", "7", "24", "12", "6", "23"]
time=ary[0]+"年"+addZero(ary[1])+"月"+ary[2]+"日"+ary[3]+"时"+addZero(ary[4])+"分"+ary[5]+"秒";
console.log(time);
```

> 实现一个方法queryURLParameter 获取一个URL地址问好后面传递的参数信息

```javascript
/* 
    res:{
        lx:1,
        name:"candy",
        friend:"lucy",
        HASH:"box"
    }
*/
let url="http://www.gome.com.cn/index.html?lx=1&name=candy&friend=lucy#box";
//1.获取问好或者井号后面的值
let askIndex=url.indexOf("?");
let wellIndex=url.indexOf("#");
let askText=url.substring(askIndex+1,wellIndex);
let wellText=url.substring(wellIndex+1);
//2.问号后面值的详细处理
let askAry=askText.split("&");//=>["lx=1","name=candy","friend=lucy"];
let res={}
askAry.forEach((item,index)=>{
    let itemAry=item.split("=");
    res[itemAry[0]]=itemAry[1];
})
res["HASH"]=wellText;
console.log(res);
```

```javascript
/* 
    queryURLParams: 获取URL地址中问好传参的信息和哈希值
        @params
            url [string] 要解析的url字符串
        @return
            [object] 包含参数和哈希值信息的对象
    by candy on 2020/08/13 15:35:00
*/
function queryURLParams(url){
    // 1.获取?和#后面的信息
    let askIn=url.indexOf("?"),
        wellIn=url.indexOf("#"),
        askText="",
        wellText="";
    wellIn===-1?wellIn=url.length:null; 
    askIn>=0?askText=url.substring(askIn+1,wellIn):null;
    wellText=url.substring(wellIn+1);

    //2.获取每一部分的信息
    let result={};
    wellText!==""?result["HASH"]=wellText:null;
    if(askText!==""){
        let ary=askText.split("&");
        ary.forEach(item=>{
            let itemAry=item.split("=");
            result[itemAry[0]]=itemAry[1];
        })
    }
    return result;
}
```

```javascript
//基于正则封装的才是最完美的
function queryURLParams(url){
    let result={},
        reg1=/([^?=&#]+)=([^?=&#]+)/g,
        reg2=/#([^?=&#]+)/g;
    url.replace(reg1,(n,x,y)=> result[x]=y);
    url.replace(reg2,(n,x)=> result['HASH']=x);
    return result;
}
```

> 实现一个最LOW的验证码 ：数字+字母共四位
>
> 验证码的目的：防止外挂程序恶意批量注入的

```javascript
/* 
  queryCode:获取到四位随机的养殖吗，然后放到指定的盒子中
    @parmas  无
    @return
  by candy on 2020/08/13
*/
function queryCode(){
	let area="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result="";
    for(let i=0;i<4;i++){
        let ran=Math.round(Math.random()*61);
        result+=area.charAt(ran);
    }
     codeBox.innerHTML=result;
}
```

### Date

#### 日期对象的基本操作

```javascript
let time = new Date();
/***
	获取当前客户端（本机电脑）本地的时间
		这个时间用户是可以自己修改的，所以不能作为重要的参考依据
	Thu Aug 13 2020 16:59:28 GMT+0800 (中国标准时间)
		获取的结果不是字符串是对象数据类型的，属于日期对象（或者说是Date这个类的实例对象）
***/
typeOf time //=>"object"
```

标准日期对象中提供了一些属性和方法，共我们操作日期信息

+ getFullYear()：获取年

+ getMouth()：获取月 结果是0~11代表第一个月到第十二个月

+ getDate()：获取日

+ getDay()：获取星期 结果是0~6代表周日到周六

+ getHours()：获取时

+ getMinutes()：获取分

+ getSeconds()：获取秒

+ getMillseconds()：获取毫秒

+ getTime()：获取当前日期距离1970/1/1 00:00:00 这个日期之间的毫秒差
+ toLocaleDateString() 
+ toLocaleString() 

```javascript
time.toLocaleDateString()//=>"2020/8/13"
time.toLocaleString()//=>"2020/8/13 下午5:35:00"
```

>new Date() 除了获取本机时间，还可以把一个时间格式字符串转换为标注的时间格式

```javascript
new Date("2019/7/26");
//=>Fri Jul 26 2019 00:00:00 GMT+0800 (中国标准时间)
new Date("2019-7-26");
//=>Fri Jul 26 2019 00:00:00 GMT+0800 (中国标准时间)
new Date("2019-7-26 15:20:00");
//=>Fri Jul 26 2019 15:20:00 GMT+0800 (中国标准时间)
/***
	支持的格式
		yyyy/mm/dd 
		yyyy/mm/dd hh:mm:ss
		yyyy-mm-dd 这种格式在IE下不支持
***/
```

**时间字符串格式化的案例**

```javascript
let time="2019-7-24 12:6:23";
/***
	字符串处理解决办法
***/
function formatTime(time){
    time=new Date(time.replace(/-/g,"/")),
    year=time.getFullYear(),
    month=time.getMonth()+1,
    day=time.getDate(),
    week=time.getDay(),
    hours=time.getHours(),
    minutes=time.getMinutes(),
    seconds=time.getSeconds();
	//拼凑成我们想要的字符串
    weekAry=["日","一","二","三","四","五","六"];
    let result=year+"年"+addZero(month)+"月"+addZero(day)+"日";
    result+=" 星期"+weekAry[week]+" ";
 result+=addZero(hours)+"时"+addZero(minutes)+"分"+addZero(seconds)+"秒";
      return result;
}
let addZero=val=>{
    val=Number(val);
    return val<10?"0"+val:val;
}
```

# DOM及其基础操作

> DOM:document.object.model文档对象模型，提供一些属性和方法，共我们操作页面中的元素

## 获取DOM元素的方法

+ document.getElementById(); 指定在文档中，基于元素的ID获取这个元素
+ [context].getElementsByTagName() 在指定上下文（容器）中，通过标签名获取一组元素集合
+ [context].getElementsByClassName() 在指定上下文中，通过样式类名获取一组元素集合（不兼容IE6~8）
+ document.getElementsByName() 在整个文档中，通过标签的Name属性值获取一组元素结合（在IE中只有表单元素的NAME才能识别，所以我们一般应用于表单元素的处理）
+ document.head/document.body/document.documentElement 获取页面中的HEAD/BODY/HTML三个元素
+ [context].querySeletor([selecotr])在指定上下文中，通过选择器获取到指定的元素对象
+ [context].querySeletorAll([selecotr])在指定上下文中，通过选择器获取到指定的元素集合

```javascript
//=>querySelector /querySelectorAll 不兼容IE6~8
let box=document.querySelector("#box")
let links=document.querySelectorAll(".box")
```

## JS中的节点和描述节点之间关系的属性

>节点 ：Node
>
>节点结合：NodeList（getElementsByName/querySelectorAll 获取的都是节点集合）

|          | nodeType |   nodeName   | nodeValue |
| :------: | :------: | :----------: | :-------: |
| 元素节点 |    1     | 大写的标签名 |   null    |
| 文本节点 |    3     |   “#text”    | 文本内容  |
| 注释节点 |    8     |  “#commen”   | 注释内容  |
| 文档节点 |    9     | “#document“  |   null    |
|   ...    |          |              |           |

### 描述节点之间关系的属性

+ childNodes:获取所有的子节点

  *标准浏览器（非IE6~8）中会把空格和换行当作文本节点处理（childNodes包含所有节点）*

+ children：获取所有的元素子节点（子元素标签标签）

  *IE6~8下，使用children会把注释也当做元素节点*

  ```javascript
  /***
      children: 获取指定上下文中，所有的元素子节点
          @params
              context [element object]指定的上下文元素信息
          @return
              [array] 返回所有的元素子节点结合
      by candy on 2020/08/14
  ***/
  function children(context){
      var res=[],
          nodeList=context.childNodes;
      for(var i=0;i<nodeList.length;i++){
          var item=nodeList[i];
          item.nodeType===1?res.push(item):null;
      }
      return res;
  }
  
  ```

+ parent：获取父亲节点

+ firstChild: 获取第一个子节点

+ lastChild: 获取最后一个子节点

+ firstElementChild/lastElementChild:获取第一个和最后一个元素子节点（不兼容IE6~8）

+ previousSibling:获取上一个哥哥节点

+ nextSibling：获取下一个弟弟节点

+ previousElementSibling/nextElementSibling:获取哥哥和弟弟元素节点（不兼容IE6~8）

```javascript
/***
    prev: 获取指定元素的哥哥节点
        @params
            context [element object]指定的元素信息
        @return
            [element object] 返回找到的哥哥节点
    by candy on 2020/08/14
***/
function prev(context){
    var pre=context.previousSibling;
    while(pre.nodeType!==1){
        pre=pre.previousSibling;
    }
    return pre;
}
//jquery中提供一些方法共我们获取元素：children/prev/next/prevAll/nextAll/sibling/siblings/index...
```

## 在JS中动态增删改元素

`createElement`  创建元素

`createTextNode` 创建文本对象

`appendChild` 把元素添加到容器的末尾

```javascript
容器.appendChild([新增元素])
```

`insertBefore` 把元素添加到指定容器中指定元素的前面

```javascript
容器.insertBefore([新增元素],[指定元素])
```

`cloneNode(true/false) `  克隆元素或者节点（深/浅）

```javascript
let box1=document.getElementsByClassName("box")[0];
let box2=box1.cloneNode(true);//深克隆 包含内存元素
let box3=box1.cloneNode(false);//浅克隆 只是当前元素
```

`removeChild`  移除元素

```javascript
容器.removeChild(元素)
```

`setAttribute` 设置属性

*这种方式是把自定义属性放到元素结构上，并没有放到元素对象的堆内存中*

`getAttribute` 获取属性

`removeAttribute` 移除属性



## 获取元素样式和操作样式

```javascript
//=>修改元素样式
[element].style.xxx=xxx; //=>修改和设置他的行内样式
[element].className=xxx; //=>设置样式类

//=>获取元素的样式
console.log([element].style.xxx);//=>获取的是当前元素写在行内上的样式，如果有这个样式，但是没有写在行内上，则获取不到
```

### JS盒子模型属性

> 基于一些属性和方法，让我们能够获取到当前元素的样式和信息，例如：clientWidth，offsetWidth等
>
> 属性：
>
> + client
>   + width/height
>   + top/left
> + offset
>   + width/height
>   + top/left
>   + parent
> + scoll
>   	+ width/height
>   	+ top/left
>
> 方法： 
>
> ​	widnow.getComputerStyle([element],(伪类))/[element].currentStyle

```javascript
let box=document.getElementById("box");

//=>获取盒子可视区域的宽高（宽：内容宽度+左右padding/高：内容高度+上下padding）
//1.内容溢出对它没影响
//2.获取的结果是没有单位的（其余的盒子模型属性也是）
//3.获取的结果是整数，它会自己进行四舍五入（其余的盒模型属性也是）
box.clientWidth
box.clientHeight

//=>获取当前页面一屏幕（可视化）区域的高度
let winW=document.documentElement.clientWidth||
    document.body.clientWidth;
let winH=document.documentElement.clientHeight||
    document.body.clientHeight;

//=>获取盒子左边框和上边框的大小
box.clientLeft
box.clientTop

//=>在client的基础上加上border==盒子本身的宽高
box.offsetWidth
box.offsetHeight

//=>在没有内容一溢出的情况下，获取的而结果和client是一样的
//=>在有内容溢出的情况下，获取的结果约等于真实内容的宽高（上/左padding+真实内容的高度/宽度）
//1.不同浏览器获取的结果不尽相同
//2.设置overflow属性值对最后的结果也会产生一定的影响
box.scrollWidth
box.scrollHeight

//=>获取整个页面真实的高度
document.documentElement.scrollheight||
    document.body.scrollHeight

//=>竖向滚动条卷去的高度
//1.边界值
//min=0;
//max=整个的高度（scrollHeight-一屏幕高度clientHeight）
box.scrollTop
//=>横向滚动条卷去的宽度
box.scrollLeft

//=>13个盒子模型，只有这两个是“可读写的”（既可以获取也可以设置对应的值），其余的都是“只读”属性（不能设置值，只能获取）
```

# 基础算法

## 冒泡排序

```javascript
/***
	bubble:实现冒泡排序
		@params
			ary [ARRAY] 需要实现排序的数组
		@return
			[ARRAY] 排序后的数组
	by candy  on 2020/08/20
	实现思想：将数组前面的项后后面的项作比较，后面的项大于前面的项时两项交换位置
***/
function bubble(ary){
    let cur=null;
    for(let i=0;i<ary.length-1;i++){
        for(let j=0;j<ary.length-1-i;j++){
            if(ary[j]>ary[j+1]){
                cur=ary[j];
                ary[j]=ary[j+1];
                ary[j+1]=cur;
            }
        }
    }
    return ary;
}
```

## 插入排序

```javascript
/***
	insert:实现插入排序
		@params
			ary [ARRAY] 需要实现排序的数组
		@return
			[ARRAY] 排序后的数组
	by candy  on 2020/08/20
	实现思想：先准备一个新数组，然后将每一项放到新数组中，将新放入的项值和新数组中的每一项作比较，比它小就放在它前面，比他们都大就放到后面去
***/
function insert(ary){
    let newAry=ary.splice(0,1);
	for(var i=0;i<ary.length;i++){
        for(var j=newAry.length-1;j>=0;j--){
            if(ary[i]>newAry[j]){
                newAry.splice(j+1,0,ary[i]);
                break;
            }
            if(j===0){
                newAry.unshift(ary[i]);
            }
        }
    }
    return newAry;
}
```

## 快速排序

```javascript
/***
	递归：函数执行的时候自己调用自己
***/
function fn(){
    //这种死递归会形成栈溢出的错误
    fn();
    //这种看似死递归但是不会形成栈溢出
    setTimeout(fn,0);
}
fn();
//求1~10相加的和
function sum(n){
    if(n>10){
        return 0;
    }
    return n+sum(n+1);
}
sum(1);
```

```javascript
/***
	quick:实现快速排序
		@params
			ary [ARRAY] 需要实现排序的数组
		@return
			[ARRAY] 排序后的数组
	by candy  on 2020/08/20
	实现思想：封装一个方法，选取数组的中间项，并创建新数组，将剩余数组项与中间项作比较，
		 	如果大于当前项放到右边，小于当前项就放到前面，对新建的数组循环执行这个方法，
		 	直到数组两边都排好，最后进行拼接。
***/
function quick(ary){
    if(ary.length<=1){
        return ary;
    }
    let mIn=Math.floor(ary.length/2),
        mVal=ary.splice(mIn,1)[0],
        leftAry=[],
        rightAry=[];
   for(let i=0;i<ary.length;i++){
       mVal>ary[i]?leftAry.push(ary[i]):rightAry.push(ary[i]);
   }  
   return quick(leftAry).concat(mVal,quick(rightAry));
}
```

# ES6的基础语法

## let/const

>ES6中新增的用来创建变量和常量的

```javascript
let a=12;
a=13;
console.log(a);//13

const b=12;
b=13;//=>报错，基于CONST创建变量，变量存储的值不能被修改（常量）
console.log(b);
```

> let和var的区别

+ let不存在变量提升（当前作用域中，不呢个在let声明前使用变量）
+ 同一个作用域中，let不允许重复声明
+ let解决了typeof的一个暂时行死区问题
+ 全局作用域中，使用let声明的变量并没有给window加上对应的属性
+ let会存在块作用域（除对象意外的大括号都可被看作块级私有作用域）

## 箭头函数及THIS问题

> ES6z中新增了创建函数的方式：“箭头函数”
>
> 真实项目中是箭头函数和function这种普通函数混合使用

箭头函数简化了创建函数的代码

```javascript
//=>箭头函数的创建都是函数表达式方式（变量=函数），这种方式下，不存在变量提升，也就是函数只能在创建完成后执行（也就是创建了代码之后执行）
const fn=([形参])=>{
    //函数体
}
fn([实参])

//=>形参只有一个，小括号可以不加
const fn=n=>{};
//=>函数体中只有一句话，并且是return xxx的，可以省略大括号和return
const fn=n=>n*10;

/***
    function fn(n){
        return function(m){
            return m+(++n);
        }
    }
***/
const fn=n=>m=>m+(++n);
```

箭头函数中没有arguments，但是可以基于剩余运算符获取实参集合，而且ES6中支持给形参设置默认值的

```javascript
let obj={};
let fn=(context=window,...args)=>{
    //console.log(arguments);
    //=>Uncaught ReferenceError: arguments is not defined 箭头函数没有argument
    console.log(args);
    //=>...args:剩余运算符（把除第一项外的，其他传递的实参信息都存储到args这个数组集合中）
}
fn(obj,10,20,30);//=>context：obj arg:[10,20,30]
fn()//=>context:window  ary:[]
```

箭头函数中没有自己的this，它里面用到的this都是自己所处的执行上下文中的this（真实项目中，一但涉及this问题，箭头函数慎用）

```javascript
window.name="win";
let fn=n=>{
    console.log(this.name);
}
let obj={
	name:'obj'
    fn:fn
}
fn(10);//=>this:window
fn.call(obj,10);//=>this:window
fn.apply(obj,[10]);//=>this:window
document.body.onclick=fn;//=>this:window 不是我们预期的BODY
obj.fn(10);//=>this:window

let obj={
    name:"obj",
    fn:function(){
        //=>this:obj 普通函数是有自己的this的
        let f=()=>{
            console.log(this);
        }
        f();//=>this:obj
        return f;
    }
}

let obj={
	name:"obj",
	fn:function(){
	/* setTimeout(function(){
			console.log(this);
        	this.name="candy";//this=>window;
       },1000) */
     /* let _this=this;
		setTimeout(function(){
			_this.name="candy";
        }) */
		setTimeout(()=>{
			console.log(this);
            this.name="candy"
         },1000)
    }
} 
obj.fn();
```

## 解构赋值

> 让左侧出现和右侧值相同的结构，以此快速获取到我们需要的内容
>
> 真实项目中最常用的就是对数组和对象的解构赋值

```javascript
//数组的解构赋值
let ary=[10,20,30,40,50];
let [a,b,...x]=ary;
/***
	...x拓展运算符:把剩下的内容存储在x中（x是个数组）
	但是它只能出现在最后
***/
console.log(a,b,x);//a=>10 b=>20 x=>[30,40,50]
let[n,,m]=ary;
console.log(n,m);//=>n=>10 m=>30

let ary=[10,[20,30,[40,50]]];
let [n,[,,[,m]]]=ary;
console.log(n,m);//n=>10 m=>50
```

```javascript
//对象的解构赋值
let obj={
    name:"candy",
    age:30,
    sex:"female",
    friends:["candice","lily","tom","judy"]
}
//=>创建的变量要和对象的属性名一致（默认）
/* let {name,years,sex}=obj;
console.log(name,years,sex);//=>"candy" undefined "female" */

//=>冒号相当于给获取的结果设置一个别名（变量名），创建一个叫做years的变量存储了obj.age的值
let {age:years}=obj;
console.log(years);

let{height="154cm"}=obj;
console.log(height);//=>"154cm" 

let {name,friends:[fristFriend]}=obj;
console.log(`my name is ${name},my best friend is ${fristFriend}`)
```

## “...”的作用

+ 拓展运算符（多用在解构赋值中）
+ 展开运算符（多用在传递实参中）
+ 剩余运算符 （多用在接收实参中）

```javascript
//=>解构赋值
let ary=[12,23,34]
let [n,...m]=ary; //=>n:[12] m:[23,34]

//=>传递实参
let ary=[12,23,13,24,10,25]
let min=Math.min(...ary);//=>10;
//=>实现数组克隆（浅克隆）
let cloneAry=[...ary];
//对象克隆
let obj={name:"candy",age:30};
let cloneObj={...obj,sex:"female"}

//=>接收实参
let fn=(...arg)=>{
    //ary=>[10,20,30]
}
fn(10,20,30);
```

## class创建类

```javascript
//=>传统ES3/ES5中创建类的方法
function Fn(){
    this.x=100;
}
Fn.prototype.getX=function(){
    console.log(this.x);
}
var f1=new Fn();
f1.getX();
//也可以把它当作普通函数的执行
Fn();
//还可以把Fn当作普通的对象设置键值对
Fn.queryX=function(){}
Fn.queryX();
```

```javascript
//=>ES6中类的创建
class Fn{
    //等价与之前的构造函数体
    constructor(n.m){
        this.x=100;
    }
    //直接写的方法就是加在原型上的 ===Fn.prototype.getX...
    getX(){
        console.log(this.x)
    }
    //前面设置static的，把当前Fn当作普通对象设置的键值对
    static queryX(){}
    static y=100;
}
let f=new Fn(10,20)
f.getX();
Fn.queryX();
Fn();//=>报错：class创建的类只能new执行，不能当作普通函数执行
```

## 模板字符串

```javascript
let year="2020",
    month="08",
    day="25";
//=>"你好，今天是2020年08月25日，今天是一年一度的七夕节，愿天下有情人都是兄妹，哈哈！"
let res=`你好，今天是${year}年${month}月${day}日，今天是一年一度的七夕节，愿天下有情人都是兄妹，哈哈！`
console.log(res);

```

# 深入JS

## 面向对象（OOP）

```txt
JS是一门编程语言（具备编程思想）
	【面向对象】
		JS\JAVA\PHP\C#\Ruby\Python\C++...
	【面向过程】
		C
整个JS是基于面向对象设计和开发出来的语言，我们学习和实战的时候，也要按照面向对象的思想去体会和理解
```

面向对象编程，需要我们掌握：“对象，类，实例” 的概念

`对象`：万物皆对象

`类`：对象的具体细分（按照功能特点进行分类：大类，小类）

`实例`：类中具体的一个事物 （拿出类别中的具体一个实例进行研究，那么当前类别下的其他实例也具备这些特点和特征）

### 函数封装重载

**封装**  ：低耦合高内聚

**多态** ：重载和重写

> `重载`：方法名相同，形参个数或者类型不一样（js中不存在真正意义上的重载，js中的重载指的是同一个方法，根据传参不同实现不同的效果）
>
> `重写`：在类的继承中，子类可以重写父类中的方法

```javascript
function sum(x){
    //arguments
    if(typeof z==="undefined"){
        //...
        return;
    }
}
```

### 继承

> 子类继承父类中的属性和方法（目的是让子类中的实例能够调取父类中的属性和方法）

```javascript
/***
	方案一：原型继承
		让父类的的属性和方法在子类实例的原型链上
		Child.prototype=new Parent();
		Child.prototype.constructor=Child;
	特点：
		1.不像其他语言中的继承一样（其他语言的继承一般是拷贝继承，也就是子类继承父类，会把父类中的属性和方法拷贝到一份到子类中，共子类的实例调取使用），它是把父类的原型放到子类实例的原型上，实例想调取这些方法，是基于__proto__原型链查找机制完成的。
		2.子类可以重写父类上的方法（这样会导致父类其他的实例受到影响）
		3.父类中私有或者公有的属性方法，最后都会变为子类中公有的属性和方法
		
***/
function A(x){
    this.x=x;
}
A.prototype.getX=function(){
    console.log(this.x);
}
function B(y){
    this.y=y;
}
B.prototype=new A(200);
B.prototype.constructor=B;
B.prototype.getY=function(){
    console.log(this.y);
}
let b1=new B(100);
b1.y;
b1.getX()

```

```javascript
/***
	方案二：Call继承
		Child方法中把Parent当作普通函数执行，让Parent中的this指向Child的实例，相当于给Child的实例设置了很多私有的属性或者方法
		Child(){
			Parent.call(this,...args)
		}
	特点：
		1.只能继承父类私有的属性和方法（因为是把Parent当普通函数执行，和其原型上的属性和方法没有关系）
		2.父类私有的变为子类私有的
***/
function A(x){
    this.x=x;
}
A.prototype.getX=function(){
    console.log(this.x);
}
function B(y){
    //this:B的实例b1
    A.call(this,200);//=>b1.x=200;
    this.y=y;
}
B.prototype.getY=function(){
    console.log(this.y);
}
let b1=new B(100);
b1.x;
b1.getX()

```

```javascript
/***
	方案三：寄生组合继承
		Call继承+类似于原型继承
	特点：父类私有和公有的分别是子类实例的私有和公有属性方法（推荐）
***/
function A(x){
    this.x=x;
}
A.prototype.getX=function(){
    console.log(this.x);
}
function B(y){
    A.call(this,200);
    this.y=y;
}
//Object.create(OBJ):创建一个空对象，让空对象__proto__指向OBJ
B.prototype=Object.create(A.prototype);
B.prototye.constructor=B;
B.prototype.getY=function(){
    console.log(this.y);
}
let b1=new B(100);
b1.x;
b1.getX()

//模拟Object.create
Object.create=function(obj){
    function Fn(){}
    Fn.prototype=obj;
    return new Fn();
}
```

```javascript
//ES6中基于CLASS创造出来的类不能当作普通函数执行
class A{
    constructor(x){
        this.x=x;
    }
    getX(){
        console.log(this.x);
    }
}
//ES6中的继承 class Child extends Parent{}=>B.prototype.__proto__=A.prototype
class B extends A{
    //子类继承父类，可以不写constructor,一旦谢了，则在constructor的第一句话必须填写super()
    constructor(y){
        super(200);//=>A.call(this,200)
        this.y=y;
    }
    getY(){
        console.log(this.y)
    }
}
let b1=new B(200);
console.log(b1);
```

## 构造函数

> 构造函数也是一个普通函数，创建方式和普通函数一样，用来新建实列对象。
>
> 习惯上构造函数中函数名首字母大写
>
> 普通函数直接调用即可，构造函数用new [函数名] ()调用

```javascript
//普通函数
function funName(a,b){
    console.log(a+b)
};
var a=funName();//普通函数的调用方法
console.log(a);//undefined 普通函数没有return
/***
	基于构造函数创建自定义类
		1.在普通函数执行的基础上“new xxx()”,这样就不是普通函数执行，而是构造函数执行，当前的函数名称之为“类名”，接受的返回结果是当前类的一个实例
		2.自己创建的类名，最好第一个单词字母大写
		3.这种构造函数设计模式执行，主要用于组件、类库、插件、框架等的封装，平时编写业务逻辑一般不这样处理
***/
function Human(name,job,age){
    this.name=name;
    this.job=job;
    this.age=age;
    this.sayHi=function(){
        alert("hi");
    } 
}
//新建实例对象
var person=new Human("candy","programmer",30);
console.log(person instanceof Human)//true;
/***
	person=>{
		name:"candy",
		job:"programmer",
		age:30,
		sayHi:function(){
			alert("hi")
		}
	}
***/
```

**创建值的两种方式**

> 字面量：let n=12;
> 构造函数：let m=new Number("12");
> 不管是哪一种方式创造出来的都是Object类的实例，而实例之间是独立分开的，所以var xxx={} 这种模式就是JS中的单例模式
>
> 基本数据类型基于两种不同的模式创建出来的值是不一样的
>
> + 基于字面量方式创建出来的值是基本数据类型
> + 基于构造函数创建出来的值时引用类型

**作用域** 

> JS中的函数作用域被称为词法作用域，又叫静态作用域 ，是在函数定义的时候就产生了

**普通函数及构造函数的运行机制**

>普通函数执行 【fn()】
>
>+ 形成一个私有作用域
>+ 形参赋值
>+ 变量提升
>+ 代码执行
>+ 栈内存释放问题
>
>构造函数执行 【new Fn()】
>
>+ 像普通函数执行一样，形成一个私有的作用域（栈内存）
>  + 形参赋值
>  + 变量提升
>+ 【构造函数执行独有】在JS代码自上而下执行之前，首先在当前形成的私用域中创建一个对象（创建一个堆内存：暂时不存储任何的东西），并且让函数中的执行主题（THIS）指向这个新的堆内存（THIS===创建的对象）
>+ 代码自上而下执行
>+ 【构造函数执行独有】代码执行完成，把之前创建的堆内存地址返回（浏览器默认返回）

```javascript
/***
	构造函数执行，不些return，浏览器会默认返回创建的实例，但是如果写了return？
		1.return的是一个基本值，返回的结果依然是类的实例，没有影响
		2.如果返回的是引用值，则会把默认返回的实例覆盖，此时接受到的结果就不再是当前类的实例了
		=>构造函数执行的时候，尽量减少return的使用，防止覆盖实例
***/
function Fn(){
    var n=10;
    this.m=n;
    return "哈哈";
}
var f=new Fn();
```

****



### 模拟new

```javascript
function Animal(type){
	this.type=type;
}
Animal.prototype.say=function(){
    console.log("say");
}
function mockNew(){
	let Constructor=[].shift.call(arguments);
    let obj={};
    obj.__proto__=Constructor.prototype;
    let r=Constructor.apply(obj,arguments);
    return r instanceof Object ? r:obj
}
//let animal=new Animal("哺乳类");
let animal=mockNew(Animal,"哺乳类")
console.log(animal);
```

## 原型和原型链

+ 所有的函数数据类型都天生自带一个属性：prototype（原型），这个属性的值是一个对象，浏览器会默认给它开辟一个堆内存。
+ 在浏览器给prototype开辟的堆内存中有一个天生自带的属性：constructor，这个属性存储的值是当前函数本身
+ 每一个对象都有一个\__proto__属性，这个属性指向当前实例所属类的prototype（如果不能确定它是谁的实例，都是Object的实例）

```javascript
function Human(name,job,age){
    this.name=name;
    this.job=job;
    this.age=age;
}
Human.prototype.sayHi=function(){
    console.log("hello,my name is"+this.name);
}
//新建实例对象
var person=new Human("candy","programmer",30);
console.log(person.__proto__=== Human.prototype);//=>true;
console.log(person.__proto__.__proto__=== Object.prototype);//=>true;
```

**原型链**

它是一种基于__proto__向上查找的机制，当我们操作实例的某个属性或者方法的时候，首先找自己空间中私有的属性或者方法。

+ 找到了，则结束查找，使用私有的即可
+ 没有找到，则基于__proto__找所属类的prototype，如果找到就用这个公有的，如果没有找到，基于原型上的__proto__继续向上查找，一直找到Object.prototype的原型为止，如果没有，操作的属性或方法不存在。

**hasOwnProperty 及 in**

`hasOwnProperty([属性名])`判断实例内是否存在这个属性，返回true，如果没有这个属性，返回false

`[属性名] in 实例` 判断能否通过对象访问到指定属性，无论属性是在实例中还是在原型中（不管是是对象的私有属性还是公有属性）

```javascript
console.log(person.hasOwnproperty(name));//=>true
console.log(person.hasOwnProperty(height));//=>false
console.log(height in person);//=>true
```

```javascript
//判断指定属性存在于原型内
function hasPubeProperty(object,attr){
    return !object.hasOwnProperty(name) && (name in obj);
}
```



## call,apply及bind

```javascript
/***
	1）可以改变我们档期那函数的this指向
	2）还会让当前函数执行
***/
Function.prototype.call=function(context){
    context=context?Object(context)||window;
    context.fn=this;
    let args=[];
    for(let i=1;i<arguments.length;i++){
        args.push('arguments['+i+']')
    }
    let r=eval('context.fn('+args+')');
    delete context.fn;
    return r;
}
fn.call("hello","1","2");
//改变this的指向=>"hello"=>让fn1执行
```

```javascript
Function.prototype.myApply=function(context,args){
     context=context?Object(context):window;
     context.fn=this;
     if(!agrs){
        return context.fn();
     }
     //利用数组的toString的特性
     let r=eval('context.fn('+args+')');
     delete context.fn;
     return r;
}
```

```javascript
/***
	1)bind方法可以绑定this指向 绑定参数
	2）bind方法返回一个绑定后的函数（高阶函数）
	3）如果绑定的函数被new了 当前函数的this就是当前的实例
	4）new出来的结果可以找到原有类的原型
***/
Function.prototype.myBind=function(context){
    let that=this;
    let bindArgs=Array.prototype.slice.call(arguments,1);
    function fn(){
        
    }
    function fBound(){
        let args=Array.prototype.slice.call(arguments)
        return that.apply(context,bindArgs.concat(args));
    }
    fn.prototype=this.prototype;
    fBound.prototype=new Fn();
    return fBound
}
let bindFn=fn.bind(obj,"cat");
let bindFn1=fn.myBind(obj,"cat");
let instance=new bindFn1(9)
```

## 深拷贝及浅拷贝

> 深拷贝 拷贝后的结果更改是不会影响拷贝前的 拷贝前后没有关系的
>
> 浅拷贝 改变拷贝前的内容，会对拷贝之后的有影响，拷贝前和拷贝后是有关系的

```javascript
//...运算符只能拷贝一层（浅拷贝）
let obj={name:"candy",address:{x:100,y:100}}
let o={...obj};
obj.address.x=200;
console.log(obj,o);

let a=[1,2,3];
let arr=[a];
let newArr=arr.slice();
newArr[0][0]=100;
console.log(arr);

//深拷贝 (不完整 不能实现复杂的拷贝)
let obj={name:"candy",address:{x:100,y:100}}
let o=JSON.parse(JSON.stringify(obj));
obj.address.x=200;
console.log(obj,o)

//实现一个递归拷贝
function deepClone(obj,hase=new weakMap()){
    if(obj==null) return obj;//如果是null或者是undefined就不进行拷贝操作
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    //可能是对象或者普通的值 (函数不考虑深拷贝)
    if(typoof obj !=="object") return obj;
    if(hash.get(obj)) return hash.get(obj);
    let cloneObj=new obj.constructior;
    hash.set(obj,cloneObj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            //实现一个递归拷贝
            clonObj[key]=deepClone(obj[key],hash);
        }
    }
    return cloneObj;
}
let obj=undefined
deepClone(obj)
```



## 设计模式

### 单例设计模 （Singleton Pattern）

>+ 表现形式
>
>  ```javascript
>  var obj={
>             xxx:xxx,
>             ...
>    }
>  //在单列设计模型中，obj不仅仅是对象名，它被称为“命名空间[NameSpace]”,把描述事物的属性存放到命名空间中，多个命名空间是独立分开的互不冲突
>  ```
>
>+ 作用
>
>  ```jav
>  //把描述同一件事物的属性和特征进行“分组、归类”（存储再同一个堆内存空间中），因此避免了全局变量之间的冲突和污染
>  var pattern1={name:"xxx"}
>  var pattern2={name:"xxx"}
>  ```
>
>+ 单例设计模式命名的由来
>
>  ```javascript
>  每一个命名空间都是JS中Object这个内置基类的实例，而实例之间是相互独立互不干扰的，所以我们称它为：“单例：单独的实例”
>  ```

```javascript
/* 
    高级单例模式
        1.在给命名空间赋值的时候，不是直接赋值一个对象，而是先执行匿名函数，形成一个私有作用域AA（不销毁的栈内存），在AA中创建一个堆内存，把堆内存地址赋值给命名空间
        2.这种模式的好处：我们完全可以在AA中创建很多内容（变量or函数），哪些需要供外面调取使用的，我们暴露到返回的对象中（模块化实现的一种思想）
*/
var nameSpace=(function(){
    var n=12;
    function fn(){
        //...
    }
    function sum(){
        //...
    }
    return {
        fn:fn,
        sum:sum
    }
})()
```

```javascript
/***
	This
		1.给当前元素的某个事件绑定方法，当事件触发执行的时候，方法中的this是当前操作的元素对象
		oBox.onclick=function(){
			//=>this:box
		}
		2.普通函数执行，函数中的this取决于执行的主体，谁执行的，this就是谁（执行主体：方法执行，看方法名卡面是否有“点”，有的话，点前面是谁this就是谁，没有this是window）
		function fn(){
			console.log(this);
		}
		var obj={fn:fn};
		//执行的是相同的方法（不同的是函数执行方法中的this是不一样的）
		obj.fn();//=>this:obj
		fn()//=>this:window
		
		~function(){
			//=>this:window
		}();
***/
var n=2;
var obj={
    n:3,
    fn:(function(n){
        n*=2;
        this.n+=2;
        var n=5;
        return function(m){
            this.n*=2;
           console.log(m+(++n));
        }
    })(n)
};
var fn=obj.fn;
fn(3);
obj.fn(3);
console.log(n,obj.n);

```

**模块化开发**

> + 团队协作开发的时候，会把产品按照功能板块进行划分，每一个功能板块由专人负责开发
>
> + 把各个板块之间公用的部门进行提去封装，后期在想实现这些功能的时候,直接的调取引用即可（模块封装）

```javascript
//项目例子
var utils=(function(){
    return {
        aa:function(){
            
        }
    }
})()
//=>candy
var skinRender=(function(){
    var fn=function(){
        
    }
    return {
        init:function(){
        },
        fn:fn
    }
})()
//tom
var weaterRender=(function(){
    var fn=function(){
        
    }
    return {
        init:function(){
            fn();
            skipRender.fn();
        }
    }
})()
weaterRender.init();
```

### 工厂模式（Factory Pattern）

> + 把实现相同功能的代码进行“封装”，以此来实现“批量生产”（后期想要实现这个功能，我们只需要执行函数几口）
> + "低耦合高内聚"：减少页面中的冗余代码，提高代码的重复使用率

```javascript
function createPerson(name,age){
    var obj={};
    obj.name=name;
    obj.age=age;
    return obj;
}
var p1=createPerson("xxx",25);
var p2=createPerson("cccc",30);
```

# JS综合面试题

**问**：call和apply的区别，哪一个性能更好？

**答**：call和apply都是Function原型上的方法，都可以改变this的指向，call和apply传参的形式不一样，apply是以数组的方式传参，而call是展开的形式传递。bind也可以用来改变this的指向，但是需要调用执行，而call，和apply是直接执行的。call的性能要比apply好一些，尤其是传递给函数的参数超过三个的时候。从性能角度来说我们日常项目应用多用call，而且基于ES6的扩展运算符，我们可以完全用call代替apply。

```javascript
//=>自己实现性能测试（只供参考）：任何代码性能测试都是和测试环境有关系的，例如CPU、内存、GPU等电脑当前性能不会有相同的情况，不同浏览器也会导致性能上的不同。
//console.time可以测试出一段程序执行的时间
//console.profile()在火狐浏览器中安装fireBug,可以更精准的获取到当前程序每一个步骤消耗的时间
console.time("A");
for(let i=0;i<1000;i++){
    
}
console.timeEnd("A");
```

**问**：实现(5).add(3).minus(2)，使其输出结果为6?

**答**：

```javascript
~(function(){
    //每一个方法执行完，都要返回Number这个类的实例，这样才能继续调用Number原型中的方法（链式写法）
    function check(n){
        n=Number(n);
        return isNaN(n)?0:n;
    }
    function add(n){
        n=check(n);
        return this+n;
    }
    function minus(n){
        n=check(n);
        return this-n;
    }
    ["add","minus"].forEach(item=>{
        Number.prototype[item]=eval(item);
    })
})()
console.log((5).add(3).minus(2));//6
```

**问** ：箭头函数和普通函数的区别，构造函数可以使用new生成实例，那么箭头函数可以吗？为什么？

**答**：区别：箭头函数语法上比普通函数更加简洁，ES6中每一种函数都可以使用形参赋值默认值和剩余运算符。

​				   箭头函数中没有this，它里面出现的this是继承函数所处上下文中的this,使用call/apply等任何方式都无法改变this的指向

​					箭头函数没有arguments（类数组），只能基于...args获取传递的参数集合（数组）

​					箭头函数不能被new执行（原因：箭头函数中没有this，也没有prototype）

```javascript
document.body.onclick=function(){
    //this:window 不是BODY
}
document.body.onclick=function(){
    //this:BODY
    arr.sort(function(a,b){
        //=>this：window 回调函数中的this一般都是window
        return a-b
    })
}
//=>回调函数：把一个函数B作为实参传递给另外一个函数A，函数A在执行的时候，可以把传递进来的函数B去执行（执行N次，可传值，）
function each(arr,callback){
    for(let i=0;i<arr.length;i++){
        let flag=callback(arr,arr[i],i);
        if(flag===false){
            break;
        }
    }
}
each([10,20,30,40],function(item,index){
    return false;
})
```

```javascript
/* 思考题 */
//each
let arr=[10,20,30,"AA",40],
    obj={};
arr=arr.each(function(item,index){
    //=>this:obj (each第二个参数不穿，this是winodw即可)
    is(isNaN(item)){
        return false;//=>如果return 是false，则结束当前数组的循环
    }
    return item*10;//=>返回的结果是啥，就把数组中当前项替换成啥
},obj)
arr=[100,200,300,"AA",40]

//replace
let str="candy2019candy2029";
str=str.replace(/zhufeng/g,function(...arg){
    //arg中存储了每一次大正则匹配的信息和小分组匹配的信息
    return '@';//=>返回的是啥把当前正则匹配的内容替换成啥
})
```









