/**
 * We presume that all input has been updated from CRLF to LF if necessary
 * Module to define functionality related to RFC5545 Content Lines
 * As defined in: https://datatracker.ietf.org/doc/html/rfc5545#section-3.1
 */
module ContentLines
{
    /**
     * Unfold lines longer than 75 bytes
     * As described here: https://datatracker.ietf.org/doc/html/rfc5545#section-3.1
     */
    export function unfold(input: string): string
    {
        // Replace all instances of a CRLF which are
        // followed by a linear whitespace character
        return input.replace(/\n\s/gm, "");
    };
};

export
{
    ContentLines
};