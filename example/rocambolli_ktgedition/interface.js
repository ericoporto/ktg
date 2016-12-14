var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function(keyCode) {
        return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    if(event.keyCode == this.LEFT || event.keyCode == 65){
      this._pressed[this.LEFT] = true;
    } else if(event.keyCode == this.RIGHT || event.keyCode == 68){
      this._pressed[this.RIGHT] = true;
    } else if(event.keyCode == this.UP || event.keyCode == 87){
      this._pressed[this.UP] = true;
    } else if(event.keyCode == this.DOWN || event.keyCode == 83){
      this._pressed[this.DOWN] = true;
    }
  },

  onKeyup: function(event) {
    if(event.keyCode == this.LEFT || event.keyCode == 65){
      delete this._pressed[this.LEFT];
    } else if(event.keyCode == this.RIGHT || event.keyCode == 68){
      delete this._pressed[this.RIGHT];
    } else if(event.keyCode == this.UP || event.keyCode == 87){
      delete this._pressed[this.UP];
    } else if(event.keyCode == this.DOWN || event.keyCode == 83){
      delete this._pressed[this.DOWN];
    }
  }
}

var gpad = {
  left: false,
  right: false,
  jump: false,
  gpadon: false
}

function updateGamepad(){
  var gamepad = navigator.getGamepads()[0];
  var g_left = false;
  var g_right = false;
  var g_jump = false;
  if (!(typeof gamepad === "undefined")) {
    if(!(typeof gamepad.axes[0] === "undefined")){
      if(gamepad.axes[0] < -0.4){
        g_left = true;
        g_right = false;
      }
      if(gamepad.axes[0] > 0.4){
        g_left = false;
        g_right = true;
      }
    }

    if(!(typeof gamepad.buttons === "undefined")) {
      if(gamepad.buttons[0].pressed == true || gamepad.buttons[1].pressed == true ){
        g_jump = true;
      }
    }
    if(gpad.gpadon){
      if(gpad.left == false && g_left == true){
        //press left
        gpad.left=true
        Key._pressed[Key.LEFT] = true;
      } else if(gpad.left == true && g_left == false){
        //release left
        gpad.left=false
        delete Key._pressed[Key.LEFT];
      }
      if(gpad.right == false && g_right == true){
        //press right
        gpad.right=true
        Key._pressed[Key.RIGHT] = true;
      } else if(gpad.right == true && g_right == false){
        //release right
        gpad.right=false
        delete Key._pressed[Key.RIGHT];
      }
      if(gpad.jump == false && g_jump == true){
        //press jump
        gpad.jump=true
        Key._pressed[Key.UP] = true;
      } else if(gpad.jump == true && g_jump == false){
        //release jump
        gpad.jump=false
        delete Key._pressed[Key.UP];
      }
    }
    if(g_left || g_right || g_jump){
      gpad.gpadon = true;
    }
  }
}

window.addEventListener('keyup', function(event) {
  if(event.keyCode == 37 || event.keyCode == 38 ||event.keyCode == 39 ||event.keyCode == 40 ||
    event.keyCode == 65 || event.keyCode == 68 ||event.keyCode == 87 ||event.keyCode == 83) {
    event.preventDefault();
    Key.onKeyup(event);
  }
},false);

window.addEventListener('keydown', function(event) {
  if(event.keyCode == 37 || event.keyCode == 38 ||event.keyCode == 39 ||event.keyCode == 40 ||
    event.keyCode == 65 || event.keyCode == 68 ||event.keyCode == 87 ||event.keyCode == 83) {
    event.preventDefault();
    Key.onKeydown(event);
  }
},false);
