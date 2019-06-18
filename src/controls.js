const playerControls = function(playerObject, camera, scene){
        const UP = 87;
        const DOWN = 83;
        const LEFT = 65;
        const RIGHT = 68;
        var keyMap = {};
        var isTouching;
        onkeyup = onkeydown = function (e) {
            e = e || event; // to deal with IE
            keyMap[e.keyCode] = e.type == 'keydown';
        }
        scene.addEventListener("update", ()=>{
            if (keyMap[UP]) {
                playerObject.angularAccelerate(-2, 0, 0);
            }
            if (keyMap[DOWN]) {
                playerObject.angularAccelerate(2, 0, 0);
            }
            if (keyMap[LEFT]) {
                playerObject.angularAccelerate(0,0,2);
            }
            if (keyMap[RIGHT]) {
                playerObject.angularAccelerate(0,0,-2);
            }
        });

    }

    export default playerControls;