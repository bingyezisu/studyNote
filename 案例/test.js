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
~function(){
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
console.log(num.millimeter());