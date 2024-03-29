// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import fetch from "node-fetch";
import * as prismic from "@prismicio/client";

const repoName = "awwwards-website"; // Fill in your repository name.
const accessToken =
  "MC5aZ1o1bnhFQUFDVUFHQU1H.Amrvv73vv71c77-9cX4lQA_vv70yC0fvv70N77-977-977-977-9EhgYPu-_vUxDZu-_ve-_ve-_vQ"; // If your repository is private, add an access token.

// The `routes` property is your route resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
  {
    type: "page",
    path: "/:uid",
  },
];

export const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes,
});
