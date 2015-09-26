function Phone_Editor (base_element_id,phone_frame,width,height) {
	this.canvas = new fabric.Canvas(base_element_id);
	this.resize_manager_dict = {};
	this.objectList = new Array();
	this.phone_img = phone_frame;
	this.width = width;
	this.height = height;
	
	this.init_Resize_Manager = function() {
		this.canvas.on('object:scaling', function(options) {
			if (options.target) {
				console.log('an object is being scaled! ', options.target.id);
			}
		});
	};
	this.addEntryToCanvas = function(id,placeholder,fillColor,fontColor,fontSize) {
		var t1 = new Entry({
			width: 400,
			height: 60,
			rx: 20,
			ry: 20,
			fill: fillColor,
			left: 100,
			top: 100,
			stroke: '#ABB7B7',
			strokeLineCap: 'round',
			strokeWidth: 3,
			lockScalingFlip: true,
			lockScalingY: true,
			fontSize: fontSize,
			fontColor: fontColor,
			fontFamily: 'Helvetica',
			placeholder: placeholder
		});
		this.canvas.add(t1);
		this.addObjectToList(t1,id);
	};
	this.addButtonToCanvas = function(id,text,fillColor,fontColor,fontSize) {
		var t1 = new Button({
			width: 400,
			height: 60,
			rx: 20,
			ry: 20,
			fill: fillColor,
			left: 100,
			top: 100,
			lockScalingFlip: true,
			lockScalingY: true,
			fontSize: fontSize,
			fontColor: fontColor,
			fontFamily: 'Helvetica',
			text: text
		});
		this.canvas.add(t1);
		this.addObjectToList(t1,id);
	};
	this.addLabelToCanvas = function(id,text,fontSize) {
		var t1 = new fabric.Text(text, {
			fontFamily: 'Helvetica',
			fontSize: fontSize,
			width: 100,
			height:100,
			left:100,
			top:100
		});
		this.canvas.add(t1);
		this.addObjectToList(t1,id);
	};
	this.addImageToCanvas = function(id,url) {
		var me = this;
		fabric.Image.fromURL(url, function(oImg) {
			me.canvas.add(oImg);
			me.addObjectToList(oImg,id);
		});
	};
	this.removeObjectFromListByObject = function(obj) {
		var idx = -1;
		for(var i = 0; i < this.objectList.length; i++) {
			if(this.objectList[i]["Object"]==obj) {
				idx = i;
				break;
			}
		}
		this.objectList.splice(idx,1);
	};
	this.removeObjectFromListByName = function(name) {
		var idx = -1;
		var obj = null;
		for(var i = 0; i < this.objectList.length; i++) {
			if(this.objectList[i]["Name"]==name) {
				idx = i;
				obj = this.objectList[i]["Object"];
				break;
			}
		}
		if(idx>=0) {
			this.objectList.splice(idx,1);
			return obj;
		} else {
			return null;
		}
	};
	this.removeObjectByObject = function(obj) {
		this.canvas.remove(obj);
		this.removeObjectFromListByObject(obj);
		this.updateLayerData();
	};
	this.removeObjectByName = function(name) {
		var obj = this.removeObjectFromListByName(name);
		if(obj!=null) {
			this.canvas.remove(obj);
			this.updateLayerData();
		}
	};
	this.updateLayerData = function() {
		for(var i = 0; i< objectList.length; i++) {
			this.objectList[i]["Layer"] = this.canvas.getObjects().indexOf(objectList[i]["Object"]);
		}
	};
	this.addObjectToList = function(obj,name) {
		var layer = this.canvas.getObjects().indexOf(obj);
		var pack = {"Name": name, "Object": obj, "Layer": layer};
		this.objectList.push(pack);
	};
	this.objectListToString = function() {
		if(this.objectList.length > 0){
			var stringBuffer = "";
			for(var i = 0; i < this.objectList.length; i++) {
				stringBuffer+=this.objectList[i]["Name"]+": "+this.objectList[i]["Layer"]+"\n";
			}
			return stringBuffer;
		} else {
			return "EMPTY";
		}
	};
	this.printObjectList = function() {
		var output = this.objectListToString();
		console.log(output);
	};
}