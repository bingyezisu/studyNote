##JS中的变量 variable
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
###JS中的命名规范
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
###JS中常用的数据类型
- 基本数据类型 
    + 数字number
        > 常规数字和NaN
    + 字符串string
        > 所有用""、''、``包起来的都是字符串
    + 布尔boolean
        > true/false
    + 空对象指针null
    + 未定义undefined
- 引用数据类型
    + 对象数据类型object
        + {}普通对象
        + []数组对象
        + /^[+-]?(\d|([1-9]\d+))(\.\d+)?/正则对象
        + Math数学函数对象
        + 日期对象
        + ...

    + 函数数据类型function
## number数字类型
> 包含：常规数字、NaN
### NaN
> not a number：不是一个数，但它隶属于数字类型
NaN和任何值（包括自己）都不相等：NaN!=NaN,所以我们不能用相等的方式判断是否为有效数字
### isNaN
> 检测一个值是否为有效数字，如果不是有效数字返回TRUE，反之是有效数字返回FALSE

在使用isNaN进行检测的时候，首先会验证检测的值是否为数字类型，如果不是，先基于Number()这个方法，把值转换为数字类型，然后再检测

### 把其它类型值转换为数字类型
- Number([val])
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
- parseInt/parseFloat([val],[进制])
> 转换为数字的方法，对于字符串来说，它是从左到右依次查找有效数字字符，直到遇到非有效数字字符,停止查找（不管后面是否还有数字，都不在找了），把找到的当做数字返回

```javascript
parseInt("12.5px");//=>12;
parseFloat("12.5px");//=>12.5
parseFloat("width:12.5px");//=>NaN
parseFloat("12.5.5");//=>12.5
```
` Number和parseInt/parseFloat的运行机制不一样，Number是浏览器内置的方法，运行的是v8引擎的底层机制`
- ==进行比较的时候，可能要出现把其他类型转换为数字
## string字符串数据类型
> 所有用'',"",``(ES6模板字符串)包起来的都是字符串
### 把其它类型转换为字符串
- [val].toString()
- 字符串拼接
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
## boolean布尔数据类型
> 只有两个值 true/false
### 把其他类型转换为布尔类型
> 只有0、NaN、''、null、undefined 五个值转换为FALSE，其余都转换为TRUE（而且没有任何特殊情况）
- Boolean([val])
- !/!!
```javascript
//!:取反(先转为布尔，然后取反)
//!!:取反再取反，只相当于转换为布尔<=>Boolean
console.log(!1);//=>false
```
- 条件判断
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
## null/undefined
> null和undefined都代表的是没有 
- null:意料之中（一般都是开始不知道值，我们手动设置为null，后期再给予赋值操作）
```javascript
let num=null;//=>let num=0;一般最好用null作为初始的空值，因为0不是空值，它在栈内存中有自己的存储空间（占了位置）
...
num=12;
```
- undefined：意料之外（不是我能决定的）
```javascript
let num;//=>创建一个变量没有赋值，默认值是undefined
```
## object对象数据类型-普通对象
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
> 数组时特殊的对象数据类型
```javascript
/*
 * 数组是特殊的对象
 *  1.我们中括号中设置的是属性值，它的属性名是默认生成的数字，从零开始递增，而且这个数字代表每一项的位置，我们把其成为“索引”=>从零开始，连续递增，代表每一项位置的数字属性名
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
### JS中的数据类型检测
- typeof([val]):用来检测数据类型的运算符
- instanceof:用来检测当前实例是否隶属于某个类
- constructor:基于构造函数检测数据类型（也是基于类的方式）
- Object.prototype.toString.call():检测数据类型最好的办法
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

### JS中的操作语句：判断、循环
> 条件成立做什么？不成立做什么？
- if/else if/else
```javascript
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
- 三元运算符

> 简单IF/ELSE的特殊处理方式 `条件？条件成立处理的事情：条件不成立处理的事情`
> + 如果处理的事情比较多，我们用括号包起来，每一件事情用逗号分隔
> + 如果不需要处理事情，可以用null/undefined占位 
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
- switch case
> 一个变量在不通知情况下的不同操作
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