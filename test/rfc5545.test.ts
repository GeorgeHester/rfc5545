import { ContentLines } from "../src/content-lines";

test.concurrent("content lines unfold [LF] [Space]", () =>
{
    expect(ContentLines.unfold("ABC\u000A DEF")).toStrictEqual("ABCDEF");
    expect(ContentLines.unfold("ABC\u000A DEF\u000A GHI")).toStrictEqual("ABCDEFGHI");
    expect(ContentLines.unfold("ABC\u000A DEF\u000A  GHI")).toStrictEqual("ABCDEF GHI");
    expect(ContentLines.unfold("ABC\u000A DEF\u000AGHI")).toStrictEqual("ABCDEF\u000AGHI");
});

test.concurrent("content lines unfold, [LF] [Tab]", () =>
{
    expect(ContentLines.unfold("ABC\u000A\u0009DEF")).toStrictEqual("ABCDEF");
    expect(ContentLines.unfold("ABC\u000A\u0009DEF\u000A\u0009GHI")).toStrictEqual("ABCDEFGHI");
    expect(ContentLines.unfold("ABC\u000A\u0009DEF\u000A\u0009\u0009GHI")).toStrictEqual("ABCDEF\u0009GHI");
    expect(ContentLines.unfold("ABC\u000A\u0009DEF\u000AGHI")).toStrictEqual("ABCDEF\u000AGHI");
});