import Position from '../classes/Position';
import KeyRoom from '../classes/KeyRoom';
import { perlin, random } from '../lib/random';

export const maptest = function () {
    let seed = random('Another random seed')();
    console.log(seed);
    //let canvas = document.createElement("canvas");
    let canvas = document.getElementById('map');
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

    // pset(imageData, 128, 128, 0, 255, 0, 255);
    // pset(imageData, 128 - 32, 128, 255, 0, 0, 255);
    // pset(imageData, 128 - 32 - 32, 128, 255, 0, 0, 255);
    // pset(imageData, 128 + 32, 128, 255, 0, 0, 255);
    // pset(imageData, 128 + 32 + 32, 128, 255, 0, 0, 255);
    let doorDirections = [];
    let kr = new KeyRoom(new Position(4, 4));
    let point = kr.position.scalar(32);
    let n = ~~(((perlin(seed, point.x / 10, point.y / 10) - .5) * 2) * 10);
    pset(imageData, point.x, point.y, 0, 255, 0);

    let kr2 = new KeyRoom(new Position(5, 4));
    let point2 = kr2.position.scalar(32);
    pset(imageData, point2.x, point2.y, 255, 0, 0);
    console.log(point.x, point.y);
    let lasty = point.y;

    let target;
    let previous = point;

    for (let index = 0; index < 32; index++) {
        let noise = ((perlin(seed, (point.x + index) / 10, point.y / 10) - .5) * 2) * 20 + point.y;
        let magicvalue = noise - lasty;
        //  pset(imageData, point.x + index, ~~noise, 0, 0, 255);
        target = new Position(point.x + index, noise);
    //    console.log(target);
        let points = previous.y - ~~noise;
      //  console.log(points);
        doorDirections.push(...new Array(Math.abs(points)).fill(points > 0 ? 'n' : 's'));
        doorDirections.push('e');
      
      
        let m_sign = points > 0 ? 1 : -1;
       // pset(imageData, point.x + index, previous.y, 128, 0, 128);
        for (let i = 0; i < Math.abs(points); i++) {
            console.log(index, i, ~m_sign?'north':'south');
            let x = (point.x + index);
            let y = (previous.y - (i * m_sign));
          //  pset(imageData, point.x + index, previous.y - (i * m_sign), 0, 0, 128);
            
           let p = (x + y * imageData.width) * 4;
           imageData.data[p + 2] = 255;
           imageData.data[p + (points > 0 ? 2 : 0)] = 255;
           imageData.data[p + 3] = 255;
        }
        console.log(index,point.x + index + 1, previous.y - points, 'east');
        let x = point.x + index + 1;
        let y = previous.y - points;
        let p = (x + y * imageData.width) * 4;
        imageData.data[p + 1] = 255;
        imageData.data[p + 3] = 255;
        //pset(imageData, point.x + index + 1, previous.y - points, 0, 255, 255);
        // let angle = previous.angle2d(target);
        // let dist = previous.dist(target);
        // let stop = 10;
        // let lastDistance = 999;
        // let direction = angle > 0;
        // while (direction == angle > 0) {
        //     lastDistance = dist;

        //     if (angle < 45 && angle > -45) {
        //         doorDirections.push('e');
        //         previous.x++;
        //     } else {
        //         if (angle < 0) {
        //             doorDirections.push('s');
        //             previous.y--;
        //         }
        //         else {
        //             doorDirections.push('n');
        //             previous.y++;
        //         }
        //     }
        //     angle = previous.angle2d(target);
        //     dist = previous.dist(target);
        //     stop--
        //     if (stop <= 0) break;
        // }
        previous = new Position(point.x + index, ~~noise);

        //     lasty = noise;
        //     while (Math.abs(magicvalue) > 1){
        //     //    console.log(index, magicvalue, noise);
        //         doorDirections.push(doorDirection(magicvalue));
        //         magicvalue += magicvalue < 0 ? 1 : -1;
        //     };
        //  //   console.log(index, magicvalue, noise);
        //     doorDirections.push(doorDirection(magicvalue));
       
    }

    // for (let index = 1; index < 32; index++) {
    //     let noise = ((perlin(seed, (point.x) / 10, (point.y + index) / 10) - .5) * 2) * 10 + point.y;
    //     pset(imageData, ~~noise, point.y + index, 0, 0, 255);
    // }

    // for (let index = 1; index < 32; index++) {
    //     let noise = ((perlin(seed, (point.x - index) / 10, point.y / 10) - .5) * 2) * 10 + point.y;
    //     pset(imageData, point.x - index, ~~noise, 0, 0, 255);
    // }

    // for (let index = 1; index < 32; index++) {
    //     let noise = ((perlin(seed, (point.x) / 10, (point.y - index) / 10) - .5) * 2) * 10 + point.y;
    //     pset(imageData, ~~noise, point.y - index, 0, 0, 255);
    // }

    // for (let index = 1; index < 32; index++) {
    //     let noise = ((perlin(seed, (point.x) / 10, (point.y - index-32) / 10) - .5) * 2) * 10 + point.y;
    //     pset(imageData, ~~noise, point.y - index-32, 0, 0, 255);
    // }

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

    ctx.putImageData(imageData, 0, 0); // at coords 0,0

    return imageData;
    //return doorDirections;
}


function doorDirection(magicvalue) {
    if (~~magicvalue == 0) {
        // console.log('door east');
        return 'e';
    }
    else {
        if (~~magicvalue < 0) {
            // console.log('door south');
            return 's';
        }
        else {
            //  console.log('door north');
            return 'n';
        }
    }
}

function pset(imageData, x, y, r, g, b, a = 255) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}


