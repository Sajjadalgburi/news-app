"use client";

import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const formSchema = z.object({
  name: z.string().min(3, "Minimum of 3 characters").nonempty(),
});

export type FormValues = z.infer<typeof formSchema>;

export function SearchBar() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Debounced function to update URL
  const updateQuery = debounce((value: string) => {
    if (value.trim().length > 2) {
      router.replace(`/search?q=${encodeURIComponent(value)}`);
    } else {
      router.replace(`/`); // Reset to homepage if query is empty
    }
  }, 500); // 500ms delay to debounce

  useEffect(() => {
    updateQuery(query);
    return () => updateQuery.cancel(); // Cleanup debounce on unmount
  }, [query, updateQuery]);

  return (
    <div className="p-2">
      <Form {...form}>
        <form className="flex items-center justify-center w-full gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center w-lg lg:min-w-xl justify-center gap-2">
                <Search />
                <FormControl>
                  <Input
                    id="name"
                    {...field}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for any news"
                    className="col-span-3 capitalize"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
