// index.db.js

;

window.indexedDB = window.indexedDB ||
                   window.mozIndexedDB ||
                   window.webkitIndexedDB ||
                   window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction ||
                   window.webkitIDBTransaction ||
                   window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange ||
                   window.webkitIDBKeyRange ||
                   window.msIDBKeyRange;

(function(window){
    
    'use strict';
    
    var db = {

        version: 3, // important: only use whole numbers!

        objectStoreName: 'tasks',

        instance: {},

        upgrade: function (e) {

            var
                _db = e.target.result,
                names = _db.objectStoreNames,
                name = db.objectStoreName;

            if (!names.contains(name)) {

                _db.createObjectStore(
                    db.objectStoreName,
                    {
                        keyPath: 'id',
                        autoIncrement: true
                    });
            }
        },

        errorHandler: function (error) {
            alert('error: ' + error.target.code);
            debugger;
        },

        getObjectStore: function (mode) {

            var txn, store;

            mode = mode || 'readonly';
                
            txn = db.instance.transaction(
                [db.objectStoreName], mode);

            store = txn.objectStore(
                db.objectStoreName);

            return store;
        },

        open: function (callback) {

            var request = window.indexedDB.open(
                db.objectStoreName, db.version);

            request.onerror = db.errorHandler;

            request.onupgradeneeded = db.upgrade;

            request.onsuccess = function (e) {

                db.instance = request.result;

                db.instance.onerror =
                    db.errorHandler;

                callback();
            };
        },

        save: function (note, callback) {

            db.open(function () {

                var store, request,
                    mode = 'readwrite';
                
                store = db.getObjectStore(mode),

                request = note.id ?
                    store.put(note) :
                    store.add(note);

                request.onsuccess = callback;
            });
        },

        'delete': function (id, callback) {

            id = parseInt(id);

            db.open(function () {

                var
                    mode = 'readwrite',
                    store, request;

                store = db.getObjectStore(mode);

                request = store.delete(id);

                request.onsuccess = callback;
            });
        },

        getAll: function (callback) {

            db.open(function () {

                var
                    store = db.getObjectStore(),
                    cursor = store.openCursor(),
                    data = [];

                cursor.onsuccess = function (e) {

                    var result = e.target.result;

                    if (result &&
                        result !== null) {

                        data.push(result.value);
                        result.continue();

                    } else {

                        callback(data);
                    }
                };

            });
        },

        get: function (id, callback) {

            id = parseInt(id);

            db.open(function () {

                var
                    store = db.getObjectStore(),
                    request = store.get(id);

                request.onsuccess = function (e){
                    callback(e.target.result);
                };
            });
        },

        deleteAll: function (callback) {

            db.open(function () {

                var mode, store, request;

                mode = 'readwrite';
                store = db.getObjectStore(mode);
                request = store.clear();

                request.onsuccess = callback;
            });

        }
    };
    
    window.app = window.app || {};
    window.app.db = db;

}(window));