function Editor_Controller() {
	// Myself
	var me = this;
	// Initialized Check
	this.isInitialized = false;
	// Compiler
	this.Compiler = new Compiler_System();
	// Phone Editor
	this.ActivePhoneEditor = null;
	// Preview System
	this.ActivePreviewSystem = null;
	// Active Project / Page
	this.ActiveProjectID = null;
	this.ActivePageID = null;
	// Active Code Editor
	this.ActiveCodeEditor = null;
	// Button Inputs
	this.buttonIDBox = null;
	this.buttonEnabledBox = null;
	this.buttonTextBox = null;
	this.buttonFontSizeBox = null;
	this.buttonTextColorBox = null;
	this.buttonColorBox = null;
	// Entry Inputs
	this.entryIDBox = null;
	this.entryPlaceholderBox = null;
	this.entryPasswordBox = null;
	this.entryTextColorBox = null;
	this.entryFontSizeBox = null;
	// Image Inputs
	this.imageIDBox = null;
	this.imageURLBox = null;
	// Label Inputs
	this.labelIDBox = null;
	this.labelTextBox = null;
	this.labelTextColorBox = null;
	this.labelFontSizeBox = null;
	// Output Boxes
	this.xamarinOutputBox = null;
	this.htmlOutputBox = null;
	this.cssOutputBox = null;
	this.javascriptOutputBox = null;
	// Controls
	this.addButtonButton = null;
	this.addEntryButton = null;
	this.addImageButton = null;
	this.addLabelButton = null;
	this.compileButton = null;
	this.showWebsiteButton = null;
	this.showXamarinButton = null;
	this.showHTMLButton = null;
	this.showCSSButton = null;
	this.showJavascriptButton = null;
	
	// Functions
	this.setActivePhoneEditor = function(editor) {
		this.ActivePhoneEditor = editor;
	};
	this.setActivePreviewSystem = function(previewer) {
		this.ActivePreviewSystem = previewer;
	};
	this.setActiveProjectID = function(id) {
		this.ActiveProjectID = id;
	};
	this.setActivePageID = function(id) {
		this.ActivePageID = id;
	};
	this.setActiveCodeEditor = function(editor) {
		this.ActiveCodeEditor = editor;
	};
	this.init_controls = function() {
		// Button Inputs
		this.buttonIDBox = document.getElementById('buttonIDBox');
		this.buttonEnabledBox = document.getElementById('buttonEnabledBox');
		this.buttonTextBox = document.getElementById('buttonTextBox');
		this.buttonFontSizeBox = document.getElementById('buttonFontSizeBox');
		this.buttonTextColorBox = document.getElementById('buttonTextColorBox');
		this.buttonColorBox = document.getElementById('buttonColorBox');
		// Entry Inputs
		this.entryIDBox = document.getElementById('entryIDBox');
		this.entryPlaceholderBox = document.getElementById('entryPlaceholderBox');
		this.entryPasswordBox = document.getElementById('entryPasswordBox');
		this.entryTextColorBox = document.getElementById('entryTextColorBox');
		this.entryFontSizeBox = document.getElementById('entryFontSizeBox');
		// Image Inputs
		this.imageIDBox = document.getElementById('imageIDBox');
		this.imageURLBox = document.getElementById('imageURLBox');
		// Label Inputs
		this.labelIDBox = document.getElementById('labelIDBox');
		this.labelTextBox = document.getElementById('labelTextBox');
		this.labelTextColorBox = document.getElementById('labelTextColorBox');
		this.labelFontSizeBox = document.getElementById('labelFontSizeBox');
		// Output Boxes
		this.xamarinOutputBox = document.getElementById('xamarinOutput');
		this.htmlOutputBox = document.getElementById('htmlOutput');
		this.cssOutputBox = document.getElementById('cssOutput');
		this.javascriptOutputBox = document.getElementById('javascriptOutput');
		// Controls
		this.addButtonButton = document.getElementById('addButtonButton');
		this.addEntryButton = document.getElementById('addEntryButton');
		this.addImageButton = document.getElementById('addImageButton');
		this.addLabelButton = document.getElementById('addLabelButton');
		this.compileButton = document.getElementById('compileButton');
		this.showWebsiteButton = document.getElementById('showWebsiteButton');
		this.showXamarinButton = document.getElementById('showXamarinButton');
		this.showHTMLButton = document.getElementById('showHTMLButton');
		this.showCSSButton = document.getElementById('showCSSButton');
		this.showJavascriptButton = document.getElementById('showJavascriptButton');
		// Controls Connection
		this.addButtonButton.onclick = this.addButtonButtonClicked;
		this.addEntryButton.onclick = this.addEntryButtonClicked;
		this.addImageButton.onclick = this.addImageButtonClicked;
		this.addLabelButton.onclick = this.addLabelButtonClicked;
		this.compileButton.onclick = this.compileButtonClicked;
		this.showWebsiteButton.onclick = this.showWebsiteButtonClicked;
		this.showXamarinButton.onclick = this.showXamarinButtonClicked;
		this.showHTMLButton.onclick = this.showHTMLButtonClicked;
		this.showCSSButton.onclick = this.showCSSButtonClicked;
		this.showJavascriptButton.onclick = this.showJavascriptButtonClicked;
		// Set Initialized
		this.isInitialized = true;
	};
	this.showWebsiteButtonClicked = function(event) {
		if(me.ActivePreviewSystem!=null) {
			if(me.Compiler != null) {
				if(me.Compiler.cachedResults!=null) {
					var html = me.Compiler.cachedResults[4];
					me.ActivePreviewSystem.showWebsite(html);
				} else {
					alert('Error: There is currently nothing to present please compile first!');
				}
			} else {
				alert('Error: There is not Compiler currently connected to this command!');
			}
		} else {
			alert('Error: There is no Active Preview System attached to this command!');
		}
	};
	this.outputSourceFromNumber = function(num) {
		if(me.Compiler != null) {
			if(me.Compiler.cachedResults!=null) {
					var code = me.Compiler.cachedResults[num];
					me.ActiveCodeEditor.setValue(code);
				} else {
					alert('Error: There is currently nothing to present please compile first!');
				}
		} else {
			alert('Error: There is not Compiler currently connected to this command!');
		}
	};
	this.showXamarinButtonClicked = function(event) {
		me.outputSourceFromNumber(0);
		me.ActiveCodeEditor.session.setMode("ace/mode/csharp");
	};
	this.showHTMLButtonClicked = function(event) {
		me.outputSourceFromNumber(1);
		me.ActiveCodeEditor.session.setMode("ace/mode/html");
	};
	this.showCSSButtonClicked = function(event) {
		me.outputSourceFromNumber(2);
		me.ActiveCodeEditor.session.setMode("ace/mode/css");
	};
	this.showJavascriptButtonClicked = function(event) {
		me.outputSourceFromNumber(3);
		me.ActiveCodeEditor.session.setMode("ace/mode/javascript");
	};
	this.addButtonButtonClicked = function(event) {
		if(me.isInitialized) {
			if(me.ActivePhoneEditor != null) {
				if(me.Compiler != null) {
					var buttonID = me.buttonIDBox.value;
					var buttonEnabled = "false";
					if(me.buttonEnabledBox.checked) {
						buttonEnabled = "true";
					}
					var buttonText = me.buttonTextBox.value;
					var buttonFontSize = me.buttonFontSizeBox.value;
					var buttonTextColor = me.buttonTextColorBox.value;
					var buttonColor = me.buttonColorBox.value;
					var buttonPixelFontSize = 0;
					me.buttonIDBox.value = "";
					me.buttonEnabledBox.checked = true;
					me.buttonTextBox.value = "";
					me.buttonFontSizeBox.value = "";
					if(buttonFontSize=="Medium") {
						buttonPixelFontSize = 46;
					} else {
						buttonPixelFontSize = 16;
					}
					me.ActivePhoneEditor.addButtonToCanvas(buttonID,buttonText,buttonColor,buttonTextColor,buttonPixelFontSize);
					me.Compiler.buttonCodeBlock(buttonID,buttonText,buttonFontSize,buttonTextColor,buttonColor,buttonEnabled);
					me.Compiler.addTo_idArray(buttonID);
				} else {
					alert('Error: There is not Compiler currently connected to this command!');
				}
			} else {
				alert('Error: There is no currently active Phone Editor attached to this command!');
			}
		} else {
			alert('Error: Controls have not been initialized correctly yet!');
		}
	};
	this.addEntryButtonClicked = function(event) {
		if(me.isInitialized) {
			if(me.ActivePhoneEditor != null) {
				if(me.Compiler != null) {
					var entryID = me.entryIDBox.value;
					var entryPlaceholder = me.entryPlaceholderBox.value;
					var entryPassword = "false";
					if(me.entryPasswordBox.checked) {
						entryPassword = "true";
					}
					var entryTextColor = me.entryTextColorBox.value;
					var entryFontSize = me.entryFontSizeBox.value;
					var entryPixelFontSize = 0;
					me.entryIDBox.value = "";
					me.entryPlaceholderBox.value = "";
					me.entryPasswordBox.checked = false;
					me.entryTextColorBox.value = "#000000";
					me.entryFontSizeBox.value = "";
					if(entryFontSize=="Medium") {
						entryPixelFontSize = 46;
					} else {
						entryPixelFontSize = 16;
					}
					me.ActivePhoneEditor.addEntryToCanvas(entryID,entryPlaceholder,'#FFFFFF',entryTextColor,entryPixelFontSize);
					me.Compiler.entryCodeBlock(entryID,entryPlaceholder,entryPassword,entryFontSize,entryTextColor);
					me.Compiler.addTo_idArray(entryID);
				} else {
					alert('Error: There is not Compiler currently connected to this command!');
				}
			} else {
				alert('Error: There is no currently active Phone Editor attached to this command!');
			}
		} else {
			alert('Error: Controls have not been initialized correctly yet!');
		}
	};
	this.addImageButtonClicked = function(event) {
		if(me.isInitialized) {
			if(me.ActivePhoneEditor != null) {
				if(me.Compiler != null) {
					var imageID = me.imageIDBox.value;
					var imageURL = me.imageURLBox.value;
					me.imageIDBox.value = "";
					me.imageURLBox.value = "";
					me.ActivePhoneEditor.addImageToCanvas(imageID,imageURL);
					me.Compiler.imageCodeBlock(imageID,imageURL);
					me.Compiler.addTo_idArray(imageID);
				} else {
					alert('Error: There is not Compiler currently connected to this command!');
				}
			} else {
				alert('Error: There is no currently active Phone Editor attached to this command!');
			}
		} else {
			alert('Error: Controls have not been initialized correctly yet!');
		}
	};
	this.addLabelButtonClicked = function(event) {
		if(me.isInitialized) {
			if(me.ActivePhoneEditor != null) {
				if(me.Compiler != null) {
					var labelID = me.labelIDBox.value;
					var labelText = me.labelTextBox.value;
					var labelTextColor = me.labelTextColorBox.value;
					var labelFontSize = me.labelFontSizeBox.value;
					var labelPixelFontSize = 0;
					me.labelIDBox.value = "";
					me.labelTextBox.value = "";
					me.labelTextColorBox.value = "#000000";
					me.labelFontSizeBox.value = "";
					if(labelFontSize=="Medium") {
						labelPixelFontSize = 46;
					} else {
						labelPixelFontSize = 16;
					}
					me.ActivePhoneEditor.addLabelToCanvas(labelID,labelText,labelPixelFontSize);
					me.Compiler.labelCodeBlock(labelID,labelText,labelFontSize,labelTextColor);
					me.Compiler.addTo_idArray(labelID);
				} else {
					alert('Error: There is not Compiler currently connected to this command!');
				}
			} else {
				alert('Error: There is no currently active Phone Editor attached to this command!');
			}
		} else {
			alert('Error: Controls have not been initialized correctly yet!');
		}
	};
	this.compileButtonClicked = function(event) {
		if(me.ActiveProjectID!=null && me.ActivePageID!=null) {
			me.Compiler.combineCode(me.ActiveProjectID,me.ActivePageID);
		} else if(me.ActiveProjectID==null && me.ActivePageID==null) {
			alert('Active Project ID and Active Page ID are not set! Compiler Failed!');
		} else if(me.ActiveProjectID==null) {
			alert('Active Project ID is not set! Compiler Failed!');
		} else { // me.ActivePageID==null
			alert('Active Page ID is not set! Compiler Failed!');
		}
	};
}

