import * as THREE from 'three';



// import { MTLLoader } from 'three-mtl-loader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

var container;

var camera, scene, renderer, controls, light;

var mouseX = 0, mouseY = 0;

// var windowHalfX = modelContainer.offsetWidth / 2;
// var windowHalfY = modelContainer.offsetHeight / 2;




init();
animate();


function init() {
    let modelContainer = document.querySelector('.building_section__model')


    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xcccccc);
    // scene.fog = new THREE.FogExp2(0xcccccc, 0.00005);
    // scene.background = new THREE.Color().setHSL(0.6, 0, 1);

 

    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 800, 3000);

    light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    scene.add(light);

    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 200, 100);
    // light.castShadow = true;
    // light.shadow.camera.top = 180;
    // light.shadow.camera.bottom = - 100;
    // light.shadow.camera.left = - 120;
    // light.shadow.camera.right = 120;
    // scene.add(light);


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
    modelContainer.appendChild(renderer.domElement);


    camera = new THREE.PerspectiveCamera(40, modelContainer.offsetWidth / modelContainer.offsetHeight, 1, 3000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 300;
    camera.position.y = 300;
    camera.position.z = 500;

    // var vFOV = camera.fov * Math.PI / 180;        // convert vertical fov to radians
    // var height = 2 * Math.tan( vFOV / 2 ) * dist; // visible height

    // var dist = 500 / ( 2 * Math.tan( camera.fov * Math.PI / 360 ) );

    // camera.position.set( 0, 0, 250 + dist );

    // controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    // controls.minDistance = 100;
    // controls.maxDistance = 8000;



    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);

    // model



    let model;

    var onProgress = function (xhr) {

        if (xhr.lengthComputable) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');

        }

    };

    var onError = function () { };

    var manager = new THREE.LoadingManager();
    manager.addHandler(/\.dds$/i, new DDSLoader());


    var axesHelper = new THREE.AxesHelper(1);
    axesHelper.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0));
    scene.add(axesHelper);




    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);



    new MTLLoader(manager)
        .setPath('new_model/')
        .load('korpusi.mtl', function (materials) {

            materials.preload();

            new OBJLoader(manager)
                .setMaterials(materials)
                .setPath('new_model/')
                .load('korpusi.obj', function (object) {

                    model = object;
                    object.scale.set(0.006, 0.006, 0.006);
                    // object.position.y = - 95;
                    // object.position.x = 0;
                    // object.position.y = 0;
                    // object.rotation.z = Math.PI / 2;
                    // object.rotation.x = Math.PI / 0.5;
                    // object.rotation.y = Math.PI / 1.5;
                    // geometry.translate( 0.02, 0.02, 0.02 );
                    // console.log(object.geometry.center());
                    // object.translateOnAxis(1, 0, 1);
                    object.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / -2));
                    object.applyMatrix4(new THREE.Matrix4().makeTranslation(20, 0, 0));
                    scene.add(object);



                    // var boundingBox = new THREE.Box3();

                    // boundingBox.setFromObject(object);
                    // var center = boundingBox.getCenter();
                    // // set camera to rotate around center of object
                    // controls.target = center;
                }, onProgress, onError);

        });

    //




    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    windowHalfX = modelContainer.offsetWidth / 2;
    windowHalfY = modelContainer.offsetHeight / 2;

    camera.aspect = modelContainer.offsetWidth / modelContainer.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
}

//

function animate() {
    requestAnimationFrame(animate);

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    // light.position.x = camera.position.x;
    // light.position.y = camera.position.y;
    // light.position.z = camera.position.z;

    render();
}




function render() {
    // camera.position.x += (mouseX - camera.position.x) * .05;
    // camera.position.y += (- mouseY - camera.position.y) * .05; 
    camera.lookAt(scene.position);

    renderer.compile(scene, camera);
    renderer.render(scene, camera);
}