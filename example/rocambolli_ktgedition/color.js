function colors(){
    //private
    var colors = { 'white'  : ['#FFFFFF', [4,4,4]],
                   'silver' : ['#C0C0C0', [3,3,3]],
                   'gray'   : ['#808080', [2,2,2]],
                   'black'  : ['#000000', [0,0,0]],
                   'red'    : ['#FF0000', [4,0,0]],
                   'maroon' : ['#800000', [2,0,0]],
                   'yellow' : ['#FFFF00', [4,4,0]],
                   'olive'  : ['#808000', [2,2,0]],
                   'lime'   : ['#00FF00', [0,4,0]],
                   'green'  : ['#008000', [0,2,0]],
                   'aqua'   : ['#00FFFF', [0,4,4]],
                   'teal'   : ['#008080', [0,2,2]],
                   'blue'   : ['#0000FF', [0,0,4]],
                   'navy'   : ['#000080', [0,0,2]],
                   'fuchsia': ['#FF00FF', [4,0,4]],
                   'purple' : ['#800080', [2,0,2]] }

    //public
    this.normalcolor = function(argb){
        var ncolor = [Math.round(argb[0]/64), Math.round(argb[1]/64), Math.round(argb[2]/64)]
        for (var i=0; i<3; i++){
            if(ncolor[i]==4){
                for (var k=0; k<3; k++){
                    if(ncolor[k]==1){
                        ncolor[k]=0;
                    }
                }
            }
        }

        for (var color in colors){
            if(colors[color][1][0]==ncolor[0] &&
               colors[color][1][1]==ncolor[1] &&
               colors[color][1][2]==ncolor[2] ){
                return color
            }
        }
    }
}
color = new colors();

