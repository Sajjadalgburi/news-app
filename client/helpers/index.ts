import { formatDistanceToNow } from "date-fns";

/**
 * Custom function to format date using date-fns library
 * @returns Newly formatted date
 */
export const formatDate = (date: string): string => {
  const convertedDate = new Date(date);

  return formatDistanceToNow(convertedDate, { addSuffix: true });
};
