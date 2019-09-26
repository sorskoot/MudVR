import {random} from '../lib/random';

export default AFRAME.registerComponent('dungeon-generator', {
    schema: {
        seed: {
            default: 'dungeon'
        }
    },

    init: function () {
        console.log();
        let plane = document.createElement('a-plane');
        plane.setAttribute('rotation', '-90 0 0');

        const groundColors = ['purple', 'grey', 'green'];
        const groundColorIndex =
            random(`${this.data.seed}-room1-groundcolor`)() % groundColors.length;
        plane.setAttribute('color', groundColors[groundColorIndex]);

        plane.setAttribute('scale', '5 5 5');
        this.el.appendChild(plane);
    },
});

