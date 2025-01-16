export const NewAttributionRequest = {
  type: "object",
  properties: {
    sector: {
      type: "string",
      description: "The sector to evaluate the document to",
      example: "education",
    },
    title: {
      type: "string",
      description: "The title of the document",
      example: "2024 Grand Education Plan",
    },
    document: {
      type: "string",
      format: "binary",
      description: "The document to upload",
    },
  },
  required: ["sector", "title", "document"],
};
