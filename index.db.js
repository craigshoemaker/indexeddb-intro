(function(window, $){
    
    'use strict';
    
    window.indexedDB =  window.indexedDB || 
                        window.mozIndexedDB || 
                        window.webkitIndexedDB || 
                        window.msIndexedDB;
            
    window.IDBTransaction =  window.IDBTransaction || 
                             window.webkitIDBTransaction || 
                             window.msIDBTransaction;
            
    window.IDBKeyRange = window.IDBKeyRange || 
                         window.webkitIDBKeyRange || 
                         window.msIDBKeyRange;
    
    var db = {
            
        version: 3, // important: only use whole numbers!

        objectStoreName: 'tasks',

        instance: {},

        upgrade: function(e) {
            debugger;
            var _db = e.target.result;
            
            if(!_db.objectStoreNames.contains(db.objectStoreName)){
                _db.createObjectStore(
                    db.objectStoreName, 
                    { keyPath: 'id', autoIncrement: true});
            }
        },
        
        errorHandler: function(error){
            alert('error: ' + error.target.code);
            debugger;
        },
        
        open: function(success, failure){
            
            var request = window.indexedDB.open(
                            db.objectStoreName, 
                            db.version);
            
            request.onerror = db.errorHandler;
            
            request.onupgradeneeded = db.upgrade;
            
            request.onsuccess = function(e){
                db.instance = request.result;
                db.instance.onerror = db.errorHandler;
                success();
            };
        },
        
        save: function(note, success, failure){

            db.open(function(){
                
                debugger;
                
                var txn = db.instance.transaction([db.objectStoreName], 'readwrite');

                var
                    store = txn.objectStore(db.objectStoreName),
                    request = store.add(note);

                request.onsuccess = function (e) {
                    debugger;
                    success();
                };
            });
        },
        
        'delete': function(id, success, failure){
            alert('delete: ' + id);
        },
        
        getAll: function(success, failure){
            var data = [
                { id: 1, title: 'Test One', text: 'This is a test one' },
                { id: 2, title: 'Test Two', text: 'This is a test two' },
                { id: 3, title: 'Test Three', text: 'This is a test three' }
            ];
            
            success(data);
        },
        
        get: function(id, success, failure){
            alert('get: ' + id);
        },
        
        deleteAll: function(){
            alert('deleteAll');
        }
    };
    
    window.app = window.app || {};
    window.app.db = db;

}(window, jQuery));