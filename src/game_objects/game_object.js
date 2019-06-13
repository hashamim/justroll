class GameObject{
    constructor(scene, geometry, geometryParams, position, friction, restitution, mass, light){
        const material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({color: 0xFFFFFF,
                                        polygonOffset: true,
                                        polygonOffsetFactor: 1, // positive value pushes polygon further away
                                        polygonOffsetUnits: 1}),
            friction,
            restitution,
        );
        this.light = light;
        switch(geometry){
            case "sphere":
                this.mesh = new Physijs.SphereMesh(
                    new THREE.SphereGeometry(...geometryParams),
                    material,
                    mass
                );

                break;
            case "box":
                this.mesh = new Physijs.BoxMesh(
                    new THREE.CubeGeometry(geometryParams),
                    material,
                    mass
                );
                break;
            default:
                throw "geometry undefined";
        }
        //showing edge lines
        const edges = new THREE.EdgesGeometry(this.mesh.geometry);
        this.edgeLines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
        this.mesh.add(this.edgeLines);

        //set position
        this.mesh.position.x = position.x;
        this.mesh.position.y = position.y;
        this.mesh.position.z = position.z;

        //add to scene
        scene.add(this.mesh);

        if(light){
            // scene.add(this.light);
            
            // scene.addEventListener("update",()=>{
            //     light.position.set(this.position().x, this.position().y, this.position().z);
            // })
        }
        
        this.position = this.position.bind(this);
    }
    position(){
        return this.mesh.position;
    }
}

export default GameObject;