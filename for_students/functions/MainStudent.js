import { Oasis, Pond } from "./oasis.js";
import { TentGroup, VideoDrone, Jeep,Rectangle } from "./camp.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";
import { Camera } from "./camera.js";
import { Giraffe, Giraffe2 } from "./animals.js";
//import {obh} from "../../for_students/objects/cam.obj"
import * as Simple from "../../libs/CS559-Framework/SimpleObjects.js";
import { WebGLMultipleRenderTargets } from "../../libs/CS559-Three/build/three.module.js";
export function mainStudent(world) {
  //const worldCopy = world
  world.add(new Oasis());

  let pond = new Pond({ time: 0 });
  world.add(pond);
  // world.add(new Tent())
  let tentGr = new TentGroup();
  // console.log(tentGr);
  world.add(new TentGroup());
  world.add(shift(new Giraffe(), 0, 4));
  let camera = new Camera();
  world.add(camera);
  let drone = new VideoDrone();
  world.add(drone);
  let giraffe2 = new Giraffe2();
  world.add(giraffe2);
  let adultGiraffe2 = shift(new Giraffe(), -12, -15);
  world.add(adultGiraffe2);
  adultGiraffe2 = rotateY(adultGiraffe2, -Math.PI / 2);

  //Drone footage

  let renderTargetDrone = new T.WebGLRenderTarget(512, 512);
  let droneFootage = shift(
    new Simple.GrSquareSign({
      color: "white",
      map: renderTargetDrone,
      x: 20,
      y: 5.5,
      z: 0,
      size: 5,
    }),
    10,
    -8
  );
  world.add(drone);
  world.add(droneFootage);
  let droneCam = new T.PerspectiveCamera(100, 512 / 512, 0.1, 2000);
  drone.objects[0].add(droneCam);
  droneCam.lookAt(2, 10, 2);
  droneCam.rotateX(Math.PI / 4);
  droneFootage = rotateY(droneFootage, Math.PI / 2);
  droneFootage.stepWorld = function (delta, timeOfDay) {
    world.renderer.setRenderTarget(renderTargetDrone);
    world.renderer.render(world.scene, droneCam);
    world.renderer.setRenderTarget(null);
  };
  let jeep = new Jeep();
  world.add(jeep);
 // world.add(new T.AmbientLight())
  //Camera footage
  let renderTargetCamera = new T.WebGLRenderTarget(512, 512);
  let cameraFootage = shift(
    new Simple.GrSquareSign({
      color: "white",
      map: renderTargetCamera,
      x: 20,
      y: 5.5,
      z: 10,
      size: 5,
    }),
    10,
    -8
  );
 
  world.add(cameraFootage);
  let groundCamera = new T.PerspectiveCamera(100, 512 / 512, 0.1, 2000);
  camera.objects[0].add(groundCamera);
  console.log(camera);
  groundCamera.lookAt(2, 10, 2);
  groundCamera.position.set(1,4.5,0)
  groundCamera.rotateX(-Math.PI / 4);
  cameraFootage = rotateY(cameraFootage, Math.PI / 2);
  cameraFootage.stepWorld = function (delta, timeOfDay) {
    world.renderer.setRenderTarget(renderTargetCamera);
    world.renderer.render(world.scene, groundCamera);
    world.renderer.setRenderTarget(null);
  };
  
  world.add(shift(new Rectangle(),3,29))


  function shift(grobj, x, z) {
    grobj.objects.forEach((element) => {
      element.translateX(x);
      element.translateZ(z);
    });
    return grobj;
  }

  function rotateY(grobj, theta) {
    grobj.objects.forEach((element) => {
      element.rotateY(theta);
    });
    return grobj;
  }
}
