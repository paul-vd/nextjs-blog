import Link from "next/link";
import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout home name="Paul van Dyk">
      <section
        className="flex flex-row items-center justify-center px-4 py-12 text-center"
        style={{ minHeight: "calc(100vh - 150px)" }}
      >
        <div>
          <img
            className="mx-auto max-w-auto md:max-w-sm"
            src="/images/error.svg"
            alt="Page not found"
          />
          <h2 className="mt-8 mb-2 text-5xl font-heading">Page not found</h2>
          <p className="mb-6 text-xl">Error 404</p>
          <Link href="/">
            <a
              className="inline-block px-8 py-4 leading-none text-white rounded shadow bg-primary-500 hover:bg-green-400"
              href="#"
            >
              Return to the homepage
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
