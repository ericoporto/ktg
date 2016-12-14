# ktg
kgt.js - Keyboard Touch and Gamepad library to ease Javascript Game Input Handling

![](buttons.png)

Before using, you need to declare at some place:

    ktg.setup()

Whenever a key is pressed ktg_KeyDown event is emitted, and when it's released,
ktg_KeyUp is emitted. You can use event listeners on the window element.

    window.addEventListener('ktg_KeyUp',  writeKeyUp,false);
    window.addEventListener('ktg_KeyDown', writeKeyDown,false);

The key is passed as string under `event.detail` .

Alternatively you can monitor the keys under your gameloop using `isDown`.

    if( ktg.isDown(ktg.key.UP) ) {
      ...
    }

The possible keys by default are:

    ktg.key.LEFT
    ktg.key.UP
    ktg.key.RIGHT
    ktg.key.DOWN
    ktg.key.BUTTONA
    ktg.key.BUTTONB
    ktg.key.BUTTONX
    ktg.key.BUTTONY
  }

# Author

Made by Érico Vieira Porto


# License

Distributed under MIT license. See [`LICENSE`](LICENSE) for more information.
