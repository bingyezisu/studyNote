// let ary=[1,2,3,1,2,1,2,3,1,1,2,3];
/* let newAry=[];
ary.forEach(item=>{
	newAry.includes(item)?null:newAry.push(item);
})
console.log(newAry); */

/* for(let i=0;i<ary.length;i++){
	for(let j=i+1;j<ary.length;j++){
		if(ary[i]===ary[j]){
			ary.splice(j,1);
			i--;
		}
	}
}
console.log(ary); */
/* let obj={};
ary.forEach(item=>obj[item]=item);
let newAry=Object.values(obj);
console.log(newAry); */
/* let obj={} */
/* for(let i=0;i<ary.length;i++){
	let item=ary[i];
	if(obj[item]!==undefined){
		ary.splice(i,1)
		i--;
		continue;
	}
	obj[item]=item;
} */
/* for(let i=0;i<ary.length;i++){
	let item=ary[i];
	if(obj[item]!==undefined){
		ary[i]=ary[ary.length-1];
		ary.length--;
		i--;
		continue;
	}
	obj[item]=item;
} */
/* let ary=[1,2,3,1,2,1,2,3,1,1,2,3,4];
ary.sort((a,b)=>a-b);
let  str=ary.join('@')+'@';
let reg=/(\d+@)\1*//* g;
ary=[];
str.replace(reg,(n,m)=>{
	m=Number(m.slice(0,m.length-1));
	ary.push(m);
})
console.log(ary); */ 
/* let time="2019-7-24 12:6:23";
let reg=/(?: |-|:)/g;
let ary=time.split(reg);
console.log(`${ary[0]}年${ary[1]}月${ary[2]}日${ary[3]}时${ary[4]}分${ary[5]}秒`) */

/* let obj={
    name:"candy",
    age:30,
    sex:"female",
    friends:["candice","lily","tom","judy"]
}

let {age:years}=obj;
console.log(years);

let {height="154cm"}=obj;
console.log(obj); */
/* const person = {
	isHuman: false,
	printIntroduction: function() {
	  console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
	}
  };
  
const me = Object.create(person);
me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"
console.dir(person)
console.dir(me)
 */
/* let time="2020-08-13";
let reg=/^(\d+)-(\d+)-(\d+)$/g;
time=time.replace(reg,"$1年$2月$3年");
console.log(time); */
/* ~function(){
	function formatTime(template="{0}年{1}月{2}日 {3}时{4}分{5}秒 星期{6}"){
		let str="日一二三四五六",
			ary=this.match(/\d+/g);
		ary.push(str[new Date(this).getDay()]);
		return template.replace(/\{(\d+)\}/g,(conent,$1)=>{
			let val=ary[$1]||"00";
			return val.length<2 && $1!=6?"0"+val:val;
		})
	}
	function queryURLParmas(){
		let reg=/([^?=&#]+)=([^?=&#]+)/g,
			reg2=/#([^?=&#]+)/g,
			obj={};
		this.replace(reg,(content,$1,$2)=>obj[$1]=$2);
		this.replace(reg2,(content,$1)=>obj["HASH"]=$1);
		return obj;
	}
	function millimeter(str=" "){
		return this.replace(/\d{1,3}(?=(\d{3})+$)/g,content=>{
			return content+str;
		})
	}
	String.prototype.formatTime=formatTime;
	String.prototype.queryURLParmas=queryURLParmas;
	String.prototype.millimeter=millimeter;
}()
let time="2020-9-25 16:51:3";
console.log(time.formatTime("{0}年{1}月{2}日 星期{6}"));
let url="http://www.baidu.com/?name=candy&password=123456#img"
console.log(url.queryURLParmas());
let num="12345678909876544";
console.log(num.millimeter()); */
/* let Person={}
Object.defineProperty(Person,"name",{
	name:"jack",
	writable:true
})
console.log(Person.name);
Person.name="rose"; 
console.log(Person.name); */
/* let Person={};
let temp=null;
Object.defineProperty(Person,"name",{
	get:function(){
		return temp;
	},
	set:function(val){
		temp=val;
	}
})
Person.name="jack";
console.log(Person.name)
console.log(temp);
temp="candy";
console.log(Person.name); */
/* let obj={name:"candy"};
Object.defineProperty(obj,"name",{
    get:function(){
        return "xixi";
    },
    set:function(){
		name="hehe";
	}
}) 
obj.name="hoho"
console.log(obj.name); */

/* let Person={};
let temp=null;
Person.name=temp; */

/* Object.defineProperty(Person,'name',{
    get:function(){
        return temp;
    },
    set:function(val){
        temp=val;
    }
})*/
/* console.log(Person.name);
Person.name="jack";
console.log(Person.name);//=>"jack"
console.log(temp);//=>"jack"
temp="candy"
console.log(Person.name);//=>"candy";  */
/* new Promise((resolve, reject) => {
    console.log('初始化');

    reject();
})
.then(() => {
    throw new Error('有哪里不对了');
        
    console.log('执行「这个」”');
})
.catch(() => {
    console.log('执行「那个」');
})
.then(() => {
    console.log('执行「这个」，无论前面发生了什么');
}); */
/* "use strict";
var promiseCount=0;

function testPromise(){
	let thisPromiseCount=++promiseCount;
	let log=document.getElementById("log");
	log.insertAdjacentHTML("beforeend",thisPromiseCount+')开始(<small>同步代码开始</small>)<br/>')
	
	let p1=new Promise((resolve,reject)=>{
		log.insertAdjacentHTML("beforeend",thisPromiseCount+')开始(<small>异步代码开始</small>)<br/>');
		window.setTimeout(function(){
			resolve(thisPromiseCount);
		},Math.random()*2000+1000)
	})

	p1.then(function(val){
		log.insertAdjacentHTML('beforeend',val+')Promise 已填充完毕(<small>异步代码结束</small>)<br/>');
	}).catch((reason)=>{
		console.log("处理失败的promise("+reason+")");
	});
	log.insertAdjacentHTML("beforeend",thisPromiseCount+')结束(<small>同步代码结束</small>)<br/>')
}
testPromise(); */
/* let str="goodgoodstudy,daydayupoh!"; */

/* class A{
	constructor(x){
		this.x=x;
	}
	getX(){
		console.log(this.x);
	}
}
class B extends A{
	constructor(y){
		super(200);
		this.y=y;
	}
	getY(){
		console.log(this.y);
	}
}
let b1=new B(100);
// console.log(b1);
// b1.getY();
b1.getX();
console.dir(b1); */
/* function A(){
	this.a=10;
	return {};
}
let B=new A();
console.log(B); */
/* function Cat(name){
    this.name=name;
}
Cat.prototype.bark=function(){
    console.log("miaomiao")
}
Cat.prototype.sayName=function(){
    console.log("this cat's name is"+this.name)
}
function _new(Fn,...arg){
	let obj=Object.create(Fn.prototype);
	Fn.call(obj,...arg);
	return obj;
} */
/* Function.prototype.myBind=function(context){
	let that=this;
	let bindArgs=[...arguments].slice(1);
	function fn(){}
	function fBound(){
		let args=Array.from(arguments);
		return that.apply(context,bindArgs.concat(args));
	}
	fn.prototype=this.prototype;
	console.log(fn.prototype);
	fBound.prototype=new fn();
	return fBound;
}
function fn(a){
	this.a=a;
	console.log(this);
	console.log(a);
}
fn.myBind("hello","1","2")(); */
/* let obj={name:"candy",address:{x:100,y:{num:100}}};
let o={...obj};
console.log(obj,o)
obj.name="daisy";
obj.address.x=200
console.log(o); */
/* let a=[1,2,3];
let arr=[a];//[[1,2,3]]
let newArr=arr.slice();
console.log(newArr)
newArr[0][0]=100;
console.log(arr); */
/* ~function(){
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
}()
console.log((5).add(3).minus(2)); */
/* let cStr="aBc";
cStr=cStr.replace(/[a-zA-Z]/g,(x)=>{
	return x.toUpperCase()===x?x.toLowerCase():x.toUpperCase()});
console.log(cStr); */
/* var a={},b="123",c=123;
a['123']="b";
a[123]="c"; */
/* let arr=[[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10];
// while(arr.some(item=>Array.isArray(item))){
// 	arr=[].concat(...arr);
// }
// console.log(arr);
console.log(arr=[].concat(...arr)) */
//向右旋转3步
let arr=[1,2,3,4,5,6,7];//=>(k=3)=>[5,6,7,1,2,3,4]
~function(){
	function rotate(k){
        if(k<0||k===0||k===this.length) return this;
        if(k>this.length) k=k%this.length;
        //=>第一种方法：
        //return  this.slice(-k).concat(this.slice(0,this.length-k));
        //=>第二种方法：
        //return this.splice(-k).concat(this);
        //=>第三种方法：
        //return [...this.splice(-k),...this]
        /* =>第四种方法：
        for(let i=0;i<k;i++){
        	this.unshift(this.pop());
        }
        return this; 
        */
        //=>第五种方法：
        new Array(k).fill(null).forEach(()=> this.unshift(this.pop()))
        return this;
    }
	Array.prototype.rotate=rotate;
}()
console.log(arr.rotate(3))