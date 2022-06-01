import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import { VRHelper } from "../../libs/CS559-Framework/VRHelper.js";
import * as T from "../../libs/CS559-Three/build/three.module.js"
import { MeshStandardMaterial, Object3D, PlaneBufferGeometry, Scene, ShaderMaterial} from "../../libs/CS559-Three/build/three.module.js";
import { shaderMaterial } from "../../libs/CS559-Framework/shaderHelper.js";
function loadFile(filename) {
    return new Promise((resolve, reject) => {
      const loader = new T.FileLoader();
  
      loader.load(filename, (data) => {
        resolve(data);
      });
    });
  }
export class Oasis extends GrObject{
    constructor(params) {
        let oasis = new T.Group();
        for(let j = 25; j >0; j-=5){
            
        for (let i = -19; i < 30; i += 5) {
            const rand = Math.random()
            if(Math.round(rand) == 0){ 
            oasis.add(new Tree({ x: i,y:1, z: -20-j }));
            oasis.add(new Shrub({ x: i,y:1, z: 20 +j }))
        }
            else{
            oasis.add(new Tree({ x: i,y:1, z: 20+j }));
            oasis.add(new Shrub({ x: i,y:1,z: -20-j }));
           // console.log("das");
            }
          
        // oasis.add(new Tree({ x: i,y:1, z: -10 }));
        // oasis.add(new Shrub({ x: i-3,y:1,z: 10 }));
        //console.log("asd");
        }
        for (let i = -20; i < 30; i+=4) {
            oasis.add(new Tree({x:-18-j,y:1,z:i+3}))
        }
    }
        super("oasis",[oasis])
        this.windDir = 1;
        this.windCount = 0;
    }

    stepWorld(delta,timeOfDay){
       // console.log(this.objects[0]);
        this.objects[0].children.forEach(obj=> {
            //console.log(obj);
            if(obj.name == "shrub"){
                obj.traverse(curr => {
                    if(curr.name = "leaves"){
                        console.log("das");
                        if(this.windDir == 1){
                            obj.rotation.y += Math.random() +delta
                           // obj.rotation.y += Math.random() 
                            this.windCount++; 
                        }
                        else if(this.windDir == -1){
                            obj.rotation.y = -Math.random() 
                            //obj.rotation.y = -Math.random() 
                            this.windCount++;
                        }
                        if(this.windCount%2 == 0){
                        //    console.log("das");
                            this.windCount = 0;
                            if(this.windDir == 1){
                                this.windDir = -1
                            }
                            else
                            this.windDir=1
                        }
                    }
                })
               //console.log(this.windDir);
                
            }
           /// console.log(this.windCount + "windcount");
        });
    }

}

export class Pond extends GrObject{
    constructor(params) {
        
        let geom = new T.CircleBufferGeometry(10,100)
        let objs = []
        let time = params.time
        //console.log(time);
        //console.log(params.time);
        //let frag = new T.Shader
        //this.time = 0;
        let shaderMat = shaderMaterial("../shaders/water2/vertex.glsl","./shaders/water2/fragment.glsl",{
            uniforms:{
                timeD:{value:0}
            },
            side:T.DoubleSide
        })
       
        // let mat = new ShaderMaterial({
        //     fragmentShader:"./shaders/water2/fragment.glsl",
        //     uniforms:{
        //         timeD:{value:time}
        //     },
        //     vertexShader:"./shaders/water2/vertex.glsl"
        // })
        let mesh = new T.Mesh(geom,shaderMat)
        mesh.translateY(0.1)
        mesh.rotateX(-Math.PI/2)
        objs.push(mesh)        
        super("pond",objs)
        //console.log(this.renderer);
       // const caustics = new Caustics(water.geometry);
        //const pool = new Pool();

 
       
    }
               stepWorld(delta,timeOfDay){
                //   console.log(this.objects[0].material.uniforms.timeD.value);
                  //this.params.time
                  this.objects[0].material.uniforms.timeD.value += delta/1000 ;
            }
         
    

}
let map = new T.TextureLoader().load("../textures/bark_textures/textures/bark_brown_02_diff_2k.jpg")
let normal = new T.TextureLoader().load("../textures/bark_textures/textures/bark_brown_02_nor_dx_2k.jpg")
let rough = new T.TextureLoader().load("../textures/bark_textures/textures/bark_brown_02_rough_2k.jpg")

class Tree extends Object3D{
    constructor(params) {
        let trunkht = Math.random()*7 + 10
        let trunkWidth = Math.random() + 0.3
        
       // console.log(trunkht);
        let trunk = new T.Mesh(new T.CylinderBufferGeometry(trunkWidth,trunkWidth,trunkht), new T.MeshStandardMaterial({
            color: "#D28436",
            map:map,
            normalMap:normal,
           roughnessMap:rough
        }))
        let leaves = new T.Mesh(new T.ConeBufferGeometry(trunkWidth+1,trunkht+Math.random()+2,Math.random()*3+10,Math.random()*64+30,true), new T.MeshStandardMaterial({
            color:"#06AB69",
            //roughness:0.1,
            emissive:"brown",
           emissiveIntensity:0.5
        }))

        trunk.add(leaves)
        leaves.translateY(trunkht)
        let group = new T.Group()
        group.add(trunk)
        group.position.set(params.x,params.y,params.z)
        group.translateY(trunkht/2)
       // console.log(params);
       group.name = "tree"
        return group
    }
}

class Shrub extends Object3D{
    constructor(params) {
         //console.log(params.x);
        let trunkht = Math.random()*3+2
       // console.log(trunkht);
        let trunk = new T.Mesh(new T.CylinderBufferGeometry(1,1,trunkht), new T.MeshStandardMaterial({
            color: "white",
            map:map,
            roughness:rough,
            normalMap:normal

        }))
        let leaves = new T.Mesh(new T.TetrahedronBufferGeometry(Math.random()*4+1,Math.round(Math.random()*10+1)), new T.MeshStandardMaterial({
            color:"green",
            //roughness:0.1;
            emissive:"brown",
           emissiveIntensity:0.5,
           side: T.DoubleSide
        }))
        let Rightleaves = new T.Mesh(new T.TetrahedronBufferGeometry(Math.random()*4+1,Math.round(Math.random()*10+1)), new T.MeshStandardMaterial({
            color:"green",
            //roughness:0.1,
            emissive:"brown",
           emissiveIntensity:0.5,
           side: T.DoubleSide
        }))
        let bottomLeaves = new T.Mesh(new T.TetrahedronBufferGeometry(Math.random()*4+1,Math.round(Math.random()*10+1)), new T.MeshStandardMaterial({
            color:"green",
            //roughness:0.1,
            emissive:"brown",
           emissiveIntensity:0.5,
           side: T.DoubleSide
        }))
        let topLeaves = new T.Mesh(new T.TetrahedronBufferGeometry(Math.random()*4+1,Math.round(Math.random()*10+1)), new T.MeshStandardMaterial({
            color:"green",
            //roughness:0.1,
            emissive:"brown",
           emissiveIntensity:0.5,
           side: T.DoubleSide
        }))
        let frontLeaves = new T.Mesh(new T.TetrahedronBufferGeometry(Math.random()*4+1,Math.round(Math.random()*10+1)), new T.MeshStandardMaterial({
            color:"green",
            //roughness:0.1,
            emissive:"brown",
           emissiveIntensity:0.5,
           side: T.DoubleSide
        }))
        let backLeaves = new T.Mesh(new T.TetrahedronBufferGeometry(Math.random()*4+1,Math.round(Math.random()*10+1)), new T.MeshStandardMaterial({
            color:"green",
            //roughness:0.1,
            emissive:"brown",
           emissiveIntensity:0.5,
           side: T.DoubleSide
        }))
        let leafGroup = new T.Group()
        leafGroup.translateY(trunkht)
        //leafGroup.translateZ(-2)
        //leafGroup.add(leaves.translateY(trunkht+2))
        leafGroup.add(leaves.rotateX(Math.PI/2).rotateZ(Math.PI))
        leaves.position.set(-0.0,0,-1)
        leafGroup.add(Rightleaves.rotateZ(Math.PI/2).translateY(1))
        leafGroup.add(bottomLeaves)
        bottomLeaves.position.set(-.5,1,0)//bottomLeaves.position.set(-0.8,1.2,-0.8)
        leafGroup.add(topLeaves.rotateX(Math.PI))
        topLeaves.position.set(-0.5,-0.5,0)
        leafGroup.add(frontLeaves.rotateZ(-Math.PI/2))
        leafGroup.add(backLeaves.rotateX(Math.PI/2))
        backLeaves.position.set(-0.5,0,.5)
       // leaves.translateY(trunkht)
        trunk.add(leafGroup)
        let shrub = new T.Group()
        shrub.add(trunk)
         leafGroup.name = "leaves"
        //console.log(params);

        if(params)
        shrub.position.set(params.x,params.y,params.z)
        
        shrub.translateY(trunkht/2)
        shrub.name = "shrub"
        return shrub;
    }
}
