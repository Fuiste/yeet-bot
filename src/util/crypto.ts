import { Api } from './api'

const api = new Api('https://api.coinmarketcap.com/v1')

export interface CryptoCurrency {
  change1: string;
  change24: string;
  change7: string;
  name: string;
  rank: number;
  symbol: string;
  usd: number
}

export function formatCoin(coin: CryptoCurrency, column: number, verbose?: boolean): string {
  let formatted = ''
  const spaces = ' '.repeat(column)

  if (verbose) {
    formatted += coin.name + ', rank ' + coin.rank + '\n'
    for (const key of Object.keys(coin)) {
      if (key !== 'rank' && key !== 'name') {
        formatted += '\n' + (key + spaces).slice(0, column - 1) + (coin[key] + spaces).slice(0, column - 1)
      }
    }
  } else {
    formatted += (coin.rank + '.   ').slice(0, 3)
    formatted += (coin.name + ' '.repeat(column)).slice(0, column - 1)
    formatted += (' $' + coin.usd).slice(0, 9)
  }

  return formatted
}

export async function top10(): Promise<CryptoCurrency[]> {
  try {
    let res = await api.get('/ticker/?limit=10')
    let top: CryptoCurrency[] = []

    res.forEach(coin => {
      top.push({
        change1: coin.percent_change_1h + '%',
        change24: coin.percent_change_24h + '%',
        change7: coin.percent_change_7d + '%',
        name: coin.name,
        rank: coin.rank,
        symbol: coin.symbol,
        usd: coin.price_usd
      })
    });

    return top
  } catch(e) {
    throw e
  }
}

export async function getCoin(id: string): Promise<CryptoCurrency> {
  try {
    let coin = await api.get('/ticker/' + id.toLowerCase())
    coin = coin[0]

    return {
      change1: coin.percent_change_1h + '%',
      change24: coin.percent_change_24h + '%',
      change7: coin.percent_change_7d + '%',
      name: coin.name,
      rank: coin.rank,
      symbol: coin.symbol,
      usd: coin.price_usd
    }
  } catch(e) {
    throw e
  }
}