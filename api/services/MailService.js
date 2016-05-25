module.exports = {

	//return the body from the message passed in parameter
	mailBody: function(message) {
		var b64string = '';
		//if message doesn't contain parts field
		if(typeof message.parts === 'undefined')
		{
			b64string = message.body.data;
		}
		else
		{
			b64string = module.exports.mailHTMLPart(message.parts);
		}
		b64string = b64string.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');

		return new Buffer(b64string, 'base64').toString("ascii");;
	},

	//get the HTML part from an array of parts
	mailHTMLPart: function(parts) {
		//
		for(var i = 0; i < parts.length; i++)
		{
			if(typeof parts[i].parts === 'undefined')
			{
				if(parts[i].mimeType === 'text/html')
				{
					return parts[i].body.data;
				}
			}
			else
			{
				return module.exports.mailHTMLPart(parts[i].parts);
			}
		}
		return '';
	}
}