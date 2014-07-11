// index.db.js
;(function(window, $){
    
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
        
        getObjectStore: function(mode){
            var mode = mode || 'readonly';
            var txn = db.instance.transaction([db.objectStoreName], mode);
            var store = txn.objectStore(db.objectStoreName);
            
            return store;
        },
        
        open: function(callback){
            
            var request = window.indexedDB.open(
                            db.objectStoreName, 
                            db.version);
            
            request.onerror = db.errorHandler;
            
            request.onupgradeneeded = db.upgrade;
            
            request.onsuccess = function(e){
                db.instance = request.result;
                db.instance.onerror = db.errorHandler;
                callback();
            };
        },
        
        save: function(note, callback){

            db.open(function(){
                
                var 
                    store = db.getObjectStore('readwrite'),
                    request = store.add(note);

                request.onsuccess = function (e) {
                    callback();
                };
            });
        },
        
        'delete': function(id, success, failure){
            alert('delete: ' + id);
        },
        
        getAll: function(callback){
            
            db.open(function(){
                
                var 
                    store = db.getObjectStore(),
                    cursor = store.openCursor(),
                    data = [];

                cursor.onsuccess = function (e) {

                    var result = e.target.result;

                    if (result !== null) {
                        data.push(result.value);
                        result.continue();
                    } else {
                        callback(data);
                    }
                };
            
            });
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