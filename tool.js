//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener!='undefined'){
		obj.addEventListener(type,fn,false);
	}else if(typeof obj.attachEvent!='undefined'){
		obj.attachEvent('on'+type,function(){
			fn.call(obj);
		});
	}
}
//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener!='undefined'){
		obj.removeEventListener(type,fn,false);
	}else if(typeof obj.detachEvent!='undefined'){
		obj.detachEvent('on'+type,fn);
	}
}

//跨浏览器获取滚动条位置
function getScroll(){
	return {
		top:document.documentElement.scrollTop || document.body.scrollTop,
		left:document.documentElement.scrollLeft || document.body.scrollLeft
	}
}
//删除左后空格
function trim(str){
	return str.replace(/(^\s*)|(^\s*$)/g,'');
}

//跨浏览器获取innerText
function getInnerText(element){
	return (typeof element.textContent=='string')? element.textContent:element.innerText;
}

//跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent=='string'){
		element.textContent=text;
	}else{
		element.innerText=text;
	}
}

function inArray(array,value){
	for(var i in array){
		if(array[i]===value) return true;
	}
	return false;
}