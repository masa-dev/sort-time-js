function shuffle(array) {
    for(let i = array.length-1; i >= 0; i--) {
        let rand = Math.floor(Math.random()* (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
}

function sortCheck(array) {
    for(let i = 0; i < array.length; i++) {
        if(array[i] != i) {
            return false;
        }
    }

    return true;
}

function defaultSort(array) {
    array.sort((a, b) => a - b);
}

function quickSort(array, start, end) {
    let pivot = array[Math.floor((start + end)/2)];
    let left = start;
    let right = end;

    while(true) {
        while(array[left] < pivot) {
            left++;
        }
        while(pivot < array[right]) {
            right--;
        }
        if(right <= left) {
            break;
        }
        [array[left], array[right]] = [array[right], array[left]];
        right--;
    }

    if(start < left-1) {
        quickSort(array, start, left-1);
    }
    if(right+1 < end) {
        quickSort(array, right+1, end);
    }
}

function selectionSort(array) {
    let max, maxIndex;
    for(let i = array.length -1; i >= 0; i--) {
        max = array[0];
        maxIndex = 0;
        for(let j = 1; j <= i; j++) {
            if(array[j]>=max) {
                max = array[j];
                maxIndex = j;
            }
        }
        [array[maxIndex], array[i]] = [array[i], array[maxIndex]];
    }
}

function insertSort(array) {
    let x;
    for(let i = 1; i < array.length; i++) {
        x = array[i];
        j = i;
        while((array[j-1] > x) && (j > 0)) {
            array[j] = array[j-1];
            j--;
        }
        array[j] = x;
    }
}

function mergeSort(start,end) {
	if(start >= end) return;
	var mid = Math.floor((start + end) / 2);
	mergeSort(start,mid);
	mergeSort(mid+1,end);
	var p = 0;
	for (i=start; i<=mid; i++) buff[p++] = randomArray[i];
	var i = mid + 1;
	var j = 0;
	var k = start;
	while ((i<=end) && (j<p))
	{
		if (buff[j] <= randomArray[i])
		{
			randomArray[k++] = buff[j++];
		}else{
			randomArray[k++] = randomArray[i++];
		}
	}
	while (j < p) randomArray[k++] = buff[j++];
}

function passOnce(){
    //クイックソートとマージソートだけ１回目が時間がかかるため一回通す
    shuffle(randomArray);
    quickSort(randomArray, 0, randomArray.length-1);
    shuffle(randomArray);
    mergeSort(0,randomArray.length-1);    
}
