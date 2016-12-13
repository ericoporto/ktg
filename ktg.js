//ktg.js
// MIT License
// 
// Copyright (c) 2016 Érico Vieira Porto 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
ktg = {
  _pressed: {},
  _defaultmap: {
    k: { 
      LEFT: [37, 65],           //arrow left, key a
      UP: [38, 87],             //arrow up, key w
      RIGHT: [39, 68],          //arrow right, key d
      DOWN: [40, 83],           //arrow down, key s
      BUTTONA: [73, 13, 32],    //key i, enter, space
      BUTTONB: [74,17],         //key j, ctrl
      BUTTONX: [79, 220, 191],  //key o, key \, key ;
      BUTTONY: [75, 16],        //key k, shift
    },
    g: {
      LEFT: ['axes', 0, '<'],   //left pad, to left
      UP: ['axes', 1, '<'],     //left pad, to up
      RIGHT: ['axes', 0, '>'],  //left pad, to right
      DOWN: ['axes', 1, '>'],   //left pad, to down
      BUTTONA: ['buttons', 0],  //button 'A'
      BUTTONB: ['buttons', 1],  //button 'B'
      BUTTONX: ['buttons', 2],  //button 'X'
      BUTTONY: ['buttons', 3],  //button 'Y'
    }
  }
  keyCodeToReadable: function(keyCode){
    readableKeyMap = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        19: 'pause/break',
        20: 'caps lock',
        27: 'escape',
        32: 'space',
        33: 'page up',
        34: 'page down',
        35: 'end',
        36: 'home',
        37: 'left arrow',
        38: 'up arrow',
        39: 'right arrow',
        40: 'down arrow',
        45: 'insert',
        46: 'delete',
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        65: 'a',
        66: 'b',
        67: 'c',
        68: 'd',
        69: 'e',
        70: 'f',
        71: 'g',
        72: 'h',
        73: 'i',
        74: 'j',
        75: 'k',
        76: 'l',
        77: 'm',
        78: 'n',
        79: 'o',
        80: 'p',
        81: 'q',
        82: 'r',
        83: 's',
        84: 't',
        85: 'u',
        86: 'v',
        87: 'w',
        88: 'x',
        89: 'y',
        90: 'z',
        91: 'left super key',
        92: 'right super key',
        93: 'select key',
        96: 'numpad 0',
        97: 'numpad 1',
        98: 'numpad 2',
        99: 'numpad 3',
        100: 'numpad 4',
        101: 'numpad 5',
        102: 'numpad 6',
        103: 'numpad 7',
        104: 'numpad 8',
        105: 'numpad 9',
        106: 'multiply',
        107: 'add',
        109: 'subtract',
        110: 'decimal point',
        111: 'divide',
        112: 'f1',
        113: 'f2',
        114: 'f3',
        115: 'f4',
        116: 'f5',
        117: 'f6',
        118: 'f7',
        119: 'f8',
        120: 'f9',
        121: 'f10',
        122: 'f11',
        123: 'f12',
        144: 'num lock',
        145: 'scroll lock',
        186: 'semi-colon',
        187: 'equal sign',
        188: 'comma',
        189: 'dash',
        190: 'period',
        191: 'forward slash',
        192: 'grave accent',
        219: 'open bracket',
        220: 'back slash',
        221: 'close braket',
        222: 'single quote'   };
    if( keyCode in readableKeyMap){
      return readableKeyMap[keyCode];
    } else {
      return keyCode.toString()
    }
  
  charToKeyCode: function(char) {
    return char.charCodeAt(0)
  },
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  map: {},
  
}
