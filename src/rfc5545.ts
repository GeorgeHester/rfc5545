import "./string.js";

// Lines are 75 bytes max
// Lines seperated by CRLF
// Long lines are split by a CRLF followed by a linear whitespace such as a space or tab

/**
 * Module to define functionality related to RFC5545
 * As defined in: https://datatracker.ietf.org/doc/html/rfc5545
 */
module RFC5545
{
    /**
     * Interface to hold all data associated with a content line
     */
    interface ContentLine
    {
        name: string;
        parameters?: Array<{ name: string, value: string; }>;
        value: string;
    };

    /**
     * Unfold lines longer than 75 bytes
     * As described here: https://datatracker.ietf.org/doc/html/rfc5545#section-3.1
     */
    function unfold(input: string): string
    {
        // Replace all instances of a CRLF which are
        // followed by a linear whitespace character
        return input.replace(/\n\s/gm, "");
    };

    /**
     * Parse out data around the main calendar item
    */
    function preParse(input: string): string
    {
        input = unfold(input);

        // Find the start of the calendar data, removing all unneeded input
        // Throw errors if we cannot find the start of the calendar object
        let beginRegex: RegExp = /BEGIN:.+\n/md;
        let regexOutput: RegExpExecArray | null = beginRegex.exec(input);
        if (regexOutput === null) throw new Error("Pre Parse Failed: Unable to find start of VCALENDAR");
        if (regexOutput.indices === undefined) throw new Error("Pre Parse Failed: Unable to find start of VCALENDAR");

        // Return the input with the new start index
        return input.substring(regexOutput.indices[0][0]);
    };


    /**
     * Parse the contents into an array of content lines
     * As described here: https://datatracker.ietf.org/doc/html/rfc5545#section-3.1
     */
    function parseContentLines(input: string): Array<ContentLine>
    {
        let output: Array<ContentLine> = [];

        for (let line of input.split("\n"))
        {
            if (line === "") continue;

            let semiColonIndexes = line.indexOfAll(";");
            let colonIndexes = line.indexOfAll(":");

            if (colonIndexes.length === 0) throw new Error("Parse Content Lines Failed: ");

            if (semiColonIndexes.length !== 0 && semiColonIndexes[0] < colonIndexes[0])
            {
                let name: string = line.substring(0, semiColonIndexes[0]);
                let parameters: Array<{ name: string, value: string; }> = [];

                for (let index: number = 0; index < semiColonIndexes.length; index++)
                {
                    let endIndex: number = colonIndexes[0];
                    if (index + 1 !== semiColonIndexes.length) endIndex = semiColonIndexes[index + 1];

                    let parameterString: string = line.substring(semiColonIndexes[index] + 1, endIndex);
                    parameters.push({ name: parameterString.split("=")[0], value: parameterString.split("=")[1] });
                };

                let value: string = line.substring(colonIndexes[0] + 1);

                output.push({ name: name, value: value, parameters: parameters });
            };

            let name: string = line.substring(0, colonIndexes[0]);
            let value: string = line.substring(colonIndexes[0] + 1);

            output.push({ name: name, value: value });
        };

        return output;
    };

    /**
     * Parse the calendar
     */
    export function parse(input: string): void
    {
        input = preParse(input);
        let contentLines: Array<ContentLine> = parseContentLines(input);

        console.log(contentLines);
    };
};

export
{
    RFC5545
};