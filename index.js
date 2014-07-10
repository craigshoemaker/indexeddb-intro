(function($){
    
    var data = [
        { id: 1, title: 'Test One', text: 'This is a test one' },
        { id: 2, title: 'Test Two', text: 'This is a test two' },
        { id: 3, title: 'Test Three', text: 'This is a test three' }
    ];

    $(function(){
        var 
            $clearAllButton = $('#clear-all-button'),
            $titleText = $('#title-text'),
            $notesText = $('#notes-text'),
            $clearButton = $('#clear-button'),
            $saveButton = $('#save-button'),
            $listContainer = $('#list-container');
        
        var bindData = function(){
            $listContainer.html('');
            data.forEach(function(note){
                $listContainer.append('<li><a href="#" data-id="' + note.id + '">'+ note.title +'</a> ' +
                                      '<button data-id="'+ note.id +'" class="btn btn-default btn-sm">x</button></li>');
            });
        };
        
        bindData();
        
        $('a[data-id]').click(function(e){
            e.preventDefault();
            var id = $(e.currentTarget).attr('data-id');
            debugger;
            return false;
        });
        
        $clearButton.click(function(e){
            e.preventDefault();
            
            $titleText.val('');
            $notesText.val('');
            
            return false;
        });
        
        $saveButton.click(function(e){

            var note = {
                title: $titleText.val(),
                text: $notesText.val(),
                id: data.length
            };
            
            data.push(note);
            
            bindData();
        });
        
    });
    
    
}(jQuery));