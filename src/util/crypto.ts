import { Api } from './api'

const api = new Api('https://api.coinmarketcap.com/v1')

export interface CryptoCurrency {
  symbol: string;
  one_day: string;
  seven_day: string;
  name: string;
  rank: number;
  price: string;
  cap: string;
  vol_24h: string;
}

function marshallCoin(coin: any): CryptoCurrency {
  let cap = coin.market_cap_usd
  let cap_str = '$' + cap

  if (cap >= 1000000000) {
    cap_str = '$' + (cap / 1000000000).toFixed(2) + 'B'
  } else if (cap >= 1000000) {
    cap_str = '$' + (cap / 1000000).toFixed(2) + 'M'
  } else {
    cap_str = '$' + cap
  }

  let vol = coin["24h_volume_usd"]
  let vol_str = '$' + vol

  if (vol >= 1000000000) {
    vol_str = '$' + (vol / 1000000000).toFixed(2) + 'B'
  } else if (vol >= 1000000) {
    vol_str = '$' + (vol / 1000000).toFixed(2) + 'M'
  } else {
    vol_str = '$' + vol
  }

  return {
    one_day: coin.percent_change_24h + '%',
    seven_day: coin.percent_change_7d + '%',
    name: coin.name,
    rank: coin.rank,
    symbol: coin.symbol,
    price: '$' + coin.price_usd,
    cap: cap_str,
    vol_24h: vol_str
  }
}

export function formatCoin(coin: CryptoCurrency, column: number, verbose?: boolean): string {
  let formatted = ''
  const spaces = ' '.repeat(column)

  if (verbose) {
    formatted += coin.name + ' (' + coin.symbol + ')\nRank ' + coin.rank + '\n'
    for (const key of Object.keys(coin)) {
      if (key !== 'rank' && key !== 'name' && key !== 'symbol') {
        formatted += '\n' + (key + spaces).slice(0, column - 1) + (coin[key] + spaces).slice(0, column - 1)
      }
    }
  } else {
    formatted += (coin.rank + '.   ').slice(0, 3)
    formatted += (coin.name + ' '.repeat(column)).slice(0, column - 1)
    formatted += (' ' + coin.price).slice(0, 9)
  }

  return formatted
}

export async function top10(): Promise<string> {
  try {
    let res = await api.get('/ticker/?limit=10')
    let globalRes = await api.get('/global/')
    let top: CryptoCurrency[] = []
    let formatted = '```Cryptocurrency Overview\n\n'
    let globalCap = '$' + globalRes.total_market_cap_usd
    let globalVol = '$' + globalRes.total_24h_volume_usd

    if (globalRes.total_24h_volume_usd >= 1000000000) {
      globalVol = '$' + (globalRes.total_24h_volume_usd / 1000000000).toFixed(2) + 'B'
    } else if (globalRes.total_24h_volume_usd >= 1000000) {
      globalVol = '$' + (globalRes.total_24h_volume_usd / 1000000).toFixed(2) + 'M'
    }

    if (globalRes.total_market_cap_usd >= 1000000000) {
      globalCap = '$' + (globalRes.total_market_cap_usd / 1000000000).toFixed(2) + 'B'
    } else if (globalRes.total_market_cap_usd >= 1000000) {
      globalCap = '$' + (globalRes.total_market_cap_usd / 1000000).toFixed(2) + 'M'
    }

    formatted += `Global cap: ${globalCap}\n`
    formatted += `Global vol: ${globalVol}\n`

    res.forEach(coin => {
      top.push(marshallCoin(coin))
    });

    formatted += '\nTop 10 cryptos:\n\n'
    top.forEach(coin => {
      formatted += formatCoin(coin, 12, false) + '\n'
    })
    formatted += '\n```'

    return formatted
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function getCoin(id: string): Promise<string> {
  try {
    let coin = await api.get('/ticker/' + id.toLowerCase())
    coin = coin[0]

    return '```\n' + formatCoin(marshallCoin(coin), 12, true) + '\n```'
  } catch(e) {
    console.error(e)
    throw e
  }
}