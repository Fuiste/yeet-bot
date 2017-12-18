export interface Shitpost {
    url: string;
    author: string;
}
export declare function getMeme(): Promise<Shitpost>;
export declare function addMeme(author: string, url: string): void;
