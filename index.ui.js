// index.ui.js
;(function($, app){
    
    'use strict';

    $(function(){
        
        var 
            $deleteAllButton = $('#delete-all-button'),
            $titleText = $('#title-text'),
            $notesText = $('#notes-text'),
            $idHidden = $('#id-hidden'),
            $clearButton = $('#clear-button'),
            $saveButton = $('#save-button'),
            $listContainer = $('#list-container');
        
        var addNoTasksMessage = function(){
            $listContainer.append('<li class="text-muted small">No tasks</li>');
        };
        
        var bindData = function(data){
            $listContainer.html('');
            
            if(data.length === 0){
                addNoTasksMessage();
                return;
            }
            
            data.forEach(function(note){
                $listContainer.append('<li><i data-id="' + note.id + '" class="fa fa-minus-circle"></i> ' +
                                      '<a href="#" data-id="' + note.id + '">'+ note.title +'</a></li>');
            });
        };
        
        var clearUI = function(){
            $titleText.val('');
            $notesText.val('');
            $idHidden.val('');
        };
        
        // select individual item
        $listContainer.on('click', 'a[data-id]', function(e){
            e.preventDefault();
            var id = $(e.currentTarget).attr('data-id');
            app.db.get(id, function(note){
                $titleText.val(note.title);
                $notesText.val(note.text);
                $idHidden.val(note.id);
            });
            return false;
        });

        // delete item
        $listContainer.on('click', 'i[data-id]', function(e){
            e.preventDefault();
            var id = $(e.currentTarget).attr('data-id');
            app.db.delete(id, function(){
                app.db.getAll(bindData);
                clearUI();
            });
            return false;
        });
        
        $clearButton.click(function(e){
            e.preventDefault();
            clearUI();
            return false;
        });
        
        $saveButton.click(function(e){

            var note = {
                title: $titleText.val(),
                text: $notesText.val()
            };
            
            if($idHidden.val() !== ''){
                note.id = parseInt($idHidden.val());
            }
            
            app.db.save(note, function(){
                app.db.getAll(bindData);
                clearUI();
            });
        });
        
        $deleteAllButton.click(function(e){
            e.preventDefault();
            app.db.deleteAll(function(){
                $listContainer.html('');
                addNoTasksMessage();
                clearUI();
            });
            return false;
        });
        
        app.db.errorHandler = function(e){
            alert('error: ' + e.target.code);
            debugger;
        };
        
        app.db.getAll(bindData);
        
    });
    
    
}(jQuery, window.app));