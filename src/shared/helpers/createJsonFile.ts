import { v4 as uuidv4 } from "uuid";

export function createJsonFile(data: any, name: string): File {
  const fileName = `${name}-${uuidv4()}.json`;
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const file = new File([blob], fileName, { type: "application/json" });

  return file;
}
