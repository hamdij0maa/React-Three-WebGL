import React from "react";
import * as THREE from 'three';

export default class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    //Init
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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
        this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.15 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);

        this.camera.position.z = 5;

        this.animate();
    }

    //Animation
    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
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
            <div className='three' ref={(el) => { this.three = el }}></div>
        );
    }
}
