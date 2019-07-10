const playerControls = function(playerObject, camera, scene){
        const UP = 38;
        const W = 87;
        const DOWN = 40;
        const S = 83;
        const LEFT = 37;
        const A = 65;
        const RIGHT = 39;
        const D = 68;
        var keyMap = {};
        var isTouching;
        onkeyup = onkeydown = function (e) {
            e = e || event; // to deal with IE
            keyMap[e.keyCode] = e.type == 'keydown';
        }
        scene.addEventListener("update", ()=>{
            if (keyMap[UP] || keyMap[W]) {
                playerObject.angularAccelerate(-2, 0, 0);
            }
            if (keyMap[DOWN] || keyMap[S]) {
                playerObject.angularAccelerate(2, 0, 0);
            }
            if (keyMap[LEFT] || keyMap[A]) {
                playerObject.angularAccelerate(0,0,2);
            }
            if (keyMap[RIGHT] || keyMap[D]) {
                playerObject.angularAccelerate(0,0,-2);
            }
        });

    }

    export default playerControls;