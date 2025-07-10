'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X as Close } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const TEXT_COMMON_STYLE = cn(
  'col-[1] row-[1]',
  'flex h-full w-full rounded-lg border border-border bg-background/50 py-3 px-4 text-sm text-foreground transition-all focus:ring-2 focus:ring-primary/20'
);

function AutosizingTextArea(props: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="grid grid-cols-1">
      <Textarea
        rows={1}
        placeholder={props.placeholder}
        className={cn(
          'resize-none rounded-lg bg-background/50 font-mono shadow-inner focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all',
          TEXT_COMMON_STYLE
        )}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <div className={cn('whitespace-pre-wrap opacity-0', TEXT_COMMON_STYLE)} style={{ visibility: 'hidden' }}>
        {props.value || props.placeholder}{' '}
      </div>
    </div>
  );
}

function getChatGPTEncoding(
  messages: { role: string; content: string; name: string }[],
  model: 'gpt-3.5-turbo' | 'gpt-4-1106-preview' | 'gpt-4' | 'gpt-4o' | 'gpt-4-32k'
) {
  const isGpt3 = model === 'gpt-3.5-turbo';
  const msgSep = isGpt3 ? '\n' : '';
  const roleSep = isGpt3 ? '\n' : '<|im_sep|>';

  return [
    messages
      .map(({ name, role, content }) => `<|im_start|>${name || role}${roleSep}${content}<|im_end|>`)
      .join(msgSep),
    `<|im_start|>assistant${roleSep}`,
  ].join(msgSep);
}

export function ChatGPTEditor(props: {
  model: 'gpt-4' | 'gpt-4-1106-preview' | 'gpt-4-32k' | 'gpt-4o' | 'gpt-3.5-turbo';
  onChange: (value: string) => void;
}) {
  const [rows, setRows] = useState<
    { role: string; content: string; name: string }[]
  >([
    { role: 'system', content: 'You are a helpful assistant', name: '' },
    { role: 'user', content: '', name: '' },
  ]);

  const changeRef = useRef<(value: string) => void>(props.onChange);

  useEffect(() => {
    changeRef.current = props.onChange;
  }, [props.onChange]);

  useEffect(() => {
    changeRef.current?.(getChatGPTEncoding(rows, props.model));
  }, [props.model, rows]);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-background/50 p-6 shadow-lg transition-all">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-lg bg-card p-4 shadow-sm">
          <div className="grid grid-cols-[150px,1fr,40px] gap-4 items-start">
            <Select
              value={row.role}
              onValueChange={(val) =>
                setRows((rows) => {
                  const newRows = [...rows];
                  newRows[i].role = val;
                  return newRows;
                })
              }
            >
              <SelectTrigger className="w-full rounded-lg border border-border bg-background/50 text-sm text-foreground hover:bg-muted/50 transition-all">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="bg-card text-foreground rounded-lg shadow-lg">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
                <SelectSeparator />
                <SelectItem value="system-name">Custom</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-col gap-3">
              {row.role === 'system-name' && (
                <Input
                  value={row.name}
                  placeholder="Custom Role Name"
                  className="rounded-lg border border-border bg-background/50 text-sm text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                  onChange={(e) =>
                    setRows((rows) => {
                      const newRows = [...rows];
                      newRows[i].name = e.target.value;
                      return newRows;
                    })
                  }
                />
              )}
              <AutosizingTextArea
                value={row.content}
                placeholder="Enter message content..."
                onChange={(value) =>
                  setRows((rows) => {
                    const newRows = [...rows];
                    newRows[i].content = value;
                    return newRows;
                  })
                }
              />
            </div>

            <Button
              variant="outline"
              className="h-10 w-10 rounded-lg p-0 border-border text-foreground hover:bg-destructive/50 hover:text-destructive-foreground transition-all"
              onClick={() =>
                setRows((rows) => {
                  const newRows = [...rows];
                  newRows.splice(i, 1);
                  return newRows;
                })
              }
            >
              <Close className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
      <Button
        className="mt-4 w-fit rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        onClick={() =>
          setRows((rows) => {
            let role = 'user';
            if (rows.length === 0) role = 'system';
            else if (rows.at(-1)?.role === 'user') role = 'assistant';
            return [...rows, { role, content: '', name: '' }];
          })
        }
      >
        Add New Message
      </Button>
    </div>
  );
}