const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

var Account = require('../../model/account.js');
var Permission = require('../../model/permission.js');

class MongoController{
    constructor(stringConnection){
        mongoose.connect(stringConnection);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
    
    getAccount(idToFind, callback, errorCallback) {
        Account.find( idToFind === null ? {} : { 'id' : idToFind}, function (err, accounts) {
            if (err) errorCallback(err);
            callback(accounts);
        })
    }

    newAccount(newAccountname, newAccountpassword, newAccountcommentary, newPermissionList, callback, errorCallback) {
        Account.findOne({}, ['id'], { sort:{ take:1, id: -1 }}, function (err, maxId) {
            if (err) errorCallback(err);
            if (maxId === null) maxId = { id : 0 };
            
            var account = new Account({
                id: parseInt(maxId.id) + 1, 
                name: newAccountname,
                password: newAccountpassword,
                commentary: newAccountcommentary, 
                permissionList : newPermissionList === undefined ? new Array() : newPermissionList
            });
            
            account.save(function(err){
              if (err) errorCallback(err); 
            });

            callback();
        })
    }

    updateAccount(idToFind, newPermissionList, callback, errorCallback) {
        Account.findOne({ 'id' : idToFind}, function (err, account) {
            if (err) errorCallback(err);
            account.permissionList = newPermissionList;
            Account.updateOne({ 'id' : idToFind}, account, function(err){
                if (err) errorCallback(err); 
            });

            callback();
        });
    }

    removeAccount(idRemove, callback, errorCallback) {
        Account.deleteOne({ id: idRemove }, function(err){
            if (err) errorCallback(err); 
            callback();
        });
    }

    getPermission(idToFind, callback, errorCallback) {
        Permission.find( idToFind === null ? {} : { 'id' : idToFind}, function (err, permission) {
            if (err) errorCallback(err);
            callback(permission);
        })
    }

    newPermission(newPermissionname, newPermissioncommentary, callback, errorCallback) {
        Permission.findOne({}, ['id'], { sort:{ take:1, id: -1 }}, function (err, maxId) {
            if (err) errorCallback(err);
            if (maxId === null) maxId = { id : 0 };

            var permission = new Permission({
                id: parseInt(maxId.id) + 1, 
                name: newPermissionname,
                commentary: newPermissioncommentary
            });
            
            permission.save(function(err){
              if (err) errorCallback(err); 
            });

            callback();
        })
    }

    removePermission(idRemove, callback, errorCallback) {
        Permission.deleteOne({ id: idRemove }, function(err){
            if (err) errorCallback(err); 
            callback();
        });
    }
}

module.exports = MongoController