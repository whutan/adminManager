//前台调用
var $=function(args){
	return new Base(args);
}


//基础库
function Base(args){
	//创建一个数组，来保存获取的节点和节点数组
	this.elements=[];
	if(typeof args=='string'){
		//CSS模拟
		if(args.indexOf(' ')!=-1){
			var elements=args.split(' ');
			var childElements=[];
			var node=[];
			for(var i=0;i<elements.length;i++){
				if(node.length==0) node.push(document);
				switch(elements[i].charAt(0)){
				case '#':
					childElements=[];
					childElements.push(this.getId(elements[i].substring(1)));
					node=childElements;
					break;
				case '.':
					childElements=[];
					for(var j=0;j<node.length;j++){
						var temps=this.getClass(elements[i].substring(1),node[j]);
						for(var k=0;k<temps.length;k++){
							childElements.push(temps[k]);
						}
					}
					node=childElements;	
					break;
				default:
					childElements=[];
					
					for(var j=0;j<node.length;j++){
						var temps=this.getTagName(elements[i],node[j]);
						for(var k=0;k<temps.length;k++){
							childElements.push(temps[k]);
						}

					}
					node=childElements;	
			}
		}
		this.elements=childElements;
	}else{
		//FIND模拟
			switch(args.charAt(0)){
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements=this.getClass(args.substring(1));
					break;
				default:
					this.elements=this.getTagName(args);
			}
		}
	}else if(typeof args=='object'){
		if(args!=undefined){
			this.elements[0]=args;
		}
	}	
}
	//获取ID节点
	Base.prototype.getId=function(id){
		return document.getElementById(id);
	};
	//获取元素节点
	Base.prototype.getTagName=function(tag,parentNode){
		//alert(tag);
		var node=null;
		var temps=[];
		if(parentNode!=undefined){
		node=parentNode;
	}else{
		
		node=document;
		
		
	}
		var tags=node.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			temps.push(tags[i]);
		}

		return temps;
	};
	//获取CLASS节点数组
Base.prototype.getClass=function(classname,parentNode){
	var node=null;
	var temps=[];
	if(parentNode!=undefined){
		node=parentNode;
	}else{
		node=document;
	}
	var all=node.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		/*if(all[i].className==classname){*/
			if((new RegExp('(\\s|^)'+classname+'(\\s|$)')).test(all[i].className)){
			temps.push(all[i]);
		}
	}
	return temps;
}
	//find方法
Base.prototype.find=function(){
		var childElements=[];
		for(var i=0;i<this.elements.length;i++){
			switch(args.charAt(0)){
			case '#':
				childElements.push(this.getId(str.substring(1)));
				break;
			case '.':
				var temps=this.getClass(str.substring(1),this.elements[i]);
				for(var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
				break;
			default:
				
				var temps=this.getTagName(str,this.elements[i]);
				for(var j=0;j<temps.length;j++){
					childElements.push(tags[j]);
				}
			}		
		}
	this.elements=childElements;	
	return this;	
}
	//获取某一个节点
Base.prototype.getElement=function(num){
		var element=this.elements[num];
		this.elements=[];
		this.elements[0]=element;
		return this;
	}

//设置CSS
Base.prototype.css=function(attr,value) {
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			return this.elements[i].style[attr];
		}
		this.elements[i].style[attr]=value;
	}
	return this;
}
//添加CLASS
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.elements[i].className+=' '+className;
		}
	}
	return this;
}
//移除CLASS
Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			alert(new RegExp('(\\s|^)'+className+'(\\s|$)'));
			this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),' ');
		}
	}
}
//设置表单字段元素
Base.prototype.form=function(name){
	for (var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i][name];
		
	}
	return this;
};
//设置表单字段内容获取
Base.prototype.value=function(str){	
var temps=[];
	for(var i=0;i<this.elements.length;i++){	
		if(arguments.length==0){
			return this.elements[i].value;
		}
		else{
			this.elements[i].value=str;
			return this;
		}
	}
}
//设置innerHTML
Base.prototype.html=function(str){	
var temps=[];
	for(var i=0;i<this.elements.length;i++){
	//alert(this.elements.length);
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		else{
			this.elements[i].innerHTML=str;
		}
	}
	return this;
}

//设置innerText
Base.prototype.text=function(text){	
	for(var i=0;i<this.elements.length;i++){
	//alert(this.elements.length);
		if(arguments.length==0){
			return getInnerText(this.elements[i]);
		}else{
			setInnerText(this.elements[i],text)
		}
	}
	return this;
}
//设置鼠标移入移出方法
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseover=over;
		this.elements[i].onmouseout=out;
	}
	return this;
}
//设置点击切换方法
Base.prototype.toggle=function(){
	for(var i=0;i<this.elements.length;i++){
		(function(element,args){
			var count=0;
			addEvent(element,'click',function(){
			args[count++ % args.length].call(this);
	});
		})(this.elements[i],arguments);
		};
	return this;
};

//获取当前节点的下一个元素节点
Base.prototype.next=function(){
	for (var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i]==null) throw new Error('找不到下一个同级元素节点');
			if(this.elements[i].nodeType==3) this.next();
	}
	return this;
}
//获取某组节点的数量
Base.prototype.length=function(){
	return this.elements.length;
}
//获取当前节点的上一个元素节点
Base.prototype.prev=function(){
	for (var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i]==null) throw new Error('找不到上一个同级元素节点');
			if(this.elements[i].nodeType==3) this.prev();
	}
	return this;
}
//设置隐藏
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;
}
//设置显示
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	return this;
}
//设置物体居中
Base.prototype.center=function(width,height){
	var top=(document.documentElement.clientHeight-height)/2;
	var left=(document.documentElement.clientWidth-width)/2;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	}
	return this;
}
//锁屏功能
Base.prototype.lock=function(){
	this.elements[0].style.width=document.documentElement.clientWidth+'px';
	this.elements[0].style.height=document.documentElement.clientHeight+'px';
	this.elements[0].style.display='block';
	return this;
};
Base.prototype.unlock=function(){
	this.elements[0].style.display='none';
	return this;
}
//触发点击事件
Base.prototype.click=function(fn){
		for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
}
//触发浏览器窗口事件
Base.prototype.resize=function(fn){
	window.onresize=fn;
	return this;
}
//拖拽功能
Base.prototype.drag=function(){
	for(var i=0;i<this.elements.length;i++){
	this.elements[i].onmousedown=function(e){
		var e=e||window.event;
		var _this=this;
		//alert(window.innerWidth);
		//alert(_this.offsetWidth);
		var diffX=e.clientX-_this.offsetLeft;
		var diffY=e.clientY-_this.offsetTop;
		if(e.target.tagName=='H2'){
				document.onmousemove=function(e){
				var e=e||window.event;
				var left=e.clientX-diffX;
				var top=e.clientY-diffY;

				if(left<0){
					left=0;
				}else if(left>window.innerWidth-_this.offsetWidth){
					left=window.innerWidth-_this.offsetWidth;
				}
				_this.style.left=left+'px';
				_this.style.top=top+'px';
			}
		}
		
		document.onmouseup=function(){
			this.onmousemove=null;
			this.onmouseup=null;
			}
		}
	}
	return this;
}
//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener!='undefined'){
		obj.addEventListener(type,fn,false);
	}else if(typeof obj.attachEvent!='undefined'){
		obj.attachEvent('on'+type,fn);
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
//获取Style
function getStyle(element,attr){
	if(typeof window.getComputedStyle!='undefined'){
		var temp=window.getComputedStyle(element,null)[attr];
	}
	return temp;
}
//设置动画
var timer=null;
Base.prototype.animate=function(obj){
	for(var i=0;i<this.elements.length;i++){
			var element=this.elements[i];
			var attr=obj['attr']=='x' ? 'left': obj['attr']=='y' ? 'top' :
						obj['attr']=='w' ? 'width' : obj['attr']=='h' ? 'height' :
						obj['attr']=='o' ? 'opacity' : obj['attr']!=undefined ? obj['attr'] : 'left';



			var start=obj['start']!=undefined ?obj['start'] : 
			                 attr=='opacity' ? parseFloat(getStyle(element,attr))*100 : 
			                 parseInt(getStyle(element,attr));
			var t=obj['t']!=undefined ?obj['t'] : 10;
			var step=obj['step']!=undefined ? obj['step'] : 20;
			var target =obj['target']!=undefined ? obj['target'] : obj['alter']+start ;
			var mul=obj['mul'];
			var speed=obj['speed']!=undefined ? obj['speen'] : 6;
			var type=obj['type']==0 ? 'constant' : obj['type']==1 ? 'buffer' : 'buffer';


			if(start>target) step=-step;
			if(attr=='opacity'){
				element.style.opacity=start/100	;
				element.style.filter='alpha(opacity='+start+')';
			}else{
				element.style[attr]=start+'px';
			}
		


			if(mul==undefined){
				mul={};
				mul[attr]=target;

			}

			clearInterval(timer);
			 timer=setInterval(function(){
			 		var flag=true;
					for (var i in mul){
						attr=i;
						target=mul[i];
						//alert(Object.keys(mul)+'----->'+Object.values(mul));

					 	if(type=='buffer'){
					 		step=attr=='opacity' ? (target-parseFloat(getStyle(element,attr))*100)/speed : 
					 		                                     (target-parseInt(getStyle(element,attr)))/speed;
					 		step=step>0 ? Math.ceil(step) : Math.floor(step);
					 	}

					 	if(attr=='opacity'){
					 		var temp=parseFloat(getStyle(element,attr))*100;
					 		
					 			if(step==0){
								setOpacity();
							}else if(step>0 && Math.abs(parseFloat(getStyle(element,attr))*100-target)<=step){
								setOpacity();
							} else if(step<0 && (parseFloat(getStyle(element,attr))*100-target)<=Math.abs(step)){
								setOpacity();
							}else{
								element.style.opacity=parseInt(temp+step)/100;
							}
					 			
					 			
					 	}else{
						 	if(step==0){
								setTarget();
							}else if(step>0 && Math.abs(parseInt(getStyle(element,attr))-target)<=step){
								setTarget();
							} else if(step<0 && (parseInt(getStyle(element,attr))-target)<=Math.abs(step)){
								setTarget();
							}else{
								element.style[attr]=parseInt(getStyle(element,attr))+step+'px';
							}
					 	}
					 	if(target!=parseInt(getStyle(element,attr))) flag=false;
					 	//document.getElementById('test').innerHTML+=getStyle(element,attr)+'--'+i+'--'+flag+'</br>';
					}
					if(flag){
						clearInterval(timer);
						if(obj.fn) obj.fn();
					}
			},t);
			function setTarget(){
				element.style[attr]=target+'px';
				
			}	

			function setOpacity(){
				
				element.style.opacity=parseFloat(target/100);
				
			}
	}
	return this;
};

//eq方法
Base.prototype.eq=function(i){
		var element=this.elements[i];
		this.elements=[];
		this.elements[0]=element;
		return this;
}
//设置事件发生器
Base.prototype.bind=function(event,fn){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
	}
	return this;
};