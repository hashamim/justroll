import StaticObject from "./game_objects/static_object";
import DynamicObject from "./game_objects/dynamic_object";

export const FLOOR_GRAV_CONST = 10.0;
export const FLOOR_ELASTIC_CONST = 0.2;
export const addVectors = function(v1, v2){
    return new THREE.Vector3(
        v1.x + v2.x,
        v1.y + v2.y,
        v1.z + v2.z,
    )
}

export const generateGroundMaterial = function(paramColor, friction = FLOOR_GRAV_CONST){
    let color = 0xe5e5e5;
    if(paramColor){
        color = paramColor;
    }
    return Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ color }),
        friction,
        FLOOR_ELASTIC_CONST,
    );
}

export const generateGroundPane = function(scene, dimensions, position, rotation){
    return new StaticObject(
        scene,
        new Physijs.BoxMesh(
            new THREE.CubeGeometry(...dimensions),
            generateGroundMaterial(),
            0
        ),
        position,
        rotation,
    );
}

export const generateDynamicCube = function(scene, dimensions, position, rotation){
    return new DynamicObject(
        scene,
        new Physijs.BoxMesh(
            new THREE.CubeGeometry(...dimensions),
            generateGroundMaterial(undefined, 1.0)
        ),
        position,
        rotation,
    );
}