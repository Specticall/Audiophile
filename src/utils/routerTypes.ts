import { LoaderFunction } from "react-router-dom";

export type LoaderData<TLoaderFunction extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFunction>
> extends Response | infer whatever
  ? whatever
  : never;
