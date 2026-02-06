function spot(s1, s2) {
    const diffs = [];
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) diffs.push(i);
    }
    return diffs;
}

const result = spot('abcdefg', 'abcqetg');

console.log(result);
