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

export function CountryCombobox({ value, onValueChange, placeholder = "Select country...", className }) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  // Exclude India from selectable countries (international form usage only)
  const INTERNATIONAL_COUNTRIES = React.useMemo(
    () => COUNTRIES.filter((c) => c.value !== "india" && c.code !== "+91"),
    []
  );

  const selectedCountry = INTERNATIONAL_COUNTRIES.find((country) => country.value === value);

  // Filter countries based on search - search by name AND code
  const filteredCountries = React.useMemo(() => {
    if (!searchValue) return INTERNATIONAL_COUNTRIES;
    const search = searchValue.toLowerCase().replace(/[+\s]/g, "");
    return INTERNATIONAL_COUNTRIES.filter(
      (country) =>
        country.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.code.toLowerCase().replace(/[+\s]/g, "").includes(search) ||
        country.value.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, INTERNATIONAL_COUNTRIES]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-white border-2 border-[#066F89]/40 hover:bg-white hover:border-[#066F89] focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20 shadow-sm h-[46px] px-4 transition-all duration-200",
            !value && "text-gray-400",
            className
          )}
        >
          <span className="truncate text-left flex-1">
            {selectedCountry ? (
              <span className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{selectedCountry.label}</span>
                <span className="text-xs text-gray-500 font-normal">({selectedCountry.code})</span>
              </span>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-[#066F89]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-[500px] p-0" align="start" sideOffset={4}>
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search by country or code..." 
            className="h-10 border-b" 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
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
                      value === country.value ? "opacity-100 text-[#066F89]" : "opacity-0"
                    )}
                  />
                  <span className="flex-1 truncate font-medium text-gray-900">{country.label}</span>
                  <span className="text-xs text-gray-500 ml-2 shrink-0">{country.code}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
