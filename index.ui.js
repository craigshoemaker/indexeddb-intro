// index.ui.js
;(function($, app){
    
    'use strict';

    $(function(){
        
        var 
            $deleteAllButton = $('#delete-all-button'),
            $titleText = $('#title-text'),
            $notesText = $('#notes-text'),
            $clearButton = $('#clear-button'),
            $saveButton = $('#save-button'),
            $listContainer = $('#list-container');
        
        var bindData = function(data){
            $listContainer.html('');
            data.forEach(function(note){
                $listContainer.append('<li><i data-id="' + note.id + '" class="fa fa-minus-circle"></i> ' +
                                      '<a href="#" data-id="' + note.id + '">'+ note.title +'</a></li>');
            });
        };
        
        var clearUI = function(){
            $titleText.val('');
            $notesText.val('');
        };
        
        var success = function(){ alert('success'); };
        var failure = function(){ alert('failure'); };
        
        app.db.errorHandler = function(e){
            alert('error: ' + e.target.code);
            debugger;
        };
        
        app.db.getAll(bindData);
        
        $('a[data-id]').click(function(e){
            e.preventDefault();
            var id = $(e.currentTarget).attr('data-id');
            app.db.get(id, success, failure);
            return false;
        });
        
        $('i[data-id]').click(function(e){
            e.preventDefault();
            var id = $(e.currentTarget).attr('data-id');
            app.db.delete(id, success, failure);
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
            
            app.db.save(note, function(){
                app.db.getAll(bindData);
                clearUI();
            });
        });
        
        $deleteAllButton.click(function(e){
            e.preventDefault();
            app.db.deleteAll();
            return false;
        });
        
    });
    
    
}(jQuery, window.app));