$('.delete').click(function() {
    var response = confirm("Do you want to delete the News ?")
    title = this.id;
    if(response === true){
        $.ajax({
            type: 'DELETE',
            url: '/admin/api/auth/delete',
            method: 'delete',
            data: {"title":title},
            success: function(data){
                window.location.reload()
            },
            error: function(){
                alert('Cannot Delete News');
            }
        });
    }
    else{
        alert("News Not deleted")
    }
});