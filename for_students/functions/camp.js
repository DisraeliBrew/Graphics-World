import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js"
import { Object3D, PolyhedronBufferGeometry } from "../../libs/CS559-Three/build/three.module.js";
import * as Simple from "../../libs/CS559-Framework/SimpleObjects.js";
import { ObjGrObject } from "../../libs/CS559-Framework/loaders.js";
export class TentGroup extends GrObject{
    constructor(params) {
        let tentGr = new T.Group()
        tentGr.position.set(35,1,-35)
        let tent1 = new Tent({color:"olive"})
        tentGr.add(tent1)
        let tent2  = new Tent({color:"#17ADDB"})
        tentGr.add(tent2)
        tent2.translateZ(-7)
        super("tentgr",[tentGr])
    }
}

export class Tent extends Object3D{
constructor(params) {
    let tent = new T.Group();
    let geom = new T.BoxBufferGeometry(5,0.5,5)
    let mat = new T.MeshStandardMaterial({
        color:params.color,
        roughness:1
    })
    let leftMesh = new T.Mesh(geom,mat)
    //tent.add(new T.AxesHelper(10))
    tent.translateY(3)
    leftMesh.rotateX(Math.PI/3)
    tent.add(leftMesh)
    let rightMesh = new T.Mesh(geom,mat)
    tent.add(rightMesh)
    rightMesh.translateZ(-2.9)
    rightMesh.rotateX(-Math.PI/3)
    let geomPole = new T.CylinderBufferGeometry(0.2,0.2,5)
    let poleMat = new T.MeshStandardMaterial({
        color:"black",
        metalness:1,
    })
    let frontPole = new T.Mesh(geomPole,poleMat)
    let backPole = new T.Mesh(geomPole,poleMat)
    tent.add(frontPole)
    frontPole.translateX(2.3)
    frontPole.translateZ(-1.8)
    frontPole.translateY(-0.5)
    tent.add(backPole)
    backPole.translateX(-2.3)
    backPole.translateZ(-1.8)
    backPole.translateY(-0.5)
    return tent;
   // super("tent",[tent])
}
}

export class VideoDrone extends GrObject{
    constructor(params) {
      let droneGrp2 = new T.Group();
   // let helper = new T.AxesHelper();
    //let droneBody = new T.Mesh(new T.CylinderGeometry(0.7,0.7,1), new T.MeshStandardMaterial({color:"blue",roughness:0.3,emissive:"purple",emissiveIntensity:0.3,metalness:1}));
    let droneBody =  new T.Mesh(new T.CylinderGeometry(0.7,0.7,1), new T.MeshPhongMaterial({color:"red",shininess:200,specular:"blue",emissive: "pink",emissiveIntensity:0.2}));
    droneGrp2.position.set(2, 8, -2);
    droneBody.rotateX(Math.PI/2);
    droneGrp2.add(droneBody)
    let lArm = new T.Mesh(new T.BoxGeometry(1,0.3,0.3), new T.MeshStandardMaterial({color:"white",roughness:0.5,emissive:"blue",emissiveIntensity:0.1}))
    let rArm = lArm.clone()
    lArm.translateX(-1)
    droneBody.add(lArm)
    let droneFace = new T.Mesh(new T.SphereBufferGeometry(0.4,9,7,0,6.28,0,1.26), new T.MeshStandardMaterial({color:"black",roughness:0.3,emissive:"blue",emissiveIntensity:0.3,metalness:1}));
    droneGrp2.add(droneFace)
    droneFace.translateZ(0.3)
    droneFace.rotateX(Math.PI/2)
    droneBody.add(rArm)
    rArm.translateX(1)
    let propelLeft = new T.Mesh(new T.BoxGeometry(0.3,0.1), new T.MeshStandardMaterial({color:"blue",roughness:0,emissive:"black",emissiveIntensity:0.5}))
    lArm.add(propelLeft)
    propelLeft.rotateX(Math.PI/2)
    propelLeft.translateY(-0.2)
    propelLeft.translateZ(-0.25)
    propelLeft.name = "propLeft"
    
    let propelRight = new T.Mesh(new T.BoxGeometry(0.3,0.1), new T.MeshStandardMaterial({color:"blue",roughness:0,emissive:"black",emissiveIntensity:0.5}))
    rArm.add(propelRight)
    propelRight.rotateX(Math.PI/2)
    propelRight.translateY(-0.2)
    propelRight.translateZ(-0.25)
    propelRight.name = "propRight"
    droneGrp2.translateY(14)
    super("drone",[droneGrp2])
    this.prevTime = 0;

    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(0.5);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;

    }

    stepWorld(delta,timeOfDay){
    //let t = delta/10
         let droneGrp2 = this.objects[0]
         //console.log(droneGrp2);
         this.prevTime += delta/1000
    let theta = 0.15*this.prevTime;
   // //let tangentAngle = Math.PI/2-theta;
    let x = 20 * Math.cos(theta);
    let z = 20* Math.sin(theta)
    droneGrp2.position.x = x;
    droneGrp2.position.z = z;
    //console.log(droneGrp2.position);
    droneGrp2.lookAt(0,10,0)
    //droneGrp2.rotateY(-Math.PI/2)
    droneGrp2.traverse(mesh =>{
        if(mesh.name == "propLeft"){
        mesh.rotateY(delta)
        }
        if(mesh.name == "propRight"){
            mesh.rotateY(delta)
        }
    })
    }

}

export class Jeep extends ObjGrObject{
    constructor(params) {
        super({
            obj: "./objects/jeep/FZNXO1SP4BVIS67EOL2SY396D.obj",
            mtl:"./objects/jeep/FZNXO1SP4BVIS67EOL2SY396D.mtl",
            name:"Jeep",
            norm:10,
           x:40,
           z:-20
          });
//       let spotlight = new T.SpotLight("white")
//     console.log(this.objects[0].add(spotlight));
//     console.log(this.objects[0])
//  spotlight.position.set(0,10,0)
//  spotlight.rotateY(Math.PI)
    }
}

export class Rectangle extends GrObject{
    constructor(params) {
        let geom = new T.BoxBufferGeometry(22,11,1)
        let mat = new T.MeshBasicMaterial({
            color:"black"
        })
        let mesh = new T.Mesh(geom,mat);
        mesh.rotateY(Math.PI/2)
        mesh.translateY(5)
        super("frame",[mesh])
    }
}

