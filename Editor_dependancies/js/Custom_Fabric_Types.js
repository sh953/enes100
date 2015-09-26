var Entry = fabric.util.createClass(fabric.Rect, {

  type: 'Entry',

  initialize: function(options) {
    options || (options = { });

    this.callSuper('initialize', options);
    this.set('placeholder', options.placeholder || '');
	this.set('fontColor', options.fontColor || '#FFFFFF');
	this.set('fontFamily', options.fontFamily || 'Helvetica');
	this.set('fontSize', options.fontSize || 20);
	this.set('autoSetWidth', options.fontSize || false);
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      placeholder: this.get('placeholder'),
	  fontColor: this.get('fontColor'),
	  fontFamily: this.get('fontFamily'),
	  fontSize: this.get('fontSize'),
	  autoSetWidth: this.get('autoSetWidth')
    });
  },

  _render: function(ctx) {
    var px_length = this.placeholder.visualLength(this.fontSize);
    if(this.autoSetWidth) {
	  this.width = (4.5)*px_length;
	}
    this.callSuper('_render', ctx);
    ctx.font = this.fontSize+'px '+this.fontFamily;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(this.placeholder, -this.width/2+px_length/2, -this.height/2+this.fontSize);
  }
});

var Button = fabric.util.createClass(fabric.Rect, {

  type: 'Button',

  initialize: function(options) {
    options || (options = { });

    this.callSuper('initialize', options);
    this.set('text', options.text || '');
	this.set('fontColor', options.fontColor || '#FFFFFF');
	this.set('fontFamily', options.fontFamily || 'Helvetica');
	this.set('fontSize', options.fontSize || 20);
	this.set('autoSetWidth', options.fontSize || true);
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      text: this.get('text'),
	  fontColor: this.get('fontColor'),
	  fontFamily: this.get('fontFamily'),
	  fontSize: this.get('fontSize'),
	  autoSetWidth: this.get('autoSetWidth')
    });
  },

  _render: function(ctx) {
    var px_length = this.text.visualLength(this.fontSize);
    if(this.autoSetWidth) {
	  this.width = (5.25)*px_length;
	}
    this.callSuper('_render', ctx);
    ctx.font = this.fontSize+'px '+this.fontFamily;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(this.text, -this.width/2+px_length, -this.height/2+this.fontSize);
  }
});