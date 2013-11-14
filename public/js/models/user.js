var User = function() {
    var self = this;

    this.events = [];
    this.attend = function(event)
    {
        this.events.push(event);
    }

    this.unattend = function(event) 
    {
        removeEvent(event);
    }

    this.isAttending = function(event) 
    {
        return this.indexOfEvent(event) > -1;
    }

    this.indexOfEvent = function(event)
    {
        for(var i = 0; i < this.events.length; i++)
        {
            if(this.events[i].id == event.id)
                return i;
        }       
        return -1;
    } 

    this.isAdmin = function()
    {
        console.log("admin? " + this.admin);
        return this.admin;
    }

    var removeEvent = function(event)
    {
        var index = self.indexOfEvent(event);
        if(index > -1)
            self.events.splice(index, 1);           
    }
};