// Options for formatting the date in Hungarian
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "Europe/Budapest", // Set the desired time zone
};

const options2: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Budapest", // Set the desired time zone
};

export function prettifyDate(date: string) {
  const newstructure = new Date(date).toLocaleString("hu-HU", options);
  return newstructure;
}

export function prettifyDateWithHour(date: string) {
  const newstructure = new Date(date).toLocaleString("hu-HU", options2);
  return newstructure;
}
