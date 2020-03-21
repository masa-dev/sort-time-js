//スクリーンの横幅が600px以下のときに配列を非表示にする
if(window.innerWidth < 600) {
    targetArray.seen = false;
}

//マージソート用のバッファ
let buff = [];
let randomArray = [];
for(let i = 0; i < 30000; i++) {
    randomArray[i] = i;
}
//passOnce(); //クイックソートとマージソートを一回通す
shuffle(randomArray);
targetArray.initArray(randomArray);