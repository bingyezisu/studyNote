~function(){
	/***
	 * mySlice:截取数组
	 * 	@params
	 * 		n,m 都是数字 从索引n开始，找到索引m的地方（不包含m这一项）
	 * 	@return
	 * 		把找到的内容以一个新数组形式发会
	 * 
	 * ***/
	function mySlice(...arg){
		let [startIndex=0,endIndex=this.length]=arg;
		let ary=[];
		startIndex=startIndex>0?startIndex:startIndex+this.length;
		startIndex=Math.floor(startIndex)||0;
		endIndex=endIndex>0?endIndex:endIndex+this.length;
		endIndex=Math.floor(endIndex);
		this.forEach((item,index)=>{
			(index>=startIndex && index<endIndex)?ary.push(item):null;
		})
		return ary;
	}
	/***
	 * myReduce:循环数组，执行参数
	 * 	@params
	 * 		回调函数
	 * 	@return
	 * 		回调函数返回的值
	 * ***/
	function myReduce(fn,prev){
		for(var i=0;i<this.length;i++){
			if(typeof prev==="undefined"){
				prev=fn(this[i],this[i+1],i+1,this)
				++i;
			}else{
				prev=fn(prev,this[i],i,this);
			}
		}
	}
	/***
	 * unique:数组去重
	 * 	@params 
	 * 		无
	 * 	@return 
	 * 		去重后的新数组
	 * ***/
	function unique(){
		let obj={};
		for(let i=0;i<this.length;i++){
			let item=this[i];
			if(obj[item]!==undefined){
				this[i]=this[this.length-1];
				this.length--;
				i--;
				continue;
			}
			obj[item]=item;
		}
		return this;
	}
	/***
	 * bubble:冒泡排序
	 * 	@parmas
	 * 		无
	 * 	@return
	 * 		排序后的新数组
	 * ***/
	function bubble(){
		for(var i=0;i<this.length-1;i++){
			for(j=0;j<this.length-1-i;j++){
				if(this[j]>this[j+1]){
					let cur=this[j];
					this[j]=this[j+1];
					this[j+1]=cur;
				}
			}
		}
		return this;
	}
	/***
	 * insert:冒泡排序
	 * 	@parmas
	 * 		无
	 * 	@return
	 * 		排序后的新数组
	 * ***/
	function insert(){
		let newAry=this.splice(0,1);
		for(var i=0;i<ary.length;i++){
			for(var j=newAry.length;j>=0;j--){
				if(ary[i]>newAry[j]){
					newAry.splice(j+1,0,ary[i]);
					break;
				}
				if(j===0){
					newAry.unshift(ary[i])
				}
			}
		}
		return newAry;
	}
	/***
	 * quick:冒泡排序
	 * 	@parmas
	 * 		无
	 * 	@return
	 * 		排序后的新数组
	 * ***/
	function quick(){
		if(this.length<=1){
			return this;
		}
		let prevAry=[],
			nextAry=[],//prevAry 与nextAry不能写连等，如果连等属于指向同一个堆内存地址
			curIndex=Math.ceil(this.length/2),
			cur=this.splice(curIndex,1)[0];
		for(let i=0;i<this.length;i++){
			this[i]<cur?prevAry.push(this[i]):nextAry.push(this[i]);
		}
		return prevAry.quick().concat(cur,nextAry.quick())
	} 
	["mySlice","myReduce","unique","bubble","insert","quick"].forEach(item=>{
		Array.prototype[item]=eval(item);
	})
}()

let ary=[1,2,3,4,5,1,1,1]
/* console.log(ary.mySlice("abc",-1));
console.log(ary.slice("abc",-1));
// console.log(ary.unique());
console.log(ary.bubble())
console.log(ary.insert()) */
console.log(ary.quick())
