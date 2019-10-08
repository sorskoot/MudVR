//xmur3(str)
export const random = function (str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
            h = h << 13 | h >>> 19;
    return function () {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}
// another random function ==> var LCG = s => () => (2 ** 31 - 1 & (s = Math.imul(48271, s))) / 2 ** 31;

import perlinNoise3d from 'perlin-noise-3d';
export const perlin = function (seed, x, y = 0, z = 0) {
    // added a custom function to wrap the external code, if we need to replace
    // the dependency we don't have to modify the entire codebase.
    const noise = new perlinNoise3d();
    noise.noiseSeed(seed);
    return noise.get(x, y, z);
}

