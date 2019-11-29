import { random } from '../lib/random';
import { maptest } from '../lib/maptest';
import Exits from '../classes/Exits';

export default AFRAME.registerComponent('dungeon-generator', {
    schema: {
        seed: {
            default: 'dungeon'
        },
        gridPosition: {
            type: 'vec3',
            default: { x: 128, y: 0, z: 128 }
        }
    },

    init: function () {
        this.map = maptest();
        //   this.generateWorld(map);
        //return;
        this.plane = document.createElement('a-plane');
        this.el.appendChild(this.plane);
        this.plane.setAttribute('rotation', '-90 0 0');
        this.plane.setAttribute('scale', '5 5 5');

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

        this.generateRoom();
    },
    update() {
        this.generateRoom();
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

        let pIndex = (p.x + p.z * this.map.width) * 4;

        setExit(this.exit.east, this.map.data[pIndex] & Exits.EAST, random(`${this.getBasicSeed()}-exit${p.x + .5},${p.y},${p.z}`)(), groundColors);
        setExit(this.exit.south, this.map.data[pIndex] & Exits.SOUTH, random(`${this.getBasicSeed()}-exit${p.x},${p.y},${p.z + .5}`)(), groundColors);
        setExit(this.exit.north, this.map.data[pIndex] & Exits.NORTH, random(`${this.getBasicSeed()}-exit${p.x},${p.y},${p.z - .5}`)(), groundColors);
        setExit(this.exit.west, this.map.data[pIndex] & Exits.WEST, random(`${this.getBasicSeed()}-exit${p.x - .5},${p.y},${p.z}`)(), groundColors);

        // setExit(this.exit.north, random(`${this.getBasicSeed()}-exit${p.x},${p.y},${p.z - .5}`)(), groundColors);
        // setExit(this.exit.south, random(`${this.getBasicSeed()}-exit${p.x},${p.y},${p.z + .5}`)(), groundColors);
        // setExit(this.exit.east, random(`${this.getBasicSeed()}-exit${p.x + .5},${p.y},${p.z}`)(), groundColors);
        // setExit(this.exit.west, random(`${this.getBasicSeed()}-exit${p.x - .5},${p.y},${p.z}`)(), groundColors);
    },
    getBasicSeed: function () {
        let p = this.data.gridPosition;
        return `${this.data.seed}`
    },
    generateWorld: function (imageData) {
        // keyroom 4,4 = 0,0,0 in world = 128,128 in map
        for (let x = 0; x < 256; x++) {
            for (let y = 0; y < 256; y++) {
                let p = (x + y * imageData.width) * 4;
                if (imageData.data[p] !== 0) {
                    this.plane = document.createElement('a-plane');
                    this.el.appendChild(this.plane);
                    this.plane.setAttribute('rotation', '-90 0 0');
                    //this.plane.setAttribute('scale', '5 5 5');
                    this.plane.setAttribute('position', { x: x - 128, y: 0, z: y - 128 });
                    this.plane.setAttribute('color', `#${(imageData.data[p]).toString(16).padStart(2, '0')}${imageData.data[p + 1].toString(16).padStart(2, '0')}${imageData.data[p + 2].toString(16).padStart(2, '0')}`)
                }
            }
        }
    }
});



function setExit(el, visible, seed, groundColors) {
    el.setAttribute('visible', !!visible);
    if (visible) {
        el.classList.add('clickable');
    } else {
        el.classList.remove('clickable');
    }
    el.setAttribute('color', groundColors[seed % groundColors.length]);
}



