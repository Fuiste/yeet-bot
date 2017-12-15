/**
 * Returns an auto response based on the content of a message.  It's gonna look in a db eventually so it's async even
 * though right now that doesn't make a lot of sense.
 * @param content the message content to scan
 */
export declare function handlePhraseTriggers(content: string): Promise<string>;
