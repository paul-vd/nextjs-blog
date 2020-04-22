import { NextApiRequest, NextApiResponse } from "next";
import { getPostData } from "../../lib/posts";

/**  https://<your-site>/api/preview?secret=TEST&path=posts&=slug=ssg-ssr
 * - <**your-site**> should be your deployment domain.
 * - <**token**> should be replaced with the secret token you generated.
 * - <**path**> should be the path for the page that you want to preview. If you want to preview /posts/foo, then you should use &slug=/posts/foo.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== "TEST" || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostData(req.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Invalid slug" });
  }
  if (!req.query.path) {
    return res.status(401).json({ message: "Invalid path" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData(post, {
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  });

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${req.query.path}/${post.slug}` });
  res.end();
};
