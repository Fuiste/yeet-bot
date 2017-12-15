/**
 * Returns auto response(s) based on the content of a message.
 * @param content the message content to scan
 */
export declare function handlePhraseTriggers(content: string): Promise<string[]>;
export declare function learnPhrase(key: string, value: string): void;
