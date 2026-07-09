export type BusinessError =
  | { type: "INVALID_CREDENTIALS" }
  | { type: "EMAIL_ALREADY_EXISTS" };

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: BusinessError };
