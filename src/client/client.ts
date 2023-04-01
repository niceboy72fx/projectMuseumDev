import { tween, TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import * as THREE from 'three'
import { BackSide, CubeTextureLoader , IcosahedronGeometry, Loader, Mesh, MeshBasicMaterial, Object3D, ObjectLoader, PlaneGeometry, PMREMGenerator, PointLight, SpotLight, TextureFilter, TextureLoader } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Tween } from '@tweenjs/tween.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(
    78,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(4,2,2.35)
camera.rotateY(-1.5)

const material2 = new MeshBasicMaterial()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const pmremGenerator = new THREE.PMREMGenerator(renderer)
const backgroundImage = new TextureLoader().load('background/sky.jpg')
scene.background = backgroundImage


const menuPanel = document.getElementById('menuPanel') as HTMLDivElement
// var menuPanel2 = document.getElementById('PanelTag') as HTMLDivElement
const startButton = document.getElementById('startButton') as HTMLInputElement
// const comment = document.querySelector('.tag') as HTMLInputElement

startButton.addEventListener(
    'click',
    function () {
        menuPanel.style.display = 'none'
        controls.lock()
    },
    false
)
const cameraPosition = camera.position;
const controls = new PointerLockControls(camera, renderer.domElement)
// const transformControls = new TransformControls(camera, renderer.domElement)

window.addEventListener("mousedown", function(event){
            controls.lock();
            this.onmousedown;
            
        })


window.addEventListener("mouseup", function (event) {
            controls.unlock();
        })

const handleControlShowPopup = (leftX : number , rightX : number  ,  leftZ : number , rightZ : number , name : string , linkURL : string ) => {
      console.log('running')
      if (Number.isInteger(leftX) && Number.isInteger(rightX) &&  Number.isInteger(rightZ) && Number.isInteger(leftZ)){
         if ( Math.round(cameraPosition.x)   <= leftX && Math.round(cameraPosition.x ) <= rightX && Math.round(cameraPosition.z )  <= leftZ && Math.round(cameraPosition.z ) /100 <= rightZ  && name
          ) { 
             const newPanel = document.createElement("div") 
              newPanel.setAttribute("id","PanelTag")
              newPanel.style.display = "block"
              newPanel.innerHTML =`
              <div class="tag">
              <div id="banner" style="color: white">${name} 
              </div>
              <div id="control">
              <a href="${linkURL}">Tìm hiểu thêm</a>
              </div>
              </div>
              `
             document.body.appendChild(newPanel)
             
             console.log("if")
    } else  {
        const panel = document.getElementById('PanelTag')
        console.log("else")
        if (panel) {
            panel.remove()
        }
    }
       } else {
          if ( Math.round(cameraPosition.x * 100 ) / 100  <= leftX && Math.round(cameraPosition.x * 100) /100 <= rightX && Math.round(cameraPosition.z * 100) /100 <= leftZ && Math.round(cameraPosition.z * 100) /100 <= rightZ  && name
          ) { 
             const newPanel = document.createElement("div") 
              newPanel.setAttribute("id","PanelTag")
              newPanel.style.display = "block"
              newPanel.innerHTML =`
              <div class="tag">
              <div id="banner" style="color: white">${name} 
              </div>
              <div id="control">
              <a href="${linkURL}">Tìm hiểu thêm</a>
              </div>
              </div>
              `
             document.body.appendChild(newPanel)
             
             console.log("if")
    } else  {
        const panel = document.getElementById('PanelTag')
        console.log("else")
        if (panel) {
            panel.remove()
        }
    }}
}


//----------------------------------------------------------------
const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50)
const material = new THREE.MeshBasicMaterial({
     visible:false,
})

const plane = new THREE.Mesh(planeGeometry, material)
plane.rotateX(-Math.PI / 2)
scene.add(plane)

//----------------------------------------------------------------
const lightMuseum = new PointLight(0xffffff,1)
const lightMuseum1 = new PointLight(0xffffff,1)
const lightMuseum2 = new PointLight(0xffffff,1)
lightMuseum.position.set(1,1,1)
lightMuseum1.position.set(15,8,4)
lightMuseum2.position.set(15,8,4)
const roomMuseum = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
   root.add(lightMuseum1)
   root.position.set(0,0,15)
   scene.add(root)
})

const roomMuseum2 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
    root.position.set(15,0,15)
    root.add(lightMuseum2)
   scene.add(root)
})

const side = { backside : BackSide}

const roomMuseum3 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
   root.add(lightMuseum1)
   root.position.set(1,0,-10)
   root.rotation.set(0,15.7,0)
   scene.add(root)
})

const roomMuseum4 = new GLTFLoader().load('object/room/scene.gltf', function(glb){
   const root = glb.scene;
    root.position.set(16,0,-9.9)
       root.rotation.set(0,15.7,0)
    root.add(lightMuseum2)
   scene.add(root)
})

//----------------------------------------------------------------

//----------------------------------------------------------------
//Floors

// const texture = new TextureLoader().load('object/floor/Textures/Material _25_Base_Color.png');

const floorMuseum = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(1.9,0,2)
    sceneObj.scale.setScalar(1/13)
    sceneObj.scale.x = 0.327
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(162, 44, 31)');
                }
            }
        })
    scene.add(sceneObj)
})


const floorMuseum2 = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(28,0,2)
    sceneObj.scale.setScalar(1/8)
    sceneObj.scale.x = 0.4
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(162, 44, 31)');
                }
            }
        })
    scene.add(sceneObj)
})


//----------------------------------------------------------------
// Ceiling 
const ceilingMuseum = new FBXLoader().load('object/floor/Floor.FBX', function (sceneObj) {
     sceneObj.scale.setScalar(1/13)
    sceneObj.scale.x = 0.33
    sceneObj.position.set(2.1,5.4,2)
    sceneObj.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(0, 0, 0)');
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).side = BackSide
                    
                }
            }
        })
    scene.add(sceneObj)
})

const ceilingMuseum2 = new FBXLoader().load('object/floor/Floor.FBX', function  (sceneObj) {
    sceneObj.position.set(28,5.5,2)
    sceneObj.scale.setScalar(1/8)
    sceneObj.scale.x = 0.4
    sceneObj.add(lightMuseum)
    sceneObj.traverse(function (child) {
        const backside = BackSide
            if ((child as THREE.Mesh).isMesh) {
                if ((child as THREE.Mesh).material) {
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color = new THREE.Color('rgb(0,0,0)');
                    ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).side = backside
                }
            }
        })
    scene.add(sceneObj)
})


///----------------------------------------------------------------
//Wall
const backside = BackSide
const materialWall = new THREE.MeshBasicMaterial()
const materialWallBack = new THREE.MeshBasicMaterial()
materialWall.color = new THREE.Color('rgb(0,0,0)')
materialWallBack.color = new THREE.Color('rgb(0,0,0)')
materialWallBack.side = backside
const wall = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wall.position.x = -7.2
wall.position.y = 4
wall.rotation.y = Math.PI /2
wall.scale.x = 3
scene.add(wall)

const wallBack = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallBack.position.x = -7.2
wallBack.position.y = 4
wallBack.rotation.y = Math.PI / 2
wallBack.scale.x = 3
scene.add(wallBack)

const wallLobby1 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby1.position.x = 53
wallLobby1.position.y = 2.5
wallLobby1.position.z = 2.55
wallLobby1.rotation.y = 11
wallLobby1.scale.x = 2.1
wallLobby1.scale.y = 0.6
scene.add(wallLobby1)

const wallLobby1b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby1b.position.x = 53
wallLobby1b.position.y = 2.5
wallLobby1b.position.z = 2.55
wallLobby1b.rotation.y = 11
wallLobby1b.scale.x = 2.1
wallLobby1b.scale.y = 0.6
scene.add(wallLobby1b)

//-----------------------------
const wallLobby2 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby2.position.x = 38.1
wallLobby2.position.y = 2.5
wallLobby2.position.z = 13
wallLobby2.rotation.y = 3.14
wallLobby2.scale.x = 3
wallLobby2.scale.y = 0.6
scene.add(wallLobby2)

const wallLobby2b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby2b.position.x = 38.1
wallLobby2b.position.y = 2.5
wallLobby2b.position.z = 13
wallLobby2b.rotation.y = 3.14
wallLobby2b.scale.x = 3
wallLobby2b.scale.y = 0.6
scene.add(wallLobby2b)
//-------------------------------------
const wallLobby3 = new Mesh(new PlaneGeometry(10,10,50,50) , materialWall)
wallLobby3.position.x = 38.1
wallLobby3.position.y = 2.5
wallLobby3.position.z = -8
wallLobby3.rotation.y = 3.14
wallLobby3.scale.x = 3
wallLobby3.scale.y = 0.6
scene.add(wallLobby3)

const wallLobby3b = new Mesh(new PlaneGeometry(10,10,50,50) , materialWallBack)
wallLobby3b.position.x = 38.1
wallLobby3b.position.y = 2.5
wallLobby3b.position.z = -8
wallLobby3b.rotation.y = 3.14
wallLobby3b.scale.x = 3
wallLobby3b.scale.y = 0.6
scene.add(wallLobby3b)
//----------------------------------------------------------------

//----------------------------------------------------------------OBJECT----------------------------------------------------------------
//-------------------------component----------------------------------------------------------------
const sceneMeshes: THREE.Object3D[] = []
let objectFan : THREE.Object3D = new THREE.Object3D;
function FanRotate () {
   const rotateY = new TWEEN.Tween(objectFan.rotation).to(
        { y: 18000000 } , 9000000000
    )
   rotateY.start()
}




//-------------------------Lamp------------------------------------------------
//Lobby object
//room 1
const ceillamp1 = new GLTFLoader().load('object/ceillamp/lightFan/scene.gltf' , function (obj) {
    const root = obj.scene
    root.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
         const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    objectFan == m
                } else {
                    m.receiveShadow == true
                }
                 sceneMeshes.push(m)
    }})
    root.position.set(16,4,12.5)
    scene.add(root)
    FanRotate()
})
//room 2
const ceillamp2= new GLTFLoader().load('object/ceillamp/lightFan/scene.gltf' , function (obj) {
    const root = obj.scene
    root.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
         const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    objectFan == m
                } else {
                    m.receiveShadow == true
                }
                 sceneMeshes.push(m)
    }})
    root.position.set(16,4,-8.5)
    scene.add(root)
    FanRotate()
})
//room 3
const ceillamp3 = new GLTFLoader().load('object/ceillamp/lightFan/scene.gltf' , function (obj) {
    const root = obj.scene
    root.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
         const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    objectFan == m
                } else {
                    m.receiveShadow == true
                }
                 sceneMeshes.push(m)
    }})
    root.position.set(0,4,12.5)
    scene.add(root)
    FanRotate()
})
//room 4
const ceillamp4 = new GLTFLoader().load('object/ceillamp/lightFan/scene.gltf' , function (obj) {
    const root = obj.scene
    root.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
         const m = child as THREE.Mesh
                if (m.name === 'Suzanne') {
                    m.castShadow = true
                    objectFan == m
                } else {
                    m.receiveShadow == true
                }
                 sceneMeshes.push(m)
    }})
    root.position.set(1,4,-10.5)
    scene.add(root)
    FanRotate()
})
//------------------Lamps-------------------------------------------

//Lamp_celings
var lamp_ceiling1 = new OBJLoader()
const lamp_ceiling2 = new OBJLoader()
const lamp_ceiling3 = new OBJLoader()



lamp_ceiling1.load('object/lamp/lamp_ceiling/AM152_048_Coma D.obj', (obj) =>  {
     obj.scale.setScalar(0.007)
     obj.position.set(51.5,5.5,2)
     obj.add(lightMuseum)
     scene.add(obj)
})

lamp_ceiling2.load('object/lamp/lamp_ceiling/AM152_048_Coma D.obj', (obj) =>  {
     obj.scale.setScalar(0.007)
     obj.position.set(51.5,5.5,-2)
      obj.add(lightMuseum)
     scene.add(obj)
})

lamp_ceiling3.load('object/lamp/lamp_ceiling/AM152_048_Coma D.obj', (obj) =>  {
     obj.scale.setScalar(0.007)
     obj.position.set(51.5,5.5,6)
      obj.add(lightMuseum)
     scene.add(obj)
})
//Lamp's Frame
const lamp_frame_pathMLT : string = 'object/lamp/lamp_for_pic/lamps.mlt';

// Lamp's Pedestal
//rơw 1
const LampPedestalPath : string = 'object/lamp/lamp_round/AM152_002_Tlon 440 Ceiling.obj';
var tempPositionX : number = 31
const LampPedestalLoader1 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader2 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader3 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader4 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,5,10)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});
//row2
const LampPedestalLoader5 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader6 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader7 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader8 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,5,10)
         obj.scale.setScalar(0.01)

    scene.add(obj)
})
//row3
const LampPedestalLoader9 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader10 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader11 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader12 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX,5,10)
         obj.scale.setScalar(0.01)

    scene.add(obj)
})
//row4 
const LampPedestalLoader13 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader14 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader15 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader16 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,5,10)
         obj.scale.setScalar(0.01)

    scene.add(obj)
})
//row5
const LampPedestalLoader17 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,5 , -5)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader18 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,5,0)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader19 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,5,6)
         obj.scale.setScalar(0.01)

    scene.add(obj)
});

const LampPedestalLoader20 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,5,10)
         obj.scale.setScalar(0.01)

           scene.add(obj)
})
//===============================================Lamp's Lobby2============================================
var lampPosition : number = -5
const LampPedestalLoader21 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});

const LampPedestalLoader22 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition + 7 ,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});



const LampPedestalLoader23 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition + 14 ,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});

const LampPedestalLoader24 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition + 21,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});

const LampPedestalLoader25 = new OBJLoader().load(LampPedestalPath, (obj) => {
        obj.position.set( lampPosition + 28 ,5.3,2.4)
         obj.scale.setScalar(0.05)

    scene.add(obj)
});


//----------------------------------------------------------------
//Frame
const frameNormalPath : string ='object/frame/frame.obj';
const blackFramePath : string ='object/frame/frame3.obj';
const frameNormalLoader = new OBJLoader();
const blackFrameLoader = new OBJLoader();

//================================================================

//===============================================Lobby============================================
// blackFrameLoader.load(blackFramePath,(obj) => {
//     obj.position.set(52,3,-2.4)
//     obj.rotateY(Math.PI / 2)
//     obj.rotateZ(Math.PI / 2)
//     scene.add(obj)
// })

const imageLobbyCenter = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
       map: new TextureLoader().load('object/picture/room1/2.Sông Nin/2.Sông Nin.jpg'),
       side: backside
}))
imageLobbyCenter.scale.set(10,5,50)
imageLobbyCenter.rotateY(Math.PI / 2)
// imageLobbyCenter.rotateZ(Math.PI / 2)
imageLobbyCenter.position.set(52.5,3,2.1)
scene.add(imageLobbyCenter)

///left 
const imageLobbyLeft1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
       map: new TextureLoader().load('object/picture/lobby/13.Cầu Gard.jpg'),
       side: backside
}))
imageLobbyLeft1.scale.set(8,5,50)
imageLobbyLeft1.rotateY(Math.PI)
// imageLobbyLeft1.rotateZ(Math.PI / 2)
imageLobbyLeft1.position.set(30.5,3,-7.7)
scene.add(imageLobbyLeft1)

const imageLobbyLeft2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
       map: new TextureLoader().load('object/picture/lobby/8. Tôn giáo_Các đạo sĩ phương Đông chiêm bái và Nữ hoàng Sheba triều bái Vua Salomon, trong Sách Các giờ kinh Farnese (1546) bởi Giulio Clovio.jpg'),
       side: backside
}))
imageLobbyLeft2.scale.set(8,5,50)
imageLobbyLeft2.rotateY(Math.PI)
// imageLobbyLeft2.rotateZ(Math.PI / 2)
imageLobbyLeft2.position.set(45.5,3,-7.7)
scene.add(imageLobbyLeft2)


///right
const imageLobbyRight1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
       map: new TextureLoader().load('object/picture/lobby/12.Cầu máng ở Segovia, Tây Ban Nha.jpg'),
      
}))
imageLobbyRight1.scale.set(8,5,50)
imageLobbyRight1.rotateY(Math.PI)
// imageLobbyRight1.rotateZ(Math.PI / 2)
imageLobbyRight1.position.set(30.5,3,12.7)
scene.add(imageLobbyRight1) 

const imageLobbyRight2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
       map: new TextureLoader().load('object/picture/lobby/8.Thiên Tử.jpg'),
    
}))
imageLobbyRight2.scale.set(8,5,50)
imageLobbyRight2.rotateY(Math.PI)
// imageLobbyRight2.rotateZ(Math.PI / 2)
imageLobbyRight2.position.set(45.5,3,12.7)
scene.add(imageLobbyRight2)

//===============================================Lobby2============================================

//============================================Control============================================
window.addEventListener("keydown",  function (event) {    
     const panel = document.getElementById('PanelTag')
     console.log(Math.round(cameraPosition.x * 100 ) / 100 +"," + Math.round(cameraPosition.y * 100) / 100 +"," +  Math.round(cameraPosition.z * 100) / 100);
    // room1 
    switch (Math.round(cameraPosition.x) && Math.round(cameraPosition.z)) {
        case 21   && (12 || 11) : 
             handleControlShowPopup(21, 21, 12, 11 , "Bản đồ sông Euphrates & sông Tigris" , "" )
             break
        case (19 || 18) &&(15 || 14) :
             handleControlShowPopup(19, 18, 15 , 14 , "Sông Nin" , "" ) 
             break
        case 18 && 18 :
             handleControlShowPopup(18, 18 , 18, 18 , "Sông Euphrates ở gần Ar Raqqah, Syria" , "" )   
             break
        case 19 && (21 || 20) :
            handleControlShowPopup(19, 19, 21, 20 , "Sông Tigris ở Mosul, Iraq" , "" )
            break
        case (17 || 16) && (20 || 19) :
            handleControlShowPopup(17, 16, 20, 19, "Các vị thầns Geb và Nut" , "" )
            break
        case (16 || 15) && (10 || 9) :
            handleControlShowPopup(16, 15, 10, 9, "Số học" , "" )
            break
        case (13 || 11) && (11 || 8):
            handleControlShowPopup(12, 11, 11, 8, "Chữ tượng hình của Ai Cập cổ đại", "" ) 
            break
        case 10 && 11 : 
            handleControlShowPopup(10, 10, 11, 11, "Điều kiện tự nhiên", "" )
            break
        case 9 && (15 || 14) :
            handleControlShowPopup(9, 9, 15, 14, "Việc đo đạc của người Ai Cập", "" )
            break
        case 10 && 17 : 
            handleControlShowPopup(10, 10, 17, 17, "Thành tựu khoa học của người Ai Cập", "" )
            break
        case (13 || 12) && ( 16) :
            handleControlShowPopup(13, 12, 16, 16, "Tượng Xpanh (Nhân sư)", "" ) 
            break
        // Room 2
        case 6 && (12 || 11) :
            handleControlShowPopup(6.5, 6, 11.9, 11.3, "Lược đồ Ấn Độ cổ đại", "" ) //Lỗi
            break
        case 4 && (15 || 14) :
            handleControlShowPopup(4, 4, 15, 14, "Chữ San-krít trên lá cọ", "" ) //Lỗi
            break
        case 4 && (18 || 17) :
            handleControlShowPopup(4, 4, 18, 17, "Đạo Bà La Môn", "" ) //Lỗi
            break
        case 4 && 20 :
            handleControlShowPopup(4, 4, 20, 20, "Văn học, nghệ thuật Ấn Độ cổ đại", "" )
            break
        case 2 && 21 :
            handleControlShowPopup(2, 2, 21, 21, "Y dược học Ấn Độ cổ đại", "" ) //Lỗi
            break
        case 0 && 20 :
            handleControlShowPopup(0, 0, 20, 20, "Triết học", "" )
            break
        case -2 && (17 || 16) :
            handleControlShowPopup(-2, -2, 17, 16, "Pháo đài đỏ Lal Quila", "") // Lỗi
            break
        case (-5 || -6) && 16 :
            handleControlShowPopup(-5, -6, 16, 16, "Thành phố Ha-ráp-pa", "")
            break
        case -6 && (13 || 12) :
            handleControlShowPopup(-6, -6, 13, 12, "Lăng Ta-giơ Ma-tan", "")
            break
        case -3 && 10 :
            handleControlShowPopup(-3, -3, 10, 10, "Toán học", "") // Lỗi 
            break
        case (2 || 1) && 10 :
            handleControlShowPopup(2, 1, 10, 10, "Tháp Mina - Công trình kiến trúc Hồi giáo nổi bật", "") // Lỗi
            break
        // Room 2 (lỗi 7)
        // Room 3
        case -6 && -7 :
            handleControlShowPopup(-6, -6, -7, -7, "In ấn", "")
            break
        case -3 && -10 :
            handleControlShowPopup(-3, -3, -10, -10, "La bàn", "")
            break
        case -3 && (-12 || -13) :
            handleControlShowPopup(-3, -3, -12, -13, "Đồng hồ cơ khí", "")
            break
        case -3 && -15 :
            handleControlShowPopup(-3, -3, -15, -15, "Kinh thi", "")
            break
        case -1 && -16 :
            handleControlShowPopup(-1, -1, -16, -16, "Giấy", "")
            break
        case 0 && -15 :
            handleControlShowPopup(0, 0, -15, -15, "Chữ viết trên thẻ tre", "") // Lỗi
            break
        case 3 && -11 :
            handleControlShowPopup(3, 3, -11, -11, "Bảy nhà tư tưởng vĩ đại nhất Trung Quốc (Thời kỳ cổ đại)", "")
            break
        case 6 && -12 :
            handleControlShowPopup(6, 6, -12, -12, "Vạn lý trường thành", "") // Lỗi
            break
        case 7 && -11 :
            handleControlShowPopup(7, 7, -11, -11, "Cửu chương lập thành toán pháp", "") // Lỗi
            break
        // Room 3 (lỗi 3)
        // Room 4
        case 9 && -7 :
            handleControlShowPopup(9, 9, -7, -7, "Lược đồ Hy Lạp cổ đại", "") // Lỗi
            break
        case 12 && (-10 || -11) :
            handleControlShowPopup(12, 12, -10, -11, "Bản đồ La Mã (từ thế kỷ V TCN đến thế kỷ 2)", "") // Lỗi
            break
        case 12 && -13 :
            handleControlShowPopup(12, 12, -13, -13, "Sử thi Iliad", "")
            break
        case 12 && -15 :
            handleControlShowPopup(12, 12, -15, -15, "Một cảnh trong tác phẩm Eudipe", "") // Lỗi
            break
        case 14 && -16 :
            handleControlShowPopup(14, 14, -16, -16, "Cảnh quan Firenze, trung tâm bắt nguồn Phục Hưng", "") // Lỗi
            break
        case 15 && -15 :
            handleControlShowPopup(15, 15, -15, -15, "Viện nguyên lão", "") // Lỗi 
            break
        case 18 && -11 :
            handleControlShowPopup(18, 18, -11, -11, "Thành Roma", "") // Lỗi
            break
        case 21 && -12 :
            handleControlShowPopup(21, 21, -12, -12, "Bức tượng hoàng đế Elagabalus", "") //Lỗi 
            break
        case 22 && -11 :
            handleControlShowPopup(22, 22, -11, -11, "Đấu trường Roma", "") // Lỗi
            break
        case 22 && -6 :
            handleControlShowPopup(22, 22, -6, -6, "Triết học Hy Lạp", "")
            break
        case 20 && -4 :
            handleControlShowPopup(20, 20, -4, -4, "Thành phố Florence, Italy", "")
            break
        case 16 && -5 :
            handleControlShowPopup(16, 16, -5, -5, "Hình ảnh một đấu sỹ đấu lợn rừng", "")
            break
        // Room 4 (lỗi 8)
        default:
        if (panel) {
            panel.remove()
        }
        break
    }      
 
})

//===============================================Room1============================================
const nameFrameLoaderRoom1 = new OBJLoader().load(frameNormalPath,(obj) => {
    obj.scale.setScalar(0.001)
    obj.position.set(20,1.8,8.3)
    obj.rotateY(Math.PI)
    scene.add(obj)
}); 

//--------------image1 --------------------
const image1Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/1.Bản đồ_sông Euphrates & sông Tigris/1.Bản đồ_sông Euphrates & sông Tigris.jpg'),
}))
image1Room1.scale.set(1.6,1.6,50)
image1Room1.rotateY(Math.PI)
image1Room1.position.set(21.5,2.2,13)
scene.add(image1Room1)

const banner1Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/1.Bản đồ_sông Euphrates & sông Tigris/Ảnh màn hình 2023-02-09 lúc 23.34.52.png'),
}))
banner1Room1.scale.set(0.6,0.15,50)
banner1Room1.rotateY(Math.PI)
banner1Room1.position.set(21.5,1.2,13)
scene.add(banner1Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "Bản đồ sông Euphrates & sông Tigris" , "" )
//      return false      
// })


//-------------
//----------------------------------


//--------------image2 --------------------
const image2Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/2.Sông Nin/2.Sông Nin.jpg'),
    side :  backside
}))
image2Room1.scale.set(1.7,1.2,50)
image2Room1.rotateY(Math.PI / 2)
image2Room1.position.set(20.15,2.2,14.6)
scene.add(image2Room1)


const banner2Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/2.Sông Nin/Ảnh màn hình 2023-02-09 lúc 23.35.10.png'),
    side :  backside
}))
banner2Room1.scale.set(0.6,0.15,50)
banner2Room1.rotateY(Math.PI / 2)
banner2Room1.position.set(20.15,1.2,14.6)
scene.add(banner2Room1)

/// dòng này
// window.addEventListener("keydown", function (event) {
// })
//-------------
//----------------------------------


//--------------image3 --------------------
const image3Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/3.Sông Euphrates ở gần Ar Raqqah, Syria/3.Sông Euphrates ở gần Ar Raqqah, Syria.jpg'),
    side :  backside
}))
image3Room1.scale.set(1.9,1.2,50)
image3Room1.rotateY(Math.PI / 2)
image3Room1.position.set(20.15,2.2,17.6)
scene.add(image3Room1)

const banner3Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/3.Sông Euphrates ở gần Ar Raqqah, Syria/Ảnh màn hình 2023-02-09 lúc 23.35.23.png'),
    side :  backside
}))
banner3Room1.scale.set(0.6,0.15,50)
banner3Room1.rotateY(Math.PI / 2)
banner3Room1.position.set(20.15,1.2,17.6)
scene.add(banner3Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(19.45727781654154, 18.957491015020786 , 18.38776438417626  , 17.036732538988986  , "Sông Euphrates ở gần Ar Raqqah, Syria" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//       handleControlShowPopup(19.45727781654154, 18.957491015020786 , 18.38776438417626 , 17.036732538988986  , "Sông Euphrates ở gần Ar Raqqah, Syria" , "" )          
// })
//----------------------------------

//--------------image4 --------------------

const image4Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/4. Sông Tigris ở Mosul, Iraq/4. Sông Tigris ở Mosul, Iraq.jpg'),
    side :  backside
}))
image4Room1.scale.set(1.9,1.2,50)
image4Room1.rotateY(Math.PI / 2)
image4Room1.position.set(20.15,2.2,20.6)
scene.add(image4Room1)

const banner4Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/4. Sông Tigris ở Mosul, Iraq/Ảnh màn hình 2023-02-09 lúc 23.35.38.png'),
    side :  backside
}))
banner4Room1.scale.set(0.6,0.15,50)
banner4Room1.rotateY(Math.PI / 2)
banner4Room1.position.set(20.15,1.2,20.6)
scene.add(banner4Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })
//----------------------------------


//--------------image5 --------------------
const image5Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/5.Các vị thần Geb và Nut_Nut tượng trưng cho bầu trời với những vì sao bao bọc Trái Đất/5.Các vị thần Geb và Nut_Nut tượng trưng cho bầu trời với những vì sao bao bọc Trái Đất.jpg'),
    side :  backside
}))
image5Room1.scale.set(3.9,3.2,50)
image5Room1.position.set(17.3,2.8,21.8)
scene.add(image5Room1)

const banner5Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/5.Các vị thần Geb và Nut_Nut tượng trưng cho bầu trời với những vì sao bao bọc Trái Đất/Ảnh màn hình 2023-02-09 lúc 23.35.49.png'),
    side :  backside
}))
banner5Room1.scale.set(0.6,0.15,50)
banner5Room1.position.set(17.3,1,21.8)
scene.add(banner5Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })
//----------------------------------

//--------------image6 --------------------
const image6Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/6.Số học/6.Số học.jpg'),
}))
image6Room1.scale.set(2.9,2.2,50)
image6Room1.position.set(16.3,2.6,8.5)
scene.add(image6Room1)

const banner6Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/6.Số học/Ảnh màn hình 2023-02-09 lúc 23.36.07.png'),
}))
banner6Room1.scale.set(0.6,0.15,50)
banner6Room1.position.set(16.3,1.2,8.5)
scene.add(banner6Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })
//----------------------------------

//--------------image7 --------------------
const image7Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/7.Chữ tượng hình của Ai Cập cổ đại/7.Chữ tượng hình của Ai Cập cổ đại.jpg'),
}))
image7Room1.scale.set(2.9,2.2,50)
image7Room1.position.set(11.3,2.6,8.5)
scene.add(image7Room1)

const banner7Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/7.Chữ tượng hình của Ai Cập cổ đại/Ảnh màn hình 2023-02-09 lúc 23.36.17.png'),
}))
banner7Room1.scale.set(0.6,0.15,50)
banner7Room1.position.set(11.3,1.2,8.5)
scene.add(banner7Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })


//----------------------------------

//--------------image8 --------------------
const image8Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/8.Thành tựu khoa học của người Ai Cập cổ đại/8.Thành tựu khoa học của người Ai Cập cổ đại.jpg'),
    side :  backside
}))
image8Room1.scale.set(2.4,1.8,50)
image8Room1.rotateY(Math.PI *2)
image8Room1.position.set(9.8,2.6,17.8)
scene.add(image8Room1)

const banner8Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/8.Thành tựu khoa học của người Ai Cập cổ đại/Ảnh màn hình 2023-02-09 lúc 23.36.26.png'),
    side :  backside
}))
banner8Room1.scale.set(0.6,0.15,50)
banner8Room1.rotateY(Math.PI *2)
banner8Room1.position.set(9.8,1.2,17.8)
scene.add(banner8Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })
//----------------------------------

//--------------image9 --------------------
const image9Room1 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/9.Tượng Xphanh (Nhân sư)/9.Tượng Xphanh (Nhân sư).jpg'),
    side :  backside
}))
image9Room1.scale.set(2.4,1.8,50)
image9Room1.rotateY(Math.PI *2)
image9Room1.position.set(12.6,2.6,17.8)
scene.add(image9Room1)

const banner9Room1 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/9.Tượng Xphanh (Nhân sư)/Ảnh màn hình 2023-02-09 lúc 23.36.35.png'),
    side :  backside
}))
banner9Room1.scale.set(0.6,0.15,50)
banner9Room1.rotateY(Math.PI *2)
banner9Room1.position.set(12.6,1.2,17.8)
scene.add(banner9Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })
//----------------------------------

// const image10Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
//     map: new TextureLoader().load('object/picture/room1/10.Hình ảnh một đấu sỹ đấu lợn rừng.jpg'),
// }))
// image10Room1.scale.set(3.9,3.2,50)
// image10Room1.rotateY(Math.PI / 2)
// image10Room1.position.set(14.5,2.6,20.1)
// scene.add(image10Room1)

//--------------image11 --------------------
const image11Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/11.Việc đo đạc của người Ai Cập/11.Việc đo đạc của người Ai Cập.jpg'),
}))
image11Room1.scale.set(2.4,1.8,50)
image11Room1.rotateY(Math.PI / 2)
image11Room1.position.set(8.3,2.6,15.2)
scene.add(image11Room1)

const banner11Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/11.Việc đo đạc của người Ai Cập/Ảnh màn hình 2023-02-09 lúc 23.36.45.png'),
}))
banner11Room1.scale.set(0.6,0.15,50)
banner11Room1.rotateY(Math.PI / 2)
banner11Room1.position.set(8.3,1.2,15.2)
scene.add(banner11Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })
//--------------image12 --------------------

const image12Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/12.Điều kiện tự nhiên/12.Điều kiện tự nhiên.jpg'),
}))
image12Room1.scale.set(2.4,1.8,50)
image12Room1.rotateY(Math.PI / 2)
image12Room1.position.set(8.3,2.6,10.6)
scene.add(image12Room1)

const banner12Room1 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room1/12.Điều kiện tự nhiên/Ảnh màn hình 2023-02-09 lúc 23.36.54.png'),
}))
banner12Room1.scale.set(0.6,0.15,50)
banner12Room1.rotateY(Math.PI / 2)
banner12Room1.position.set(8.3,1.2,10.6)
scene.add(banner12Room1)

// window.addEventListener("keydown", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

// window.addEventListener("keyup", function (event) {
//      handleControlShowPopup(21.918679794853347, 20.418975732027548 , 12.1606322047686 , 10.660637060936335 , "" , "" )      
// })

//===============================================Room2============================================
const nameFrameLoaderRoom2 = new OBJLoader().load(frameNormalPath,(obj) => {
    obj.scale.setScalar(0.001)
    obj.position.set(5,1.8,8.3)
    obj.rotateY(Math.PI)
    scene.add(obj)
}); 


//--------------image1 --------------------

const image1Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/1.Lược đồ Ấn Độ cổ đại/1.Lược đồ Ấn Độ cổ đại.jpg'),
}))
image1Room2.scale.set(1.6,1.6,50)
image1Room2.rotateY(Math.PI)
image1Room2.position.set(6.5,2.2,13)
scene.add(image1Room2)

const banner1Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/1.Lược đồ Ấn Độ cổ đại/Ảnh màn hình 2023-02-09 lúc 23.37.20.png'),
}))
banner1Room2.scale.set(0.6,0.15,50)
banner1Room2.rotateY(Math.PI)
banner1Room2.position.set(6.5,1.2,13)
scene.add(banner1Room2)

//--------------image2--------------------

const image2Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/2. Chữ San - krít trên lá cọ/2. Chữ San - krít trên lá cọ.jpg'),
    side :  backside
}))
image2Room2.scale.set(1.7,1.2,50)
image2Room2.rotateY(Math.PI / 2)
image2Room2.position.set(5.15,2.2,14.6)
scene.add(image2Room2)

const banner2Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/2. Chữ San - krít trên lá cọ/Ảnh màn hình 2023-02-09 lúc 23.37.32.png'),
    side :  backside
}))
banner2Room2.scale.set(0.6,0.15,50)
banner2Room2.rotateY(Math.PI / 2)
banner2Room2.position.set(5.15,1.2,14.6)
scene.add(banner2Room2)

//--------------image3--------------------

const image3Room2 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/3.Đạo Bà La Môn/3.Đạo Bà La Môn.jpg'),
    side :  backside
}))
image3Room2.scale.set(1.9,1.2,50)
image3Room2.rotateY(Math.PI / 2)
image3Room2.position.set(5.15,2.2,17.6)
scene.add(image3Room2)

const banner3Room2 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/3.Đạo Bà La Môn/Ảnh màn hình 2023-02-09 lúc 23.38.11.png'),
    side :  backside
}))
banner3Room2.scale.set(0.6,0.15,50)
banner3Room2.rotateY(Math.PI / 2)
banner3Room2.position.set(5.15,1.2,17.6)
scene.add(banner3Room2)

//--------------image4--------------------

const image4Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/4.Văn học, nghệ thuật Ấn Độ cổ đại/4.Văn học, nghệ thuật Ấn Độ cổ đại.jpg'),
    side :  backside
}))
image4Room2.scale.set(1.9,1.2,50)
image4Room2.rotateY(Math.PI / 2)
image4Room2.position.set(5.15,2.2,20.6)
scene.add(image4Room2)

const banner4Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/4.Văn học, nghệ thuật Ấn Độ cổ đại/Ảnh màn hình 2023-02-09 lúc 23.38.30.png'),
    side :  backside
}))
banner4Room2.scale.set(0.6,0.15,50)
banner4Room2.rotateY(Math.PI / 2)
banner4Room2.position.set(5.15,1.2,20.6)
scene.add(banner4Room2)

//--------------image5--------------------

const image5Room2 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/5.Y dược học Ấn Độ cổ đại/5.Y dược học Ấn Độ cổ đại.jpg'),
    side :  backside
}))
image5Room2.scale.set(3.5,3.0,50)
image5Room2.position.set(2.3,2.6,21.8)
scene.add(image5Room2)

const banner5Room2 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/5.Y dược học Ấn Độ cổ đại/4.png'),
    side :  backside
}))
banner5Room2.scale.set(0.6,0.15,50)
banner5Room2.position.set(2.3,0.8,21.8)
scene.add(banner5Room2)
//--------------image6--------------------

const image6Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/6. Công trình kiến trúc Hồi giáo nổi bật_tháp Mina/6. Công trình kiến trúc Hồi giáo nổi bật_tháp Mina.jpg'),
}))
image6Room2.scale.set(2.9,2.2,50)
image6Room2.position.set(1.4,2.6,8.5)
scene.add(image6Room2)

const banner6Room2 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/6. Công trình kiến trúc Hồi giáo nổi bật_tháp Mina/Ảnh màn hình 2023-02-09 lúc 23.38.40.png'),
}))
banner6Room2.scale.set(0.6,0.15,50)
banner6Room2.position.set(1.4,1.2,8.5)
scene.add(banner6Room2)
//--------------image7--------------------

const image7Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/7.Toán học/7. Toán học.jpg'),
}))
image7Room2.scale.set(2.9,2.2,50)
image7Room2.position.set(-3.2,2.6,8.5)
scene.add(image7Room2)

const banner7Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/7.Toán học/3.png'),
}))
banner7Room2.scale.set(0.6,0.15,50)
banner7Room2.position.set(-3.2,1.2,8.5)
scene.add(banner7Room2)


//--------------image8--------------------

// // const image8Room2 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
// //     map: new TextureLoader().load('object/picture/room1/8.Thành tựu khoa học của người Ai Cập cổ đại.jpg'),
// //     side :  backside
// // }))
// // image8Room2.scale.set(2.4,1.8,50)
// // image8Room2.rotateY(Math.PI * 2)
// // image8Room2.position.set(9.8,2.6,17.8)
// // scene.add(image8Room2)


// const banner8Room2 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
//     map: new TextureLoader().load('object/picture/room1/8.Thành tựu khoa học của người Ai Cập cổ đại.jpg'),
//     side :  backside
// }))
// banner8Room2.scale.set(2.4,1.8,50)
// banner8Room2.rotateY(Math.PI * 2)
// banner8Room2.position.set(9.8,1.2,17.8)
// scene.add(banner8Room2)

//--------------image9--------------------

const image9Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/9. Pháo đài Đỏ_La Ki - la/9. Pháo đài Đỏ_La Ki - la.png'),
    side :  backside
}))
image9Room2.scale.set(2.4,1.8,50)
image9Room2.rotateY(Math.PI * 2)
image9Room2.position.set(-2.2,2.6,17.8)
scene.add(image9Room2)

const banner9Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/9. Pháo đài Đỏ_La Ki - la/Ảnh màn hình 2023-02-09 lúc 23.38.59.png'),
    side :  backside
}))
banner9Room2.scale.set(0.6,0.15,50)
banner9Room2.rotateY(Math.PI * 2)
banner9Room2.position.set(-2.2,1.2,17.8)
scene.add(banner9Room2)

//--------------image10--------------------

const image10Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/10.Lăng Ta - giơ Ma - tan/10.Lăng Ta - giơ Ma - tan.jpg'),
}))
image10Room2.scale.set(6.9,3.2,50)
image10Room2.rotateY(Math.PI / 2)
image10Room2.position.set(-7,2.6,13.2)
scene.add(image10Room2)

const banner10Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/10.Lăng Ta - giơ Ma - tan/Ảnh màn hình 2023-02-09 lúc 23.39.07.png'),
}))
banner10Room2.scale.set(0.6,0.15,50)
banner10Room2.rotateY(Math.PI / 2)
banner10Room2.position.set(-7,0.8,13.2)
scene.add(banner10Room2)

//--------------image11--------------------

const image11Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/11.Triết học/11. Triết học.jpg'),
}))
image11Room2.scale.set(3.9,3.2,50)
image11Room2.rotateY(Math.PI / 2)
image11Room2.position.set(-0.6,2.6,20.1)
scene.add(image11Room2)

const banner11Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/11.Triết học/Ảnh màn hình 2023-02-09 lúc 23.39.17.png'),
}))
banner11Room2.scale.set(0.6,0.15,50)
banner11Room2.rotateY(Math.PI / 2)
banner11Room2.position.set(-0.6,0.8,20.1)
scene.add(banner11Room2)

//--------------image12--------------------

const image12Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/12.Thành phố Ha - ráp - pa/12.Thành phố Ha - ráp - pa.jpg'),
    side :  backside
}))
image12Room2.scale.set(2.4,1.8,50)
image12Room2.rotateY(Math.PI * 2)
image12Room2.position.set(-5.5,2.6,17.8)
scene.add(image12Room2)

const banner12Room2 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room2/12.Thành phố Ha - ráp - pa/Ảnh màn hình 2023-02-09 lúc 23.39.25.png'),
    side :  backside
}))
banner12Room2.scale.set(0.6,0.15,50)
banner12Room2.rotateY(Math.PI * 2)
banner12Room2.position.set(-5.5,1.2,17.8)
scene.add(banner12Room2)

//===============================================Room3============================================
const nameFrameLoaderRoom3 = new OBJLoader().load(frameNormalPath,(obj) => {
    obj.scale.setScalar(0.001)
    obj.position.set(-4,1.8,-3.1)

    scene.add(obj)
}); 

//--------------image1--------------------

const image1Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/1.In ấn/1.In ấn.jpg'),
}))
image1Room3.scale.set(1.6,1.6,50)
image1Room3.position.set(-5.6,2.2,-8.1)
scene.add(image1Room3)

const banner1Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/1.In ấn/Ảnh màn hình 2023-02-09 lúc 23.39.32.png'),
}))
banner1Room3.scale.set(0.6,0.15,50)
banner1Room3.position.set(-5.6,1.2,-8.1)
scene.add(banner1Room3)

//--------------image2--------------------

const image2Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/3.La bàn/3.La bàn.jpg'),
}))
image2Room3.scale.set(1.7,1.2,50)
image2Room3.rotateY(Math.PI / 2)
image2Room3.position.set(-3.9,2.2,-10.3)
scene.add(image2Room3)

const banner2Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/3.La bàn/Ảnh màn hình 2023-02-09 lúc 23.39.49.png'),
}))
banner2Room3.scale.set(0.6,0.15,50)
banner2Room3.rotateY(Math.PI / 2)
banner2Room3.position.set(-3.9,1.2,-10.3)
scene.add(banner2Room3)

//--------------image3--------------------

const image3Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/4.Đồng hồ cơ khí/4.Đồng hồ cơ khí.jpg'),
}))
image3Room3.scale.set(1.7,1.2,50)
image3Room3.rotateY(Math.PI / 2)
image3Room3.position.set(-3.9,2.2,-12.7)
scene.add(image3Room3)

const banner3Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/4.Đồng hồ cơ khí/Ảnh màn hình 2023-02-09 lúc 23.39.58.png'),
}))
banner3Room3.scale.set(0.6,0.15,50)
banner3Room3.rotateY(Math.PI / 2)
banner3Room3.position.set(-3.9,1.2,-12.7)
scene.add(banner3Room3)

//--------------image4--------------------

const image4Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/5.Kinh thi/5.Kinh thi.jpg'),
}))
image4Room3.scale.set(1.7,1.2,50)
image4Room3.rotateY(Math.PI / 2)
image4Room3.position.set(-3.9,2.2,-15.1)
scene.add(image4Room3)

const banner4Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/5.Kinh thi/Ảnh màn hình 2023-02-09 lúc 23.40.06.png'),
}))
banner4Room3.scale.set(0.6,0.15,50)
banner4Room3.rotateY(Math.PI / 2)
banner4Room3.position.set(-3.9,1.2,-15.1)
scene.add(banner4Room3)

//--------------image5--------------------

const image5Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/6.Giấy/6.Giấy.jpg'),
}))
image5Room3.scale.set(3.9,3.2,50)
image5Room3.position.set(-1,2.6,-17.1)
scene.add(image5Room3)

const banner5Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/6.Giấy/Ảnh màn hình 2023-02-09 lúc 23.40.17.png'),
}))
banner5Room3.scale.set(0.6,0.15,50)
banner5Room3.position.set(-1,0.8,-17.1)
scene.add(banner5Room3)

//--------------image6--------------------

const image6Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/7.Chữ viết trên thẻ tre/7.Chữ viết trên thẻ tre.jpg'),
    side: backside
}))
image6Room3.scale.set(3.2,2.8,50)
image6Room3.rotateY(Math.PI / 2)
image6Room3.position.set(1.6,2.4,-15)
scene.add(image6Room3)

const banner6Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/7.Chữ viết trên thẻ tre/Ảnh màn hình 2023-02-09 lúc 23.40.26.png'),
    side: backside
}))
banner6Room3.scale.set(0.6,0.15,50)
banner6Room3.rotateY(Math.PI / 2)
banner6Room3.position.set(1.6,0.8,-15)
scene.add(banner6Room3)

//--------------image7--------------------

const image7Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/7.nhà tư tưởng vĩ đại nhất Trung Quốc thời kỳ cổ đại/2. 7 nhà tư tưởng vĩ đại nhất Trung Quốc thời kỳ cổ đại.jpg'),
}))
image7Room3.scale.set(2.4,1.8,50)
image7Room3.position.set(3.5,2.2,-12.8)
scene.add(image7Room3)

const banner7Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/7.nhà tư tưởng vĩ đại nhất Trung Quốc thời kỳ cổ đại/Matteo.png'),
}))
banner7Room3.scale.set(0.6,0.15,50)
banner7Room3.position.set(3.5,1,-12.8)
scene.add(banner7Room3)


//--------------image8--------------------

const image8Room3 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/8.Vạn Lý Trường Thành/8.Vạn Lý Trường Thành.jpg'),
}))
image8Room3.scale.set(2.4,1.8,50)
image8Room3.position.set(6.6,2.2,-12.8)
scene.add(image8Room3)

const banner8Room3 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/8.Vạn Lý Trường Thành/Ảnh màn hình 2023-02-09 lúc 23.40.47.png'),
}))
banner8Room3.scale.set(0.6,0.15,50)
banner8Room3.position.set(6.6,1,-12.8)
scene.add(banner8Room3)

//--------------image9--------------------

const image9Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/9.Cửu chương lập thành toán pháp/9.Cửu chương lập thành toán pháp.jpg'),
    side: backside
}))
image9Room3.scale.set(2.4,1.8,50)
image9Room3.rotateY(Math.PI / 2)
image9Room3.position.set(8,2.2,-10.5)
scene.add(image9Room3)

const banner9Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room3/9.Cửu chương lập thành toán pháp/Ảnh màn hình 2023-02-09 lúc 23.40.56.png'),
    side: backside
}))
banner9Room3.scale.set(0.6,0.15,50)
banner9Room3.rotateY(Math.PI / 2)
banner9Room3.position.set(8,0.8,-10.5)
scene.add(banner9Room3)

// //--------------image10--------------------

// const image10Room3 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
//     map: new TextureLoader().load('object/picture/room3/1.In ấn.jpg'),
//     side: backside
// }))
// image10Room3.scale.set(2.4,1.8,50)
// image10Room3.rotateY(Math.PI / 2)
// image10Room3.position.set(7.6,2.2,-5.8)
// scene.add(image10Room3)

// const banner10Room3 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
//     map: new TextureLoader().load('object/picture/room3/1.In ấn.jpg'),
//     side: backside
// }))
// banner10Room3.scale.set(0.6,0.15,50)
// banner10Room3.rotateY(Math.PI / 2)
// banner10Room3.position.set(7.6,0.8,-5.8)
// scene.add(banner10Room3)

// //--------------image11--------------------

// const image11Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
//     map: new TextureLoader().load('object/picture/room3/1.In ấn.jpg'),
//     side: backside
// }))
// image11Room3.scale.set(3.4,1.8,50)
// image11Room3.position.set(0.2,2.2,-3.6)
// scene.add(image11Room3)

// const banner11Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
//     map: new TextureLoader().load('object/picture/room3/1.In ấn.jpg'),
//     side: backside
// }))
// banner11Room3.scale.set(0.6,0.15,50)
// banner11Room3.position.set(0.2,0.8,-3.6)
// scene.add(banner11Room3)

// //--------------image12--------------------

// const image12Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
//     map: new TextureLoader().load('object/picture/room3/1.In ấn.jpg'),
//           side: backside
// }))
// image12Room3.scale.set(3.4,1.8,50)
// image12Room3.position.set(4.6,2.2,-3.5)
// scene.add(image12Room3)

// const banner12Room3 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
//     map: new TextureLoader().load('object/picture/room3/1.In ấn.jpg'),
//           side: backside
// }))
// banner12Room3.scale.set(0.6,0.15,50)
// banner12Room3.position.set(4.6,0.8,-3.5)
// scene.add(banner12Room3)


//===============================================Room4============================================
const nameFrameLoaderRoom4 = new OBJLoader().load(frameNormalPath,(obj) => {
    obj.scale.setScalar(0.001)
    obj.position.set(21,1.8,-3.1)
    scene.add(obj)
}); 

//--------------image1--------------------

const image1Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/1.Lược đồ Hy Lạp cổ đại/1.Lược đồ Hy Lạp cổ đại.jpg'),
}))
image1Room4.scale.set(1.6,1.6,50)
image1Room4.position.set(9.45,2.2,-8.02)
scene.add(image1Room4)

const banner1Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/1.Lược đồ Hy Lạp cổ đại/Ảnh màn hình 2023-02-09 lúc 23.41.13.png'),
}))
banner1Room4.scale.set(0.6,0.15,50)
banner1Room4.position.set(9.45,1.2,-8.02)
scene.add(banner1Room4)

//--------------image2--------------------

const image2Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/2.Bản đồ La Mã (từ thế kỉ V TCN đến thế kỉ II)/2.Bản đồ La Mã (từ thế kỉ V TCN đến thế kỉ II).jpg'),
}))
image2Room4.scale.set(1.7,1.2,50)
image2Room4.rotateY(Math.PI / 2)
image2Room4.position.set(11,2.2,-10.3)
scene.add(image2Room4)

const banner2Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/2.Bản đồ La Mã (từ thế kỉ V TCN đến thế kỉ II)/Ảnh màn hình 2023-02-09 lúc 23.41.06.png'),
}))
banner2Room4.scale.set(0.6,0.15,50)
banner2Room4.rotateY(Math.PI / 2)
banner2Room4.position.set(11,1.2,-10.3)
scene.add(banner2Room4)

//--------------image3--------------------

const image3Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/3.Sử thi Iliad/3. Sử thi Iliad.jpg'),
}))
image3Room4.scale.set(1.7,1.2,50)
image3Room4.rotateY(Math.PI / 2)
image3Room4.position.set(11,2.2,-12.7)
scene.add(image3Room4)

const banner3Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/3.Sử thi Iliad/5.png'),
}))
banner3Room4.scale.set(0.6,0.15,50)
banner3Room4.rotateY(Math.PI / 2)
banner3Room4.position.set(11,1.2,-12.7)
scene.add(banner3Room4)

//--------------image4--------------------

const image4Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/4.Một cảnh trong tác phẩm Eudipe/4.Một cảnh trong tác phẩm Eudipe.jpg'),
}))
image4Room4.scale.set(1.7,1.2,50)
image4Room4.rotateY(Math.PI / 2)
image4Room4.position.set(11,2.2,-15.1)
scene.add(image4Room4)

const banner4Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/4.Một cảnh trong tác phẩm Eudipe/Ảnh màn hình 2023-02-09 lúc 23.41.51.png'),
}))
banner4Room4.scale.set(0.6,0.15,50)
banner4Room4.rotateY(Math.PI / 2)
banner4Room4.position.set(11,1.2,-15.1)
scene.add(banner4Room4)

//--------------image5--------------------

const image5Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/5.Cảnh quan/5.Cảnh quan Firenze, trung tâm bắt nguồn Phục Hưng.jpg'),
}))
image5Room4.scale.set(3.9,3.2,50)
image5Room4.position.set(14,2.5,-17.1)
scene.add(image5Room4)

const banner5Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/5.Cảnh quan/Ảnh màn hình 2023-02-09 lúc 23.42.04.png'),
}))
banner5Room4.scale.set(0.6,0.15,50)
banner5Room4.position.set(14,0.8,-17.1)
scene.add(banner5Room4)

//--------------image6--------------------

const image6Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/6.Viện Nguyên Lão/Ảnh màn hình 2023-03-08 lúc 15.43.13.png'),
    side: backside
}))
image6Room4.scale.set(3.2,2.8,50)
image6Room4.rotateY(Math.PI / 2)
image6Room4.position.set(16.5,2.5,-15)
scene.add(image6Room4)

const banner6Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/6.Viện Nguyên Lão/Ảnh màn hình 2023-02-09 lúc 23.42.26.png'),
    side: backside
}))
banner6Room4.scale.set(0.6,0.15,50)
banner6Room4.rotateY(Math.PI / 2)
banner6Room4.position.set(16.5,0.8,-15)
scene.add(banner6Room4)

//--------------image7--------------------

const image7Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/7.Thành Roma/7.Thành Roma.jpg'),
}))
image7Room4.scale.set(2.4,1.8,50)
image7Room4.position.set(18.2,2.2,-12.6)
scene.add(image7Room4)

const banner7Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/7.Thành Roma/Ảnh màn hình 2023-02-09 lúc 23.42.36.png'),
}))
banner7Room4.scale.set(0.6,0.15,50)
banner7Room4.position.set(18.2,0.8,-12.6)
scene.add(banner7Room4)

//--------------image8--------------------

const image8Room4 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/8.Bức tượng hoàng đế Elagabalus/8.Bức tượng hoàng đế Elagabalus.jpg'),
}))
image8Room4.scale.set(2.4,1.8,50)
image8Room4.position.set(21.6,2.2,-12.6)
scene.add(image8Room4)

const banner8Room4 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/8.Bức tượng hoàng đế Elagabalus/Ảnh màn hình 2023-02-09 lúc 23.42.48.png'),
}))
banner8Room4.scale.set(0.6,0.15,50)
banner8Room4.position.set(21.6,0.8,-12.6)
scene.add(banner8Room4)

//--------------image9--------------------

const image9Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/9.Đấu trường Roma/9.Đấu trường Roma.jpg'),
    side: backside
}))
image9Room4.scale.set(2.4,1.8,50)
image9Room4.rotateY(Math.PI / 2)
image9Room4.position.set(23,2.2,-10.5)
scene.add(image9Room4)

const banner9Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/9.Đấu trường Roma/Ảnh màn hình 2023-02-09 lúc 23.43.12.png'),
    side: backside
}))
banner9Room4.scale.set(0.6,0.15,50)
banner9Room4.rotateY(Math.PI / 2)
banner9Room4.position.set(23,0.8,-10.5)
scene.add(banner9Room4)

//--------------image10--------------------

const image10Room4 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/10.Triết học/10.Triết học_Hy Lạp.jpg'),
    side: backside
}))
image10Room4.scale.set(2.4,1.8,50)
image10Room4.rotateY(Math.PI / 2)
image10Room4.position.set(23,2.2,-5.8)
scene.add(image10Room4)

const banner10Room4 =  new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/10.Triết học/6.png'),
    side: backside
}))
banner10Room4.scale.set(0.6,0.15,50)
banner10Room4.rotateY(Math.PI / 2)
banner10Room4.position.set(23,0.8,-5.8)
scene.add(banner10Room4)

//--------------image11--------------------

const image11Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/11.Hình ảnh một đấu sỹ đấu lợn rừng/11.Hình ảnh một đấu sỹ đấu lợn rừng.jpg'),
    side: backside
}))
image11Room4.scale.set(3.4,1.8,50)
image11Room4.position.set(15.6,2.2,-3.7)
scene.add(image11Room4)

const banner11Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/11.Hình ảnh một đấu sỹ đấu lợn rừng/Ảnh màn hình 2023-02-09 lúc 23.43.21.png'),
    side: backside
}))
banner11Room4.scale.set(0.6,0.15,50)
banner11Room4.position.set(15.6,0.8,-3.7)
scene.add(banner11Room4)

//--------------image12--------------------

const image12Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/12.Thành phố Florence (Italy)/12.Thành phố Florence Italy.jpg'),
          side: backside
}))
image12Room4.scale.set(3.4,1.8,50)
image12Room4.position.set(20,2.2,-3.7)
scene.add(image12Room4)

const banner12Room4 = new Mesh(new PlaneGeometry(),new MeshBasicMaterial({
    map: new TextureLoader().load('object/picture/room4/12.Thành phố Florence (Italy)/Ảnh màn hình 2023-02-09 lúc 23.43.32.png'),
          side: backside
}))
banner12Room4.scale.set(0.6,0.15,50)
banner12Room4.position.set(20,0.8,-3.7)
scene.add(banner12Room4)

//-----------------------------------------------------------------
//Pedestal
//rơw 1
const PedestalPath : string = 'object/Pedestal/Pedestal.obj';
// const PedestalLoader1 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX + 6,1.3 , -5)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// });
//-------------------------------Statue-1
const PedestalLoader2 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const StatueLoader2 = new FBXLoader().load("object/statue/pyramid/source/Pyramid.fbx", (obj) => {
        obj.position.set(tempPositionX + 6,1.7,-0.7)
        obj.scale.setScalar(0.1)
        // obj.rotateX(Math.PI / 2 )
         scene.add(obj)
});

//-------------------------------Statue-2
const PedestalLoader3 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 6,1.3,6)
        obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const StatueLoader3 = new GLTFLoader().load("object/statue/ancient_greek_coin/scene.gltf", (obj) => {
    obj.scene.position.set(tempPositionX + 6,1.7,5.3)
    obj.scene.scale.setScalar(0.3)
    scene.add(obj.scene)
});

// const PedestalLoader4 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX + 6,1.3,10)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// });
//row2
// const PedestalLoader5 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX + 3,1.3 , -5)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// });

//-------------------------------Statue-3

const PedestalLoader6 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const StatueLoader6 = new GLTFLoader().load("object/statue/aphrodite_of_milos_a_plaster_cast/scene.gltf", (obj) => {
    obj.scene.position.set(tempPositionX + 2.8,2.1,-0.6)
    obj.scene.scale.setScalar(0.001)
    scene.add(obj.scene)
});


//-------------------------------Statue-4

const PedestalLoader7 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 3,1.3,6)
        obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const StatueLoader7 = new FBXLoader().load("object/statue/egyptian-hieroglyph/source/Egyptian Hieroglyph.FBX", (obj) => {
        obj.position.set(tempPositionX + 3,2.1,5.3)
        obj.scale.setScalar(0.001)
        // obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

// const PedestalLoader8 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX + 3,1.3,10)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// })
//row3
// const PedestalLoader9 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX,1.3 , -5)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// });

//-------------------------------Statue-5

const PedestalLoader10 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const StatueLoader10 = new FBXLoader().load("object/statue/harappan-pot-2/source/23.fbx", (obj) => {
        obj.position.set(tempPositionX,1.5,-0.6)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

//-------------------------------Statue-6

const PedestalLoader11 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX,1.3,6)
        obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

const StatueLoader11 = new OBJLoader().load("object/statue/sphinx/source/uu-exported.obj", (obj) => {
    obj.position.set(tempPositionX - 0.4,1.8,5.3)
    obj.scale.setScalar(0.03)
    obj.rotateX(Math.PI )
    obj.rotateY(Math.PI / 2)
    scene.add(obj)
});

// const PedestalLoader12 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX,1.3,10)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// })
//row4 
// const PedestalLoader13 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX + 9,1.3 , -5)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// });

//-------------------------------Statue-7

const PedestalLoader14 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

//-------------------------------Statue-8

const PedestalLoader15 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 9,1.3,6)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

// const PedestalLoader16 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX + 9,1.3,10)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// })
//row5
// const PedestalLoader17 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX + 13,1.3 , -5)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//     scene.add(obj)
// });

//-------------------------------Statue-9

const PedestalLoader18 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,1.3,0)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

//-------------------------------Statue-10

const PedestalLoader19 = new OBJLoader().load(PedestalPath, (obj) => {
        obj.position.set(tempPositionX + 13,1.3,6)
             obj.scale.setScalar(0.06)
        obj.rotateX(Math.PI / 2 )
    scene.add(obj)
});

// const PedestalLoader20 = new OBJLoader().load(PedestalPath, (obj) => {
//         obj.position.set(tempPositionX + 13,1.3,10)
//              obj.scale.setScalar(0.06)
//         obj.rotateX(Math.PI / 2 )
//            scene.add(obj)
// })



//----------------------------------------------------------------
const onKeyDown = function (event: KeyboardEvent) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(0.25)
            break
        case 'KeyA':
            controls.moveRight(-0.25)
            break
        case 'KeyS':
            controls.moveForward(-0.25)
            break
        case 'KeyD':
            controls.moveRight(0.25)
        case 'ArrowUp':
            controls.moveForward(0.25)
            break
        case 'ArrowLeft':
            controls.moveRight(-0.25)
            break
        case 'ArrowDown':
            controls.moveForward(-0.25)
            break
        case 'ArrowRight':
            controls.moveRight(0.25)
            break
        case 'Numpad8':
            controls.moveForward(0.25)
            break
        case 'Numpad4':
            controls.moveRight(-0.25)
            break
        case 'Numpad2':
            controls.moveForward(-0.25)
            break
        case 'Numpad6':
            controls.moveRight(0.25)
            break
        case 'Enter':
            menuPanel.style.display = 'none'
            controls.lock()
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    TWEEN.update()
    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()




