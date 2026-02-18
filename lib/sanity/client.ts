import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "1t1ea2j9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
