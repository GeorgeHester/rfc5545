/**
 * Extend string type with indexOfAll function
 */
String.prototype.indexOfAll = function (this: string, searchString: string): Array<number>
{
    let output: Array<number> = [];
    let currentIndex: number = this.indexOf(searchString);

    while (currentIndex !== -1)
    {
        output.push(currentIndex);
        currentIndex = this.indexOf(searchString, currentIndex + 1);
    };

    return output;
};