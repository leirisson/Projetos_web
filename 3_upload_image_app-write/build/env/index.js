"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/env/index.ts
var env_exports = {};
__export(env_exports, {
  env: () => env,
  envSchema: () => envSchema
});
module.exports = __toCommonJS(env_exports);
var import_config = require("dotenv/config");
var import_zod = __toESM(require("zod"));
var envSchema = import_zod.default.object({
  PORT: import_zod.default.coerce.number().default(3333),
  APPWRITE_DATABASE_ID: import_zod.default.string(),
  APPWRITE_COLLECTION_ID: import_zod.default.string().optional(),
  APPWRITE_BUCKET_ID: import_zod.default.string(),
  APPWRITE_PROJECT_ID: import_zod.default.string(),
  APPWRITE_ENDPOINT: import_zod.default.string(),
  APPWRITE_API_KEY: import_zod.default.string()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.log(_env.error);
  throw new Error("Invalid environment variables");
}
var env = _env.data;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  env,
  envSchema
});
