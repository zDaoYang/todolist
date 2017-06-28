var task_list = new Array();
var i =0;
//野狗云初始化
var config = {
  syncURL: "https://mytodo123.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

//绑定键盘回车键
$(document).keydown(function(event){   
	if(event.which == 13)
	{
		$("#btn1").click();
	}
});


/*点击submit时，将数据先添加到野狗云*/
$("#btn1").click(function(){
	var content = $("#ipt1").val();
	var d = new Date();
	var dms = d.getTime();
	if(content != ""){
	ref.child("note").push({ 
			  			 	"id":dms,
			   				"content":content,
			   				"detail":{"desc":"",
			   						  "remindertime":""},
			  				 });  
	$("#ipt1").val("");
	}
});	


//监听云端数据变化，当有数据添加时，就自动添加到本地
ref.child("note").on("child_added",function(snapshot){
	var list = $('#task-list');
	var id = snapshot.val().id;
	var content = snapshot.val().content;
	var desc = snapshot.val().detail.desc;
	var time = snapshot.val().detail.time;
	var textObj = '<div class="task-item '+id+'">\
						<span class="ui-icon ui-icon-clock"></span>\
		            	<span class="task-content">'+content+'</span>\
		            	<span class="task-detail">&nbspdetail</span>\
		            	<div class="detail">\
							<input class="content" type="text" placeholder="内容" value='+content+'>\
							<textarea class="desc" placeholder="详情"></textarea>\
							<span>提醒时间</span>\
							<input class="time" type="date">\
							<button class="btn3">更新</button>\
						</div>\
		            </div>';     
	list.prepend(textObj);
	list.children(".task-item").children(".detail").draggable();
	$("span.task-detail").on('click',function(){
		$(this).parent().children('div.detail').show(100);
		});

});

//定义删除便签函数
var deleteNote = function(id){     //有关参数等详细请看野狗云官方API文档
		ref.child('note').orderByChild('id').equalTo(id).on("child_added",function(snapshot){
		ref.child('note').child(snapshot.key()).remove();
	}) ;
}

//通过查看checked状态删除便签
// $("#btn2").on("click",function(){
	
// 	$("input[type='checkbox']:checked").each(function(){   //每次点击选定为选定状态的checkbox
// 		var delObj = $(this).parent("div.task-item"); 
// 		//删除本地
// 		console.log(delObj);
// 		delObj.remove();
// 		//删除云端
// 		var id = Number(delObj.attr('class').substring(10,23)); /*提取每一条task-item的class属性的后半部分，即每一条便签的id，
// 															    因为经过substring方法id已经变成String类型，而数据库中存储的id是number类型，
// 														         所以这里要记得用Number方法重新转换为number类型*/
// 		deleteNote(id);		

// 	});		
// });

//通过检查task-item的class属性有无task-item-del删除便签
$("#btn2").on("click",function(){
	$("div.task-item-del").each(function(){
		//删除本地
		$(this).remove();
		//删除云端
		var id = Number($(this).attr('class').substring(10,23));
		deleteNote(id);
	});
});

	function addDetail(id,desc,updatetime){
		ref.child('note').orderByChild('id').equalTo(id).on("child_added",function(snapshot){
			ref.child('note').child(snapshot.key()).child("detail").update({"desc": desc,"remindertime":updatetime});
			ref.child('note').child(snapshot.key()).update({"id": id});
		});
	}

	$("div.task-list").on("click","button.btn3",function(){
		var d = new Date();
		var id = d.getTime();
		var desc = $("textarea.desc").val();
		var updatetime = $("input.time").val();
			addDetail(id,desc,updatetime);
		});



//自定义alert





//实现长按拖动标签换位置
