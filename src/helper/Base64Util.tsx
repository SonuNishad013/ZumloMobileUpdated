import { Buffer } from "buffer";

const Base64Util = {
  /**
   * Encodes a string to Base64
   * @param {string} input - The string to encode
   * @returns {string} - Base64 encoded string
   */
  encode: (input: any) => {
    return Buffer.from(input, "utf8").toString("base64");
  },

  /**
   * Decodes a Base64 string
   * @param {string} input - The Base64 encoded string
   * @returns {string} - Decoded string
   */
  decode: (input: any) => {
    return Buffer.from(input, "base64").toString("utf8");
  },
};

export default Base64Util;
