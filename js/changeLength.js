function selectElementNumber(object) {
    let idx = object.selectedIndex;
    arrayLength = parseInt(object.options[idx].value);
    document.getElementById('array-length').innerHTML = '※配列のデータ数：n='+arrayLength;
    reinitOriginArray();
}

function reinitOriginArray() {
    randomArray.splice(0, randomArray.length);
    for(let i = 0; i < arrayLength; i++) {
        randomArray[i] = i;
    }
    targetArray.deleteArray();
    targetArray.initArray(randomArray);    
}