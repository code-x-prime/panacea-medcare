"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COUNTRIES } from "@/lib/countries";

export function PhoneCodeCombobox({ value, onValueChange, className }) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  // Get unique phone codes with country names
  const phoneCodes = React.useMemo(() => {
    const codeMap = new Map();
    COUNTRIES.forEach(country => {
      if (!codeMap.has(country.code)) {
        codeMap.set(country.code, {
          value: country.code,
          label: country.label,
          displayLabel: `${country.code} ${country.label}`
        });
      }
    });
    return Array.from(codeMap.values()).sort((a, b) => a.value.localeCompare(b.value));
  }, []);

  const selectedCode = phoneCodes.find((code) => code.value === value);

  // Filter phone codes based on search - search by code OR country name
  const filteredCodes = React.useMemo(() => {
    if (!searchValue) return phoneCodes;
    const search = searchValue.toLowerCase().replace(/[+\s]/g, "");
    return phoneCodes.filter(
      (code) =>
        code.value.toLowerCase().replace(/[+\s]/g, "").includes(search) ||
        code.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, phoneCodes]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[110px] justify-between bg-white border-2 border-[#066F89]/40 hover:bg-[#066F89]/5 hover:border-[#066F89] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 shadow-sm h-[46px] px-3 transition-all duration-200",
            !value && "text-gray-400",
            className
          )}
        >
          <span className="text-sm font-medium text-gray-900 truncate">
            {selectedCode ? selectedCode.value : "Code"}
          </span>
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start" sideOffset={4}>
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search code or country..." 
            className="h-10 border-b" 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList className="max-h-[280px] overflow-y-auto">
            <CommandEmpty>No code found.</CommandEmpty>
            <CommandGroup>
              {filteredCodes.map((code) => (
                <CommandItem
                  key={code.value}
                  value={code.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSearchValue("");
                  }}
                  className="cursor-pointer hover:bg-[#066F89]/10 aria-selected:bg-[#066F89]/10"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === code.value ? "opacity-100 text-[#066F89]" : "opacity-0"
                    )}
                  />
                  <span className="font-semibold text-gray-900 mr-2 shrink-0 min-w-[50px]">{code.value}</span>
                  <span className="text-sm text-gray-600 truncate">{code.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
