class GameObject{
    constructor(scene, mesh, position, rotation, light){
        this.light = light;
        this.mesh = mesh;
        //showing edge lines
        const edges = new THREE.EdgesGeometry(this.mesh.geometry);
        this.edgeLines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        this.mesh.add(this.edgeLines);

        //set position
        this.mesh.position.x = position.x;
        this.mesh.position.y = position.y;
        this.mesh.position.z = position.z;
        
        if(rotation){   
            this.mesh.rotation.x = rotation.x;
            this.mesh.rotation.y = rotation.y;
            this.mesh.rotation.z = rotation.z;
        }
        //add to scene
        scene.add(this.mesh);

        //if object has a light add to scene
        if(light){
            scene.add(this.light);
            
            scene.addEventListener("update",()=>{
                light.position.set(this.position().x, this.position().y, this.position().z);
            })
        }
    }
    position(){
        return this.mesh.position;
    }
}

export default GameObject;