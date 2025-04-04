import { nlEl } from "./client/helpers";
export interface Identifiable {
  id?: string;
}
export interface Provider {
  setup: () => void;
}
export interface Processor<T> {
  process: (data: T) => any;
}
export interface Mapper {
  map: (data: any) => any;
}
export type TelType = "local" | "national" | "complete";
//Patterns
export type PseudoNum = `${number}`;
export type DDDPattern = `${number}${number}`;
export type ValidPhonePattern =
  | `${number}${number}${number}${number}${number}${"-"}?${number}${number}${number}${number}`
  | `${DDDPattern}${" " | ""}${number}${number}${number}${number}${
      | number
      | ""}${"-"}?${number}${number}${number}${number}`
  | `${"+" | ""}${number}${number | ""}${number | ""}${" " | ""}${DDDPattern}${
      | " "
      | ""}${number}${number}${number}${number}${
      | number
      | ""}${"-"}?${number}${number}${number}${number}`;
//HTTP
export type HttpBaseKeys = "Accept" | "Authorization";
export type BaseValues =
  | "application/json"
  | "text/plain"
  | "application/xml"
  | "text/xml";
export type AcceptValues =
  | BaseValues
  | "text/html"
  | "*/*"
  | "application/javascript";
export type AuthorizationValues =
  | `Bearer ${string}`
  | `Basic ${string}`
  | `Digest ${string}`
  | `OAuth ${string}`;
export type UpdateHeaderKeys = HttpBaseKeys | "Content-Type";
export type ContentTypeValues =
  | BaseValues
  | "multipart/form-data"
  | "application/x-www-form-urlencoded"
  | "text/css"
  | "text/csv";
export type CacheControlValues =
  | "no-cache"
  | "no-store"
  | "max-age=0"
  | `max-age=${number}`
  | "must-revalidate";
export type AllowValues =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "PATCH";
export type CustomHeaderKeys =
  | "X-Correlation-ID"
  | "X-Request-ID"
  | "X-Forwarded-For"
  | "X-Forwarded-Proto";
export type GetHeaderKeys =
  | HttpBaseKeys
  | "Cache-Control"
  | "If-None-Match"
  | "If-Modified-Since";
export type PostHeaderKeys =
  | UpdateHeaderKeys
  | "X-Requested-With"
  | "Content-Length"
  | CustomHeaderKeys;
export type OptionsHeaderKeys = HttpBaseKeys | "Allow";
export type HeaderKeyValueUnion =
  | { key: "Accept"; value: AcceptValues }
  | { key: "Authorization"; value: AuthorizationValues }
  | { key: "Cache-Control"; value: CacheControlValues }
  | { key: "Content-Type"; value: ContentTypeValues }
  | { key: "X-Requested-With"; value: "XMLHttpRequest" | string }
  | { key: "Allow"; value: AllowValues }
  | { key: "Content-Length"; value: `${number}` }
  | { key: CustomHeaderKeys; value: CustomHeaderValues };
export type GeneralHeaders = {
  Accept?: AcceptValues;
  Authorization?: AuthorizationValues;
  "Cache-Control"?: CacheControlValues;
  "Content-Type"?: ContentTypeValues;
  "X-Requested-With"?: string;
  "Content-Length"?: string;
};
export type GetHeaders = GeneralHeaders & {
  "If-None-Match"?: string;
  "If-Modified-Since"?: string;
};
export type PostHeaders = GeneralHeaders & {
  "X-Requested-With"?: string;
  "Content-Length"?: string;
} & Optional<Record<CustomHeaderKeys, CustomHeaderValues>>;
export type OptionsHeaders = GeneralHeaders & {
  Allow?: AllowValues;
};
export type HTTPHeadersByMethod = {
  GET: GetHeaders;
  POST: PostHeaders;
  OPTIONS: OptionsHeaders;
  PUT: GeneralHeaders;
  DELETE: GeneralHeaders;
};
export type HTTPReturns =
  | "info"
  | "successful"
  | "redirect"
  | "serverError"
  | "clientError";
export type HTTPResponseInfoCode = 100 | 101 | 102 | 103;
export type HTTPResponseInfoLabel =
  | "Continue"
  | "Switching Protocols"
  | "Processing"
  | "Early Hints";
export type HTTPResponseSuccessfulCode =
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226;
export type HTTPResponseSuccessfulLabel =
  | "OK"
  | "Created"
  | "Accepted"
  | "Non-Authoritative Information"
  | "No Content"
  | "Reset Content"
  | "Partial Content"
  | "Multi-Status"
  | "Already Reported"
  | "IM Used";
export type HTTPResponseRedirectCode =
  | 300
  | 301
  | 302
  | 303
  | 304
  | 306
  | 307
  | 308;
export type HTTPResponseRedirectLabel =
  | "Multiple Choices"
  | "Moved Permanently"
  | "Found"
  | "See Other"
  | "Not Modified"
  | "Unused"
  | "Temporary Redirect"
  | "Permanent Redirect";
export type HTTPResponseClientErrorCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451;
export type HTTPResponseClientErrorLabel =
  | "Bad Request"
  | "Unauthorized"
  | "Payment Required"
  | "Forbidden"
  | "Not Found"
  | "Method Not Allowed"
  | "Not Acceptable"
  | "Proxy Authentication Required"
  | "Request Timeout"
  | "Conflict"
  | "Gone"
  | "Length Required"
  | "Preconditional Failed"
  | "Content Too Large"
  | "URI Too Long"
  | "Unsupported Media Type"
  | "Range Not Satisfiable"
  | "Expectation Failed"
  | "I'm a teapot"
  | "Misdirected Request"
  | "Unprocessable Content"
  | "Locked"
  | "Failed Dependendcy"
  | "Too Early"
  | "Upgrade Required"
  | "Precondition Required"
  | "Too Many Requests"
  | "Request Header Fields Too Large"
  | "Unavailable For Legal Reasons";
export type HTTPResponseServerErrorCode =
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;
export type HTTPResponseServerErrorLabel =
  | "Internal Server Error"
  | "Not Implemented"
  | "Bad Gateway"
  | "Service Unavailable"
  | "Gateway Timeout"
  | "HTTP Version Not Supported"
  | "Variant Also Negotiates"
  | "Insufficient Storage"
  | "Loop Detected"
  | "Not Extended"
  | "Network Authentication Required";
export type HTTPResponseInfo = {
  [K in HTTPResponseInfoLabel]: HTTPResponseInfoCode;
};
export type HTTPResponseSuccessful = {
  [K in HTTPResponseSuccessfulLabel]: HTTPResponseSuccessfulCode;
};
export type HTTPResponseRedirect = {
  [K in HTTPResponseRedirectLabel]: HTTPResponseRedirectCode;
};
export type HTTPResponseClientError = {
  [K in HTTPResponseClientErrorLabel]: HTTPResponseClientErrorCode;
};
export type HTTPResponseServerError = {
  [K in HTTPResponseServerErrorLabel]: HTTPResponseServerErrorCode;
};
export type HTTPResponseErrorCode =
  | HTTPResponseClientErrorCode
  | HTTPResponseServerErrorCode;
export type HTTPResponseErrorLabel =
  | HTTPResponseClientErrorLabel
  | HTTPResponseServerErrorLabel;
export type HTTPResponseError = {
  [K in HTTPResponseErrorLabel]: HTTPResponseErrorCode;
};
export type HTTPResponseCode =
  | HTTPResponseInfoCode
  | HTTPResponseSuccessfulCode
  | HTTPResponseRedirectCode
  | HTTPResponseErrorCode;
export type HTTPResponseLabel =
  | HTTPResponseInfoLabel
  | HTTPResponseSuccessfulLabel
  | HTTPResponseRedirectLabel
  | HTTPResponseErrorLabel;
export type HTTPResponse = {
  [K in HTTPResponseLabel]: HTTPResponseCode;
};
