function Preview_System(base_element_id,width,height) {
	this.isInitialized = false;
	this.isSet = false;
	this.base_element_id = base_element_id;
	this.width = width;
	this.height = height;
	
	this.initialize = function() {
		this.phoneFrameBox = document.getElementById(this.base_element_id);
		this.phoneFrameBox.width = this.width+"px";
		this.phoneFrameBox.height = this.height+"px";
		this.isInitialized = true;
	};
	this.showWebsite = function(html) {
		if(this.isInitialized) {
			var doc=this.phoneFrameBox.contentDocument;
			doc.open();
			doc.writeln(html);
			doc.close(); 
		} else {
			this.initialize();
			this.showWebsite(html);
		}
	}
}

