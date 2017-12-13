export interface CryptoCurrency {
    change1: string;
    change24: string;
    change7: string;
    name: string;
    rank: number;
    symbol: string;
    usd: number;
}
export declare function formatCoin(coin: CryptoCurrency, column: number, verbose?: boolean): string;
export declare function top10(): Promise<CryptoCurrency[]>;
export declare function getCoin(id: string): Promise<CryptoCurrency>;
