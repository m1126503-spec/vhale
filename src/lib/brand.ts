export const APP_NAME = "Vhale";
export const BOT_USERNAME = "Medved_23bot";
export const BOT_HANDLE = "@Medved_23bot";

export function referralLink(code: string) {
  return `https://t.me/${BOT_USERNAME}?startapp=ref_${code}`;
}
