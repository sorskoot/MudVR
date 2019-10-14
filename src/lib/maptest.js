import Position from '../classes/Position';
import KeyRoom from '../classes/KeyRoom';
import { perlin, random } from '../lib/random';

const keyRoomDistance = 32; // distance between key rooms

export const maptest = function () {
    let seed = random('A random seed 2')();
    console.log(seed);
    let canvas = document.createElement("canvas");
    //let canvas = document.getElementById('map');
    canvas.width = canvas.height = 256;

    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let imageData = ctx.createImageData(256, 256);
    for (let x = 0; x < 256; x++) {
        for (let y = 0; y < 256; y++) {
            pset(imageData, x, y, 0, 0, 0, 0);
        }
    }
    // Start in the middle (spawn keyroom) - This will be spawn as well
    // Create a 3 by 3 grid of keyrooms- where the outer keyroom are in the corners

    let kr = new KeyRoom(new Position(4, 4));
    let point = kr.position.scalar(keyRoomDistance);
    pset(imageData, point.x, point.y, 255, 0, 0);

    let kr2 = new KeyRoom(new Position(5, 4));
    let point2 = kr2.position.scalar(keyRoomDistance);
    pset(imageData, point2.x, point2.y, 255, 0, 0);
    let previous = point;

    for (let index = 1; index < keyRoomDistance; index++) {
        let noise = ((perlin(seed, (point.x + index) / 10, point.y / 10) - .5) * 2) * 20;

        let targetY =  noise * ease((index+1) / keyRoomDistance) + point.y;

       // let target = new Position(point.x + index, targetY);

        let points = previous.y - ~~targetY;

        let m_sign = points > 0 ? 1 : -1;
        for (let i = 0; i < Math.abs(points); i++) {
            console.log(index, i, ~m_sign ? 'north' : 'south');
            let x = (point.x + index);
            let y = (previous.y - (i * m_sign));

            console.log(index, x, y);
            let p = (x + y * imageData.width) * 4;
            imageData.data[p + 2] = 255;
            imageData.data[p + (points > 0 ? 2 : 0)] = 255;
            imageData.data[p + 3] = 255;
        }

        let x = point.x + index;
        let y = previous.y - points;
        let p = (x + y * imageData.width) * 4;
        imageData.data[p + 1] = 255;
        imageData.data[p + 3] = 255;
        previous = new Position(point.x + index, ~~targetY);
    }

    kr = new KeyRoom(new Position(3, 4, 4));
    point = kr.position.scalar(32);
    pset(imageData, point.x, point.y, 255, 0, 0);

    kr = new KeyRoom(new Position(3, 3, 4));
    point = kr.position.scalar(32);
    pset(imageData, point.x, point.y, 255, 0, 0);

    kr = new KeyRoom(new Position(4, 3, 4));
    point = kr.position.scalar(32);
    pset(imageData, point.x, point.y, 255, 0, 0);

    kr = new KeyRoom(new Position(5, 3, 4));
    point = kr.position.scalar(32);
    pset(imageData, point.x, point.y, 255, 0, 0);

    kr = new KeyRoom(new Position(3, 5, 4));
    point = kr.position.scalar(32);
    pset(imageData, point.x, point.y, 255, 0, 0);

    kr = new KeyRoom(new Position(4, 5, 4));
    point = kr.position.scalar(32);
    pset(imageData, point.x, point.y, 255, 0, 0);

    kr = new KeyRoom(new Position(5, 5, 4));
    point = kr.position.scalar(32);
    pset(imageData, point.x, point.y, 255, 0, 0);

    ctx.putImageData(imageData, 0, 0); 

    return imageData;
}


function ease(t) {
    t = Math.max(Math.min(1, t), 0);
    return 1 - t*t*t*t*t ;
}

function pset(imageData, x, y, r, g, b, a = 255) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}


