function Compiler_System() {
	// Data
	this.idArray = new Array();
	// Xamarin
	this.codeS0 = "";
	this.codeS1 = "";
	this.codeS2 = "";
	this.codeS3 = "";
	this.codeS4 = "";
	this.codeS5 = "";
	// HTML
	this.codeH0 = "";
	this.codeH0Extra1 = "";
	this.codeH0Extra2 = "";
	this.codeH1 = "";
	this.codeH2 = "";
	this.codeH3 = "";
	this.codeH4 = "";
	this.codeH5 = "";
	this.codeH5Extra = "";
	this.codeCSS = "";
	this.javascriptCode = "";
	// Cached Results
	this.cachedResults = null;
	
	// Functions
	this.addTo_idArray = function(id) {
		this.idArray.push(id);
	};
	this.ClearCache = function() {
		this.cachedResults = null;
	};
	this.InitCodeBlock = function(pageID,projectID) {
		// Xamarin
		var startBlock = 
		"using System;"+"\n"+
		"using Xamarin.Forms;"+"\n"+
		"namespace "+projectID+"\n"+
		"{"+"\n"+
		"\t"+"public class "+pageID+" : ContentPage"+"\n"+
		"\t"+"{"+"\n";
		var constructorBlock =
		"\t\t"+"public "+pageID+" ()"+"\n"+
		"\t\t"+"{"+"\n";
		var endBlock =
		"\t\t"+"}"+"\n"+
		"\t"+"}"+"\n"+
		"}"+"\n";
		this.codeS0=startBlock;
		this.codeS2=constructorBlock;
		this.codeS5=endBlock;
		// HTML
		var htmlStartBlock1 =
		'<!DOCTYPE html>'+"\n"+
		'<html lang="en">'+"\n"+
		'\t<head>'+"\n"+
		'\t\t<meta charset="utf-8">'+"\n"+
		'\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge">'+"\n"+
		'\t\t<meta name="viewport" content="width=device-width, initial-scale=1">'+"\n"+
		'\t\t<title>'+pageID+'</title>'+"\n"+
		'\t\t<!-- CSS -->'+"\n";
		var cssImportBlock = '\t\t<link href="main.css" media="all" rel="stylesheet" type="text/css" />'+"\n";
		var htmlStartBlock2 =
		'\t\t<!-- JS -->'+"\n"+
		'\t\t<script src="https://s3-us-west-2.amazonaws.com/cdn.thegrid.io/gss/v2.0.0/v2.0.0/gss.js" type="text/javascript"></script>'+"\n"+
		'\t</head>'+"\n"+
		'\t<body class="custom">'+"\n"+
		'\t\t<script type="text/javascript">'+"\n"+
		'\t\t\twindow.engine = new GSS(document);'+"\n"+
		'\t\t</script>'+"\n"+
		'\t\t<style type="text/gss">'+"\n";
		var htmlStartBlock = htmlStartBlock1+cssImportBlock+htmlStartBlock2;
		var jsImportBlock = '\t\t<script type="text/javascript" src="script.js"></script>'+"\n";
		var htmlEndBlock1 =
		'\t</body>'+"\n"+
		'</html>'+"\n";
		var htmlEndBlock = jsImportBlock+htmlEndBlock1;
		var htmliFrameEndBlock = htmlEndBlock1;
		this.codeH0=htmlStartBlock;
		this.codeH5=htmlEndBlock;
		this.codeH0Extra1=htmlStartBlock1;
		this.codeH0Extra2=htmlStartBlock2;
		this.codeH5Extra=htmliFrameEndBlock;
		// JavaScript
		var javascriptStartBlock = 'console.log(window.engine);';
		this.javascriptCode = javascriptStartBlock;
		this.codeCSS += '*{ cursor: inherit;}\nhtml{cursor: url(http://sushy.io/img/mobile-cursor.png) 30 25, auto;\nbackground-color: #FFFFFF;}\n';
	};
	this.clearTempCode = function() {
		this.idArray = new Array();
		this.codeS0 = "";
		this.codeS1 = "";
		this.codeS2 = "";
		this.codeS3 = "";
		this.codeS4 = "";
		this.codeS5 = "";
		this.codeH0 = "";
		this.codeH0Extra1 = "";
		this.codeH0Extra2 = "";
		this.codeH1 = "";
		this.codeH2 = "";
		this.codeH3 = "";
		this.codeH4 = "";
		this.codeH5 = "";
		this.codeH5Extra = "";
		this.codeCSS = "";
		this.javascriptCode = "";
	};
	this.combineCode = function(pageID,projectID) {
		if(this.cachedResults == null) {
			this.InitCodeBlock(pageID,projectID);
			this.createStackedLayout(pageID,this.idArray);
			// Xamarin Code
			var code = "";
			code+=this.codeS0;
			code+=this.codeS1;
			code+=this.codeS2;
			code+=this.codeS3;
			code+=this.codeS4;
			code+=this.codeS5;
			var xamarinCode = code;
			// HTML
			code = "";
			code+=this.codeH0;
			code+=this.codeH1;
			code+=this.codeH2;
			code+=this.codeH3;
			code+=this.codeH4;
			code+=this.codeH5;
			var htmlCode = code;
			// Website
			code = "";
			code+=this.codeH0Extra1;
			code+='\t<style>\n'+this.codeCSS+'\t</style>\n'
			code+=this.codeH0Extra2;
			code+=this.codeH1;
			code+=this.codeH2;
			code+=this.codeH3;
			code+=this.codeH4;
			code+='\t<script type="text/javascript">\n'+this.javascriptCode+'\n\t</script>\n'
			code+=this.codeH5Extra;
			var websiteCode = code;
			var fnOutput = new Array();
			fnOutput.push(xamarinCode);
			fnOutput.push(htmlCode);
			fnOutput.push(this.codeCSS);
			fnOutput.push(this.javascriptCode);
			fnOutput.push(websiteCode);
			this.cachedResults = fnOutput;
			this.clearTempCode();
		}
	};
	this.createStackedLayout = function(id,arr) {
		var finalpart =
		"\t\t\t"+"ScrollView "+id+"_sc = new ScrollView {"+"\n"+
		"\t\t\t\t"+"Content = "+id+"_sl"+"\n"+
		"\t\t\t"+"};"+"\n"+
		"\t\t\t"+"Content = "+id+"_sc;"+"\n"+
		"\t\t\t"+"NavigationPage.SetHasNavigationBar(this, false);"+"\n";
		var start = 
		"\t\t\t"+"var "+id+"_sl = new StackLayout {"+"\n"+
		"\t\t\t\t"+"Orientation = StackOrientation.Vertical,"+"\n"+
		"\t\t\t\t"+"HorizontalOptions = LayoutOptions.Center,"+"\n"+
		"\t\t\t\t"+"Children = {"+"\n";
		var end = 
		"\t\t\t\t"+"}"+"\n"+
		"\t\t\t"+"};"+"\n";
		var middle = "";
		for(var i = 0; i <arr.length-1; i++) {
			middle+="\t\t\t\t\t"+arr[i]+","+"\n";
		}
		middle+="\t\t\t\t\t"+arr[arr.length-1]+"\n";
		var tOuput = start+middle+end+finalpart;
		this.codeS4+=tOuput;
		// HTML
		var spacingPx = 20;
		var buffer = "\t\t\t\t"+'outer-gap >= 0;'+"\n";
		if(arr.length>1) {
			start = "\t\t\t\t"+'@v ';
			for(var i =0; i < arr.length-1; i++) {
				start+='(#'+arr[i]+')-'+spacingPx+'-';
			}
			start+='(#'+arr[arr.length-1]+');'+"\n"+"\t\t\t\t";
			for(var i = 0; i < arr.length-1; i++) {
				start+='#'+arr[i]+'[center-x] == ';
			}
			start+='#'+arr[arr.length-1]+'[center-x];'+"\n";
			buffer+=start;
		}
		for(var i = 0; i < arr.length; i++) {
			buffer+="\t\t\t\t"+'#'+arr[i]+'[size] == #'+arr[i]+'[intrinsic-size];'+"\n";
		}
		buffer+="\t\t\t\t"+'#'+arr[Math.floor(arr.length/2)]+'[center] == ::window[center];'+"\n";
		buffer+="\t\t"+'</style>'+"\n";
		this.codeH1+=buffer;
	};
	this.buttonCodeBlock = function(id,text,fontSize,textColor,color,isEnabled) {
		// Xamarin
		var block1 = "\t\t"+"public Button "+id+";"+"\n";
		var block2 = 
		"\t\t\t"+id+"= new Button {"+"\n"+
		"\t\t\t\t"+"Text = \""+text+"\","+"\n"+
		"\t\t\t\t"+"IsEnabled = "+isEnabled+","+"\n"+
		"\t\t\t\t"+"BackgroundColor = Color.FromHex(\""+color+"\"),"+"\n"+
		"\t\t\t\t"+"TextColor = Color.FromHex(\""+textColor+"\"),"+"\n"+
		"\t\t\t\t"+"FontSize = Device.GetNamedSize (NamedSize."+fontSize+", typeof(Button))"+"\n"+
		"\t\t\t"+"};"+"\n";
		this.codeS1+=block1;
		this.codeS3+=block2;
		// HTML
		if(isEnabled == "true") {
			this.codeH2+="\t\t"+'<input id="'+id+'" type="button" value="'+text+'"/>'+"\n"
		} else {
			this.codeH2+="\t\t"+'<input id="'+id+'" type="button" value="'+text+' disabled"/>'+"\n"
		}
		// CSS
		var borderRadius = 20;
		var verticalPadding = 5;
		var horizontalPadding = 15;
		var fontSizePx = 32;
		if(fontSize="Medium") {
			fontSizePx = 32;
		} else {
			fontSizePx = 16;
		}
		block1 =
		'#'+id+"\n"+
		'{'+"\n"+
		'\t-webkit-appearance: none;'+"\n"+
		'\tcolor:'+textColor+';'+"\n"+
		'\tborder-radius: '+borderRadius+'px;'+"\n"+ 
		'\t-moz-border-radius: '+borderRadius+'px; '+"\n"+
		'\t-webkit-border-radius: '+borderRadius+'px;'+"\n"+
		'\tborder: 0px;'+"\n"+
		'\tpadding-top: '+verticalPadding+'px;'+"\n"+
		'\tpadding-right: '+horizontalPadding+'px;'+"\n"+
		'\tpadding-bottom: '+verticalPadding+'px;'+"\n"+
		'\tpadding-left: '+horizontalPadding+'px;'+"\n"+
		'\tbackground-color: '+color+';'+"\n"+
		'\tfont-family: Helvetica;'+"\n"+
		'\tfont-size: '+fontSizePx+'px;'+"\n"+
		'}'+"\n";
		this.codeCSS+=block1;
		this.cachedResults = null;
	};
	this.entryCodeBlock = function(id,placeholder,isPassword,fontSize,textColor) {
		var block1 = "\t\t"+"public Entry "+id+";"+"\n";
		var block2 = 
		"\t\t\t"+id+"= new Entry {"+"\n"+
		"\t\t\t\t"+"Placeholder = \""+placeholder+"\","+"\n"+
		"\t\t\t\t"+"IsPassword = "+isPassword+","+"\n"+
		"\t\t\t\t"+"TextColor = Color.FromHex(\""+textColor+"\"),"+"\n"+
		"\t\t\t\t"+"FontSize = Device.GetNamedSize (NamedSize."+fontSize+", typeof(Entry))"+"\n"+
		"\t\t\t"+"};"+"\n";
		this.codeS1+=block1;
		this.codeS3+=block2;
		// HTML
		if(isPassword == "true") {
			this.codeH2+="\t\t"+'<input id="'+id+'" type="password" placeholder="'+placeholder+'"/>'+"\n"
		} else {
			this.codeH2+="\t\t"+'<input id="'+id+'" type="text" placeholder="'+placeholder+'"/>'+"\n"
		}
		// CSS
		var borderWidth = 3;
		var borderColor = "#ABB7B7";
		var borderRadius = 20;
		var verticalPadding = 5;
		var horizontalPadding = 15;
		var fontSizePx = 32;
		if(fontSize="Medium") {
			fontSizePx = 32;
		} else {
			fontSizePx = 16;
		}
		block1 =
		'#'+id+"\n"+
		'{'+"\n"+
		'\t-webkit-appearance: none;'+"\n"+
		'\tcolor:'+textColor+';'+"\n"+
		'\tborder-radius: '+borderRadius+'px;'+"\n"+ 
		'\t-moz-border-radius: '+borderRadius+'px; '+"\n"+
		'\t-webkit-border-radius: '+borderRadius+'px;'+"\n"+
		'\tborder: '+borderWidth+'px solid '+borderColor+';'+"\n"+
		'\tpadding-top: '+verticalPadding+'px;'+"\n"+
		'\tpadding-right: '+horizontalPadding+'px;'+"\n"+
		'\tpadding-bottom: '+verticalPadding+'px;'+"\n"+
		'\tpadding-left: '+horizontalPadding+'px;'+"\n"+
		//'\tbackground-color: '+color+';'+"\n"+
		'\tfont-family: Helvetica;'+"\n"+
		'\tfont-size: '+fontSizePx+'px;'+"\n"+
		'}'+"\n";
		this.codeCSS+=block1;
		this.cachedResults = null;
	};
	this.imageCodeBlock = function(id,url) {
		var block1 = "\t\t"+"public Image "+id+";"+"\n";
		var block2 = 
		"\t\t\t"+id+"= new Image {"+"\n"+
		"\t\t\t\t"+"Source = \""+url+"\""+"\n"+
		"\t\t\t"+"};"+"\n";
		this.codeS1+=block1;
		this.codeS3+=block2;
		// HTML
		this.codeH2+="\t\t"+'<img id="'+id+'" src="'+url+'" />'+"\n";
		this.cachedResults = null;
	};
	this.labelCodeBlock = function(id,text,fontSize,textColor) {
		var block1 = "\t\t"+"public Entry "+id+";"+"\n";
		var block2 = 
		"\t\t\t"+id+"= new Entry {"+"\n"+
		"\t\t\t\t"+"Text = \""+text+"\","+"\n"+
		"\t\t\t\t"+"TextColor = Color.FromHex(\""+textColor+"\"),"+"\n"+
		"\t\t\t\t"+"FontSize = Device.GetNamedSize (NamedSize."+fontSize+", typeof(Label))"+"\n"+
		"\t\t\t"+"};"+"\n";
		this.codeS1+=block1;
		this.codeS3+=block2;
		// HTML
		this.codeH2+="\t\t"+'<span id="'+id+'" >'+text+'</span>'+"\n";
		// CSS
		var borderWidth = 3;
		var borderColor = "#ABB7B7";
		var borderRadius = 20;
		var verticalPadding = 5;
		var horizontalPadding = 15;
		var fontSizePx = 32;
		if(fontSize="Medium") {
			fontSizePx = 32;
		} else {
			fontSizePx = 16;
		}
		block1 =
		'#'+id+"\n"+
		'{'+"\n"+
		'\tcolor: '+textColor+';'+"\n"+
		'\tfont-family: Helvetica;'+"\n"+
		'\tfont-size: '+fontSizePx+'px;'+"\n"+
		'\tmargin: auto;'+"\n"+
		'}'+"\n";
		this.codeCSS+=block1;
		this.cachedResults = null;
	};
}

