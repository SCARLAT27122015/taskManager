var title, description;
$(document).ready(function($) {
	getTotalTasks();
	getAllTasks();
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
			objTask['done'] = false;
			localStorage.setItem(id, JSON.stringify(objTask));
			console.log(localStorage.length);
			$("input,textarea").val('');
			$("#addingTask").modal('hide');
			getTotalTasks ();
			getAllTasks();
		}
	});	

	$("#title").keyup(function(){
		$(this).next('.invalid-feedback').hide();
	});

	$("#description").keyup(function(){
		$(this).next('.invalid-feedback').hide();
	});		
});

function getTotalTasks (){
	if (localStorage.length>0) {
		$("#task-table").show();
		//getAllTasks();
	}else{
		$("#task-table").hide();
	}	
}


function getAllTasks(){
	$("#taskList").html('');
	for (var i = localStorage.length; i > 0; i--) {
		var task = JSON.parse(localStorage.getItem(i));
		var done = task.done ? 'Done' : 'Pending';
		row = `
			<tr class="row_${ task.id }">
				<td id="titltask_${ task.id }"><b>${ task.title}</b></td>
				<td id="desctask_${ task.id }">${ task.description}</td>
				<td class="isDone" id="donetask_${ task.id }">${ done }</td>
				<td>
					<button class="btn btn-secondary mb-2 remover" onClick=setRemoval(${task.id});>Remove</button>
					<button class="btn btn-primary mb-2 doner" onClick=setDone(${task.id});>Set as done</button>
				</td>
			</tr>
		`;
		$("#taskList").append(row);
	};
}

function setRemoval(id){
	localStorage.removeItem(id);
	$(".row_" + id).remove();
	getTotalTasks ();
}

function setDone(id){
	var title, description,objTask;
	title = $("#titltask_" + id).text();
	description = $("#desctask_" + id).text();
	objTask = {};
	objTask['id'] = id; 
	objTask['title'] = title;
	objTask['description'] = description;
	objTask['done'] = true;
	localStorage.setItem(id, JSON.stringify(objTask));
	getAllTasks();
}