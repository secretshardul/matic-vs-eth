google.charts.load('current', { packages: ['corechart', 'bar'] })
google.charts.setOnLoadCallback(drawDualX)

function drawDualX () {
    const data = google.visualization.arrayToDataTable([
        ['Speed', 'Matic', 'Ethereum'],
        ['Fast', 8175000, 8008000],
        ['Medium', 3792000, 3694000],
        ['Slow', 2695000, 2896000],
    ])

    const materialOptions = {
        hAxis: {
            title: 'Total Population'
        },
        vAxis: {
            title: 'City'
        },
        bars: 'horizontal',
        series: {
            0: { axis: 'matic' },
        },
        axes: {
            x: {
                matic: { label: 'Gwei', side: 'top' },
            }
        }
    }

    const materialChart = new google.charts.Bar(document.getElementById('chart_div'))
    materialChart.draw(data, materialOptions)
}