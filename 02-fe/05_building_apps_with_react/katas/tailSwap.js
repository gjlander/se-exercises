function tailSwap(arr) {
    arr.forEach((str, i) => {
        arr[i] = str.split(':');
    });
    const tail1 = arr[0][1];
    const tail2 = arr[1][1];

    arr[0][1] = tail2;
    arr[1][1] = tail1;
    arr.forEach((inArr, i) => (arr[i] = inArr.join(':')));

    return arr;
}

const result = tailSwap(['abc:123', 'cde:456']);

console.log(result);
