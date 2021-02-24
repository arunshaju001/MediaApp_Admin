var title;
var to_be_updated;
        $(document).ready(function() {
            $('#myTable').DataTable();
            });
        // edit data
        $('.update').click(function() {
            title= this.id;
                $.ajax({
                    type: 'POST',
                    url: '/admin/api/auth/findnews',
                    data: {"title":title},
                    success: function(data){
                            to_be_updated = data.title;
                            $("#update_title").attr("value", data.title);
                            $("#update_newsdesc").attr("value", data.newsdesc);
                            $('#Modal').modal({show: true});
                        },
                    error: function(){
                        alert('No data');
                    }
                    });
            });




            
            // update data
                  $(function(){
                      $('#update_table').on('click', function(e){
                        var title = to_be_updated;
                        var newtitle = $('#update_title').val();
                        var newsdesc = $('#update_newsdesc').val();
                        e.preventDefault();
                        $.ajax({
                          url: '/admin/api/auth/update',
                          type:'PUT',
                          data : {"title":title, "newtitle":newtitle, "newsdesc":newsdesc},
                          success: function(data){
                            window.location.reload()
                        },
                        error: function(){
                          alert('No data');
                        }
                      });
                  });
                  });