function drawChart() {
    let ctx = document.getElementById('chart').getContext('2d');
    let sortName = [];
    let sortTime = [];
    let bool;
    if(window.innerWidth < 600) {
        bool = false;
    } else {
        bool = true;
    }
    for(let temp of sortType.options) {
        let str = temp.text;
        str = str.replace('の', '');
        str = str.replace('ソート', '');
        sortName.push(str);
    }
    for(let temp of sortType.options) {
        sortTime.push(temp.time/1000);  //秒（s）で表示する
    }

    //グローバル変数で宣言
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortName,
            datasets: [{
                label: 'n=30000',
                data: sortTime,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: bool,  //ウインドウの横幅でタイトルを表示するか決める
                text: 'ソートアルゴリズムの計算時間'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        stepSize: 1,
                        callback: function(value) { //(value, index, values)
                            return value + 's'
                        }
                    }
                }]
            }
        }
    })
}

function destroyChart() {
    //定義されているか判別
    if(typeof myChart !== 'undefined') {
        myChart.destroy();
    }
}
