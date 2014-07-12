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
        
        var bindData = function(data){
            $listContainer.html('');
            data.forEach(function(note){
                $listContainer.append('<li><i data-id="' + note.id + '" class="fa fa-minus-circle"></i> ' +
                                      '<a href="#" data-id="' + note.id + '">'+ note.title +'</a></li>');
            });
            bindI();
        };
        
        var clearUI = function(){
            $titleText.val('');
            $notesText.val('');
            $idHidden.val('');
        };
        
        var success = function(){ alert('success'); };
        var failure = function(){ alert('failure'); };
        
        app.db.errorHandler = function(e){
            alert('error: ' + e.target.code);
            debugger;
        };
        
        app.db.getAll(bindData);
        
        
        
        var bindI = function(){
            
            $('a[data-id]').click(function(e){
                debugger;
                e.preventDefault();
                var id = $(e.currentTarget).attr('data-id');
                id = parseInt(id);
                app.db.get(id, function(note){
                    debugger;
                    $titleText.val(note.title);
                    $notesText.val(note.text);
                    $idHidden.val(note.id);
                });
                return false;
            });
            
            $('i[data-id]').click(function(e){
                debugger;
                e.preventDefault();
                var id = $(e.currentTarget).attr('data-id');
                id = parseInt(id);
                app.db.delete(id, function(){
                    app.db.getAll(bindData);
                });
                return false;
            });
        };
        
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
            });
            return false;
        });
        
    });
    
    
}(jQuery, window.app));