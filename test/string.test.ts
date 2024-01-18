import "../src/@types/string";
import "../src/string";

test("string indexOfAll", () =>
{
    expect("".indexOfAll("0")).toEqual([]);
    expect("0000".indexOfAll("0")).toEqual([0, 1, 2, 3]);
    expect("0101".indexOfAll("0")).toEqual([0, 2]);
    expect("1111".indexOfAll("0")).toEqual([]);
});