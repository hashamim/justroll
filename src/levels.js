import { addGoalHole, addSpiralStaircase } from './game_objects/game_objects';
import { DynamicObject } from './game_objects/dynamic_object';
import { generateGroundPane, generateGroundMaterial, generateDynamicCube } from './render_utils';
function levelLoader(){
const levels = [];
    levels.push(
        function(scene, cb){
            const goalPlane = addGoalHole(scene, new THREE.Vector3(0, -45, -65));
            goalPlane.mesh.addEventListener('collision', (otherObject, vel, rot, contactNormal)=>{
                if(otherObject === window.playerSphere.mesh){
                    debugger
                    console.log(contactNormal);
                    goalPlane.mesh.removeEventListener('collision', )
                    cb();
                }
            });

            addSpiralStaircase(scene, new THREE.Vector3(-20, -20, -55));
            generateGroundPane(scene, [8, 1, 25], new THREE.Vector3(1, -20, -40));
        }
    )
    levels.push(
        function(scene,cb){
            const goalPlane = addGoalHole(scene, new THREE.Vector3(0,-20,-35));
            goalPlane.mesh.addEventListener('collision', (otherObject, vel, rot, contactNormal) => {
                if (otherObject === window.playerSphere.mesh) {
                    debugger
                    console.log(contactNormal);
                    goalPlane.mesh.removeEventListener('collision')
                    cb();
                }
            });
                        
            const material = generateGroundMaterial(0xe5e5e5);
            const obj = generateDynamicCube(scene, [4,10,4], new THREE.Vector3(0,-10,-23));
            const obj1 = generateDynamicCube(scene, [5,10,5], new THREE.Vector3(7,-10,-24));
            const obj2 = generateDynamicCube(scene, [5,15,5], new THREE.Vector3(-7,-10,-25));
            const obj3 = generateDynamicCube(scene, [8,15,8], new THREE.Vector3(0,-10,9));

        }
    )
    levels.push(
        function (scene, cb) {
            const goalPlane = addGoalHole(scene, new THREE.Vector3(0, -20, -55));
            goalPlane.mesh.addEventListener('collision', (otherObject, vel, rot, contactNormal) => {
                if (otherObject === window.playerSphere.mesh) {
                    debugger
                    console.log(contactNormal);
                    goalPlane.mesh.removeEventListener('collision')
                    cb();
                }
            });

            const material = generateGroundMaterial(0xe5e5e5);
            const obj2 = generateDynamicCube(scene, [5, 25, 2], new THREE.Vector3(0, -5, -22));

        }
    )
    return levels;
}

export default levelLoader;