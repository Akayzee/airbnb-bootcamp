import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { allCountries } from "@/lib/constants";
import { fixEmojiEncoding } from "@/lib/helpers";

type Props = {};

const PhoneFormSchema = z.object({
  countryCode: z.string({}),
  phoneNumber: z.string().nonempty({ message: "Phone number is required" }),
});

const PhoneForm = (props: Props) => {
  const form = useForm<z.infer<typeof PhoneFormSchema>>({
    resolver: zodResolver(PhoneFormSchema),
    defaultValues: {
      phoneNumber: "",
      countryCode: "",
    },
  });
  const onSubmit = (values: z.infer<typeof PhoneFormSchema>) => {
    console.log("I will not run until I do not have any errors");
  };

  const countryCode = form.watch("countryCode");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col  gap-1">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem className="mb-3 ">
                <FormLabel>Country Code</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      const country = allCountries.find(
                        (country) => country.unicode === e
                      );
                      form.setValue(
                        "countryCode",
                        country ? country.dial_code : ""
                      );
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border-1 border-black">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full ">
                      {allCountries
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((country) => (
                          <SelectItem
                            key={country.name}
                            value={country.unicode}
                          >
                            {country.emoji} {country.name} ({country.dial_code})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="mb-3 w-full ">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="flex items-center  w-full ">
                    <div className="flex w-16 truncate h-9 items-center pl-3 text-sm rounded-tl-lg rounded-bl-lg border-1 border-black border-r-0 select-none">
                      {countryCode}
                    </div>

                    <Input
                      type="number"
                      {...field}
                      className="border-1 border-black focus-visible:border-black outline-none focus-visible:ring-0  focus:outline-none [appearance:textfield] border-l-0   rounded-tl-none rounded-bl-none  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={form.formState.errors.phoneNumber?.message ? true : false}
          type="submit"
          className="w-full bg-red-400 hover:bg-red-500 hover:cursor-pointer"
          size="lg"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default PhoneForm;
