declare module "crypto-js" {
  export var lib: any
}

declare module "crypto-js/sha256" {
  function sha(val: string): string;
  export default sha;
}
