// Created by Bjorn Sandvik - thematicmapping.org
(function () {

	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width  = window.innerWidth,
		height = window.innerHeight;

	// Earth params
	var radius   = 0.5,
		segments = 32,
		rotation = 6;  
		//rotation = -6;  

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 1.5;
	camera.position.y = 45;
	//camera.position.z = 0.1;

	//var renderer = new THREE.WebGLRenderer({ alpha: true });
	var renderer = new THREE.WebGLRenderer()
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5,3,5);
	scene.add(light);
	
    /* UPDATE THIS
	var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	//sphere.rotation.x = rotation;
	//sphere.rotation.y = rotation;
	scene.add(sphere)
	*/
		
	
	// The textures to use
	var arr = [
	 'images/2_no_clouds_4k.jpg',
	 'images/parC_2016_Global.png',
	 'images/lu4webgl.png',
	];
	var textureToShow = 0;
	
		
	//var sphere = createSphere(radius, segments);
	//sphere.rotation.y = rotation;
	//sphere.rotation.x = rotation;
	//sphere.rotation.y = rotation;
	//scene.add(sphere);
	
	//USE THIS
	var material = new THREE.MeshPhongMaterial({
				bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular:    new THREE.Color('grey')								
			});
	var geometry = new THREE.SphereGeometry(radius, segments, segments);
    var sphere = new THREE.Mesh(geometry, material);
	sphere.rotation.y = rotation;
	//sphere.rotation.x = rotation;
	//sphere.rotation.y = rotation;
	// instantiate a texture loader
	
	var loader = new THREE.TextureLoader();
	//allow cross origin loading
	loader.crossOrigin = '';
	
	// Then load the texture
	loader.load(arr[textureToShow], function(tex) {
	 // Once the texture has loaded
	 // Asign it to the material
	 material.map = tex;
	 // Update the next texture to show
	 textureToShow++;
	 // Add the mesh into the scene
	 scene.add( sphere );
	});
	
	
    var clouds = createClouds(radius, segments);
	//clouds.rotation.x = rotation;
	clouds.rotation.y = rotation;
	scene.add(clouds);

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);
	
	render();

	
	function render() {
		controls.update();
		//sphere.rotation.x += 0.0005;
		sphere.rotation.y += 0.0005;
		clouds.rotation.y += 0.0005;
		//sphere.rotation.y += 0.0005;		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
	

	/* REPLACE THIS WITH A TEXTURE ARG
	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
				//map:         THREE.ImageUtils.loadTexture('images/parC_2016_Global.png'),
				//map:         THREE.ImageUtils.loadTexture('images/lu4webgl.png'),
				// new line below
				//alphaTest: 0.1,
				bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular:    new THREE.Color('grey')								
			})
		);
	}
	*/
	
	/*
	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture(),
				//map:         THREE.ImageUtils.loadTexture('images/parC_2016_Global.png'),
				//map:         THREE.ImageUtils.loadTexture('images/lu4webgl.png'),
				// new line below
				//alphaTest: 0.1,
				bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
				bumpScale:   0.005,
				specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular:    new THREE.Color('grey')								
			})
		);
	}
	*/
	
	function createClouds(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),			
			new THREE.MeshPhongMaterial({
				map:         THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
				transparent: true
			})
		);		
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}
	
	
	// ADD CHANGE TEXTURE ON CLICK?

	
	// Click interaction
	var canvas = document.getElementsByTagName("canvas")[0];

	canvas.addEventListener("click", function() {
	  

	 
	 loader.load(arr[textureToShow], function(tex) {
	  // Once the texture has loaded
	  // Asign it to the material
	  material.map = tex;
	  // Update the next texture to show
	  textureToShow++;
	  // Have we got to the end of the textures array
	  if(textureToShow > arr.length-1) {
	   textureToShow = 0;
	  }
	 }); 
 
});
	
}());