'use client';

import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { type AllOptions, POPULAR, allOptions, isValidOption, oaiEncodings, oaiModels, openSourceModels } from "@/models";

export function EncoderSelect(props: {
  value: AllOptions;
  onChange: (value: AllOptions) => void;
  isLoading?: boolean;
  showWhitespace?: boolean;
  onToggleWhitespace?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { value, showWhitespace, onToggleWhitespace } = props;

  const onSelect = (v: AllOptions) => () => {
    setOpen(false);
    if (isValidOption(v)) {
      props.onChange(v);
    } else {
      console.error("Invalid option", v, allOptions.options);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[300px] justify-between rounded-lg border border-border bg-background/50 text-foreground hover:bg-muted/50 transition-all"
          >
            <span className="flex items-center gap-2">
              <span className="font-medium">{value}</span>
              {props.isLoading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-b-transparent" />
              )}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-[70vh] w-[300px] overflow-auto p-0 pb-2 bg-card text-foreground border-border rounded-lg shadow-lg">
          <Command className="bg-card text-foreground">
            <CommandInput
              placeholder="Search model or encoder..."
              className="text-foreground placeholder-muted-foreground border-b border-border"
            />
            <CommandEmpty className="text-muted-foreground p-4">
              No model or encoder found.
            </CommandEmpty>
            <CommandGroup heading="Popular Models" className="text-foreground font-semibold">
              {POPULAR.map((value) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={onSelect(value)}
                  className="text-foreground hover:bg-muted/50 cursor-pointer transition-all"
                >
                  {value}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator className="bg-border" />

            <CommandGroup heading="Open-Source Models" className="text-foreground font-semibold">
              {openSourceModels.options
                .filter((x) => !POPULAR.includes(x))
                .map((value) => (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={onSelect(value)}
                    className="text-foreground hover:bg-muted/50 cursor-pointer transition-all"
                  >
                    {value}
                  </CommandItem>
                ))}
            </CommandGroup>

            <CommandSeparator className="bg-border" />

            <CommandGroup heading="OpenAI Encodings" className="text-foreground font-semibold">
              {oaiEncodings.options
                .filter((x) => !POPULAR.includes(x))
                .map((value) => (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={onSelect(value)}
                    className="text-foreground hover:bg-muted/50 cursor-pointer transition-all"
                  >
                    {value}
                  </CommandItem>
                ))}
            </CommandGroup>

            <CommandSeparator className="bg-border" />

            <CommandGroup heading="OpenAI Models" className="text-foreground font-semibold">
              {oaiModels.options
                .filter((x) => !POPULAR.includes(x))
                .map((value) => (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={onSelect(value)}
                    className="text-foreground hover:bg-muted/50 cursor-pointer transition-all"
                  >
                    {value}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-2">
        <Checkbox
          id="whitespace"
          checked={showWhitespace}
          onClick={onToggleWhitespace}
          className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground rounded-md"
        />
        <label
          htmlFor="whitespace"
          className="text-sm font-medium text-foreground cursor-pointer"
        >
          Show Whitespace
        </label>
      </div>
    </div>
  );
}