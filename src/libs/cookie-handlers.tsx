export function setCookie(name: string, value: string, expireDays = 365): void {
  const exDate = new Date();
  exDate.setDate(exDate.getDate() + expireDays);
  const encodedValue = encodeURIComponent(value);
  const cookieString = `${name}=${encodedValue};expires=${exDate.toUTCString()}`;
  document.cookie = cookieString;
}
export function getCookie(name: string): string {
  for (const cookie of document.cookie.split(";")) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return "";
}

export function clearCookie(name: string): void {
  setCookie(name, "");
}

export function queryURL(name: string): string | null {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const searchString = window.location.search.substring(1);
  const result = reg.exec(searchString);
  if (result !== null) {
    return decodeURI(result[2]);
  }
  return null;
}
