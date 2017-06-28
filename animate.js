//长按标签改变颜色
$(".task-list").on('mousedown','.task-item',function(){   //鼠标点击就开始定时器
		var obj = $(this);
		timeout = setTimeout(function(){
			 obj.addClass('task-item-del');
			 $("button#btn2").show(100);          //顺便显示删除按钮(删除按钮和选中状态同一起出现，一起消失
			},250);
	});
$(".task-list").on('mouseup','.task-item',function(){    //鼠标松开就删除定时器
		clearTimeout(timeout);
	});	
$(".task-list").on('mouseout','.task-item',function(){   //光标移开就删除定时器
		clearTimeout(timeout);
	});
//以上三个监听实现了长按便签就选中的功能


$("*").on("click",function(e){      
	if(e.target.className.substring(0,9) != "task-item" && e.target.nodeName != "SPAN" )
	{
		$(".task-item").removeClass("task-item-del");  //点击空白处，就恢复task-item的颜色
		$("button#btn2").hide(100);                    //点击空白处，隐藏删除按钮
	}
});

$("span.task-detail").on('click',function(){
		$(this).parent().children('div.detail').show(100);
		});


	$("div.task-list").on('click','div.detail *:lt(4)',function(){   //点击detail框内的content，desc，time，就变亮色
		$(this).css("background-color","#F0F0F0");
	});


	$("div.task-list").on('click','.btn3',function(){
		$("div.detail").hide(100);                               //点击更新按钮，就隐藏detail
		$(".task-item .detail *:lt(4)").css("background-color","#ddd");	 //点击更新按钮，就将detail框中content，desc，time三个框恢复原来的暗色
});






