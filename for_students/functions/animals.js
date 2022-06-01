import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js"
import { CylinderBufferGeometry, Mesh, RGB_PVRTC_2BPPV1_Format } from "../../libs/CS559-Three/build/three.module.js";
class CapsuleGeometry extends T.LatheGeometry {

	constructor( radius = 1, length = 1, capSegments = 4, radialSegments = 8 ) {

		const path = new T.Path();
		path.absarc( 0, - length / 2, radius, Math.PI * 1.5, 0 );
		path.absarc( 0, length / 2, radius, 0, Math.PI * 0.5 );

		super( path.getPoints( capSegments ), radialSegments );

		this.type = 'CapsuleGeometry';

		this.parameters = {
			radius: radius,
			height: length,
			capSegments: capSegments,
			radialSegments: radialSegments,
		};

	}

	static fromJSON( data ) {

		return new CapsuleGeometry( data.radius, data.length, data.capSegments, data.radialSegments );

	}

}

export class Giraffe extends GrObject{
    constructor() {
        let giraffe = new T.Group();
        giraffe.translateY(10)
        let body = new CapsuleGeometry(1.5,2.5,32,64);
        let tl1 = new T.TextureLoader().load("./textures/giraffe texture.webp")
        let mat = new T.MeshStandardMaterial({
            map:tl1,
            color:"white"
        })
        let bodyMesh = new T.Mesh(body,mat)
        bodyMesh.rotateX(Math.PI/2)
        giraffe.add(bodyMesh)
        let legs = new CylinderBufferGeometry(0.4,0.4,6)
        let legGroup = new T.Group()
        bodyMesh.add(legGroup)
        //legGroup.rotateY(Math.PI/2)
        legGroup.translateZ(3)
        let frontL = new T.Mesh(legs,mat)
        legGroup.add(frontL)
        frontL.position.set(1,1,1)
        frontL.rotateX(Math.PI/2)
        let frontR = new T.Mesh(legs,mat)
        legGroup.add(frontR)
        frontR.position.set(-1,1,1)
        frontR.rotateX(Math.PI/2)
        let BackR = new T.Mesh(legs,mat)
        legGroup.add(BackR)
        BackR.position.set(-1,-1,1)
        BackR.rotateX(Math.PI/2)
        
        let backL = new T.Mesh(legs,mat)
        legGroup.add(backL)
        backL.position.set(1,-1,1)
        backL.rotateX(Math.PI/2)

        let neck = new T.CylinderBufferGeometry(0.6,0.6,10)
        let neckMesh = new T.Mesh(neck,mat)
        bodyMesh.add(neckMesh)
        neckMesh.position.set(0,5,-3)
        neckMesh.rotateX(-Math.PI/4)
        giraffe.position.set(0,5,10)
        super("Adult",[giraffe])
        this.neckDirection = 0.1;
        this.max_rotation = 0.0698132
        let head = new CapsuleGeometry(1,0.5,32,64)
        let headMesh = new T.Mesh(head,mat)
        headMesh.position.set(0,6,0)
        neckMesh.add(headMesh)
        this.headDir=0.5
    }

    stepWorld(delta,timeOfDay){
        //console.log(this.objects[0].children[0].children[1]);
        let time = delta/1000
        //let angle = Math.sin(time*Math.PI)  
        //console.log(this.neckDirection);
        if(this.objects[0].children[0].children[1].rotation.z>= this.max_rotation){
        this.neckDirection = -0.1;
        this.headDir = -0.5;
    }
        else if(this.objects[0].children[0].children[1].rotation.z<=-this.max_rotation){
        this.neckDirection = 0.1;
        this.headDir = 0.5;
        }
       // console.log(this.objects[0].children[0].children[1].children[0]);
        this.objects[0].children[0].children[1].rotation.z += this.neckDirection *time*2;
        this.objects[0].children[0].children[1].children[0].rotation.x += this.headDir*time;

    }
}

export class Giraffe2 extends GrObject{
    constructor(params) {
        let giraffe = new T.Group();
        giraffe.translateY(10)
        let body = new CapsuleGeometry(0.5,1.5,32,64);
        let tl1 = new T.TextureLoader().load("./textures/giraffe texture.webp")
        let mat = new T.MeshStandardMaterial({
            map:tl1,
            color:"white"
        })
        let bodyMesh = new T.Mesh(body,mat)
        bodyMesh.rotateX(Math.PI/2)
        giraffe.add(bodyMesh)
        let legs = new CylinderBufferGeometry(0.2,0.2,3)
        let legGroup = new T.Group()
        bodyMesh.add(legGroup)
        //legGroup.rotateY(Math.PI/2)
        legGroup.translateZ(1)
        let frontL = new T.Mesh(legs,mat)
        legGroup.add(frontL)
        frontL.position.set(0.5,0.5,0.5)
        frontL.rotateX(Math.PI/2)
        let frontR = new T.Mesh(legs,mat)
        legGroup.add(frontR)
        frontR.position.set(-0.5,0.5,0.5)
        frontR.rotateX(Math.PI/2)
        let BackR = new T.Mesh(legs,mat)
        legGroup.add(BackR)
        BackR.position.set(-0.5,-0.5,0.5)
        BackR.rotateX(Math.PI/2)
        
        let backL = new T.Mesh(legs,mat)
        legGroup.add(backL)
        backL.position.set(0.5,-0.5,0.5)
        backL.rotateX(Math.PI/2)

        let neck = new T.CylinderBufferGeometry(0.2,0.2,5)
        let neckMesh = new T.Mesh(neck,mat)
        bodyMesh.add(neckMesh)
        neckMesh.position.set(0,2.3,1.3)
        neckMesh.rotateX(Math.PI/4+ 0.0002)
        super("juvenile",[giraffe])
        this.neckDirection = 0.1;
        this.max_rotation = 0.08
        let head = new CapsuleGeometry(0.3,0.2,32,64)
        let headMesh = new T.Mesh(head,mat)
        headMesh.position.set(0,2.8,0)
        neckMesh.add(headMesh)
        this.headDir=0.5
        giraffe.rotateY(Math.PI/4)
        giraffe.position.set(1,4,-11)
    }

    
    stepWorld(delta,timeOfDay){
        //console.log(this.objects[0].children[0].children[1]);
        let time = delta/1000
        if(this.objects[0].children[0].children[1].rotation.z>= this.max_rotation){
        this.neckDirection = -0.1;
        this.headDir = -0.5;
    }
        else if(this.objects[0].children[0].children[1].rotation.z<=-this.max_rotation){
        this.neckDirection = 0.1;
        this.headDir = 0.5;
        }
       // console.log(this.objects[0].children[0].children[1].children[0]);
        this.objects[0].children[0].children[1].rotation.z += this.neckDirection *time*2;
        this.objects[0].children[0].children[1].children[0].rotation.x += this.headDir*time;

    }
}