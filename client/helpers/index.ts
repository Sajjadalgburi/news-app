import { formatDistanceToNow } from "date-fns";

/**
 * Custom function to format date using date-fns library
 * @returns Newly formatted date
 */
export const formatDate = (date: string): string => {
  const convertedDate = new Date(date);

  return formatDistanceToNow(convertedDate, { addSuffix: true });
};

export const formatString = (str: string): string => {
  if (str.length < 19) return str;

  str = `${str.slice(0, 13).trim()}...`; // Trim to 19 characters

  return str;
};
