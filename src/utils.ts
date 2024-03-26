import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...classNames: ClassNameValue[]) {
  return twMerge(clsx(classNames));
}
