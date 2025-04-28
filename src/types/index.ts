export type TLoading = "idle" | "pending" | "succeeded" | "failed";

export interface TDepartment {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface TCategory {
  _id: string;
  name: string;
  description: string;
  mainImage: string;
  department: string;
  createdAt: string;
  updatedAt: string;
}

export interface TProduct {
  _id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};