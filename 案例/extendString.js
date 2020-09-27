//此代码用于扩展内置类String.prototype

~function(){
    /***
     * formatTime:格式化时间字符串
     *      @params:
     *          template:[string] 需要实现的日期格式模板
     *          默认 {0}年{1}月{2}日 {3}时{4}分{5}秒
     *          {0}~{5}依次代表：年月日时分秒
     *      @return:
     *          [string] 格式化后的字符串
     ***/
    function formatTime(template="{0}年{1}月{2}日 {3}时{4}分{5}秒 星期{6}"){
		let str="日一二三四五六",
			ary=this.match(/\d+/g);
		ary.push(str[new Date(this).getDay()]);
		return template.replace(/\{(\d+)\}/g,(conent,$1)=>{
			let val=ary[$1]||"00";
			return val.length<2 && $1!=6?"0"+val:val;
		})
	}

    /***
     * queryURLParams:获取url地址的参数信息
     *      @params
     *              无
     *      @return:
     *          [Object] 以键值对的方式存储的参数信息
     ***/
    function queryURLParmas(){
        let obj={};
        this.replace(/([^?&=#]+)=([^?&=#]+)/g,(content,$1,$2)=>obj[$1]=$2);
        this.replace(/#([^?&=#])/g,(content,$1)=>obj["HASH"]=$1);
        return obj;
    }

    /***
     * millimeter:千分符
     *      @params
     *          str [string] 指定的千分符
     *          默认 “,”
     *      @return:
     *          [Object] 以键值对的方式存储的参数信息
     ***/
    function millimeter(str=","){
        let reg=/(\d{1,3})(?=(\d{3})+$)/g;
        return this.replace(/(\d{1,3})(?=(\d{3})+$)/g,(x)=>x+str);
    }
    /***
     * myIndexOf:查找字符串
     *      @params
     *          str [string] 需要插值的字符串
     *      @return:
     *          num [Number] 找到是当前字符串第一个字母出现位置的索引
     *                       没找到-1
     ***/
    function myIndexOf(t){
        let reg=new RegExp("t"),
            res=this.exec(reg);
        return res?res.index:-1;
    }
    ["formatTime","queryURLParmas","millimeter","myIndexOf"].forEach(item=>{
        String.prototype[item]=eval(item);
    })
}()
//使用：
let time="2020-9-12 12:00:32";
console.log(time.formatTime("{1}月{2}日 {3}时{4}分"));
let url="http://www.baidu.com/?name=candy&password=123456#img"
console.log(url.queryURLParmas());
let num="12345678909876544";
console.log(num.millimeter(" "));
let str="1asfaljfdajfcandyddd";
console.log(str.myIndexOf("candy"));