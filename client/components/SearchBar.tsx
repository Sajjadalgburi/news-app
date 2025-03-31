"use client";

import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { usePathname } from "next/navigation";

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
  const [query, setQuery] = useState(searchParams.get("p") || "");
  const pathname = usePathname();

  // these are the routes that should be skipped when searching, because the normal
  // behavior always resets to the '/search' route if there is an input or the homepage when the search is empty
  const skipTheseRoutes = useMemo(() => {
    const skipPages = [
      "/login",
      "/register",
      "/profile",
      "/article",
      "/category",
      "/testing",
    ];
    return skipPages.some((page) => {
      const regex = new RegExp(`^${page}(/|$)`);
      return regex.test(pathname);
    });
  }, [pathname]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateQuery = useCallback(
    debounce((value: string) => {
      if (skipTheseRoutes) {
        setQuery(""); // Reset query when on skipped pages
        router.replace(`/search?p=${encodeURIComponent(value)}`);
      }

      if (value.trim().length === 0) {
        router.replace(`/`);
      } else if (value.trim().length > 2) {
        setQuery(""); // Reset query when on skipped pages
        router.replace(`/search?p=${encodeURIComponent(value)}`);
      }
    }, 1000),
    [skipTheseRoutes],
  );

  useEffect(() => {
    if (query) updateQuery(query);
    return () => updateQuery.cancel();
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
                    placeholder="Search for news using keywords, topics, or names"
                    className="col-span-3"
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
