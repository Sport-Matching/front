//historicDirective
angular.module('app')
.directive('threejsDirective', ['$rootScope', function($rootScope) {
    return {
        restrict: 'E',
        scope: {},
        link: function(scope, element, attrs) {

            var SCREEN_WIDTH = window.innerWidth;
            var SCREEN_HEIGHT = window.innerHeight;
            var container;
            var scene, renderer;
            var camera;
            var radius = 42, diameter = 2 * radius;
            init();
            render();

            function getCircle(text, imageUrl) {
                var segments = 64,
                    material = new THREE.LineBasicMaterial({ color: 0x3f51b5, linewidth: 3 }),
                    geometry = new THREE.CircleGeometry(radius, segments);
                geometry.vertices.shift();
                var line = new THREE.Line(geometry, material);

                var textureLoader = new THREE.TextureLoader();
                var texture = textureLoader.load("nadal_full_16.png", function()
                {
                    render();
                });

                var a = diameter / Math.sqrt(2);
                var plane = new THREE.Mesh(new THREE.PlaneGeometry(a, a), new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true
                }));
                plane.overdraw = true;
                line.add(plane);

                var textScale = 0.5;
                var textShape = new THREE_Text.Text2D(text, { align: THREE_Text.textAlign.center,  font: '40px Arial', fillStyle: '#8c8c8c' , antialias: false });
                textShape.material.alphaTest = 0.1;
                textShape.position.set(0, -radius, 0);
                textShape.scale.set(textScale, textScale, textScale);
                line.add(textShape);
                return line;
            }

            function init() {
                container = angular.element(element[0].querySelector('.threejs-container'));
                scene = new THREE.Scene();
                camera = new THREE.OrthographicCamera(-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, -SCREEN_HEIGHT / 2);
                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 300;
                camera.lookAt(0, 0, 0);
                scene.add(camera);

                //
                renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
                renderer.setClearColor(0xffffff, 1);
                renderer.domElement.style.position = "relative";
                container.append(renderer.domElement);
                renderer.autoClear = false;
                //
                window.addEventListener('resize', onWindowResize, false);
            }
            //
            function onWindowResize(event) {
                SCREEN_WIDTH = window.innerWidth;
                SCREEN_HEIGHT = window.innerHeight;
                renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
                render();
            }

            function render() {
                camera.updateProjectionMatrix();
                renderer.clear();
                renderer.setViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
                renderer.render(scene, camera);
            }

            function showItems(items) {
                for (var i = scene.children.length - 1; i >= 0; --i) {
                    scene.remove(scene.children[i]);
                }
                var currentX = -SCREEN_WIDTH / 2 + diameter,
                    currentY = SCREEN_HEIGHT / 2 - diameter,
                    currentLine = 0;
                for (i = 0; i < items.length; ++i) {
                    var item = items[i];
                    var circle = getCircle(item.Name, item.PictureUrl);
                    circle.position.set(currentX, currentY, 0);
                    scene.add(circle);
                    currentX += 7 * radius;
                    if (currentX > SCREEN_WIDTH / 2 - diameter) {
                        ++currentLine;
                        currentX = -SCREEN_WIDTH / 2 + diameter + (currentLine % 2) * (3.5 * radius);
                        currentY -= 2 * diameter;
                    }
                }
                render();
            }

            $rootScope.$on('searchResultChanged', function(event, results)
            {
                showItems(results);
            });
        },
        templateUrl: 'views/directives/threejsDirective.html'
    };
}]);
