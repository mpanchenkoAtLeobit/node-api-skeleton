export interface IServiceRequest {
  method: string;
  uri: string;
  body?: Record<string, unknown>;
  qs?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  timeout?: number;
  resolveWithFullResponse?: boolean;
  simple?: boolean; // Get a rejection only if the request failed for technical reasons
}

export interface IRequest {
  user: { id?: number };
}
