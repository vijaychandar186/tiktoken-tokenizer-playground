import { Fragment, useState } from "react";
import { cn } from "@/lib/utils";
import { type TokenizerResult } from "@/models/tokenizer";
import { COLOR_CLASSES } from "@/constants/colors";

function encodeWhitespace(str: string) {
  let result = str;

  result = result.replaceAll(" ", "⋅");
  result = result.replaceAll("\t", "→");
  result = result.replaceAll("\f", "\\f\f");
  result = result.replaceAll("\b", "\\b\b");
  result = result.replaceAll("\v", "\\v\v");

  result = result.replaceAll("\r", "\\r\r");
  result = result.replaceAll("\n", "\\n\n");
  result = result.replaceAll("\\r\r\\n\n", "\\r\\n\r\n");

  return result;
}

export function TokenViewer(props: {
  isFetching: boolean;
  model: string | undefined;
  data: TokenizerResult | undefined;
  showWhitespace: boolean;
}) {
  const [indexHover, setIndexHover] = useState<null | number>(null);

  const tokenCount =
    props.data?.segments?.reduce((memo, i) => memo + i.tokens.length, 0) ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <div className="flex-grow rounded-xl border border-border bg-background/50 p-6 shadow-lg">
          <p className="text-sm text-muted-foreground">Total Tokens</p>
          <p className="text-2xl font-semibold text-foreground">{tokenCount}</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-xl border border-border bg-background/50 p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Tokenized Text</h3>
          <pre className="min-h-[200px] max-w-[100vw] overflow-auto whitespace-pre-wrap break-all rounded-lg border border-border bg-card/50 p-4 text-sm text-foreground transition-all">
            {props.data?.segments?.map(({ text }, idx) => (
              <span
                key={idx}
                onMouseEnter={() => setIndexHover(idx)}
                onMouseLeave={() => setIndexHover(null)}
                className={cn(
                  "transition-all rounded px-1 py-0.5",
                  (indexHover == null || indexHover === idx) &&
                    COLOR_CLASSES[idx % COLOR_CLASSES.length],
                  props.isFetching && "opacity-50"
                )}
              >
                {props.showWhitespace || indexHover === idx
                  ? encodeWhitespace(text)
                  : text}
              </span>
            ))}
          </pre>
        </div>

        <div className="rounded-xl border border-border bg-background/50 p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Token IDs</h3>
          <pre
            className="min-h-[200px] max-w-[100vw] overflow-auto whitespace-pre-wrap break-all rounded-lg border border-border bg-card/50 p-4 text-sm text-foreground transition-all"
          >
            {props.data && tokenCount > 0 && (
              <span
                className={cn(
                  "transition-opacity",
                  props.isFetching && "opacity-50"
                )}
              >
                [
                {props.data?.segments?.map((segment, segmentIdx) => (
                  <Fragment key={segmentIdx}>
                    {segment.tokens.map((token, tokenIdx) => (
                      <Fragment key={token.idx}>
                        <span
                          onMouseEnter={() => setIndexHover(segmentIdx)}
                          onMouseLeave={() => setIndexHover(null)}
                          className={cn(
                            "transition-colors rounded px-1 py-0.5",
                            indexHover === segmentIdx &&
                              COLOR_CLASSES[segmentIdx % COLOR_CLASSES.length]
                          )}
                        >
                          {token.id}
                        </span>
                        {tokenIdx < segment.tokens.length - 1 || segmentIdx < (props.data?.segments?.length ?? 0) - 1 ? ", " : ""}
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
                ]
              </span>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}