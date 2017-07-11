var timeout;
//按标签时候，如果包含.task-item-del就选中,如果包含了就删除.task-item-del
$(".task-list").on('mousedown','.task-item',function(){   //鼠标点击就开始定时器
		var obj = $(this);
		if(!obj.hasClass("task-item-del"))
		{
			timeout = setTimeout(function(){
				 obj.addClass('task-item-del');
				 $(".btn2").show(100);          //顺便显示删除按钮(删除按钮和选中状态同一起出现，一起消失)
				},250);
		}
		else
		{
			obj.removeClass("task-item-del");
		}

		if(obj.parent().children(".task-item-del").length == 0)  //如果遍历函数返回false（即没有找到一条）,就隐藏.btn2
		{
			$(".btn2").hide(100);
		}         	
	});
$(".task-list").on('mouseup','.task-item',function(){    //鼠标松开就删除定时器
		clearTimeout(timeout);
	});	
$(".task-list").on('mouseout','.task-item',function(){   //光标移开就删除定时器
		clearTimeout(timeout);
	});
//以上三个监听实现了长按便签就选中的功能
							
//点击detail就显示detail框,同时点击的同时设置这个款可拖动
$(".task-list").on("click","span.task-detail",function(){
		$(this).siblings("div.detail").show(100);                //siblings 兄弟姐妹
		$(this).siblings("div.detail").draggable();
		});


$("*").on("click",function(e){      
	// console.log(e.target.className);
	if(e.target.className.substring(0,9) != "task-item" && e.target.className != "btn2" 
		&& e.target.className != "btn4"  && e.target.className != "delete-info" && e.target.className != "confirmFrame" 
		&& e.target.nodeName != "SPAN" && e.target.className != "button-group")
	{
		$(".task-item").removeClass("task-item-del");    //点击空白处，就恢复task-item的颜色
		$(".btn2").hide(100);                           //点击空白处，隐藏删除按钮
	}
});

$("span.task-detail").on('click',function(){
		$(this).parent().children('div.detail').show(100);
		});


	$("div.task-list").on("click",".detail *:nth-child(-n + 4)",function(e){   //点击detail框内的content，desc，time，就变亮色
		e.target.style.backgroundColor = "#f0f0f0";
	});


	$("div.task-list").on('click','.btn3',function(){
		$("div.detail").hide(100);                                    //点击更新按钮，就隐藏detail
		$(".task-item .detail .content,.desc,.time").css("background-color","#ddd");	 //点击更新按钮，就将detail框中content，desc，time三个框恢复原来的暗色
});

//点击.mask，隐藏删除提示框
$(".mask").on("click",function(){
	$(".mask, .confirmFrame").fadeOut(300);
});

//点击搜索图标，显示搜索框
$(".scope").on("click",function(){
	$(".welcomeMessage").animate({width:"0"},200,function(){
		$(".scope").hide(50);
		$(".iconfont").show(50);
		$(".welcomeMessage").val("");
		$(".welcomeMessage").attr("placeholder","请输入关键词");
		//$(".welcomeMessage").show(100);
		$(".welcomeMessage").animate({width:"100%"})
		$(".btn1").fadeOut(300);
		$(".btn7").fadeIn(300);
		$(".welcomeMessage").addClass("on-search");
	});
	
});

//点击编辑图标，显示输入框
$(".iconfont").on("click",function(){
	$(".welcomeMessage").animate({width:"0"},200,function(){
		$(".iconfont").hide(50);
		$(".scope").show(50);
		$(".welcomeMessage").attr("placeholder","e.g.下午记得去买菜");
		$(".welcomeMessage").animate({width:"100%"})
		//$(".welcomeMessage").show(100);
		$(".btn7").fadeOut(300);
		$(".btn1").fadeIn(300);
	});
	
	
});
