import StaticObject from "./static_object";
import { addVectors, generateGroundMaterial, generateGroundPane } from "../render_utils";
export const addGoalHole = function(scene, position) {
    const longBox = new THREE.CubeGeometry( 5, 1, 20 );
    const shortBox = new THREE.CubeGeometry( 10, 1, 5);
    
    let retArr = new Array(4);
    retArr[0] = new StaticObject(
        scene,
        new Physijs.BoxMesh(
            longBox,
            generateGroundMaterial(0x00ff00),
            0
        ),
        addVectors(position, new THREE.Vector3(-7.5,0,0))
    );
    retArr[1] = new StaticObject(
        scene,
        new Physijs.BoxMesh(
            longBox,
            generateGroundMaterial(0x00ff00),
            0
        ),
        addVectors(position, new THREE.Vector3(7.5, 0, 0))
    );
    retArr[2] = new StaticObject(
        scene,
        new Physijs.BoxMesh(
            shortBox,
            generateGroundMaterial(0x00ff00),
            0
        ),
        addVectors(position, new THREE.Vector3(0, 0, -7.5))
    );
    retArr[3] = new StaticObject(
        scene,
        new Physijs.BoxMesh(
            shortBox,
            generateGroundMaterial(0x00ff00),
            0
        ),
        addVectors(position, new THREE.Vector3(0, 0, 7.5))
    );
    const goalPlane = generateGroundPane(
        scene,
        [10,1,10],
        addVectors(position, new THREE.Vector3(0,-6,0))
    );
    return goalPlane;
}

export const addSpiralStaircase = function(scene, position){
    //parameters
    const innerRadius = 10;
    const outerRadius = 15;
    const height = 24;
    const numSteps = 24; //15 degrees each

    // computed parameters
    const minsegmentWidth = outerRadius * 2 * 3 / numSteps;
    const steptHeightOffset = height / numSteps;
    const stepRadialOffset = 2 * Math.PI / numSteps;
    const segmentHeight = 0.5;
    const radialWidth = outerRadius - innerRadius;
    const middleRadius = (outerRadius + innerRadius) / 2;

    const top = generateGroundPane(
        scene,
        [radialWidth, segmentHeight, radialWidth],
        addVectors(position, new THREE.Vector3(middleRadius, 0, 0))
    );

    const stepsArray = new Array(numSteps);
    for(let i = 0; i < stepsArray.length; i++){
        const angle = (i + 1) * 2 * Math.PI / numSteps;
        stepsArray[i] = generateGroundPane(
            scene,
            [radialWidth, segmentHeight, minsegmentWidth],
            addVectors(position, new THREE.Vector3(middleRadius, - steptHeightOffset * (i + 1), 0).applyAxisAngle(new THREE.Vector3(0,1,0), angle)),
            new THREE.Vector3(0,angle,0)
        )

    }
    return stepsArray;
}

//needs work
export const addRamp = function(scene, dimensions, position, rotation){
    return generateGroundPane(
        scene,
        dimensions,
        position,
        rotation,
    )
};

