import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://jsonplaceholder.typicode.com/uers?_limit=5", async () => {
    return HttpResponse.json([
      { id: 1, username: "Bret" },
      { id: 2, username: "Bret" },
    ]);
  }),
];
