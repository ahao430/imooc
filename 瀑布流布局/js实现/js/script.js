window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'},{"src":'12.jpg'},{"src":'13.jpg'},{"src":'14.jpg'},{"src":'15.jpg'},{"src":'16.jpg'},{"src":'17.jpg'}]};
	addpic();
	window.onscroll=function(){
		if(checkScrollSlide()){
			addpic();
		}
	}
	function addpic(){
	var oParent=document.getElementById('main');
	for(var i=0;i<dataInt.data.length;i++){
		var oBox=document.createElement('div');
		oBox.className='box';
		oParent.appendChild(oBox);
		var oPic=document.createElement('div');
		oPic.className='pic';
		oBox.appendChild(oPic);
		var oImg=document.createElement('img');
		oImg.src="img/"+dataInt.data[i].src;
		oPic.appendChild(oImg);
	}
	waterfall('main','box');
	}
	window.onresize=function(){
		waterfall('main','box');
	}
};



function waterfall(parent,box){
	//将main下所哟class为box元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	// console.log(oBoxs);
	// 计算整个页面显示的列数
	var oBoxW=oBoxs[0].offsetWidth;
	// console.log(oBoxW);
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	// console.log(cols);
	// 设置main的宽度，居中对齐
	oParent.style.cssText="width:"+oBoxW*cols+'px;position:relative;margin:0 auto';
	// 找每一列最矮的图片，把图片放在下面
	var hArr=[];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			oBoxs[i].removeAttribute('style');
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			// console.log(minH);
			var index=getMinhIndex(hArr,minH);
			// console.log(index);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+"px";
			// oBoxs[i].style.left=oBoxW*index+"px";
			oBoxs[i].style.left=oBoxs[index].offsetLeft+"px";
			hArr[index]+=oBoxs[i].offsetHeight;
			// console.log(hArr);
		}
	}
	console.log(hArr);
}

function getByClass(parent,clsName){
	var boxArr=[];
	//var boxArr=new Array();
	var oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

// 检测是否具备滚动加载数据块的条件
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height);
}
