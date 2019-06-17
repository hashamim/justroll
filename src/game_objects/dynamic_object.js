import GameObject from './game_object';

class DynamicObject extends GameObject{
    constructor(scene, mesh, position, rotation, light) {
        super(scene, mesh, position, rotation, light);

        const m = new THREE.Matrix3();

        //set damping factor
        m.set(0.94, 0, 0,
            0, 1, 0,
            0, 0, 0.94);

        //damp velocity each render
        scene.addEventListener('update', ()=>{
            const vel = this.mesh.getLinearVelocity();
            vel.applyMatrix3(m);
            this.mesh.setLinearVelocity(vel);

            const ang = this.mesh.getAngularVelocity();
            ang.applyMatrix3(m);
            this.mesh.setAngularVelocity(ang);
        });
    }
    accelerate(x = 0, y = 0, z = 0){
        // const ang = this.mesh.getAngularVelocity();
        // ang.addVectors(ang, { x,y,z });
        // this.mesh.setAngularVelocity( ang );
        const vel = this.mesh.getLinearVelocity();
        vel.addVectors(vel,{ x,y,z });
        this.mesh.setLinearVelocity(vel);
    }
    getLinearVelocity(){
        return this.mesh.getLinearVelocity();
    }
    angularAccelerate(x = 0, y = 0, z = 0){
        const angVel = this.mesh.getAngularVelocity();
        angVel.x += x;
        angVel.y += y;
        angVel.z += z;
        this.mesh.setAngularVelocity(angVel);
    }
    getAngularVelocity(){
        return this,mesh.getAngularVelocity();
    }
}

export default DynamicObject;