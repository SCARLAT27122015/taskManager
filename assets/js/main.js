var title, description;
$(document).ready(function($) {
	$("#addNewTask").click(function(){
		title = $("#title").val();
		description	= $("#description").val();

		if (title == '') {
			$("#title").next('.invalid-feedback').show();	
		}

		if (description == '') {
			$("#description").next('.invalid-feedback').show();	
		}

		if (title && description) {
			var objTask = {};
			var id = localStorage.length + 1;
			objTask['id'] = id; 
			objTask['title'] = title;
			objTask['description'] = description;
			localStorage.setItem("task_" + id, JSON.stringify(objTask));
			console.log(localStorage.length);
			$("input,textarea").val('');
			$("#addingTask").modal('hide');
		}
	});	

	$("#title").keyup(function(){
		$(this).next('.invalid-feedback').hide();
	});

	$("#description").keyup(function(){
		$(this).next('.invalid-feedback').hide();
	});	
});