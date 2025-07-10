'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ChatGPTEditor } from '@/sections/Editor';
import { EncoderSelect } from '@/sections/EncoderSelect';
import { TokenViewer } from '@/sections/TokenViewer';
import { Textarea } from '@/components/ui/textarea';
import { type AllOptions, isChatModel, isValidOption } from '@/models';
import { createTokenizer } from '@/models/tokenizer';
import { useQuery } from '@tanstack/react-query';

function useQueryParamsState() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const modelParam = searchParams.get('model');
  const params = useMemo((): AllOptions => {
    return isValidOption(modelParam) ? modelParam : 'gpt-4o';
  }, [modelParam]);

  const setParams = (model: AllOptions) => {
    const newSearch = new URLSearchParams(Array.from(searchParams.entries()));
    newSearch.set('model', model);
    router.push(`/?${newSearch.toString()}`);
  };

  return [params, setParams] as const;
}

export default function HomeClient() {
  const [inputText, setInputText] = useState<string>('');
  const [model, setModel] = useQueryParamsState();
  const [showWhitespace, setShowWhitespace] = useState(false);

  const tokenizer = useQuery({
    queryKey: [model],
    queryFn: () => createTokenizer(model),
  });

  const tokens = tokenizer.data?.tokenize(inputText);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 p-6 lg:p-12 bg-gradient-to-b from-background to-muted/20">
      <header className="flex flex-col items-start gap-6 rounded-2xl bg-card p-6 shadow-lg lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Tiktoken Tokenizer Playground
          </h1>
          <p className="mt-2 text-muted-foreground">Explore and visualize tokenization for various models</p>
        </div>
        <EncoderSelect
          value={model}
          isLoading={tokenizer.isFetching}
          showWhitespace={showWhitespace}
          onToggleWhitespace={() => setShowWhitespace((v) => !v)}
          onChange={(update) => {
            setModel(update);
            if (isChatModel(update) !== isChatModel(model)) {
              setInputText('');
            }
          }}
        />
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="flex flex-col gap-6 rounded-2xl bg-card p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground">Input Editor</h2>
          {isChatModel(model) && (
            <ChatGPTEditor model={model} onChange={setInputText} />
          )}
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[250px] rounded-xl border border-border bg-card/50 p-4 font-mono text-sm text-foreground shadow-inner transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder-muted-foreground"
            style={{ fontFeatureSettings: '"liga" 0, "calt" 0' }}
            placeholder="Enter text to tokenize or use the editor above..."
          />
        </section>

        <section className="flex flex-col gap-6 rounded-2xl bg-card p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground">Token Visualization</h2>
          <TokenViewer
            model={model}
            data={tokens}
            isFetching={tokenizer.isFetching}
            showWhitespace={showWhitespace}
          />
        </section>
      </div>
    </main>
  );
}