function drawChart() {
    let ctx = document.getElementById('chart').getContext('2d');
    let sortName = [];
    let sortTime = [];
    for(let temp of sortType.options) {
        temp.text = temp.text.replace('の', '');
        temp.text = temp.text.replace('ソート', '');
        sortName.push(temp.text);
    }
    for(let temp of sortType.options) {
        sortTime.push(temp.time);
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
                display: true,
                text: 'ソートアルゴリズムの計算時間'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        stepSize: 500,
                        callback: function(value, index, values) {
                            return value + 'ms'
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