const playerControls = function(playerObject, camera, scene){
        const UP = 87;
        const DOWN = 83;
        const LEFT = 65;
        const RIGHT = 68;
        var keyMap = {}; // You could also use an array
        onkeyup = onkeydown = function (e) {
            e = e || event; // to deal with IE
            keyMap[e.keyCode] = e.type == 'keydown';
        }
        scene.addEventListener("update", ()=>{
            if (keyMap[UP]) {
                playerObject.accelerate(0, 0, -4);
            }
            if (keyMap[DOWN]) {
                playerObject.accelerate(0, 0, 4);
            }
            if (keyMap[LEFT]) {
                playerObject.accelerate(-4);
            }
            if (keyMap[RIGHT]) {
                playerObject.accelerate(4);
            }
        })
    }

    export default playerControls;