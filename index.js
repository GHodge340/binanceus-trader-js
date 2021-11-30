//RESOURCES
//TIME CONVERTER - https://www.epochconverter.com/
// NODE FETCH: https://www.npmjs.com/package/fetch
// ASCIIART: https://patorjk.com/software/taag/#p=display&h=3&f=Banner&t=CryptAlgo
//API DOCUMENTATION: https://github.com/binance-us/binance-official-api-docs/blob/master/rest-api.md#new-order--trade

//GLOBAL VARIABLES
const fetch = require('node-fetch');
const crypto = require('crypto');
const keys = {
  "akey": 'xjYhXgHSuLnaePMyK9cp06yDkrs2j6GcYg6wnmZRiKqPIpvGoLt35x7jnm2o4vJY',
  "skey": '78U50i1ZOCg9Cxuve2ZkdwzjViGuRDUasvVYE4YQ1xY80g7yLBDCmA1MqqvZ2Hei'
}

let usdAssets = [];
let assetPrices = [];
let opensBar1 = [];
let closesBar1 = [];
let highsBar1 = [];
let lowsBar1 = [];
let volumesBar1 = [];
let opensBar2 = [];
let closesBar2 = [];
let highsBar2 = [];
let lowsBar2 = [];
let volumesBar2 = [];
let bullList = [];
let bearList = [];
let runnerList = [];
let bidPrices = [];
let bidQtys = [];
let askPrices = [];
let askQtys = [];
let buyOrders = [];
let sellOrders = [];
let assetSelect = undefined;
let candlestickData = undefined;
let serverTime = undefined;
let bar1High = undefined;
let bar1Low = undefined;
let bar1Open = undefined;
let bar1Close = undefined;
let bar1Volume = undefined;
let bar2High = undefined;
let bar2Low = undefined;
let bar2Open = undefined;
let bar2Close = undefined;
let bar2Volume = undefined;
let bull = undefined;
let runner = undefined;
let bidPrice = undefined;
let bidQty = undefined;
let askPrice = undefined;
let askQty = undefined;
let buyOrder = undefined;
let sellOrder = undefined;
let buyWall = undefined;
let sellWall = undefined;
let buyPrice = undefined;
let sellPrice = undefined;
let targetBuy = undefined;
let targetSell = undefined;
let orderQty = undefined;
let percentAmount = undefined;
let percentGain = undefined;
let pastDailyClose = undefined;
let lastDailyClose = undefined;
let bullDailyHigh = undefined;
let dailyHighBuffer = undefined;
let test1 = 'Failed'
let test2 = 'Failed'
let test3 = 'Failed'
let test4 = 'Failed'
let c = 0;
let c1 = 0;
let c2 = 0;
let c3 = 0;
let c4 = 0;
let c5 = 0;
let c6 = 0;
let priceVar = 0;
let quantityVar = 0;
let orderPrice = 0;
let onePercentGain = 0;
let stopLoss = 0;
let quantity = 0;
let price = 0;
let investment = 25.00;



console.log(`

██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗
██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗
██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║   ██║
██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██║   ██║
╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝

████████╗██████╗  █████╗ ██████╗ ███████╗██████╗
╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
   ██║   ██████╔╝███████║██║  ██║█████╗  ██████╔╝
   ██║   ██╔══██╗██╔══██║██║  ██║██╔══╝  ██╔══██╗
   ██║   ██║  ██║██║  ██║██████╔╝███████╗██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝

   Developed By: @GTheCodeGuy

`)


console.log('(((INITIATING CRYPTO TRADER BINANCE)))\n')

function checkTime() {
  fetch('https://api.binance.us/api/v3/time')
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      serverTime = new Date(data.serverTime)
      console.log(`${serverTime}\n\n`)
    });
}
checkTime();

function assetPrice() {
  fetch('https://api.binance.us/api/v3/ticker/price')
    .then(response => response.json())
    .then(data => {
      //console.log(data)

      //PRINTS USD ASSETS
      console.log(`BINANCE USD Trading Pairs\n==========================\n`)

      //LOOPS AND CHECKS FOR ASSETS ENDING WITH "USD"
      for (c = 0; c < data.length; c++) {
        if (data[c].symbol.endsWith('USD') && !data[c].symbol.endsWith('BUSD')) {
          assetPrices.push(data[c].price) //PUSHES USD PRICES TO ARRAY
          usdAssets.push(data[c].symbol) //PUSHES USD ASSETS TO  ARRAY
          console.log(`${c1}. ${data[c].symbol} $${data[c].price}`) // LISTS THE USDPAIRS + PRICES
          c1++;
        }
      }

      //PRINT ALL THE USD
      console.log(`\nUSD Pairs\n===========\n${usdAssets}`);

      console.log(`\n(((INITIATING CANDLESTICK DATA COLLECTION)))\n`)

      console.log(`\n(((CRYPTO ASSETS CANDLESTICK DATA)))\n`)


      setTimeout(() => {
        candlesticks();
      }, 1000);

    })
}
assetPrice();

function candlesticks() {
  //https://api.binance.us/api/v3/klines?symbol=BTCUSD&interval=5m&limit=2

  assetSelect = usdAssets[c2];
  fetch('https://api.binance.us/api/v3/klines?symbol=' + assetSelect + '&interval=5m&limit=2')
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      console.log(assetSelect)
      console.log('CANDLESTICK DATA\n===============================')
      console.log(`Candlestick 1 - Open:   ${data[0][1]}`) //PREVIOUS OPEN
      console.log(`Candlestick 1 - Close:  ${data[0][4]}`) //PREVIOUS CLOSE
      console.log(`Candlestick 1 - High:   ${data[0][2]}`) //PREVIOUS HIGH
      console.log(`Candlestick 1 - Low:    ${data[0][3]}`) //PREVIOUS LOW
      console.log(`Candlestick 1 - Volume: ${data[0][5]}\n`) //PREVIOUS VOLUME

      console.log(`Candlestick 2 - Open:  ${data[1][1]}`) //LATEST OPEN
      console.log(`Candlestick 2 - Close:  ${data[1][4]}`) //LATEST CLOSE
      console.log(`Candlestick 2 - High:   ${data[1][2]}`) //LATEST HIGH
      console.log(`Candlestick 2 - Low:    ${data[1][3]}`) //LATEST LOW
      console.log(`Candlestick 2 - Volume: ${data[1][5]}`) //LATEST VOLUME
      console.log('===============================')

      console.log(`SCANNED: ${c2 + 1} OF ${usdAssets.length} ASSETS\n`);

      //CONVERTS CANDLESTICK DATA IN NUMBERS
      bar1High = parseFloat(data[0][1]) // PREVIOUS DATA
      bar1Low = parseFloat(data[0][4])
      bar1Open = parseFloat(data[0][2])
      bar1Close = parseFloat(data[0][3])
      bar1Volume = parseFloat(data[0][5])

      bar2High = parseFloat(data[1][1]) // LATEST DATA
      bar2Low = parseFloat(data[1][4])
      bar2Open = parseFloat(data[1][2])
      bar2Close = parseFloat(data[1][3])
      bar2Volume = parseFloat(data[1][5])

      //PUSHES PREVIOUS CANDLESTICK DATA IN ARRAY
      opensBar1.push(bar1Open)
      closesBar1.push(bar1Close)
      highsBar1.push(bar1High)
      lowsBar1.push(bar1Low)
      volumesBar1.push(bar1Volume)

      //PUSHES LATEST CANDLESTICK DATA IN ARRAY
      opensBar2.push(bar2Open)
      closesBar2.push(bar2Close)
      highsBar2.push(bar2High)
      lowsBar2.push(bar2Low)
      volumesBar2.push(bar2Volume)

      //INCREASE COUNTER
      c2++;

      //CHECKS IF CRYPTO LIST COLLECTION IS COMPLETE
      if (c2 === usdAssets.length) {
        setTimeout(() => {
          console.log(`(((INITIATING DATA ANALYSIS)))`)
          dataAnalysis();
        }, 3000);

      }
      if (c2 !== usdAssets.length) {
        setTimeout(() => {
          candlesticks()
        }, 1000)
      }

    })
    .catch((error) => {
      console.log(`CANDLESTICK ERROR DETECTED - RESTARTING ALGORITHM`);
      console.error('Error:', error);
      resetApp();
    });

}

function dataAnalysis() {

  for (c3 = 0; c3 < usdAssets.length; c3++) {
    if ((opensBar1[c3] > closesBar1[c3]) && (closesBar2[c3] > opensBar1[c3]) && (volumesBar1[c3] <= volumesBar2[c3])) {
      // console.log(product[c] + ' is a candidate for a bull run!')
      bullList.push(usdAssets[c3])

    } if ((opensBar1[c3] > closesBar1[c3]) && (closesBar2[c3] < closesBar1[c3]) && (volumesBar1[c3] >= volumesBar2[c3])) {
      //  console.log(product[c] + 'is currently bearish.')
      bearList.push(usdAssets[c3])

    } if ((opensBar1[c3] < closesBar1[c3]) && (opensBar2[c3] > closesBar1[c3]) && (volumesBar1[c3] <= volumesBar2[c3])) {
      //console.log(product[c] + ' is a runner...')
      runnerList.push(usdAssets[c3])

    }

  }

  //DISPLAY CRYPTO ASSET REPORT
  console.log(`\nCRYPTO ANALYSIS REPORT\n======================\n`)
  console.log(`Bull List\n============\n ${bullList}\n`)
  console.log(`Bear List\n============\n ${bearList}\n`)
  console.log(`Runner List\n============\n ${runnerList}\n`)

  //BULLSELECTOR
  bullSelector();
}


function bullSelector() {

  for (c3 = 0; c3 < usdAssets.length; c3++) {

    if (usdAssets[c3] === bullList[0]) {

      bull = bullList[0]
      //console.log('atbullList: ' + atbullList[0])
    }

    if (usdAssets[c3] === runnerList[0]) {

      runner = runnerList[0]
      //console.log('atrunList: ' + atrunList[0])
    }

  }

  //CONFIRMS BULLS AND RUNNERS
  if ((bull === bullList[0]) || (runner === runnerList[0])) {
    bullCheck();
  }
  if ((bull === 'DAIUSD') || (bull === 'USDCUSD') || (bull === 'BUSDUSD') || (bull === 'USDT')) {
    console.log(`STABLE COIN SELECTED..\n\nRESCANNING EXCHANGE...\n\n`)
    resetApp();
  }
  if (bull === 'XRPUSD') {
    console.log(`DELISTED ASSET...\n\nRESCANNING EXCHANGE..\n\n`)
    resetApp();
  }
  if ((bull !== bullList[0]) && (runner !== runnerList[0])) {
    console.log(`\n\n No Potential Profitable Trades Detected!!!\n\nRescanning Crypto Exchange...\n\n `)
    resetApp();
  }

}

function bullCheck() {
  //VERIFIES SELECTED BULL IS NOT UNDEFINED
  if (bullList[c4] !== undefined) {
    bull = bullList[c4]
    c4++;

    setTimeout(() => {
      orderBookCheck();
    }, 3000);
  }

  else if (bullList[c4] === undefined) {
    setTimeout(() => {
      runnerCheck();
    }, 3000);
  }
}

function runnerCheck() {
  //VERIFIES SELECTED RUNNER IS NOT UNDEFINED
  if (runnerList[c5] !== undefined) {
    bull = runnerList[c5]
    c5++;

    setTimeout(() => {
      orderBookCheck();
    }, 3000);
  }

  else if (runnerList[c5] === undefined) {
    console.log(`\n\n(((RESCANNING CRYPTO EXCHANGE)))\n`)
    setTimeout(() => {
      resetApp();
    }, 3000);
  }
}

function orderBookCheck() {
  console.log(`RETRIEVING ${bull} ORDER BOOK DATA`)
  fetch('https://api.binance.us/api/v3/depth?symbol=' + bull + '&limit=100')
    .then(response => response.json())
    .then(data => {
      orderBook = data

      for (c6 = 0; c6 < orderBook.bids.length; c6++) {

        bidPrice = parseFloat(orderBook.bids[c6][0])
        bidQty = parseFloat(orderBook.bids[c6][1])
        askPrice = parseFloat(orderBook.asks[c6][0])
        askQty = parseFloat(orderBook.asks[c6][1])

        bidPrices.push(bidPrice)
        bidQtys.push(bidQty)
        askPrices.push(askPrice)
        askQtys.push(askQty)

        buyOrder = bidPrices[c6] * bidQtys[c6]
        sellOrder = askPrices[c6] * askQtys[c6]

        buyOrders.push(buyOrder)
        sellOrders.push(sellOrder)

      }

      //FUNCTION VARIABLES
      buyWall = Math.max(...buyOrders)
      sellWall = Math.max(...sellOrders)
      buyPrice = bidPrices[buyOrders.indexOf(buyWall)]
      sellPrice = askPrices[sellOrders.indexOf(sellWall)]
      //targetBuy = buyPrice + .05;  //RECHECK THIS - TRY INCREASINF THE BUY PRICE BY  PERCENT (ALSO SEE IF ASSETS HAVE MAX MIN BASE QUOTE INC)
      //targetSell = sellPrice - .05; //RECHECK THIS BECAUSE ADDING/SUBTRACTING .05 TO AN ASSET PRICE MIGHT SCREW THE FIGURES..
      //targetBuy = buyPrice + (buyPrice * .005) // CREATES A 1/2% BUFFER INFRONT BUYWALL
      //targetSell = sellPrice - (sellPrice * .005) // CREATES A 1/2% BUFFER INFRONT SELLWALL


      //SET PRICES
      if ((bull === 'AAVEUSD') || (bull === 'AVAXUSD') || (bull === 'AXSUSD') || (bull === 'BCHUSD') || (bull === 'BTCUSD') || (bull === 'COMPUSD') || (bull === 'DASHUSD') || (bull === 'ETHUSD') || (bull === 'FILUSD') || (bull === 'LTCUSD') || (bull === 'PAXGUSD') || (bull === 'REPUSD') || (bull === 'ZECUSD')) {
        targetBuy = (buyPrice + (buyPrice * .005)).toFixed(2)
        targetSell = (sellPrice - (sellPrice * .005)).toFixed(2)
        let oPG = parseFloat(targetBuy) + parseFloat(targetBuy * .01) //CALCULATES VALUE OF 1% GREATER THAN TARGETBUY
        onePercentGain = oPG.toFixed(2)
      }
      if ((bull === 'ALGOUSD') || (bull === 'ATOMUSD') || (bull === 'CRVUSD') || (bull === 'EGLDUSD') || (bull === 'KNCUSD') || (bull === 'NEOUSD') || (bull === 'QTUMUSD') || (bull === 'SUSHIUSD') || (bull === 'ZENUSD')) {
        targetBuy = (buyPrice + (buyPrice * .005)).toFixed(3)
        targetSell = (sellPrice - (sellPrice * .005)).toFixed(3)
        let oPG = parseFloat(targetBuy) + parseFloat(targetBuy * .01) //CALCULATES VALUE OF 1% GREATER THAN TARGETBUY
        onePercentGain = oPG.toFixed(3)
      }
      if ((bull === 'ADAUSD') || (bull === 'AMPUSD') || (bull === 'ANKRUSD') || (bull === 'BANDUSD') || (bull === 'BATUSD') || (bull === 'BNBUSD') || (bull === 'BUSDUSD') || (bull === 'DAIUSD') || (bull === 'DOGEUSD') || (bull === 'ENJUSD') || (bull === 'EOSUSD') || (bull === 'ETCUSD') || (bull === 'GRTUSD') || (bull === 'HBARUSD') || (bull === 'HNTUSD') || (bull === 'ICXUSD') || (bull === 'IOTAUSD') || (bull === 'LINKUSD') || (bull === 'MANAUSD') || (bull === 'MATICUSD') || (bull === 'MKRUSD') || (bull === 'NANOUSD') || (bull === 'OMGUSD') || (bull === 'ONEUSD') || (bull === 'ONTUSD') || (bull === 'OXTUSD') || (bull === 'RVNUSD') || (bull === 'SOLUSD') || (bull === 'STORJUSD') || (bull === 'UNIUSD') || (bull === 'USDCUSD') || (bull === 'USDTUSD') || (bull === 'VETUSD') || (bull === 'VTHOUSD') || (bull === 'WAVESUSD') || (bull === 'XLMUSD') || (bull === 'XTZUSD') || (bull === 'ZILUSD') || (bull === 'ZRXUSD')) {
        targetBuy = (buyPrice + (buyPrice * .005)).toFixed(4)
        targetSell = (sellPrice - (sellPrice * .005)).toFixed(4)
        let oPG = parseFloat(targetBuy) + parseFloat(targetBuy * .01) //CALCULATES VALUE OF 1% GREATER THAN TARGETBUY
        onePercentGain = oPG.toFixed(4)
      }

      //SET QUANTITIES
      if ((bull === 'BTCUSD') || (bull === 'PAXGUSD')) {
        quantity = (investment / targetBuy).toFixed(6)
      }
      if ((bull === 'BCHUSD') || (bull === 'COMPUSD') || (bull === 'DASHUSD') || (bull === 'ETHUSD') || (bull === 'LTCUSD') || (bull === 'MKRUSD') || (bull === 'ZECUSD')) {
        quantity = (investment / targetBuy).toFixed(5)
      }
      if ((bull === 'AAVEUSD') || (bull === 'FILUSD')) {
        quantity = (investment / targetBuy).toFixed(4)
      }
      if ((bull === 'ALGOUSD') || (bull === 'ATOMUSD') || (bull === 'BNBUSD') || (bull === 'EGLDUSD') || (bull === 'KNCUSD') || (bull === 'NEOUSD') || (bull === 'QTUMUSD') || (bull === 'REPUSD') || (bull === 'SUSHIUSD') || (bull === 'ZENUSD')) {
        quantity = (investment / targetBuy).toFixed(3)
      }
      if ((bull === 'AVAXUSD') || (bull === 'AXSUSD') || (bull === 'BANDUSD') || (bull === 'BATUSD') || (bull === 'BUSDUSD') || (bull === 'DAIUSD') || (bull === 'EOSUSD') || (bull === 'ETCUSD') || (bull === 'GRTUSD') || (bull === 'HNTUSD') || (bull === 'ICXUSD') || (bull === 'IOTAUSD') || (bull === 'LINKUSD') || (bull === 'MANAUSD') || (bull === 'NANOUSD') || (bull === 'OMGUSD') || (bull === 'ONTUSD') || (bull === 'SOLUSD') || (bull === 'STORJUSD') || (bull === 'UNIUSD') || (bull === 'USDCUSD') || (bull === 'USDTUSD') || (bull === 'WAVESUSD') || (bull === 'XTZUSD') || (bull === 'ZRXUSD')) {
        quantity = (investment / targetBuy).toFixed(2)
      }
      if ((bull === 'ADAUSD') || (bull === 'AMPUSD') || (bull === 'ANKRUSD') || (bull === 'CRVUSD') || (bull === 'ENJUSD') || (bull === 'HBARUSD') || (bull === 'MATICUSD') || (bull === 'ONEUSD') || (bull === 'RVNUSD') || (bull === 'XLMUSD') || (bull === 'ZILUSD')) {
        quantity = (investment / targetBuy).toFixed(1)
      }
      if ((bull === 'DOGEUSD') || (bull === 'VETUSD') || (bull === 'VTHOUSD')) {
        quantity = (investment / targetBuy).toFixed(0)
      }

      //onePercentGain = parseFloat(targetBuy) + parseFloat(targetBuy * .01) //CALCULATES VALUE OF 1% GREATER THAN TARGETBUY
      stopLoss = parseFloat(targetBuy) - parseFloat(targetBuy * .40)
      quantity = investment / targetBuy

      console.log(`\n(((SELECTED ASSET: ${bull})))`)
      console.log('\nLARGEST ORDERS WALLS\n================');
      console.log('BidWall: ' + Math.max(...buyOrders));
      console.log('AskWall: ' + Math.max(...sellOrders));
      console.log('\nBUY/SELL PRICE\n================');
      console.log(`Buying Price: ${buyPrice}`);
      console.log(`Selling  Price: ${sellPrice}`)
      console.log('\nTARGET PRICES\n================');
      console.log(`Targeted Buy Price: ${targetBuy}`);
      console.log(`Targeted Sell Price: ${targetSell}`)
      console.log(`1% Profit Price: ${onePercentGain}`)
      console.log('================\n');

      dailyTicker();

      // resetApp();

    })
}

function dailyTicker() {
  //DAILY TICKER INFO
  fetch('https://api.binance.us/api/v3/ticker/24hr?symbol=' + bull)
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      bullDailyHigh = parseFloat(data.highPrice)
      dailyHighBuffer = bullDailyHigh - (bullDailyHigh * .01)

      console.log(`PRICE INFORMATION\n================= \nDaily High: ${data.highPrice}`)
      console.log(`Current Price: ${data.lastPrice}\n\n`)
      console.log(`(((ENTERING RISK ASSESMENT)))`)
      console.log(`======================================`)
      riskAssesment();
    })
    .catch((error) => {
      console.log(`DAILY TICKER ERROR DETECTED - RESTARTING ALGORITHM`);
      console.error('Error:', error);
      resetApp();
    });
}

function riskAssesment() {
  //FUNCTION VARIABLES
  //gap = targetSell - targetBuy
  //percentAmount = .05
  //percentGain = (targetBuy * percentAmount) + targetBuy


  //CANDLESTICK 24HR INFO
  fetch('https://api.binance.us/api/v3/klines?symbol=' + bull + '&interval=1d&limit=2')
    .then(response => response.json())
    .then(data => {
      pastDailyClose = parseFloat(data[0][4])
      lastDailyClose = parseFloat(data[1][4])

      if (targetSell >= onePercentGain) {//CHECKS WALL GAP AND PROFIT POTENTIAL
        console.log(`PROFIT POTENTIAL TEST - PASSED`);
        //console.log(`Profit Potential Test Passed...\n`)
        test1 = 'Passed'
      }
      if (targetSell < onePercentGain) {
        console.log(`PROFIT POTENTIAL TEST - FAILED`);
        //console.log(`Profit Potential Test Failed...\n`)
        test1 = 'Failed'
      }

      if (targetSell < dailyHighBuffer) { //CHECKS THAT SELL PRICE IS 1% OR MORE LESS THAN DAILY
        console.log(`DAILY HIGH TEST - PASSED`);
        test2 = 'Passed'
      }

      if (targetSell >= dailyHighBuffer) {
        console.log(`DAILY HIGH TEST - FAILED`);
        test2 = 'Failed'
      }

      if (pastDailyClose < lastDailyClose) {//CHECKS FOR A 24HR BULLISH TREND
        console.log(`24HR TREND TEST - PASSED`)
        test3 = 'Passed'
      }

      if (pastDailyClose >= lastDailyClose) {
        console.log(`24HR TREND TEST - FAILED`)
        test3 = 'Failed'
      }

      if (buyWall > sellWall) {
        console.log(`SELLING PRESSURE TEST - PASSED`)
        test4 = 'Passed'
      }

      if (buyWall <= sellWall) {
        console.log(`SELLING PRESSURE TEST - FAILED`)
        test4 = 'Failed'
      }

      if ((test1 === 'Passed') && (test2 === 'Passed') && (test3 === 'Passed') && (test4 === 'Passed')) {
        console.log(`\n\n((${bull} - PASSED ALL TRADING TESTS))`)
        console.log(`======================================\n`)
        console.log(`(((PLACING TRADE ORDER)))\nSelected Asset: ${bull}\n`)
        //placeOrder();
        //price = targetBuy

        placeOrder()
      }

      if ((test1 === 'Failed') || (test2 === 'Failed') || (test3 === 'Failed') || (test4 === 'Failed')) {

        //RESET ARRAYS
        bidPrices = [];
        bidQtys = [];
        askPrices = [];
        askQtys = [];
        buyOrders = [];
        sellOrders = [];

        console.log('\n((FAILED TRADING REQUIREMENTS))  \n\nSCANNING OTHER CRYPTOS...')
        console.log(`======================================\n`)
        bullCheck();
      }
    })
    .catch((error) => {
      console.log(`RISK ASSESMENT ERROR DETECTED - RESTARTING ALGORITHM`);
      console.error('Error:', error);
      resetApp();
    });

}





function placeOrder() {


  //SIGNED API VARIABLES
  //priceVar = parseFloat(orderPrice)
  //quantityVar = parseFloat(orderQty)
  const burl = "https://api.binance.us";
  let endPoint = "/api/v3/order";
  let dataQueryStringOrder = `symbol=${bull}&side=BUY&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${targetBuy}&recvWindow=20000&timestamp=` + Date.now();
  let signature = crypto.createHmac('sha256', keys['skey']).update(dataQueryStringOrder).digest('hex');
  let urlOrder = burl + endPoint + '?' + dataQueryStringOrder + '&signature=' + signature;

  console.log(`ORDER VARIABLES\n=============\nSymbol: ${bull}\nPrice: ${targetBuy}\nQuantity: ${quantity}\nSide: BUY\nType: LIMIT`);
  console.log(`=============\n`)
  //PLACES INITIAL ORDER
  fetch(urlOrder, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "X-MBX-APIKEY": 'xjYhXgHSuLnaePMyK9cp06yDkrs2j6GcYg6wnmZRiKqPIpvGoLt35x7jnm2o4vJY'
    }
  })
    .then(response => response.json())
    .then(data => {

      console.log(`INITIAL ORDER RESPONSE:`)
      console.log(data)
      const orderDate = parseFloat(data.transactTime)
      const date = new Date(orderDate)
      let x = 0

      console.log(`\n${bull} ORDER REPORT\n=====================`)
      console.log(`Symbol: ${bull}`)
      console.log(`Price: $${data.price}`)
      console.log(`StopLoss: $${stopLoss}`);
      console.log(`Quantity: ${data.origQty}`);
      console.log(`Executed Qty: ${data.executedQty}`)
      console.log(`Order Type: ${data.type} ${data.side}`)
      console.log(`Status: ${data.status}`)
      console.log(`OrderId: ${data.orderId}`)
      console.log(`Order Time: ${data.transactTime}`)
      console.log(`=====================\n`)


      orderLoop();

      //START CHECK ORDER LOOP
      function orderLoop() {
        setTimeout(function () { checkOrder(); }, 5000);
      }

      //CHECKS THE STATUS OF THE ORDER
      function checkOrder() {
        const burl = "https://api.binance.us";
        let endPoint = "/api/v3/order";
        let dataQueryStringCheck = `symbol=${bull}&timestamp=` + Date.now();
        let signature = crypto.createHmac('sha256', keys['skey']).update(dataQueryStringCheck).digest('hex');
        let urlCheck = burl + endPoint + '?' + dataQueryStringCheck + '&signature=' + signature;
        //CHECK ORDER STATUS
        fetch(urlCheck, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-MBX-APIKEY": 'xjYhXgHSuLnaePMyK9cp06yDkrs2j6GcYg6wnmZRiKqPIpvGoLt35x7jnm2o4vJY'
          }
        })

          .then(response => response.json())
          .then(data => {

            if ((data.status === 'NEW') && (x != 12)) {
              console.log(`ORDER NOT FILLED`)
              x++
              orderLoop();
            }
            if (data.status === 'CANCELLED') {
              console.log(`ORDER CANCELLED..\nRESETTING ALGORITHM..\n`)
              resetApp();
            }
            if (data.status === 'FILLED') {
              console.log(`ORDER FILLED`);
              //POST STOP LOSS
              let dataQueryStringLoss = `symbol=${bull}&side=SELL&type=STOP_LOSS&timeInForce=GTC&quantity=${quantity}&stopPrice=${stopLoss}&recvWindow=20000&timestamp=` + Date.now();
              let signature2 = crypto.createHmac('sha256', keys['skey']).update(dataQueryStringLoss).digest('hex');
              let stopUrl = burl + endPoint + '?' + dataQueryStringLoss + '&signature=' + signature2;
              fetch(stopurl, {
                method: "POST",
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "X-MBX-APIKEY": 'xjYhXgHSuLnaePMyK9cp06yDkrs2j6GcYg6wnmZRiKqPIpvGoLt35x7jnm2o4vJY'
                }
              })
                .then(response => response.json())
                .then(stopData => {
                  console.log(`((CREATING STOPLOSS))`);
                  console.log(`\n${bull} STOPLOSS ORDER REPORT\n=====================`)
                  console.log(`Symbol: ${bull}`)
                  console.log(`Price: $${stopData.price}`)
                  console.log(`StopLoss: $${stopLoss}`);
                  console.log(`Quantity: ${stopData.origQty}`);
                  console.log(`Executed Qty: ${stopData.executedQty}`)
                  console.log(`Order Type: ${stopData.type} ${stopData.side}`)
                  console.log(`Status: ${stopData.status}`)
                  console.log(`OrderId: ${stopData.orderId}`)
                  console.log(`Order Time: ${date.toLocaleString()}`)
                  console.log(`=====================\n`)

                  orderLoop2()

                  //START CHECK ORDER LOOP
                  function orderLoop2() {
                    setTimeout(function () { checkStopOrder(); }, 5000);
                  }

                  function checkStopOrder() {
                    if (stopData.status === 'NEW') {
                      console.log(`((STOPLOSS CREATED))`);
                      console.log(`StopLoss: $${stopLoss}`);
                      monitorOrder();
                    }
                    if (stopData.status !== 'NEW') {
                      console.log(`((VALIDATING STOPLOSS ORDER))`);
                      orderLoop2();
                    }
                  }

                  //MONITOR ORDER STATUS
                  function monitorOrder() {
                    const burl = "https://api.binance.us";
                    let endPoint = "/api/v3/order";
                    let dataQueryStringMonitor = `symbol=${bull}&timestamp=` + Date.now();
                    let signature = crypto.createHmac('sha256', keys['skey']).update(dataQueryStringMonitor).digest('hex');
                    let urlMonitor = burl + endPoint + '?' + dataQueryStringMonitor + '&signature=' + signature;
                    //MONITORS ORDER STATUS
                    fetch(urlMonitor, {
                      method: "GET",
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "X-MBX-APIKEY": 'xjYhXgHSuLnaePMyK9cp06yDkrs2j6GcYg6wnmZRiKqPIpvGoLt35x7jnm2o4vJY'
                      }
                    })
                      .then(response => response.json())
                      .then(dataMonitor => {
                        if (dataMonitor.status === 'FILLED') {
                          resetApp();
                          console.log(`SUCCESSFUL TRADE COMPLETE\n=================`)
                          console.log(`ORDER DATA`);
                          console.log(dataMonitor)
                        }
                        if (dataMonitor.status !== 'FILLED') {
                          console.log(`TRADE STATUS PENDING`);
                          //START MONITOR ORDER LOOP
                          function orderLoop() {
                            setTimeout(function () { monitorOrder(); }, 5000);
                          }
                        }

                      })
                      .catch((error) => {
                        console.log(`MONITOR ERROR DETECTED - RESTARTING ALGORITHM`);
                        console.error('Error:', error);
                        resetApp();
                      });
                  }

                })
                .catch((error) => {
                  console.log(`STOP LOSS ERROR DETECTED - RESTARTING ALGORITHM`);
                  console.error('Error:', error);
                  resetApp();
                });
            }
          })
          .catch((error) => {
            console.log(`CHECK ORDER ERROR DETECTED - RESTARTING ALGORITHM`);
            console.error('Error:', error);
            resetApp();
          });
      }

    })
    .catch((error) => {
      console.log(`PLACE ORDER ERROR DETECTED - RESTARTING ALGORITHM`);
      console.error('Error:', error);
      resetApp();
    });
  //CHECK ORDER THEN PLACE SELL ORDER THEN MONITOR PRICE LOOP
  //THEN CHECK FOR SALE THEN RESET
}



function resetApp() {
  //CLEARS ALL THE VARIABLES
  usdAssets = [];
  assetPrices = [];
  opensBar1 = [];
  closesBar1 = [];
  highsBar1 = [];
  lowsBar1 = [];
  volumesBar1 = [];
  opensBar2 = [];
  closesBar2 = [];
  highsBar2 = [];
  lowsBar2 = [];
  volumesBar2 = [];
  bullList = [];
  bearList = [];
  runnerList = [];
  bidPrices = [];
  bidQtys = [];
  askPrices = [];
  askQtys = [];
  buyOrders = [];
  sellOrders = [];
  assetSelect = undefined;
  candlestickData = undefined;
  serverTime = undefined;
  bar1High = undefined;
  bar1Low = undefined;
  bar1Open = undefined;
  bar1Close = undefined;
  bar1Volume = undefined;
  bar2High = undefined;
  bar2Low = undefined;
  bar2Open = undefined;
  bar2Close = undefined;
  bar2Volume = undefined;
  bull = undefined;
  runner = undefined;
  bidPrice = undefined;
  bidQty = undefined;
  askPrice = undefined;
  askQty = undefined;
  buyOrder = undefined;
  sellOrder = undefined;
  buyWall = undefined;
  sellWall = undefined;
  buyPrice = undefined;
  sellPrice = undefined;
  targetBuy = undefined;
  targetSell = undefined;
  orderQty = undefined;
  percentAmount = undefined;
  percentGain = undefined;
  pastDailyClose = undefined;
  lastDailyClose = undefined;
  bullDailyHigh = undefined;
  dailyHighBuffer = undefined;
  test1 = 'Failed'
  test2 = 'Failed'
  test3 = 'Failed'
  test4 = 'Failed'
  c = 0;
  c1 = 0;
  c2 = 0;
  c3 = 0;
  c4 = 0;
  c5 = 0;
  c6 = 0;
  orderPrice = 0;
  onePercentGain = 0;
  stopLoss = 0;
  quantity = 0;
  price = 0;
  priceVar = 0;
  quantityVar = 0;

  setTimeout(() => {
    checkTime();
  }, 2000);

  setTimeout(() => {
    assetPrice();
  }, 2000);

}
