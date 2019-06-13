class StaticObject extends GameObject{
    constructor(scene, geometry, geometryParams, position, friction, restitution){
                                                            //restitution and mass
        super(scene, geometry, geometryParams, position, friction, restitution, 0);


    }
}