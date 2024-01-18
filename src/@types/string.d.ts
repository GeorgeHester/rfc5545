export { };

declare global
{
    interface String extends RelativeIndexable<string>
    {
        /**
         * @returns {Array<number>} Array containing indexes of all matches or an empty array.
         */
        indexOfAll(searchString: string): Array<number>;
    }
}