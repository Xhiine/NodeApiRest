var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
    id:Number,
    name:String,
    commentary:String
});

module.exports = mongoose.model('permissions', permissionSchema);    