import GameObject from './game_object';
class StaticObject extends GameObject{
    constructor(scene, mesh, position, rotation, light){ 
        super(scene, mesh, position, rotation, light);
        if(mesh.mass != 0){
            throw "Mass must be zero for static object";
        }
    }
}

export default StaticObject;