var myRef = {};

function clearGraph() {
	if('instance' in myRef) {
		myRef['instance'].reset();
		$( "#flowchart-demo" ).empty();
		delete myRef['instance'];
	}
}

function saveFile(){
	function getOffsetRect(elem) {
		var box = elem.getBoundingClientRect();
		var body = document.body;
		var docElem = document.documentElement;
		var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
		var clientTop = docElem.clientTop || body.clientTop || 0;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;
		var top  = box.top +  scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;
		return { top: Math.round(top), left: Math.round(left) }
	}
	
	function getRelativePos(obj,height,width) {
		var pos = {};
		var r = getOffsetRect(obj);
		pos["left_offset"] = obj.offsetLeft+(width/2);
		pos["top_offset"] = obj.offsetTop+(height/2);
		pos["left"] = r.left+(width/2);
		pos["top"] = r.top+(height/2);
		return pos;
	}
	
	function getRelativeCenterPosition(elem,canvasW,canvasH,elemW,elemH){
		var r = getRelativePos(elem,elemH,elemW);
		var output = {};
		output["left"] = r["left_offset"]/canvasW;
		output["top"] = r["top_offset"]/canvasH;
		return output;
	}
	
	function getConnectionEndpoint(vertex,connectionID,source_target_type) {
		for(var end of vertex["endpoints"]) {
			if(source_target_type==end["type"]) {
				for(var conid of end["connections"]) {
					if(conid==connectionID) {
						return end["id"];
					}
				}
			}
		}
		return "-1";
	}

	function saveGraph(inst){
		var lj = jsPlumb.getSelector(".flowchart-demo .window");
		canvasH = document.getElementById("flowchart-demo").offsetHeight;
		canvasW = document.getElementById("flowchart-demo").offsetWidth;
		var vertices = [];
		for(var k of Array.prototype.slice.call(lj,0)) {
			var vertex = {};
			var id = k["id"];
			vertex["context"] = k["innerHTML"];
			vertex["name"] = id;
			vertex["_id"] = parseInt(id.substring(id.indexOf("_")+1));
			vertex["_type"] = "vertex";
			var r = getRelativeCenterPosition(k,canvasW,canvasH,90,90);
			vertex["left"] = r["left"];
			vertex["top"] = r["top"];
			var endpoints = [];
			var pts = inst.getEndpoints(k)
			for(var pt of pts) {
				var endpt = {};
				if(pt["isSource"]) {
					endpt["label"] = "Drag";
					endpt["type"] = "source";
				} else if(pt["isTarget"]) {
					endpt["label"] = "Drop";
					endpt["type"] = "target";
				} else {
					endpt["label"] = "None";
					endpt["type"] = "None";
				}
				endpt["name"] = pt["id"];
				endpt["location"] = pt["anchor"]["type"];
				endpt["connections"] = [];
				for(var conn of pt["connections"]) {
					endpt["connections"].push(conn["id"]);
				}
				if(endpt["location"]=="TopCenter") {
					endpt["id"] = "1";
				} else if(endpt["location"]=="RightMiddle") {
					endpt["id"] = "2";
				} else if(endpt["location"]=="BottomCenter") {
					endpt["id"] = "3";
				} else if(endpt["location"]=="LeftMiddle") {
					endpt["id"] = "4";
				} else {
					endpt["id"] = String(Number.MAX_VALUE);
				}
				endpoints.push(endpt);
			}
			vertex["endpoints"]=endpoints.sort(function(a,b){
				if(a["id"]<b["id"]) return -1;
				if(a["id"]>b["id"]) return 1;
				return 0;
			});
			vertices.push(vertex);
		}
		vertices = vertices.sort(function(a,b){
			if(a["_id"]<b["_id"]) return -1;
			if(a["_id"]>b["_id"]) return 1;
			return 0;
		});
		for(var vex of vertices) {
			vex["_id"] = String(vex["_id"]);
		}
		conns = inst.getAllConnections();
		var connections =[];
		for(var conn of conns) {
			var connection = {};
			connection["name"] = conn.id;
			connection["_outV"] = parseInt(conn.sourceId.substring(conn.sourceId.indexOf("_")+1));
			connection["_inV"] = parseInt(conn.targetId.substring(conn.targetId.indexOf("_")+1));
			connection["out_endpoint_id"] = getConnectionEndpoint(vertices[connection["_outV"]-1],connection["name"],"source");
			connection["in_endpoint_id"] = getConnectionEndpoint(vertices[connection["_inV"]-1],connection["name"],"target");
			connection["_outV"] = String(connection["_outV"]);
			connection["_inV"] = String(connection["_inV"]);
			connection["_label"] = conn.getOverlay("label")["label"];
			connection["_type"] = "edge";
			connections.push(connection);
		}
		connections = connections.sort(function(a,b){
			if(a["name"]<b["name"]) return -1;
			if(a["name"]>b["name"]) return 1;
			return 0;
		});
		var i = 1;
		for(var conn of connections) {
			conn["_id"] = String(i);
			i = i + 1;
		}
		graphNew1 = {};
		graphNew1["mode"] = "NORMAL";
		graphNew1["vertices"] = vertices;
		graphNew1["edges"] = connections;
		graphNew2 = {};
		graphNew2["graph"] = graphNew1;
		return graphNew2;
	}
	
	function JSONfileSave(data,filename){
		var str = JSON.stringify(data);
		var blob = new Blob([str], {type: "text/json;charset=utf-8"});
		saveAs(blob, filename);
	}

	var filename = document.getElementById('filename_box').value;
	if(filename.length>0 && 'instance' in myRef) {
		JSONfileSave(saveGraph(myRef['instance']),filename);
	}
}

function loadFile(){
	var input, file, fr;
	
	if (typeof window.FileReader !== 'function') {
		alert("The file API isn't supported on this browser yet.");
		return;
	}
	
	input = document.getElementById('fileinput');
	if (!input) {
		alert("Um, couldn't find the fileinput element.");
	}
	else if (!input.files) {
		alert("This browser doesn't seem to support the `files` property of file inputs.");
	}
	else if (!input.files[0]) {
		alert("Please select a file before clicking 'Load'");
	}
	else {
		file = input.files[0];
		fr = new FileReader();
		fr.onload = receivedText;
		fr.readAsText(file);
	}
	
	function getEndpoints(endpoints) {
		var output = {};
		output["Drag"] =[];
		output["Drop"] =[];
		for(var pt of endpoints) {
			if(pt["label"]=="Drag") {
				output["Drag"].push(pt["location"]);
			} else if(pt["label"]=="Drop") {
				output["Drop"].push(pt["location"]);
			} else {
				console.log("Error: Unrecognized Label: "+String(pt["label"]));
			}
		}
		return output;
	}
	
	function selectVertexByID(graph,id) {
		for(var vex of graph["vertices"]) {
			if(vex["_id"]==id) {
				return vex;
			}
		}
		return null;
	}
	
	function selectEndpointByID(vertex,id) {
		for(var end of vertex["endpoints"]) {
			if(end["id"] == id) {
				return end;
			}
		}
		return null;
	}
	
	function uuidsFromEdge(edge,graph) {
		var output = [];
		var inV = selectVertexByID(graph,edge["_inV"]);
		var outV = selectVertexByID(graph,edge["_outV"]);
		var inVname = inV["name"];
		var outVname = outV["name"];
		var inEname = selectEndpointByID(inV,edge["in_endpoint_id"])["location"];
		var outEname = selectEndpointByID(outV,edge["out_endpoint_id"])["location"];
		output.push(outVname+outEname);
		output.push(inVname+inEname);
		return output;
	}
	
	function getPositionFromRelativeCenter(centerL,centerT,canvasW,canvasH,elemW,elemH){
		var output = {};
		output["left"] = Math.round(centerL*canvasW-(elemW/2));
		output["top"] = Math.round(centerT*canvasH-(elemH/2));
		return output;
	}
	
	function receivedText(e) {
		lines = e.target.result;
		var newArr = JSON.parse(lines);
		var instance = jsPlumb.getInstance({
			// default drag options
			DragOptions: { cursor: 'pointer', zIndex: 2000 },
			// the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
			// case it returns the 'labelText' member that we set on each connection in the 'init' method below.
			ConnectionOverlays: [
				[ "Arrow", { location: 1 } ],
				[ "Label", {
					location: 0.1,
					id: "label",
					cssClass: "aLabel"
				}]
			],
			Container: "flowchart-demo"
		});
		
		var basicType = {
			connector: "StateMachine",
			paintStyle: { strokeStyle: "red", lineWidth: 4 },
			hoverPaintStyle: { strokeStyle: "blue" },
			overlays: [
				"Arrow"
			]
		};
		instance.registerConnectionType("basic", basicType);
	
		// this is the paint style for the connecting lines..
		var connectorPaintStyle = {
				lineWidth: 4,
				strokeStyle: "#61B7CF",
				joinstyle: "round",
				outlineColor: "white",
				outlineWidth: 2
			},
		// .. and this is the hover style.
			connectorHoverStyle = {
				lineWidth: 4,
				strokeStyle: "#216477",
				outlineWidth: 2,
				outlineColor: "white"
			},
			endpointHoverStyle = {
				fillStyle: "#216477",
				strokeStyle: "#216477"
			},
		// the definition of source endpoints (the small blue ones)
			sourceEndpoint = {
				endpoint: "Dot",
				paintStyle: {
					strokeStyle: "#7AB02C",
					fillStyle: "transparent",
					radius: 7,
					lineWidth: 3
				},
				isSource: true,
				connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
				connectorStyle: connectorPaintStyle,
				hoverPaintStyle: endpointHoverStyle,
				connectorHoverStyle: connectorHoverStyle,
				dragOptions: {},
				overlays: [
					[ "Label", {
						location: [0.5, 1.5],
						label: "Drag",
						cssClass: "endpointSourceLabel"
					} ]
				]
			},
		// the definition of target endpoints (will appear when the user drags a connection)
			targetEndpoint = {
				endpoint: "Dot",
				paintStyle: { fillStyle: "#7AB02C", radius: 11 },
				hoverPaintStyle: endpointHoverStyle,
				maxConnections: -1,
				dropOptions: { hoverClass: "hover", activeClass: "active" },
				isTarget: true,
				overlays: [
					[ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel" } ]
				]
			},
			init = function (connection) {
				connection.getOverlay("label").setLabel(connection.sourceId.substring(16) + "-" + connection.targetId.substring(16));
			};
	
		var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
			for (var i = 0; i < sourceAnchors.length; i++) {
				var sourceUUID = toId + sourceAnchors[i];
				instance.addEndpoint( toId, sourceEndpoint, {
				//instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
					anchor: sourceAnchors[i], uuid: sourceUUID
				});
			}
			for (var j = 0; j < targetAnchors.length; j++) {
				var targetUUID = toId + targetAnchors[j];
				instance.addEndpoint(toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
				//instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
			}
		};
		
		function loadGraph(inst,graph) {
			inst.batch(function () {
				var vertices = graph["vertices"];
				canvasH = document.getElementById("flowchart-demo_0").offsetHeight;
				canvasW = document.getElementById("flowchart-demo_0").offsetWidth;
				boxW = 90;
				boxH = 90;
				for(var vex of vertices) {
					var endpoints=getEndpoints(vex["endpoints"]);
					var posBox = getPositionFromRelativeCenter(vex["left"],vex["top"],canvasW,canvasH,boxW,boxH);
					var Div = $('<div>', { id: vex["name"] }, { class: 'window' }).css({ height: String(boxH)+'px', width: String(boxW)+'px', top: String(posBox["top"])+'px', left: String(posBox["left"])+'px' }).appendTo('#flowchart-demo');
					$(Div).addClass('window');
					$(Div).append(vex["context"]);
					_addEndpoints(vex["name"], endpoints["Drag"], endpoints["Drop"]);
				}
				inst.bind("connection", function (connInfo, originalEvent) {
					init(connInfo.connection);
				});
				inst.draggable(jsPlumb.getSelector(".flowchart-demo_0 .window"), { grid: [20, 20] });
				var edges = graph["edges"];
				for(var edge of edges) {
					var uuids = uuidsFromEdge(edge,graph);
					inst.connect({"uuids": uuids, "editable": true});
				}
				inst.bind("click", function (conn, originalEvent) {
					conn.toggleType("basic");
				});
				inst.bind("connectionDrag", function (connection) {
					console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
				});
				inst.bind("connectionDragStop", function (connection) {
					console.log("connection " + connection.id + " was dragged");
				})
				inst.bind("connectionMoved", function (params) {
					console.log("connection " + params.connection.id + " was moved");
				});
			});
		}
		if('instance' in myRef) {
			clearGraph();
		}
		loadGraph(instance,newArr["graph"]);
		myRef['instance'] = instance;
		jsPlumb.fire("jsPlumbDemoLoaded", instance);
	}
}