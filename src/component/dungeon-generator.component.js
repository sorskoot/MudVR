import { random } from '../lib/random';
import { maptest } from '../lib/maptest';


export default AFRAME.registerComponent('dungeon-generator', {
    schema: {
        seed: {
            default: 'dungeon'
        },
        gridPosition: {
            type: 'vec3'
        }
    },

    init: function () {
        let directions = maptest();
        this.generateWorld(directions);
        return;

        console.log(directions);
        this.plane = document.createElement('a-plane');
        this.el.appendChild(this.plane);
        this.plane.setAttribute('rotation', '-90 0 0');
        this.plane.setAttribute('scale', '5 5 5');
        let x = 0, y = 0;
        for (let index = 0; index < directions.length; index++) {
            const element = directions[index];
            switch (directions[index]) {
                case 'e':
                    x += 1;
                    break;
                case 'n':
                    y -= 1;
                    break;
                case 's':
                    y += 1
                    break;
            }
            let cube = document.createElement('a-box');
            cube.setAttribute('scale', '.5 .5 .5');
            cube.setAttribute('position', { x: x, y: 0, z: y });
            cube.setAttribute('color','red');
            this.el.appendChild(cube);
        }
        this.exit = {
            north: document.createElement('a-plane'),
            south: document.createElement('a-plane'),
            east: document.createElement('a-plane'),
            west: document.createElement('a-plane')
        };
        this.exit.north.setAttribute('position', '0 1 -2.5')
        this.exit.north.setAttribute('scale', '1 2 1')
        this.exit.north.setAttribute('id', 'exit-north');
        this.exit.north.setAttribute('visible', 'false');
        this.exit.north.setAttribute('material', 'src:#door');
        this.el.appendChild(this.exit.north);

        this.exit.south.setAttribute('position', '0 1 2.5')
        this.exit.south.setAttribute('scale', '1 2 1')
        this.exit.south.setAttribute('rotation', '0 180 0')
        this.exit.south.setAttribute('id', 'exit-south');
        this.exit.south.setAttribute('visible', 'false');
        this.exit.south.setAttribute('material', 'src:#door');
        this.el.appendChild(this.exit.south);

        this.exit.east.setAttribute('position', '-2.5 1 0')
        this.exit.east.setAttribute('scale', '1 2 1')
        this.exit.east.setAttribute('rotation', '0 90 0')
        this.exit.east.setAttribute('id', 'exit-east');
        this.exit.east.setAttribute('visible', 'false');
        this.exit.east.setAttribute('material', 'src:#door');
        this.el.appendChild(this.exit.east);

        this.exit.west.setAttribute('position', '2.5 1 0')
        this.exit.west.setAttribute('scale', '1 2 1')
        this.exit.west.setAttribute('rotation', '0 270 0')
        this.exit.west.setAttribute('id', 'exit-west');
        this.exit.west.setAttribute('visible', 'false');
        this.exit.west.setAttribute('material', 'src:#door');
        this.el.appendChild(this.exit.west);

        this.exit.north.addEventListener('click', e => this.navigate({ x: 0, y: 0, z: -1 }));
        this.exit.south.addEventListener('click', e => this.navigate({ x: 0, y: 0, z: +1 }));
        this.exit.east.addEventListener('click', e => this.navigate({ x: +1, y: 0, z: 0 }));
        this.exit.west.addEventListener('click', e => this.navigate({ x: -1, y: 0, z: 0 }));

        //   this.generateRoom();
    },
    update() {
        //  this.generateRoom();
    },
    navigate(direction) {
        this.data.gridPosition = {
            x: this.data.gridPosition.x + direction.x,
            y: this.data.gridPosition.y + direction.y,
            z: this.data.gridPosition.z + direction.z,
        }
        this.generateRoom();
    },
    generateRoom() {

        // A room:
        // - room definition at integer X,Y,Z ==> 25, 0, 50
        // - possible exits - value between rooms ==> Left wall == 24.5, 0 , 50
        // 
        let p = this.data.gridPosition;

        const groundColors = ['purple', 'grey', 'green', 'yellow', 'red', 'blue', 'cyan'];
        const groundColorIndex =
            random(`${this.getBasicSeed()}-room${p.x},${p.y},${p.z}-groundcolor`)() % groundColors.length;
        this.plane.setAttribute('color', groundColors[groundColorIndex]);

        setExit(this.exit.north, random(`${this.getBasicSeed()}-exit${p.x},${p.y},${p.z - .5}`)(), groundColors);
        setExit(this.exit.south, random(`${this.getBasicSeed()}-exit${p.x},${p.y},${p.z + .5}`)(), groundColors);
        setExit(this.exit.east, random(`${this.getBasicSeed()}-exit${p.x + .5},${p.y},${p.z}`)(), groundColors);
        setExit(this.exit.west, random(`${this.getBasicSeed()}-exit${p.x - .5},${p.y},${p.z}`)(), groundColors);
    },
    getBasicSeed: function () {
        let p = this.data.gridPosition;
        return `${this.data.seed}`
    },
    generateWorld:function(imageData){
        // keyroom 4,4 = 0,0,0 in world = 128,128 in map
       
        for (let x = 0; x < 256; x++) {
            for (let y = 0; y < 256; y++) {
                let p = (x + y * imageData.width) * 4; 
                if(imageData.data[p+3]===255){
                    this.plane = document.createElement('a-plane');
                    this.el.appendChild(this.plane);
                    this.plane.setAttribute('rotation', '-90 0 0');
                    //this.plane.setAttribute('scale', '5 5 5');
                    this.plane.setAttribute('position',{x:x-128,y:0,z:y-128});
                    this.plane.setAttribute('color',`#${(imageData.data[p]).toString(16).padStart(2,'0')}${imageData.data[p+1].toString(16).padStart(2,'0')}${imageData.data[p+2].toString(16).padStart(2,'0')}`)
                }
            }
        }
    }
});



function setExit(el, seed, groundColors) {
    el.setAttribute('visible', seed % 2 ? 'true' : 'false');
    if (seed % 2) {
        el.classList.add('clickable');
    } else {
        el.classList.remove('clickable');
    }
    el.setAttribute('color', groundColors[seed % groundColors.length]);
}



