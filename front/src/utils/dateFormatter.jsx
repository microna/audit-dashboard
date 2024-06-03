import { format } from "date-fns";

export default function formatDate(date) {
  if (date) {
    return format(date, "yyyy-MM-dd");
  } else {
    return "";
  }
}
