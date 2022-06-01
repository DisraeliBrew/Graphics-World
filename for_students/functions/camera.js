import { GrObject } from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js"
import { OBJLoader } from "../../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { ObjGrObject } from "../../libs/CS559-Framework/loaders.js";
export class Camera extends ObjGrObject{
constructor() {
    super({
        obj: "./objects/cam.obj",
        mtl:"./objects/7WSLWPG7ZGVUXV18PUHLN2G4N.mtl",
        name:"camera",
       norm:5,
       x:22
      });
   this.objects[0].rotateY(-Math.PI/2)
   console.log(this.objects[0]);
   //this.objects.push(new T.PointLight("white",2))
   // let cam = new OBJLoader();
    // let objs = []
    // cam.load( "./objects/cam.obj", 
    // function(obj){
    //      camy = obj;
    //     // obj.children.forEach(currentItem => {
    //     //     world.add(currentItem)
    //     // });
    //      console.log(obj);
    //      obj.children.forEach(currentItem => {
    //          console.log(currentItem);
    //         objs.push(currentItem) 
    //      });
    //     //console.log(objs);
    // });
    //console.log(objs);
    
}
stepWorld(delta,timeOfDay){
    
}
}