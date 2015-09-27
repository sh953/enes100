var elementWidth = 100;
var elementHeight = 100;

jsPlumb.ready(function() {
  jsPlumb.setContainer($('#container'));

  var i = 0;

  jsPlumb.Defaults.Overlays = [
    [ "Arrow", { 
        location:1,
        id:"arrow",
        length:14,
        foldback:0.8
    } ]
  ];

  $('#container').dblclick(function(e) {
      var newState = $('<div>').attr('id', 'state' + i).addClass('item');
    
      var title = $('<div>').addClass('title').text('State ' + i);
      var connect = $('<div>').addClass('connect');
      
      newState.css({
        'top': e.pageY,
        'left': e.pageX
      });
      
      newState.append(title);
      newState.append(connect);
      
      $('#container').append(newState);
      
      jsPlumb.makeTarget(newState, {
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
        jsPlumb.detachAllConnections($(this));
        $(this).remove();
        e.stopPropagation();
      });   
      
      i++;    
  });

});