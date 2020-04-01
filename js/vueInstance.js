//ソートの名前
let sortType = new Vue({
    el: '#sort-type',
    data: {
        selected: 0,
        options: [
            { id: 0, time: null, text: 'デフォルトのソート' },
            { id: 1, time: null, text: '選択ソート' },
            { id: 2, time: null, text: '挿入ソート' },
            { id: 3, time: null, text: 'クイックソート' },
            { id: 4, time: null, text: 'マージソート' },
            { id: 5, time: null, text: 'ヒープソート' },
            { id: 6, time: null, text: 'バブルソート' },
            { id: 7, time: null, text: 'シェーカーソート' },
            { id: 8, time: null, text: '基数ソート' },
            { id: 9, time: null, text: 'バケットソート' }
        ]
    }
});

let targetArray = new Vue({
    el: '#array',
    data: {
        firstArray: [],
        lastArray: [],
        seen: true
    },
    methods: {
        initArray: function(array) {
            let array_length = array.length;
            for(let i = 0; i < 100; i++) {
                this.firstArray.push({ id: i, value: array[i]});
                this.lastArray.push({id: i, value: array[(array_length-100)+i]});
            }
        },
        deleteArray: function() {
            this.firstArray.splice(0, this.firstArray.length);
            this.lastArray.splice(0, this.lastArray.length)
        },
        changeFirstValue: function(id, newValue) {
            this.$set(this.firstArray[id], 'value', newValue);
        },
        changeLastValue: function(id, newValue) {
            this.$set(this.lastArray[id], 'value', newValue);
        },
        updateArray: function(array) {
            let array_length = array.length;
            for(let i = 0; i < 100; i++) {
                this.changeFirstValue(i, array[i]);
                this.changeLastValue(i, array[(array_length-100)+i]);
            }
        }
    }
});

let result = new Vue({
    el: '#result-area',
    data: {
        options: sortType.options
    },
    methods: {
        updateResult: function() {
            this.options = sortType.options;
        }
    }
});

let button = new Vue({
    el: '#button-area',
    data: {
    },
    methods: {
        invisible: function() {
            targetArray.seen = !targetArray.seen;
        },
        shuffleArray: function() {
            shuffle(randomArray);
            targetArray.updateArray(randomArray);
        },
        startSort: function(selected) {
            let startTime, endTime, difference;

            //シャッフル
            shuffle(randomArray);
            targetArray.updateArray(randomArray);

            //ソート
            startTime = Date.now();
            switch(selected) {
                case 0:
                    defaultSort(randomArray);
                    break;
                case 1:
                    selectionSort(randomArray);
                    break;
                case 2:
                    insertSort(randomArray);
                    break;
                case 3:
                    quickSort(randomArray, 0, randomArray.length-1);
                    break;
                case 4:
                    mergeSort(0, randomArray.length-1);
                    break;
                case 5:
                    heapSort(randomArray);
                    break;
                case 6:
                    bubbleSort(randomArray);
                    break;
                case 7:
                    shakerSort(randomArray);
                    break;
                case 8:
                    radixSort(randomArray);
                    break;
                case 9:
                    bucketSort(randomArray);
                    break;
                default:
                    break;
            }
            endTime = Date.now();
            targetArray.updateArray(randomArray);

            if(sortCheck(randomArray) == false) {
                window.alert('ソートに失敗しました\n失敗したソート\n' + sortType.options[selected].text + ': false');
            }

            difference = endTime - startTime;
            sortType.options[selected].time = difference;
            result.updateResult();
        },
        doAllSorts: function() {
            for(let i = 0; i < sortType.options.length; i++) {
                this.startSort(i);
            }
            destroyChart();
            drawChart();
        }
    }
});