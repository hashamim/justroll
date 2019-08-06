## [Just Roll](http:/hashamim.github.io/justroll "Live Site") - A Javascript based 3D Physics Game
### Background and Overview
Just Roll is a real-time physics simulation (game?) that allows the user to live out there dreams of being an indestructable ball
that rolls through an obstacle course. Just Roll allows the user to tilt the course in real time in order to get the ball
to their destination. Just try not to fall off the level.

Just Roll uses collision detection to prevent the sphere from passing the course and landmarks for helping the user gauge
distance in the virtual 3D environment.

### Functionality and MVP
* basic ball controls
* Create flat environment with no hazards (we'll go easy on you at first)
* environments with obstacles that need to be pushed away
* uneven ground surfaces
* taking advantage of the ball collision to create passages
* verticality in a level
* scoring player on time
* menu
* storing local or global high scores (more research needs to be done on this)
* menu interface
* add common sense button controls (arrow keys to move, enter to go to next level, esc to pause and retry)
* sound on initial collision, user contact, and entering goal
* (bonus) add particle effects on goal enter
* (bonus) improve lighting effects

### Wireframe
The app will have the HTML canvas take up the entire screen with menus functioning as modals.
Social media links will be at the top right for interested persons. Mute button will appear left of the canvas
![wireframes](assets/js_wireframes.png)

### Architecture and Technologies
This App will use the the following technologies
* Vanilla Javascript for DOM physics logic
* 3.js for 3D rendering
* Web Audio API for sound generation
* Webpack to bundle the files

### How to use
 * clone the repository and use webpack to save the changes of your source files to the distribution. Alternatively run `npm run webpack:watch` to have the bundle automatically update.
 * make your own custom levels by modifying `src/levels.js` and following the instructions below
### Features
Using object oriented programming, Just Roll has simple to make level design, simply spawn objects at a fixed position in Cartesian space with the properties that you want. Certain commonly used objects have their own wrapper class that make them even easier to spawn. 

Each level is a function that spawns objects in the scene and is called when the scene is initialized.
 * Each level automatically starts with a ball at location (0,0,0), and a starting platform at location (0,-20,0).
 * Each level must have a a Goal. Add a goal using `addGoalHole(scene, position)`.
 * Check `game_objects.js` for a list of prebuilt objects, otherwise checkout `static_object.js` and `dynamic_object.js` to spawn your own custom objects. These classes are built on top of physijs and THREEjs objects so knowledge of these libraries is heavily recommended
 
 **Examples:**
```javascript
//levels.js
function(scene, cb){
            const goalPlane = addGoalHole(scene, new THREE.Vector3(0, -45, -65)); //spawn the goal
            
            //add an event listener to the goal that fires off if the win condition is met
            goalPlane.mesh.addEventListener('collision', (otherObject, vel, rot, contactNormal)=>{ 
                if(otherObject === window.playerSphere.mesh){
                    console.log(contactNormal);
                    goalPlane.mesh.removeEventListener('collision', )
                    cb();
                }
            });

            addSpiralStaircase(scene, new THREE.Vector3(-20, -20, -55)); //add a spiral staircase
            generateGroundPane(scene, [8, 1, 25], new THREE.Vector3(1, -20, -40)); //add a large flat area at a specified position and angle
        }
 ```
```javascript
levels.push(
        function (scene, cb) {
            const goalPlane = addGoalHole(scene, new THREE.Vector3(0, -20, -130));
            goalPlane.mesh.addEventListener('collision', (otherObject, vel, rot, contactNormal) => {
                if (otherObject === window.playerSphere.mesh) {
                    console.log(contactNormal);
                    goalPlane.mesh.removeEventListener('collision')
                    cb();
                }
            });

            generateGroundPane(scene, [50, 1, 110], new THREE.Vector3(0, -40, -65)); //bottom
            generateGroundPane(scene, [50, 20, 0.5], new THREE.Vector3(0, -30, -120)); //side

            const roller = new DynamicObject(
                scene,
                new Physijs.CylinderMesh(
                    new THREE.CylinderBufferGeometry(10, 10, 50, 10, 10),
                    generateGroundMaterial(0x00ff00, 5),
                    500
                ),
                new THREE.Vector3(0, -30, -30),
                new THREE.Vector3(0, 0, Math.PI * 0.5)
            )
        }
    )
 ```
 
### Features in the Pipeline
 - attempt collisions and elastic properties of objects
 - more realistic friction
 - flesh out interface
 - play/pause
 - mute
 - social media links
 - level select
 - Get jump and bounce working
