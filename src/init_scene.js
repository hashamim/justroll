import GameObject from "./game_objects/game_object"
import DynamicObject from "./game_objects/dynamic_object"
import playerControls from "./controls";
import { MeshBasicMaterial } from "three";
import { addGoalHole, addSpiralStaircase } from "./game_objects/game_objects";
import { generateGroundPane } from "./render_utils";

var initScene = function () {
    //renderer
    var effect, renderer, scene, camera, box;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect = new THREE.OutlineEffect(renderer, { defaultThickness: 0.005 });

    // renderer.setClearColor('#e5e5e5')
    document.getElementById('content').appendChild(renderer.domElement);

    //stats
    const render_stats = new Stats();
    render_stats.domElement.style.position = 'absolute';
    render_stats.domElement.style.top = '0px';
    render_stats.domElement.style.zIndex = 100;
    document.getElementById('content').appendChild(render_stats.domElement);

    const physics_stats = new Stats();
    physics_stats.domElement.style.position = 'absolute';
    physics_stats.domElement.style.top = '50px';
    physics_stats.domElement.style.zIndex = 100;
    document.getElementById('content').appendChild(physics_stats.domElement);

    //scene
    var texture = new THREE.TextureLoader().load("assets/bg_grad.png");
    scene = new Physijs.Scene;
    var gravForce = new THREE.Vector3(0, -50, 0);
    scene.setGravity(gravForce);
    scene.background = texture;
    scene.addEventListener(
        'update',
        function () {
            scene.simulate(undefined, 2);
            physics_stats.update();
        }
    );

    //camera
    camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(0, 60, 60);
    camera.lookAt(scene.position);
    scene.add(camera);

    //light
    var light;
    light = new THREE.HemisphereLight(0xffffff, 0x00faff, 0.8);
    scene.add(light);

    //player light
    const playerLight = new THREE.PointLight(0xffffff, 1.0, 0, 100.0);
    //player box
    var playerMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            polygonOffset: true,
            polygonOffsetFactor: 1, // positive value pushes polygon further away
            polygonOffsetUnits: 1
        }),
        0.8,
        0.4,
    );
    var playerMesh = new Physijs.SphereMesh(
        new THREE.SphereGeometry(5, 10, 10),
        playerMaterial,
    );

    const playerSphere = new DynamicObject(scene, playerMesh, { x: 1, y: 0, z: 0 }, null, playerLight);


    playerControls(playerSphere, camera, scene);
    // Ground
    const groundMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({
            color: 0xe5e5e5, //0x00212d
            polygonOffset: true,
            polygonOffsetFactor: 1, // positive value pushes polygon further away
            polygonOffsetUnits: 1
        }),
        10,
        0.2,
    )
    const ground = new Physijs.BoxMesh(
        new THREE.CubeGeometry(50, 1, 50),
        groundMaterial,
        0
    )
    ground.position.y = -20;
    scene.add(ground);

    const goalPlane = addGoalHole(scene, new THREE.Vector3(0, -20, -35));
    goalPlane.mesh.addEventListener('collision', () => {
        cancelAnimationFrame(window.animationId);
        scene = null;
        camera = null;
        renderer = null;
        document.getElementById("win-modal").style.display = "flex";
    })

    addSpiralStaircase(scene, new THREE.Vector3(5, -20, -45));
    generateGroundPane(scene, [5, 1, 30], new THREE.Vector3(-13, -27, -39), new THREE.Vector3(Math.PI * 5 / 6, 0, 0));
    window.ground = ground;
    window.playerSphere = playerSphere;

    window.scene = scene;
    const render = function () {

            scene.simulate(); // run physics
        //update camera position
        camera.position.x = playerSphere.mesh.position.x;
        camera.position.y = playerSphere.mesh.position.y + 60;
        camera.position.z = playerSphere.mesh.position.z + 60;
        renderer.render(scene, camera);
        // effect.render(scene, camera); // render the scene
        window.animationId = requestAnimationFrame(render);
        render_stats.update(); //update render stats
        if (playerSphere.position().y <= -150){
            cancelAnimationFrame(window.animationId);
            scene = null;
            camera = null;
            renderer = null;
            document.getElementById("lose-modal").style.display = "flex";
        }
    };
    document.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
            case 73:
                camera.rotation.x += 0.1;
                return;
            case 75:
                camera.rotation.x -= 0.1;
        }
    })
    requestAnimationFrame(render);
};
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
export default initScene;