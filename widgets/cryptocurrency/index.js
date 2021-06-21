const got = require("got");

module.exports = class Cryptocurrency {

    
  async initialize(config) {

    this.coins = config['coins'].join(',');
    this.fetchData = this.fetchData.bind(this);
    this.renderCoins = this.renderCoins.bind(this);
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

    setInterval(this.renderCoins, 10000 /* 10 seconds in miliseconds */);
  }

  async renderCoins() {
    const coinsListElement = document.getElementById("coins-list"); 

    this.fetchData().then((coins) => {

      coinsListElement.innerHTML = "";

      coins.forEach((coin) => {
          coinsListElement.appendChild(
            <div class="d-flex justify-content-between list-group-item">          
              <div style="font-weight:bold;"><img style="width: 28px;" src={__dirname + "/defaultcoin.png"} /> {coin.name}</div>
              <div>
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