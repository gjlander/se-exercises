function blowCandles(str) {
    let breaths = 0;
    const array = str.split('');
    array.forEach((l, i) => (array[i] = +l));
    console.log('before loop:', array);

    for (let i = 0; i < array.length; i++) {
        if (array[i] > 0) break;
        array.shift();
    }

    while (array.some((num) => num > 0)) {
        // for (let i = 0; i < array.length; i++) {
        //     if (array[i] > 0) break;
        //     array.shift();
        // }
        if (array[0] < 1) {
            if (array[1] < 1) {
                if (array[2] < 1) {
                    array.shift();
                }
                array.shift();
            }
            array.shift();
        }
        console.log(`array before iteration ${breaths + 1}:`, array);

        for (let i = 0; i < 3; i++) {
            if (isNaN(array[i])) break;
            array[i] -= 1;
        }
        breaths++;
        console.log(`array after iteration ${breaths}:`, array);
        // console.log('iteration: ', breaths);
    }
    console.log('after loop:', array);
    console.log('breaths: ', breaths);
    return breaths;
}

blowCandles('102201');
