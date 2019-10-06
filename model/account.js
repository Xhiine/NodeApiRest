var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    id:Number,
    name:String,
    password:String,
    commentary:String,
    permissionList:Array
});

module.exports = mongoose.model('accounts', accountSchema);    