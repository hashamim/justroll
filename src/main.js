import GameObject from "./game_objects/game_object"
import DynamicObject from "./game_objects/dynamic_object"
import playerControls from "./controls";
Physijs.scripts.worker = "js/physijs_worker.js";
Physijs.scripts.mmp = "js/ammo.js";

var render, effect, renderer, scene, camera, box, render_stats;

var initScene = function(){
    //renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect = new THREE.OutlineEffect(renderer,{defaultThickness: 0.005});

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
    var gravForce = new THREE.Vector3(0,-30,0);
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
    camera.position.set(0, 30, 60);
    camera.lookAt(scene.position);
    scene.add(camera);

    //light
    var light;
    light = new THREE.HemisphereLight(0xadd9ff, 0x00faff, 0.8);
    scene.add(light);

    //player light
    const playerLight = new THREE.PointLight(0xffffff, 1.0, 100, 2.0);
    playerLight.position.set(0, -13, 0);
    scene.add(playerLight);
    //player box
    const box2 = new DynamicObject(scene,'sphere', [5, 10, 10], { x: 1, y: -10, z: 0 }, 0.8, 0.4,undefined, playerLight)
    window.box = box2;
    playerControls(box2, camera, scene);
    // Ground
    const groundMaterial = Physijs.createMaterial(
        new THREE.MeshLambertMaterial({ color: 0x00212d}),
        10.0,
        0.2,
    )
    const ground = new Physijs.BoxMesh(
        new THREE.CubeGeometry(100,1,100),
        groundMaterial,
        0
    )
    ground.position.y = -20;
    scene.add(ground);


    const render = function () {


        scene.simulate(); // run physics

        //update camera position
        camera.position.x = box2.mesh.position.x;
        camera.position.y = box2.mesh.position.y + 30;
        camera.position.z = box2.mesh.position.z + 60;

        effect.render(scene, camera); // render the scene
        requestAnimationFrame(render);
        render_stats.update(); //update render stats
    };
    document.addEventListener("keydown", (event)=>{
        switch(event.keyCode){
            case 73:
                camera.rotation.x += 0.1;
                return;
            case 75:
                camera.rotation.x -= 0.1;
        }
    })
    requestAnimationFrame(render);
};


document.addEventListener("DOMContentLoaded", initScene);

