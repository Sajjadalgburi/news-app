import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/helpers/constants";
import Link from "next/link";
import UserLoggedIn from "./UserLoggedIn";
import { User } from "@/__generated__/graphql";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
  user: User | null;
}

const MobileSheet = ({ user }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className=" text-lg sm:text-2xl">Menu Bar</SheetTitle>
          <SheetDescription>
            Choose your category, logout or view your profile from here.
          </SheetDescription>
        </SheetHeader>

        {/* Categories */}
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          {categories.map((c) => (
            <SheetClose key={c.name} asChild>
              <Button
                asChild
                className="w-full capitalize text-left text-xl"
                variant="ghost">
                <Link href={`/category/${c.name.toLowerCase()}`}>{c.name}</Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        <SheetFooter>
          <ThemeToggle icon={false} />
          {user ? (
            <>
              <>
                <SheetClose asChild>
                  <UserLoggedIn />
                </SheetClose>
              </>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2  w-full">
              <SheetClose asChild>
                <Button
                  size={"lg"}
                  className="w-full"
                  variant={"outline"}
                  asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </SheetClose>
              <div className="w-full">
                <SheetClose asChild>
                  <Button
                    size={"lg"}
                    className="w-full"
                    variant={"default"}
                    asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
