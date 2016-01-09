var _ = require('lodash');



function UserManager(){
    this.users = [];

}

UserManager.prototype.addUser = function(){

}

UserManager.prototype.removeUser = function(){

}


UserManager.prototype.broadcast = function(message){
    _.each(this.users, function(user){
        user.socket.send(message)
    })
};

module.exports = UserManager;