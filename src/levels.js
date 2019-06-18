import { addGoalHole, addSpiralStaircase } from './game_objects/game_objects';
import { generateGroundPane } from './render_utils';
const levels = [];
levels.push(
    function(scene, cb){
        const goalPlane = addGoalHole(scene, new THREE.Vector3(0, -45, -65));
        goalPlane.mesh.addEventListener('collision', cb)

        addSpiralStaircase(scene, new THREE.Vector3(-20, -20, -55));
        generateGroundPane(scene, [8, 1, 25], new THREE.Vector3(1, -20, -40));
    }
)

export default levels;