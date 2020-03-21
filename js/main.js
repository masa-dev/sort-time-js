//ソートの名前
let sortType = new Vue({
    el: '#sort-type',
    data: {
        selected: 0,
        options: [
            { id: 0, text: 'デフォルトのソート', time: null },
            { id: 1, text: '選択ソート', time: null },
            { id: 2, text: '挿入ソート', time: null },
            { id: 3, text: 'クイックソート', time: null },
            { id: 4, text: 'マージソート', time: null },
            { id: 5, text: 'バブルソート', time: null },
            { id: 6, text: 'ヒープソート', time: null }
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
                    bubbleSort(randomArray);
                case 6:
                    heapSort(randomArray);
                default:
                    break;
            }
            endTime = Date.now();
            targetArray.updateArray(randomArray);

            difference = endTime - startTime;
            sortType.options[selected].time = difference;
            result.updateResult();
        },
        doAllSorts: function() {
            for(let i = 0; i < sortType.options.length; i++) {
                this.startSort(i);
            }
        }
    }
});


let buff = [];
let randomArray = [];
for(let i = 0; i < 30000; i++) {
    randomArray[i] = i;
}
//passOnce(); //クイックソートとマージソートを一回通す
shuffle(randomArray);
targetArray.initArray(randomArray);