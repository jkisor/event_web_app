var DateTimeExtractor = function()
{
	this.extractTime = function(dateTime)
	{
		if(dateTime == null)
			return "";

		var dateEnd = dateTime.indexOf('T');
		var timeEnd = dateTime.indexOf('Z');
		return dateTime.substr(dateEnd+1, (timeEnd-dateEnd)-1);		
	}

	this.extractDate = function(dateTime)
	{
		if(dateTime == null)
			return "";
		
		var dateEnd = dateTime.indexOf('T');
		return dateTime.substr(0, dateEnd);		
	}
}