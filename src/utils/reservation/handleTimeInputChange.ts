import { timeMapping } from "./timeMapping";

export const handleTimeInputChange = (
  input: string,
  type: "start" | "end",
  setUserInfo: React.Dispatch<React.SetStateAction<any>>
) => {
  const numericOnly = input.replace(/[^0-9]/g, "").slice(0, 4);
  let formattedTime = "";

  if (numericOnly.length === 0) {
    formattedTime = "";
  } else if (numericOnly.length <= 2) {
    formattedTime = numericOnly;
  } else {
    formattedTime = `${numericOnly.slice(0, 2)}:${numericOnly.slice(2)}`;
  }

  const isValidTimeFormat =
    formattedTime.length === 5 && formattedTime.includes(":");

  setUserInfo((prev: any) => ({
    ...prev,
    [type === "start" ? "formattedStartTime" : "formattedEndTime"]:
      formattedTime,
    ...(isValidTimeFormat && {
      [type === "start" ? "startIndex" : "endIndex"]:
        timeMapping[formattedTime] ?? "",
    }),
  }));
};
