const got = require("got");

module.exports = class Cryptocurrency {

    
  async initialize(config) {

    this.coins = config['coins'].join(',');
  }

  async render() {
    return (
      <div class="card" style="width: 16rem;">
        <div class="card-header">Cryptocurrency <i class="fa fa-btc fa-lg ml-1"></i></div>
          <div id="coins-list" class="list-group" style="width: 16rem;"></div>
      </div>
    );
  }

  async script() {
    this.renderCoins();

    setInterval(this.renderRepositories, 120000 /* 2 minutes in miliseconds */);
  }

  renderCoins() {
    this.fetchData().then((coins) => {
  
        coins.forEach((coin) => {
            document.getElementById("coins-list").appendChild(
              <div class="d-flex justify-content-between p-1">
                <div class="p-1" style="font-weight:bold;"><img class="p-1" onerror="this.style.display='none'" src={"https://cryptoicons.org/api/icon/"+ coin.symbol.toLowerCase() +"/20"} /> {coin.name}</div>
                <div class="p-1">
                    <div style="font-size:16px">$ {parseFloat(coin.priceUsd).toFixed(3)}</div>
                    <div class={"text-right badge" + coin.changePercent24Hr > 0 ? "text-success" : "text-danger"} style="font-size:12px">{parseFloat(coin.changePercent24Hr).toFixed(3) + "%"}</div>
                </div>
              </div>
            );
        });
    });
  }

  async fetchData() {
    return await got("https://api.coincap.io/v2/assets?ids=" + this.coins)
      .then((response) => {
        const coinsData = JSON.parse(response.body);

        return coinsData['data'];
      })
      .catch((error) => {
        console.error(error);
      });
  }
};