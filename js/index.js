var fingerprint = new Fingerprint({canvas: true}).get();  //canvas

//野狗云初始化
var config = {
  syncURL: "https://mytodo123.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref().child(fingerprint);

//将提交按钮和回车键绑定
$(document).keydown(function(event){   
	if(event.which == 13 && $(".btn1").is(":visible"))
	{
		$(".btn1").click();
	}
});


/*点击submit时，将数据先添加到野狗云*/
$(".btn1").click(function(){
	var content = $(".ipt1").val();
	var d = new Date();
	var dms = d.getTime();
	if(content != ""){
	ref.child("note").push({                               //定义数据在云端存储格式，除id是number以外都是string
			  			 	"id":dms,
			   				"content":content,
			   				"detail":{"desc":"",
			   						  "remindertime":""},
			  				 });  
	$(".ipt1").val("");
	}
});	

//监听云端数据变化，当有数据添加时，就自动添加到本地
ref.child("note").on("child_added",function(snapshot){
	var list = $('#task-list');
	var id = snapshot.val().id;
	var content = snapshot.val().content;
	var desc = snapshot.val().detail.desc;
	var time = snapshot.val().detail.remindertime;
	var textObj = '<div class="task-item '+id+'">\
						<span class="ui-icon ui-icon-clock"></span>\
		            	<span class="task-content">'+content+'</span>\
		            	<span class="task-detail">&nbspdetail</span>\
		            	<div class="detail">\
							<input class="content" type="text" placeholder="内容" value='+ content +'>\
							<textarea class="desc" placeholder="请输入详情">'+desc+'</textarea>\
							<span>提醒时间</span>\
							<input class="time" type="date" value='+ time +'>\
							<button class="btn3">更新</button>\
						</div>\
		            </div>';    
	list.prepend(textObj);
});



//增加detail和提醒时间

	function addDetail(oldId,newId,desc,newTime){
		ref.child('note').orderByChild('id').equalTo(oldId).on("child_added",function(snapshot){
			ref.child('note').child(snapshot.key()).child("detail").update({"desc": desc,"remindertime":newTime});
			ref.child('note').child(snapshot.key()).update({"id": newId});
		});
	}

	$("div.task-list").on("click","button.btn3",function(){
		var thisObj =  $(this).parents(".task-item");
		var oldId = Number(thisObj.attr("class").substring(10,23));
		var newId = new Date().getTime();
		thisObj.attr("class","task-item " + newId);
		var desc = $(this).siblings(".desc").val();
		var newTime = $(this).siblings(".time").val();
			addDetail(oldId,newId,desc,newTime);
		});



//定义删除便签函数
var deleteNote = function(id){     //有关参数等详细请看野狗云官方API文档
		ref.child('note').orderByChild('id').equalTo(id).on("child_added",function(snapshot){
		ref.child('note').child(snapshot.key()).remove();
	}) ;
}

//通过检查task-item的class属性有无task-item-del删除便签
$(".btn2").on("click",function(){
	delConfirm();
});

// 自定义confirm函数
function delConfirm(){
	$(".confirmFrame, .mask").fadeIn(300);
	$(".btn4").on("click",function(){
		$(".confirmFrame, .mask").fadeOut(300,function(){
				$("div.task-item-del").each(function(){
				//删除本地
				$(this).remove();
				//删除云端
				var id = Number($(this).attr("class").substring(10,23));
				deleteNote(id);
				$(".btn2").hide(50);  //隐藏.btn2
			});
		});
	});
	$(".btn5, .ui-close").on("click",function(){
		$(".confirmFrame, .mask").fadeOut(300);
	});
}

//定义查找函数
function searchNote(){
	if($(".ipt1").hasClass("on-search"))
	{
		var text = $(".ipt1").val();
		var notes = $(".task-item").children(".task-content");
		for(var i = 0;i < notes.length;i++)
		{
			if(notes[i].innerText.indexOf(text) == -1)
				{
					$(notes[i]).parent().fadeOut(150);
				}
			else
				{
					$(notes[i]).parent().show(150);
				}
		}
	 }
}

$(".ipt1").on("input",searchNote);

//实现长按拖动标签换位置
