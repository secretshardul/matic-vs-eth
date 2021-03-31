# APIS
1. Confirmation time

    ```sh
    curl 'https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=KEY'

    {"status":"1","message":"OK","result":"22728"}
    ```

    Dubious value

2. Gas prices

    - Ether: Gives safe, proposed/medium and fast
    ```
    curl 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=KEY'
    ```

    - Matic: Gives safe, standard, fast, fastest and block time
    ```
    curl https://gasstation-mainnet.matic.network
    ```