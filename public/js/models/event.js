var Event = function() 
{
    var self = this;
    
    this.users = [];

    this.register = function(user) 
    {
        this.users.push(user);    
    };

    this.unregister = function(user) 
    {
        removeUser(user);
    };

    this.indexOfUser = function(user)
    {
        for(var i = 0; i < this.users.length; i++)
        {
            if(this.users[i].id == user.id)
                return i;
        }       
        return -1;
    } 

    var removeUser = function(user)
    {
        var index = self.indexOfUser(user);
        if(index > -1)
            self.users.splice(index, 1);           
    }     
}
