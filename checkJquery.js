//Check wether jQuery is Imported

(function(){

	if(!window.jQuery)
	{
		var script=document.createElement("script");
		script.src="http://code.jquery.com/jquery-latest.min.js";
		script.type="text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	else
	{
		var script1=document.getElementsByTagName("script");
		for(var i=0;i<script1.length;i++)
		{
			var library = script1[i].src.split('/')[5];
			if(library === "jquery")
			{
				script1[i].src="http://code.jquery.com/jquery-latest.min.js";
			}
		}
	}

})();

//The rest goes here...