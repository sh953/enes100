var elementWidth = 100;
var elementHeight = 100;

var componentType = "function";
var arrowType = "dataArrow";

var graph = {};

function addNode(nodeId, name) {
  entry = {};
  entry["data"] = [];
  entry["event"] = [];
  entry["name"] = name;
  if (componentType == "function") {
    entry["type"] = "function";
  } else {
    entry["type"] = "component";
    entry["componentType"] = componentType;
  }

  graph[nodeId] = entry;
  console.log(graph);
}

function addEdge(nodeStart, nodeEnd) {
  var list;
  if (arrowType == "dataArrow") {
    list = graph[nodeStart]["data"];
  } else {
    list = graph[nodeStart]["event"];
  }

  list.push(nodeEnd);
}

function removeNode(nodeId) {
  for (var id in graph) {
    entry = graph[id];
    for (var i = entry["data"].length; i >= 0; i--) {
      if (entry["data"][i] == nodeId) {
        entry["data"].splice(i, 1);
      }
    }

    for (var i = entry["event"].length; i >= 0; i--) {
      if (entry["event"][i] == nodeId) {
        entry["event"].splice(i, 1);
      }
    }
  }
  delete graph[nodeId];

  console.log(graph); 
}

function clearAllNodes() {
  graph = {};
  $('#container').empty();
}

function resetPlumbDefaults() {
  var arrowColor = "rgba(128, 0, 128, 0.5)";
  if (arrowType == "dataArrow") {
    arrowColor = "rgba(128, 0, 128, 0.5)";
  } else if (arrowType = "eventArrow") {
    arrowColor = "rgba(0, 102, 0, 0.5)";
  }

  jsPlumb.ready(function() {
    jsPlumb.importDefaults({
      PaintStyle : {
        lineWidth:7,
        strokeStyle: arrowColor
      } 
    });
  });
}

// Set up onclick from buttons to change variables
$(document).ready(function() {
  $('#functionComponent').click(function() {
    componentType = 'function';
    resetPlumbDefaults();
    console.log(componentType);
  });

  $('#textComponent').click(function() {
    componentType = 'text';
    resetPlumbDefaults();
    console.log(componentType);
  });

  $('#buttonComponent').click(function() {
    componentType = 'button';
    resetPlumbDefaults();
    console.log(componentType);
  });

  $('#dataArrow').click(function() {
    arrowType = 'dataArrow';
    resetPlumbDefaults();
    console.log(arrowType);
  });

  $('#eventArrow').click(function() {
    arrowType = 'eventArrow';
    resetPlumbDefaults();
    console.log(arrowType);
  });

  $('#resetButton').click(function() {
    clearAllNodes();
  });
});

jsPlumb.ready(function() {
  jsPlumb.setContainer($('#container'));
  var i = 0;
  resetPlumbDefaults();
  jsPlumb.Defaults.Overlays = [
    [ "Arrow", { 
        location:1,
        id:"arrow",
        length:14,
        foldback:0.8
    } ]
  ];

  jsPlumb.bind("connection", function(info, originalEvent) {
    console.log(info.sourceId);
    var sourceId = $("#" + info.sourceId).parent().attr('id');
    var targetId = $("#" + info.targetId).parent().attr('id');
    console.log(sourceId);
    addEdge(sourceId, targetId);   
  });

  // Figure out how to add connectors

  $('#container').dblclick(function(e) {
      var nodeId = componentType + i;
      var name = $("#componentNameBox").val() 
      if (name == null || name.length == 0) {
        name = nodeId;
      }

      var newState = $('<div>').attr('id', nodeId).addClass('item');
    
      var title = $('<div>').addClass('title').text(name);
      var connectId = 'connectstate' + i;
      var connect = $('<div>').attr('id', connectId).addClass('connect');
      
      newState.css({
        'top': e.pageY,
        'left': e.pageX
      });
      
      newState.append(title);
      newState.append(connect);
      
      $('#container').append(newState);
      
      jsPlumb.makeTarget(connect, {
        anchor: 'Continuous',
        connector: 'StateMachine'
      });
      
      jsPlumb.makeSource(connect, {
        parent: newState,
        connector: 'StateMachine',
        anchor: 'Continuous',
      });   
      
      jsPlumb.draggable(newState, {
        containment: 'parent'
      });

      newState.dblclick(function(e) {
        jsPlumb.detachAllConnections($(connect));
        $(this).remove();
        e.stopPropagation();
        removeNode(nodeId);
      });   
      
      addNode(nodeId, name);
      i++;    
      console.log(jsPlumb.getConnections());
  });
});