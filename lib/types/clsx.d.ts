declare module "clsx" {
  export type ClassValue =
    | string
    | number
    | boolean
    | undefined
    | null
    | Record<string, unknown>
    | ClassValue[];

  export default function clsx(...inputs: ClassValue[]): string;
  export function clsx(...inputs: ClassValue[]): string;
}
