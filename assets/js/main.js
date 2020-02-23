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
	}else{
		$("#task-table").hide();
	}	
}

function getAllTasks(){
	list_tasks = [];
	
	for (var i = 1; i <= localStorage.length; i++) {
		var task = JSON.parse(localStorage.getItem(i));
		var done = task.done ? 'Done' : 'Pending';
		row = `
			<tr>
				<td>${ task.title}</td>
				<td>${ task.description}</td>
				<td>${ done }</td>
				<td>
					<button class="btn btn-secondary mb-2" id=remove_${task.id}>Remove</button>
					<button class="btn btn-primary mb-2" id=done_${task.id}>Set as done</button>
				</td>
			</tr>
		`;
		$("#taskList").append(row);			
	};
}