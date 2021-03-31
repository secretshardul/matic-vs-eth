async function getMaticFees() {
    const resp = await fetch('https://gasstation-mainnet.matic.network')
    const fees = await resp.json()

    console.log('Matic fees', fees)
    return fees
}

async function getEthFees() {
    const resp = await fetch('https://ethgasstation.info/api/ethgasAPI.json')
    const fees = await resp.json()

    console.log('Eth fees', fees)
    return fees
}

google.charts.load('current', { packages: ['corechart', 'bar'] })
google.charts.setOnLoadCallback(drawCharts)

async function drawCharts() {
    const maticFees = await getMaticFees()
    const ethFees = await getEthFees()

    const values = [
        ['Speed', 'Matic', 'Ethereum'],
        ['Slow', maticFees.safeLow, ethFees.safeLow / 10],
        ['Medium', maticFees.standard, ethFees.average / 10],
        ['Fast', maticFees.fast, ethFees.fast / 10],
    ]

    // Gas price comparison in Gwei
    draw(values, 'Gwei', 'chart_div')
}

function draw(values, labelName, elementId) {
    const data = google.visualization.arrayToDataTable(values)

    const materialOptions = {}

    const materialChart = new google.charts.Bar(document.getElementById(elementId))
    materialChart.draw(data, materialOptions)
}
