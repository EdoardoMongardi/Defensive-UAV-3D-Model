import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xcccccc);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 60, 0);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const gridSize = 60;
const gridHelper = new THREE.GridHelper(gridSize, 10, 0x333333, 0x333333);
gridHelper.position.y = -0.5;

const groundGeometry = new THREE.PlaneGeometry(gridSize, gridSize, 32, 32);
groundGeometry.rotateX(-Math.PI/2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000,
  side: THREE.DoubleSide,
  wireframe: true 
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);

groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const groundGeometry2 = new THREE.PlaneGeometry(60, 60, 32, 32);
groundGeometry2.rotateX(-Math.PI / 2);
const groundMaterial2 = new THREE.MeshStandardMaterial({
  color: 0x666666,
  side: THREE.DoubleSide
});
const groundMesh2 = new THREE.Mesh(groundGeometry2, groundMaterial2);
groundMesh2.castShadow = false;
groundMesh2.receiveShadow = true;
scene.add(groundMesh2); 

const spotLight = new THREE.SpotLight(0xffffff, 550000, 500, 0.22, 1);
spotLight.position.set(0, 300, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);
const ambientLight = new THREE.AmbientLight(0xcccccc, 1,5);
scene.add(ambientLight);

const positions = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(10, 0, 20),
  new THREE.Vector3(17, 0, 8),
  new THREE.Vector3(-10, 0, 17),
  new THREE.Vector3(-25, 0, 23),
  new THREE.Vector3(20, 0, -10),
  new THREE.Vector3(5, 0, -15),
  new THREE.Vector3(-20, 0, -13),
  new THREE.Vector3(-5, 0, -10),
  new THREE.Vector3(-25, 0, -15),
  new THREE.Vector3(-23, 0, 4),
  new THREE.Vector3(5, 0, 16),
  new THREE.Vector3(-15, 0, 2),
];
const meshes = positions.map((position) => {
  const boxloader = new GLTFLoader().setPath('assets/box/');
  boxloader.load('scene.gltf', (gltf) => {
    console.log('loading model');
    const mesh = gltf.scene;
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    mesh.position.copy(position);
    mesh.scale.set(6,6,6);
    scene.add(mesh);
  });
});

let mixer;
let actionHover;
const loader = new GLTFLoader().setPath('assets/animated_drone/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;
  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(0, 10, 0);
  mesh.scale.set(20,20,20);
  scene.add(mesh);
  
  mixer = new THREE.AnimationMixer(mesh);
  const clips = gltf.animations;
  actionHover = mixer.clipAction(THREE.AnimationClip.findByName(clips, 'hover'));
  actionHover.play();
  actionHover.paused = false; 
  const animationControlButton = document.getElementById('animation-control1');
  animationControlButton.addEventListener('click', () => {
    if (actionHover.paused) {
      actionHover.paused = false; 
      actionHover.play();
    } else {
      actionHover.paused = true;
    }
  });

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

let mixer2;
let actionHover2;
let mesh2;
const animationControlButton2 = document.getElementById('animation-control2');
const loader2 = new GLTFLoader().setPath('assets/drone2/');
loader2.load('scene.gltf', (gltf2) => {
  console.log('loading model');
  mesh2 = gltf2.scene;
  mesh2.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh2.position.set(20, 0, 20);
  mesh2.rotateY(-Math.PI / 1.35);
  mesh2.scale.set(0.1,0.1,0.1);
  scene.add(mesh2);
  
  mixer2 = new THREE.AnimationMixer(mesh2);
  const clips2 = gltf2.animations;
  actionHover2 = mixer2.clipAction(THREE.AnimationClip.findByName(clips2, 'Animation')); 

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

let mixer3;
let actionHover3;
let mesh3;
const animationControlButton3 = document.getElementById('animation-control3');
const loader3 = new GLTFLoader().setPath('assets/drone2/');
loader3.load('scene.gltf', (gltf3) => {
  console.log('loading model');
  mesh3 = gltf3.scene;
  mesh3.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh3.position.set(-20, 0, -20);
  mesh3.rotateY(Math.PI / 4);
  mesh3.scale.set(0.1,0.1,0.1);
  scene.add(mesh3);
  
  mixer3 = new THREE.AnimationMixer(mesh3);
  const clips3 = gltf3.animations;
  actionHover3 = mixer3.clipAction(THREE.AnimationClip.findByName(clips3, 'Animation'));

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

let mixer4;
let actionHover4;
let mesh4;
const animationControlButton4 = document.getElementById('animation-control4');
const loader4 = new GLTFLoader().setPath('assets/drone2/');
loader4.load('scene.gltf', (gltf4) => {
  console.log('loading model');
  mesh4 = gltf4.scene;
  mesh4.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh4.position.set(-20, 0, 20);
  mesh4.rotateY(Math.PI/1.35 );
  mesh4.scale.set(0.1,0.1,0.1);
  scene.add(mesh4);
  
  mixer4 = new THREE.AnimationMixer(mesh4);
  const clips4 = gltf4.animations;
  actionHover4 = mixer4.clipAction(THREE.AnimationClip.findByName(clips4, 'Animation'));
 
  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let isAnimating2 = false;
let riseComplete2 = false;
let moveComplete2 = false;
let returnComplete2 = false;
let isAnimating3 = false;
let riseComplete3 = false;
let moveComplete3 = false;
let returnComplete3 = false;
let isAnimating4 = false;
let riseComplete4 = false;
let moveComplete4 = false;
let returnComplete4 = false;

function riseDrone2() {
  if (mesh2.position.y < 12) {
    mesh2.position.y += 0.07;
    if (mesh2.position.y >= 12) {
      riseComplete2 = true;
    }
  }
}
function moveDroneToTarget2() {
  if (!riseComplete2) return;

  const currentPosition = mesh2.position;
  const direction = targetPosition.clone().sub(currentPosition).normalize();
  if (currentPosition.distanceTo(targetPosition) > 7.6) {
    currentPosition.add(direction.multiplyScalar(speed));
  } else {
    moveComplete2 = true;
  }
}
function returnDroneToStart2() {
  if (!moveComplete2) return;

  const direction = mesh2.position.clone().sub(targetPosition).normalize();
  if (mesh2.position.distanceTo(targetPosition) > 7.6) {
    mesh2.position.add(direction.multiplyScalar(speed));
  } else {
    returnComplete2 = true;
  }
}

function riseDrone3() {
  if (mesh3.position.y < 12) {
    mesh3.position.y += 0.07;
    if (mesh3.position.y >= 12) {
      riseComplete3 = true;
    }
  }
}
function moveDroneToTarget3() {
  if (!riseComplete3) return;

  const currentPosition = mesh3.position;
  const direction = targetPosition.clone().sub(currentPosition).normalize();
  if (currentPosition.distanceTo(targetPosition) > 7.6) {
    currentPosition.add(direction.multiplyScalar(speed));
  } else {
    moveComplete3 = true;
  }
}
function returnDroneToStart3() {
  if (!moveComplete3) return;

  const direction = mesh3.position.clone().sub(targetPosition).normalize();
  if (mesh3.position.distanceTo(targetPosition) > 7.6) {
    mesh3.position.add(direction.multiplyScalar(speed));
  } else {
    returnComplete3 = true;
  }
}

function riseDrone4() {
  if (mesh4.position.y < 12) {
    mesh4.position.y += 0.07;
    if (mesh4.position.y >= 12) {
      riseComplete4 = true;
    }
  }
}
function moveDroneToTarget4() {
  if (!riseComplete4) return;

  const currentPosition = mesh4.position;
  const direction = targetPosition.clone().sub(currentPosition).normalize();
  if (currentPosition.distanceTo(targetPosition) > 7.6) {
    currentPosition.add(direction.multiplyScalar(speed));
  } else {
    moveComplete4 = true;
  }
}
function returnDroneToStart4() {
  if (!moveComplete4) return;

  const direction = mesh4.position.clone().sub(targetPosition).normalize();
  if (mesh4.position.distanceTo(targetPosition) > 7.6) {
    mesh4.position.add(direction.multiplyScalar(speed));
  } else {
    returnComplete4 = true;
  }
}
const clock1 = new THREE.Clock();
const clock2 = new THREE.Clock();
const clock3 = new THREE.Clock();
const clock4 = new THREE.Clock();
const targetPosition = new THREE.Vector3(0, 10, 0);
const speed = 0.22;

function animate() {
  requestAnimationFrame(animate);
  if(mixer){
      mixer.update(clock1.getDelta());
  }
  if(mixer2){
    mixer2.update(clock2.getDelta());
  }
  if(mixer3){
    mixer3.update(clock3.getDelta());
  }
  if(mixer4){
    mixer4.update(clock4.getDelta());
  }

  if (isAnimating2) {
    riseDrone2();
    moveDroneToTarget2();
    returnDroneToStart2();

    if (returnComplete2) {
      isAnimating2 = false;
      riseComplete2 = false;
      moveComplete2 = false;
      returnComplete2 = false;
      mesh2.position.set(20, 0, 20);
      actionHover2.paused = true;
      actionHover2.time = 0;
    }
  }

  if (isAnimating3) {
    riseDrone3();
    moveDroneToTarget3();
    returnDroneToStart3();

    if (returnComplete3) {
      isAnimating3 = false;
      riseComplete3 = false;
      moveComplete3 = false;
      returnComplete3 = false;
      mesh3.position.set(-20, 0, -20);
      actionHover3.paused = true;
      actionHover3.time = 0;
    }
  }

  if (isAnimating4) {
    riseDrone4();
    moveDroneToTarget4();
    returnDroneToStart4();

    if (returnComplete4) {
      isAnimating4 = false;
      riseComplete4 = false;
      moveComplete4 = false;
      returnComplete4 = false;
      mesh4.position.set(-20, 0, 20);
      actionHover4.paused = true;
      actionHover4.time = 0;
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

animationControlButton2.addEventListener('click', () => {
  if (isAnimating2) {
    isAnimating2 = false;
    mesh2.position.set(20, 0, 20);
    actionHover2.paused = true;
    actionHover2.time = 0;
  } else {
    actionHover2.paused = false;
    actionHover2.play();
    setTimeout(() => {
      isAnimating2 = true;
    }, 6500);
  }
});

animationControlButton3.addEventListener('click', () => {
  if (isAnimating3) {
    isAnimating3 = false;
    mesh3.position.set(-20, 0, -20);
    actionHover3.paused = true;
    actionHover3.time = 0;
  } else {
    actionHover3.paused = false;
    actionHover3.play();
    setTimeout(() => {
      isAnimating3 = true;
    }, 6500);
  }
});

animationControlButton4.addEventListener('click', () => {
  if (isAnimating4) {
    isAnimating4 = false;
    mesh4.position.set(-20, 0, 20);
    actionHover4.paused = true;
    actionHover4.time = 0;
  } else {
    actionHover4.paused = false;
    actionHover4.play();
    setTimeout(() => {
      isAnimating4 = true;
    }, 6500);
  }
});

animate();
