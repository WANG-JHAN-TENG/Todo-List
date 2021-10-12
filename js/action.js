$('document').ready(function(){
    var source = $('#todo-list-item-template').html();
    var todoTemplate = Handlebars.compile(source);
    $('#todo-list')
    .on('dblclick','.content',function(e){
        $(this).prop('contenteditable',true).focus();
    })
    .on('blur','.content',function(e){
        var isNew = $(this).closest('li').is('.new');
        if(isNew){
            var todo = $(this).text();
            todo=todo.trim();
            if(todo.length>0){
                todo={
                    is_complete:false,
                    content:todo,
                };
                var li = todoTemplate(todo);
                $(this).closest('li').before(li);
            };
            $(this).empty();
        }else{
            $(this).prop('contenteditable',false);
        }
    })
    .on('click','.delete',function(e){
        var result = confirm('Delete item?');
        if(result){
            $(this).closest('li').remove();
        }
    })
    .on('click','.checkbox',function(e){
        $(this).closest('li').toggleClass('complete');
    });
    $( "#todo-list" ).find('ul').sortable({
        items: "li:not(.new)"
      });
});