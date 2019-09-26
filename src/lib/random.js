//xmur3(str)
export const random = function(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
} 

// another random function ==> var LCG = s => () => (2 ** 31 - 1 & (s = Math.imul(48271, s))) / 2 ** 31;

