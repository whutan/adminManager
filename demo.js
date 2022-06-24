window.onload=function(){
	//$().getId('box').css('color','red').css('backgroundColor','pink');
    //$().getTagName('p').css('color','blue');
   //base.getId('box').html('my').click(function(){alert('hello!')});
//alert($().getTagName('p').html());
//alert($().getId('box').css('color'));
//$().getClass('red').css('background','#ccc');
//$().getClass('red','bbb').css('color','#00FFFF80');
//$().getId('box').addClass('a').addClass('b').removeClass('b');
//个人中心
$('.member').hover(function(){
	//$().getClass('member').css('background','url(images/up.gif) no-repeat right 60%')
	$(this).css('background','url(images/up.gif) no-repeat right 60%');
	$('.member_ul').show();
},function(){
	//$().getClass('member').css('background','url(images/down.gif) no-repeat right 60%')
	$(this).css('background','url(images/down.gif) no-repeat right 60%');
    $('.member_ul').hide();
});
//遮罩画布
var screen=$('#screen');
//登录框
var login=$('#login');
login.center(350,250);
$().resize(function(){
	login.center();
	if(login.css('display')=='block'){
		screen.lock();
	}	
});
$('.login').click(function(){
	login.css('display','block');
	screen.lock();
});
$('.close1').click(function(){
	login.css('display','none');
	screen.unlock();
});

login.drag();
//注册框
var reg=$('#reg');
reg.center(600,550);
$().resize(function(){
	reg.center();
	if(reg.css('display')=='block'){
		screen.lock();
	}	
});
$('.reg').click(function(){
	reg.css('display','block');
	screen.lock();
});
$('.close').click(function(){
	reg.css('display','none');
	screen.unlock();
});
reg.drag();
//$('#reg h2').drag();
//test

$('#test').click(function(){

	$(this).animate({
		attr:'x',
		target:300,
		mul:{
			width:101,
			height:300
			
		},
		fn:function(){
			alert('123');
		}
	
	})

})



//百度分享初始化位置
$('#share').css('top',document.documentElement.scrollTop+(window.innerHeight-parseInt(getStyle($('#share').elements[0],'height')))/2+'px');

addEvent(window,'scroll',function(){
	$('#share').css('top',document.documentElement.scrollTop+(window.innerHeight-parseInt(getStyle($('#share').elements[0],'height')))/2+'px');

})
//百度分享收缩效果
$('#share').hover(function(){
	$(this).animate({
		attr:'x',
		target:0
	})
},function(){
	$(this).animate({
		attr:'x',
		target:-211
	})
})

//滑动导航
$('#nav .about li').hover(function(){
	var target=$(this).elements[0].offsetLeft;
	$('#nav .nav_bg').animate({
		attr:'x',
		target:target+20,
		t:10,
		fn:function(){
			$('#nav .white').animate({
				attr:'x',
				target:-target
			});
		}
	});
},function(){
	$('#nav .nav_bg').animate({
		attr:'x',
		target:20,
		t:10,
		fn:function(){
			$('#nav .white').animate({
				attr:'x',
				target:0
			});
		}
	});
});

//左侧菜单
$('#sidebar h2').toggle(function(){
	$(this).next().animate({
		attr:'h',
		target:0
	})
},function(){
	$(this).next().animate({
		attr:'h',
		target:150
	})
});
//alert($('#sidebar h2').eq(0));
//alert($(' #reg form').elements[0].user.value);
//$('#reg form').form('user').value('ddidk');
$('#reg form').form('user').bind('focus',function(){
	$('#reg .info_user').css('display','block');
	$('#reg .error_user').css('display','none');
	$('#reg .succ_user').css('display','none');
}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_user').css('display','none');
	}else if(!check_user()){
		$('#reg .error_user').css('display','block');
		$('#reg .info_user').css('display','none');
		$('#reg .succ_user').css('display','none');
	}else{
		$('#reg .succ_user').css('display','block');
		$('#reg .error_user').css('display','none');
		$('#reg .info_user').css('display','none');
	}
});

function check_user(){
	if(/[a-zA-Z0-9_]{2,20}/.test(trim($('#reg form').form('user').value()))) return true;
}

//密码验证
$('#reg form').form('pass').bind('focus',function(){
	$('#reg .info_pass').css('display','block');
	$('#reg .error_pass').css('display','none');
	$('#reg .succ_pass').css('display','none');
}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_pass').css('display','none');
	}else if(check_pass(this)){
		$('#reg .info_pass').css('display','none');
		$('#reg .error_pass').css('display','none');
		$('#reg .succ_pass').css('display','block');
	}else{
		$('#reg .info_pass').css('display','none');
		$('#reg .error_pass').css('display','block');
		$('#reg .succ_pass').css('display','none');

	}
})

//密码强度验证
$('#reg form').form('pass').bind('keyup',function(){
	check_pass();
});

//密码验证函数
function check_pass(){
	var value=trim($('#reg form').form('pass').value());
	var value_length=value.length;
	var code_length=0;
	var flag=false;
	//第一个必须条件的验证6-20位之间
	if(value_length>=6 && value_length<=20){
		$('#reg .info_pass .q1').html('●').css('color','green');
	}else{
		$('#reg .info_pass .q1').html('○').css('color','#666');
	}

	//第二个必须条件的验证，字母或数字或非空字符
	if(value_length>0 && !/\s/.test(value)){
		$('#reg .info_pass .q2').html('●').css('color','green');
	}else{
		$('#reg .info_pass .q1').html('○').css('color','#666');
	}
	//第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混批即可
	if(/[0-9]/.test(value)){
		code_length++;
	}
	if(/[a-z]/.test(value)){
		code_length++;
	}
	if(/[A-Z]/.test(value)){
		code_length++;
	}
	if(/[^0-9A-Za-z]/.test(value)){
		code_length++;
	}

	if(code_length>=2){
		$('#reg .info_pass .q3').html('●').css('color','green');
	}else{
		$('#reg .info_pass .q3').html('○').css('color','#666');
	}

	//安全级别
	if(value_length>=10 && code_length>=3){
		$('#reg .info_pass .s1').css('color','green');
		$('#reg .info_pass .s2').css('color','green');
		$('#reg .info_pass .s3').css('color','green');
		$('#reg .info_pass .s4').html('高').css('color','green');
	}else if(value_length>=8 && code_length>=2){
		$('#reg .info_pass .s1').css('color','#f60');
		$('#reg .info_pass .s2').css('color','#f60');
		$('#reg .info_pass .s3').css('color','green');
		$('#reg .info_pass .s4').html('中').css('color','#f60');
	}else if(value_length>=1){
		$('#reg .info_pass .s1').css('color','maroon');
		$('#reg .info_pass .s2').css('color','#ccc');
		$('#reg .info_pass .s3').css('color','#ccc');
		$('#reg .info_pass .s4').html('底').css('color','maroon');
	}else{
		$('#reg .info_pass .s1').css('color','#ccc');
		$('#reg .info_pass .s2').css('color','#ccc');
		$('#reg .info_pass .s3').css('color','#ccc');
		$('#reg .info_pass .s4').html('');
	}
	if(value_length>=6 && value_length<=20 && !/\s/.test(value) && code_length>=2){
		return true;
	} else {
		return false;
	}
	
}

//密码确认
	$('#reg form').form('notpass').bind('focus',function(){
		$('#reg .info_notpass').css('display','block');
		$('#reg .error_notpass').css('display','none');
		$('#reg .succ_notpass').css('display','none');
}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_notpass').css('display','none');
	}else if(check_notpass()){
		$('#reg .info_notpass').css('display','none');
		$('#reg .error_notpass').css('display','none');
		$('#reg .succ_notpass').css('display','block');
	}else{
		$('#reg .info_notpass').css('display','none');
		$('#reg .error_notpass').css('display','block');
		$('#reg .succ_notpass').css('display','none');
	}
});

function check_notpass(){
	if(trim($('#reg form').form('notpass').value())==trim($('#reg form').form('pass').value())) return true;
}
//提问
function check_ques(){
	if($('form').form('quest').value()!=0) return true;
}
$('form').form('quest').bind('change',function(){
	if(check_ques) $('#reg .error_ques').css('display','none');
})
//回答
	$('#reg form').form('ans').bind('focus',function(){
		$('#reg .info_ans').css('display','block');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','none');
}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_ans').css('display','none');
	}else if(check_ans()){
		$('#reg .info_ans').css('display','none');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','block');
	}else{
		$('#reg .info_ans').css('display','none');
		$('#reg .error_ans').css('display','block');
		$('#reg .succ_ans').css('display','none');
	}	
});

function check_ans(){
	if(trim($('#reg form').form('ans').value()).length>=2 && trim($('#reg form').form('ans').value()).length<=32) return true;
}
//电子邮件
	$('#reg form').form('email').bind('focus',function(){
		//补全界面
		if($(this).value().indexOf('@')==-1) $('#reg .all_email').css('display','block');

		$('#reg .info_email').css('display','block');
		$('#reg .error_email').css('display','none');
		$('#reg .succ_email').css('display','none');
}).bind('blur',function(){
	//补全界面
		$('#reg .all_email').css('display','none');


	if(trim($(this).value())==''){
		$('#reg .info_email').css('display','none');
	}else if(check_email()){
		$('#reg .info_email').css('display','none');
		$('#reg .error_email').css('display','none');
		$('#reg .succ_email').css('display','block');
	}else{
		$('#reg .info_email').css('display','none');
		$('#reg .error_email').css('display','block');
		$('#reg .succ_email').css('display','none');
	}	
});
function check_email(){
	if(/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('#reg form').form('email').value()))) return true;
}
//电子邮件补全系统键入
$('#reg form').form('email').bind('keyup',function(e){
	if($(this).value().indexOf('@')==-1){
		$('#reg .all_email').css('display','block');
		$('#reg .all_email li span').html($(this).value());
	}else{
		$('#reg .all_email').css('display','none');
	}

	
		$('#reg .all_email li').css('background','none');
		$('#reg .all_email li').css('color','#666');
	
	if(e.keyCode==40){
		if(this.index==undefined || this.index>=$('#reg .all_email li').length()-1){
			this.index=0;
		}else{
			this.index++;
		}
		
		$('#reg .all_email li').elements[this.index].style['background']='#e5edf2';
		$('#reg .all_email li').elements[this.index].style['color']='#369';			
	}
	if(e.keyCode==38){
		if(this.index==undefined || this.index<=0){
			this.index=$('#reg .all_email li').length()-1;
		}else{
			this.index--;
		}
		
		$('#reg .all_email li').elements[this.index].style['background']='#e5edf2';
		$('#reg .all_email li').elements[this.index].style['color']='#369';			
	}
	if(e.keyCode==13){
		//alert($('#reg .all_email li').elements[this.index].textContent);
		$(this).value($('#reg .all_email li').elements[this.index].textContent);
		$('#reg .all_email').css('display','none');
		this.index=undefined;
	}
})

//电子邮件补全系统点击获取
$('#reg .all_email li').bind('mousedown',function(){

	$('#reg form').form('email').value($(this).text());
})

//电子邮件补全系统鼠标移入移出效果
$('#reg .all_email li').hover(function(){
	$(this).css('background','#e5edf2');
	$(this).css('color','#369');
},function(){
	$(this).css('background','none');
	$(this).css('color','#666');
});

//年月日
var year=$('form').form('year');

var month=$('form').form('month');
var day=$('form').form('day');

var day30=[4,6,8,11];
var day31=[1,3,5,7,9,10,12];
//注入年
for(var i=1950;i<=2020;i++){
	year.elements[0].add(new Option(i,i));
}
//注入月
for(var i=1;i<=12;i++){
	month.elements[0].add(new Option(i,i));
}

year.bind('change',function(){
	if($(this).value()!=0 && month.value()!=0){
		//清理之前的注入
		day.elements[0].options.length=1;
		var cur_day=0;
		//注入日
		if(inArray(day31,parseInt(month.value()))){
			cur_day=31;
		}else if(inArray(day30,parseInt(month.value()))){
			cur_day=30;
		}else{
			if((parseInt($(this).value())%4==0 && parseInt($(this).value())%100!=0 || parseInt($(this).value())%400==0)){
				cur_day=29;
			}
			else{
				cur_day=28;
			}
		}

		for(var i=1;i<=cur_day;i++){
			day.elements[0].add(new Option(i,i),undefined);
		}
		}else{
			day.elements[0].options.length=1;
		}
	
})

month.bind('change',function(){
	if(year.value()!=0 && month.value()!=0){
		//清理之前的注入
		day.elements[0].options.length=1;
		var cur_day=0;
		//注入日
		if(inArray(day31,parseInt(month.value()))){
			cur_day=31;
		}else if(inArray(day30,parseInt(month.value()))){
			cur_day=30;
		}else{
			if((parseInt(year.value())%4==0 && parseInt(year.value())%100!=0 || parseInt(year.value())%400==0)){
				cur_day=29;
			}
			else{
				cur_day=28;
			}
		}

		for(var i=1;i<=cur_day;i++){
			day.elements[0].add(new Option(i,i),undefined);
		}
		}else{
			day.elements[0].options.length=1;
		}
	
})


//备注
$('form').form('ps').bind('keyup',function(){
	check_ps();
}).bind('paste',function(){
	setTimeout(check_ps,50);
})

//清尾
$('#reg .clear').click(function(){

	$('form').form('ps').value($('form').form('ps').value().substring(0,5));
	check_ps();
})


function check_ps(){
	var num=5-$('form').form('ps').value().length;
	if(num>=0){
		$('#reg .ps').elements[0].style.display='block';
		$('#reg .ps .num').elements[0].innerHTML=num;
		$('#reg .ps').elements[1].style.display='none';
	}else{
		$('#reg .ps').elements[0].style.display='none';
		$('#reg .ps .num').elements[1].innerHTML=Math.abs(num);
		$('#reg .ps').elements[1].style.display='block';
		$('#reg .ps .num').elements[1].style.color='red';
	}
}


//提交
$('form').form('sub').click(function(){
	var flag=true;
	if(!check_user()){
		flag=false;
		$('#reg .error_user').css('display','block');
	}
	if(!check_pass()){
		flag=false;
		$('#reg .error_pass').css('display','block');
	}
	if(!check_notpass()){
		flag=false;
		$('#reg .error_notpass').css('display','block');
	}
	if(!check_ques()){
		flag=false;
		$('#reg .error_ques').css('display','block');
	}
	if(!check_ans()){
		flag=false;
		$('#reg .error_ans').css('display','block');
	}
	if(!check_email()){
		flag=false;
		$('#reg .error_email').css('display','block');
	}
	if(flag){
		$('form').elements[0].submit();
	}
	
})
}