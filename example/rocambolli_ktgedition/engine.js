
ENUM_GROUND = 255;
ENUM_AIR=0;
ENUM_COIN=1;
ENUM_END=2;
ENUM_DIE=3;
ENUM_ROCAMBOLLI=4;
ENUM_GAMEEND=5;
COINS = 0;
ROCAMBOLLIS = [];
GAMED_ENDED = false;
GAMED_ENDED1 = false;

var first_action = 0;

function gameEndFinal(){
  var goodend = true;
  GAMED_ENDED = true;
  GAMED_ENDED1 = false;
  for (var i=0;i<level.length; i++){
    goodend = goodend && ROCAMBOLLIS[i]
  }
  if(goodend){
    hud_ctx.clearRect(0,0,w,h);
    hud_ctx.drawImage(img_goodend,0,0);
  } else{
    hud_ctx.clearRect(0,0,w,h);
    hud_ctx.drawImage(img_badend,0,0);
  }
}

function removeRocambolli(){
  for(var i=0; i<w; i++){
      for(var j=0; j<h; j++){
          if(walkmatrix[j][i]== ENUM_ROCAMBOLLI){
              walkmatrix[j][i]=ENUM_AIR
              ctx.clearRect(i,j,1,1)
          }
      }
  }
}

function update_coins(){
    hud_ctx.clearRect(w-48,2,46,16)
    png_font.drawText(COINS.toString(),[w-48,0])
}

function update_rocambolli(){
}

function setpixelated(canvas){
  var ctx = canvas.getContext('2d');
  ctx['imageSmoothingEnabled'] = false;       /* standard */
  ctx['mozImageSmoothingEnabled'] = false;    /* Firefox */
  ctx['oImageSmoothingEnabled'] = false;      /* Opera */
  ctx['webkitImageSmoothingEnabled'] = false; /* Safari */
  ctx['msImageSmoothingEnabled'] = false;     /* IE */
  canvas.style.imageRendering = 'optimizeSpeed';
  canvas.style.imageRendering = '-moz-crisp-edges';
  canvas.style.imageRendering = '-o-crisp-edges';
  canvas.style.imageRendering = '-webkit-optimize-contrast';
  canvas.style.imageRendering = 'optimize-contrast';
  canvas.style.imageRendering = 'crisp-edges';
  canvas.style.imageRendering = 'pixelated';
}


function reset(){
    GAMED_ENDED = false;
    GAMED_ENDED1 = false;
    bg_ctx.clearRect(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    ptx.clearRect(0,0,w,h);
    hud_ctx.clearRect(0,0,w,h);
    curr_level = 0;
    COINS = 0;
    pl.xy = [6,16];
    pl.isJump = false;
    pl.facing = 'right';
    pl.animation = 'standing';
    update_coins()
    drawLevel()
}

function game_start(){

    loadLevels()
    for (var i=0;i<level.length; i++){
      ROCAMBOLLIS.push(false)
    }


    bg_c = document.getElementById('bg_canvas')
    bg_ctx = bg_c.getContext("2d")
    setpixelated(bg_c)

    c = document.getElementById('level_canvas')
    ctx = c.getContext("2d")
    setpixelated(c);

    pc = document.getElementById('player_canvas')
    ptx = pc.getContext("2d")
    setpixelated(pc);

    hud_c = document.getElementById('hud_canvas')
    hud_ctx = hud_c.getContext("2d")
    setpixelated(hud_c);

    fullscreen.setup();

    png_font.setup( hud_ctx ,"img/unifont.png", function(){
      png_font.drawText("Rocambolli!", [0,0],'yellow',1,'purple');
      png_font.drawText("The Game",[16,16],'yellow',2,'purple');
      png_font.drawText("Arrow keys to move", [0,48],'white',1,'brown');
      png_font.drawText("Click to focus!", [16,64],'white',1,'brown');
      audio_start()
    })

    w = 160;
    h = 90;
    walkmatrix = Create2DArray(c.height);


    pl = {
        anim: {
            'right':{
                'standing':[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]],
                'walking':[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4]],
                'falling':[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6]]
            },
            'left':{
                'standing':[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]],
                'walking':[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]],
                'falling':[[0,7],[1,7],[2,7],[3,7],[4,7],[5,7]]
            }
        },
        h:5,
        w:6,
        facing: 'right',
        color: '#522',
        animation: 'standing',
        xy:[6,6],
        isJump: false,
        frameFirstJump: 0,
        isNotGrounded: function() {
            return pl.canWalk(pl.xy,[0,1],'DOWN')
        },
        grabCoin: function(xy){
            ctx.clearRect(xy[0]-1,xy[1]-1,3,3)
            for(var i=0; i<3; i++){
                for(var j=0; j<3; j++){
                    if(walkmatrix[  xy[1]-1+j][ xy[0]-1+i]== ENUM_COIN){
                        walkmatrix[  xy[1]-1+j][ xy[0]-1+i] =ENUM_AIR
                    }
                }
            }

        },
        grabRocambolli: function(xy){
            ctx.clearRect(xy[0]-1,xy[1]-1,3,3)
            for(var i=0; i<3; i++){
                for(var j=0; j<3; j++){
                    if(walkmatrix[  xy[1]-1+j][ xy[0]-1+i]== ENUM_ROCAMBOLLI){
                        walkmatrix[  xy[1]-1+j][ xy[0]-1+i] =ENUM_AIR
                    }
                }
            }

        },
        checkMatrix: function(xy,modfier){
            var foundcoin = false;
            var foundrocambolli = false;
            for(var i=0; i<pl.w; i++){
                for(var j=0; j<pl.h; j++){
                    if(walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2)+ i ] == ENUM_COIN) {
                        pl.grabCoin([xy[0] + modfier[0] - Math.floor(pl.w/2) + i,xy[1] + modfier[1] - pl.h + j])
                        foundcoin=true;
                        break;

                    } else if(walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2)+ i ] == ENUM_ROCAMBOLLI) {
                        pl.grabRocambolli([xy[0] + modfier[0] - Math.floor(pl.w/2) + i,xy[1] + modfier[1] - pl.h + j])
                        foundrocambolli=true;
                        break;

                    } else if(walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2)+ i ] == ENUM_END) {
                        walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2) + i ] = ENUM_AIR;
                        nextLevel()
                        break;
                    } else if(walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2)+ i ] == ENUM_DIE) {
                        walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2) + i ] = ENUM_AIR;
                        audio_die()
                        reset()
                        return false
                    } else if(walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2)+ i ] == ENUM_GAMEEND) {
                        walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2) + i ] = ENUM_AIR;
                        gameEndFinal()
                        break;
                    }
                }
            }
            if(walkmatrix[xy[1]+modfier[1]][xy[0]+modfier[0]] == ENUM_COIN){
                pl.grabCoin([xy[0]+modfier[0],xy[1]+modfier[1]])
                foundcoin=true;
            } else if(walkmatrix[xy[1]+modfier[1]][xy[0]+modfier[0]] == ENUM_ROCAMBOLLI){
                pl.grabRocambolli([xy[0]+modfier[0],xy[1]+modfier[1]])
                foundrocambolli=true;
            } else if(walkmatrix[xy[1]+modfier[1]][xy[0]+modfier[0]] == ENUM_END){
                walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2) + i ] = ENUM_AIR;
                nextLevel()
            } else if(walkmatrix[xy[1]+modfier[1]][xy[0]+modfier[0]] == ENUM_DIE){
                walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2) + i ] = ENUM_AIR;
                audio_die()
                reset()
                return false
            } else if(walkmatrix[xy[1]+modfier[1]][xy[0]+modfier[0]] == ENUM_GAMEEND){
                walkmatrix[  xy[1] + modfier[1] - pl.h + j ][ xy[0] + modfier[0] - Math.floor(pl.w/2) + i ] = ENUM_AIR;
                gameEndFinal()
            }

            if(foundcoin){
                COINS++;
                update_coins()
                audio_coin()
            }

            if(foundrocambolli){
                ROCAMBOLLIS[curr_level]=true;
                update_rocambolli()
                audio_rocambolli()
            }

            return true
        },
        canWalk: function(xy,modfier,direction){
            if(pl.checkMatrix(xy,modfier)){
                if(direction=='LEFT' || direction=='RIGHT'){
                  if(walkmatrix[xy[1]+modfier[1]  ][xy[0]+modfier[0]]!=ENUM_AIR &&
                     walkmatrix[xy[1]+modfier[1]-1][xy[0]+modfier[0]]==ENUM_AIR &&
                     walkmatrix[xy[1]+modfier[1]-2][xy[0]+modfier[0]]==ENUM_AIR &&
                     walkmatrix[xy[1]+modfier[1]-3][xy[0]+modfier[0]]==ENUM_AIR ){
                       pl.xy[1]=pl.xy[1]-2;
                     }
                }

                return walkmatrix[xy[1]+modfier[1]][xy[0]+modfier[0]] == ENUM_AIR;
           }  else
                return false
        },
        update: function() {
          if(GAMED_ENDED){
            if (ktg.isPressed(ktg.key.UP) ||ktg.isPressed(ktg.key.RIGHT)||ktg.isPressed(ktg.key.LEFT)|| ktg.isPressed(ktg.key.BUTTONA)|| ktg.isPressed(ktg.key.BUTTONB)){
              png_font.drawText('congratulations!',[4,24],'purple',1,'yellow')
              if(GAMED_ENDED==true && GAMED_ENDED1==false){
                setTimeout(function(){
                  reset()
                },4000)
              }
              GAMED_ENDED1=true;
            }
          }  else {
            gravity=1;
            var nothing = true;
            if (ktg.isPressed(ktg.key.UP) || ktg.isPressed(ktg.key.BUTTONA)|| ktg.isPressed(ktg.key.BUTTONB)){
              if(first_action ==0)first_action=1;
              nothing = false;
              pl.jump();
            }

            if (ktg.isPressed(ktg.key.RIGHT)){
              if(first_action ==0)first_action=1;
              nothing = false;
              pl.facing = 'right';
              pl.animation = 'walking';
              if(pl.canWalk(pl.xy,[1,0],'RIGHT'))
                  pl.xy[0]+=1;
            }

            if (ktg.isPressed(ktg.key.LEFT)){

              if(first_action ==0)first_action=1;
              nothing = false;
              pl.facing = 'left';
              pl.animation = 'walking';
              if(pl.canWalk(pl.xy,[-1,0],'LEFT'))
                  pl.xy[0]-=1;
            }

            if(pl.isJump){
                nothing = false;
                if(anim_frame- pl.frameFirstJump<4){
                  pl.xy[1]=pl.xy[1]-1;
                } else if (ktg.isPressed(ktg.key.UP)|| ktg.isPressed(ktg.key.BUTTONA)|| ktg.isPressed(ktg.key.BUTTONB)){
                  pl.xy[1]=pl.xy[1]-1;
                }
                if(anim_frame- pl.frameFirstJump>8){
                  pl.isJump=false;
                }
            } else {
              if (pl.isNotGrounded()){
                nothing = false;
                pl.xy[1]=pl.xy[1]+gravity;
                pl.animation = 'falling';
              } else {
                pl.isJump=false;

              }

            }

            if(nothing){
              pl.animation = 'standing';

            }
          }
        },
        jump: function(){
          if(!pl.isJump && !pl.isNotGrounded()){
            audio_jump()
            pl.frameFirstJump = anim_frame
            pl.isJump=true
          }
        }
    }


    //for(var ix=0;ix<w; ix++){
    //    for(var iy=0;iy<h; iy++){
    //        ctx.draw

    //    }
    //}

    px_id = ctx.createImageData(1,1); // only do this once per page
    px_d  = px_id.data;    // only do this once per page
    increr = 0;

    resize();

    ktg.setup(false, window.mobilecheck());
    reset();
    draw();




}

function drawLevel(){
    ctx.clearRect(0,0,w,h);
    ctx.drawImage(level[curr_level],0,0);
    analyzeimg()
    if(ROCAMBOLLIS[curr_level]){
      removeRocambolli()
    }

    bg_ctx.clearRect(0,0,w,h);
    for(var i=level.length-1; i>curr_level; i--){
        bg_ctx.drawImage(level[i],0,0);
        bg_ctx.drawImage(img_fog,0,0);
    }
    bg_ctx.drawImage(img_fog,0,0);
}

function nextLevel(){
    audio_nextlevel()
    curr_level++;
    drawLevel();
}

function Create2DArray(rows) {
    var arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = [];
    }

    return arr;
}



function analyzeimg(){

    walkdata = ctx.getImageData(0, 0, c.width, c.height);
    for (var j=0; j<walkdata.height; j++) {
        for (var i=0; i<walkdata.width; i++) {
            var index=(j*4)*walkdata.width+(i*4);
            var red =walkdata.data[index];
            var green =walkdata.data[index+1];
            var blue =walkdata.data[index+2];
            var alpha =walkdata.data[index+3];
            var mycolor = color.normalcolor([red,green,blue])
            if(alpha==0){
                walkmatrix[j][i] = ENUM_AIR;
            } else {
                walkmatrix[j][i] = ENUM_GROUND;
            }
            if(mycolor == 'yellow'){
                walkmatrix[j][i] = ENUM_COIN;
            }
            if(mycolor == 'blue'){
                walkmatrix[j][i] = ENUM_END;
            }
            if(mycolor == 'fuchsia'){
                walkmatrix[j][i] = ENUM_ROCAMBOLLI;
            }
            if(mycolor == 'teal'){
                walkmatrix[j][i] = ENUM_GAMEEND;
            }
            if(mycolor == 'red'){
                walkmatrix[j][i] = ENUM_DIE;
            }

        }
    }

}

function resize(){
    function correctCanvas(canvas){
        canvas.style.height = Math.floor(window.innerHeight*0.8) + 'px';
        canvas.style.width = Math.floor(window.innerWidth*0.8) + 'px';
        canvas.style.position = 'absolute';
        canvas.style.top= 0;
        canvas.style.bottom= 0;
        canvas.style.left= 0;
        canvas.style.right= 0;
        canvas.style.margin= 'auto';
        setpixelated(canvas)
    }

    correctCanvas(bg_c);
    correctCanvas(c);
    correctCanvas(pc);
    correctCanvas(hud_c);
    ktg.resize();
}

function drawPixel(xy,r,g,b,a){
    px_d[0]   = r;
    px_d[1]   = g;
    px_d[2]   = b;
    px_d[3]   = a;
    ctx.putImageData( px_id, xy[0], xy[1]);
}

function rotate(cxy, xy, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (xy[0] - cxy[0])) + (sin * (xy[1] - cxy[1])) + cxy[0],
        ny = (cos * (xy[1] - cxy[1])) - (sin * (xy[0] - cxy[0])) + cxy[1];
    return [nx, ny];
}

function drawPlayer(){
  //  var oc = 2;
  //  ptx.clearRect(pl.xy[0]-oc-Math.floor(pl.w/2),
  //               pl.xy[1]-oc-Math.floor(pl.h)+1,
  //               pl.w+oc*2,pl.h+oc*2);
  //  ptx.fillStyle = pl.color;
  //  ptx.fillRect(pl.xy[0]-Math.floor(pl.w/2),
  //               pl.xy[1]-Math.floor(pl.h)+1,
   //              pl.w,pl.h)

   ptx.clearRect(pl.xy[0]-6,
                 pl.xy[1]-10,
                 14,14);
   var pl_frame = Math.floor(anim_frame/4)%6
   ptx.drawImage(img_pl,
        pl.anim[pl.facing][pl.animation][pl_frame][0]*10, pl.anim[pl.facing][pl.animation][pl_frame][1]*10,
        10,10,
        pl.xy[0]-4,pl.xy[1]-9,
        10,10)
}

anim_frame = 0;

function drawLoopStuff(angl){
    drawPlayer();
    if(first_action==1){
        hud_ctx.clearRect(0,0,w,h);
        first_action=2;
    }
    anim_frame++;
}

window.addEventListener('resize', resize, false);
window.addEventListener('orientationchange', resize, false);

function draw(){
    increr++
    angler = Math.floor(3*Math.sin(2*Math.PI*(increr%80)/80))
    pl.update()
    drawLoopStuff()
    ktg.updateGamepad()


    window.requestAnimationFrame(draw);
}
