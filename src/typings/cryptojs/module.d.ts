declare module "crypto-js" {
  export const lib: any;
}

declare module "crypto-js/sha256" {
  function sha(val: string): string;
  export default sha;
}
