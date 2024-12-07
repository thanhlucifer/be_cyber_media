


const videoSwagger = {
    "/video/video-list": {
        get: {
            tags: ["Video"],
            security: [{ bearerAuth: [] }],
            responses: {
                "200": {
                    description: "Success",
                },
            },
            parameters: [
                {
                    name: "page",
                    in: "query",
                    type: "string",
                    description: "page",
                },
                {
                    name: "limit",
                    in: "query",
                    type: "string",
                    description: "limit",
                },
            ],
        }
    },
    "/video/video-create": {
        post: {
            tags: ["Video"],
            security: [{ bearerAuth: [] }],
            responses: {
                "200": {
                    description: "Success",
                },
            },
           requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      age: {
                        type: "number",
                        description: "age",
                      },
                      name: {
                        type: "string",
                        description: "name",
                      },
                    },
                  }
                }
              }
            },
        }
    },
    "/video/video-update": {
        post: {
            tags: ["Video"],
            security: [{ bearerAuth: [] }],
            responses: {
                "200": {
                    description: "Success",
                },
            },
           requestBody: {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties: {
                      title: {
                        type: "string"
                      },
                      file: {
                        type: "file",
                        format: "binary"
                      },
                      files: {
                        type: "array",
                        items: {
                          type: "file",
                          format: "binary"
                        }
                      }
                    },
                  }
                }
              }
            },
        }
    },
}

export default videoSwagger