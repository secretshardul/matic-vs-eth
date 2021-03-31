let maticFees = undefined
let ethFees = undefined

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

async function drawCharts() {
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

function getTable (mFast, mMed, mSlow, ethFast, ethMed, ethSlow) {
    return `<table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Fast 🚀</th>
                        <th>Medium 🚗</th>
                        <th>Slow 🐌</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <div id="matic-prices"></div>
                        <td>Matic</td>
                        <td>${mFast}</td>
                        <td>${mMed}</td>
                        <td>${mSlow}</td>
                    </tr>
                    <tr>
                        <div id="matic-prices"></div>
                        <td>Ethereum</td>
                        <td>${ethFast}</td>
                        <td>${ethMed}</td>
                        <td>${ethSlow}</td>
                    </tr>

                </tbody>
            </table>`
}

function getFee(gasPrice, rate) {
    const gasUsed = 21000
    const cost = gasPrice * gasUsed * 0.000000001 * rate
    // const cost = (gwei * rate) / 10 ** 9
    return cost.toFixed(6)
}

async function getExchangeRates() {
    const resp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cmatic-network&vs_currencies=usd')
    const rates = await resp.json()

}


async function getGasFees() {
    maticFees = await getMaticFees()
    ethFees = await getEthFees()

    // Draw column graph
    google.charts.load('current', { packages: ['corechart', 'bar'] })
    google.charts.setOnLoadCallback(drawCharts)

    const gasTable = document.getElementById('gas-table')


    // Get exchange rates
    const resp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cmatic-network&vs_currencies=usd')
    const rates = await resp.json()

    const maticRate = rates['matic-network'].usd
    const ethRate = rates.ethereum.usd

    // Calculate fees and generate table
    const table = getTable(
        getFee(maticFees.fast, maticRate),
        getFee(maticFees.standard, maticRate),
        getFee(maticFees.safeLow, maticRate),

        getFee(ethFees.fast / 10, ethRate),
        getFee(ethFees.average / 10, ethRate),
        getFee(ethFees.safeLow / 10, ethRate),
    )

    // Display table
    gasTable.innerHTML = table
}

