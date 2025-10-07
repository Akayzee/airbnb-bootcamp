"use client";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { SearchIcon } from "lucide-react";

type Props = {};

const SearchBar = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();

  return (
    <div className="flex justify-center py-4">
      <div className="flex rounded-full h-16 md:w-2/3 lg:w-3/4 bg-white shadow-2xl border-1 border-gray-300">
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex flex-col justify-center w-1/3 px-6 border-r-1 rounded-l-full  border-gray-300 hover:bg-gray-200 hover:cursor-pointer"
        >
          <div className="text-gray-900 text-xs font-semibold">Where</div>
          <Input
            ref={inputRef}
            placeholder="Search destinations"
            className="placeholder:text-xs placeholder:text-gray-500 h-7 border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none shadow-none p-0"
          />
        </div>
        <div
          onClick={() => setCheckInOpen(true)}
          className="flex flex-col w-1/5 justify-center px-6 border-r-1 border-gray-300 hover:bg-gray-200 hover:cursor-pointer"
        >
          <div className="text-gray-900 text-xs font-semibold">Check in</div>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!checkInDate}
                className="data-[empty=true]:text-muted-foreground h-7 justify-start text-left text-xs border-none outline-none focus-visible:ring-0  focus-visible:ring-offset-0 focus-visible:outline-none shadow-none p-0 hover:bg-transparent bg-transparent hover:cursor-pointer "
              >
                {/* <CalendarIcon /> */}
                {checkInDate ? (
                  format(checkInDate, "PP")
                ) : (
                  <span className="text-gray-500">Add dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={(e) => {
                  setCheckInDate(e);

                  if (checkOutDate && e && e >= checkOutDate) {
                    setCheckOutDate(undefined);
                  }
                  setCheckInOpen(false);
                }}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col w-1/5 justify-center px-6 border-r-1  border-gray-300 hover:bg-gray-200 hover:cursor-pointer">
          <div className="text-gray-900 text-xs font-semibold">Check out</div>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!checkOutDate}
                className="data-[empty=true]:text-muted-foreground h-7 justify-start text-left text-xs border-none outline-none focus-visible:ring-0  focus-visible:ring-offset-0 focus-visible:outline-none shadow-none p-0 hover:bg-transparent bg-transparent hover:cursor-pointer"
              >
                {/* <CalendarIcon /> */}
                {checkOutDate ? (
                  format(checkOutDate, "PP")
                ) : (
                  <span className="text-gray-500">Add dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={(e) => {
                  setCheckOutDate(e);
                  setCheckOutOpen(false);
                }}
                disabled={(date) => {
                  if (checkInDate) {
                    return date < new Date() || date <= checkInDate;
                  }

                  return false;
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onClick={() => setCheckOutOpen(true)}
          className="flex w-1/3 justify-between items-center pl-6 pr-2 border-gray-300 hover:bg-gray-200 rounded-r-full"
        >
          <div>
            <div className="text-gray-900 text-xs font-semibold">Who</div>
            <Button
              variant="outline"
              className="text-xs border-none shadow-none p-0 h-7 text-gray-500  hover:bg-transparent bg-transparent hover:cursor-pointer hover:text-gray-500"
            >
              Add guests
            </Button>
          </div>

          <SearchIcon
            className="text-white bg-[#FF385C] rounded-full p-4 hover:cursor-pointer "
            size={50}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
