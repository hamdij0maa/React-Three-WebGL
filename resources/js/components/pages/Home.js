import React from "react";
import * as THREE from 'three';

export default class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.cube=[]
    }

    //Init
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.raycaster = new THREE.Raycaster();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.three.appendChild(this.renderer.domElement);

        this.directionalLight = new THREE.DirectionalLight(0x9090aa);
        this.directionalLight.position.set(-10, 10, -10).normalize();
        this.scene.add(this.directionalLight);

        this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        this.hemisphereLight.position.set(1, 1, 1);
        this.scene.add(this.hemisphereLight);

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshStandardMaterial({ color: 0x0fdbf5, metalness: 0.15 });
        this.cube.push(new THREE.Mesh(this.geometry, this.material));
        this.scene.add(this.cube[0]);

        this.camera.position.z = 10;

        this.animate();
    }

    //Animation
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        for(var i=0; i<=this.cube.length-1; i++){
            this.cube[i].rotation.x += 0.01;
            this.cube[i].rotation.y += 0.01;
            this.renderer.render(this.scene, this.camera);
        }
    }

    instanciateCube = (event) =>{
        var mouse = new THREE.Vector2(); // create once
        mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
        var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject( this.camera );
        var dir = vector.sub( this.camera.position ).normalize();
        var distance = - this.camera.position.z / dir.z;
        var pos = this.camera.position.clone().add( dir.multiplyScalar( distance ) );

        this.cube.push(new THREE.Mesh(this.geometry, this.material));
        this.scene.add(this.cube[this.cube.length-1]);

        this.cube[this.cube.length-1].position.y = pos.y;
        this.cube[this.cube.length-1].position.x = pos.x;
    }

    handleMovingMouse = (event)=>{
        this.camera.position.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
        this.camera.position.y = ( event.clientY / this.renderer.domElement.clientHeight ) * 2 - 1;
    }
    //Resize
    updateDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    // update aspect ratio
    componentWillUpdate() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    // remove listener
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }
    render(){
        return(

            <div onMouseMove={this.handleMovingMouse} onClick={this.instanciateCube} className='three' ref={(el) => { this.three = el }}></div>
        );
    }
}
