import Head from "next/head";
import Link from "next/link";
import HeaderView from "../components/HeaderView";
import Markdown from "../components/Markdown";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import { RectangleStackIcon } from "@heroicons/react/20/solid";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function About({ about, principles }) {
  const metaTitle = "KEJK | About";
  const metaImage =
    "https://imgix.cosmicjs.com/85afa260-9cb0-11ec-b20b-ad2fdaf5e1bc-meta-about.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/about";

  const text = `This site, and all of my work, is dedicated to my hero, my
  inspiration, and the strongest man I've ever known. My father. I love
  you Dad.`;

  return (
    <div className={"mt-12"}>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={metaImage} />
      </Head>
      <main className="mx-auto w-full max-w-3xl">
        <div>
          <PageHeader>{about.title}</PageHeader>
          <Markdown content={about.metadata.content} />
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center">
          <Link href="/uses">
            <Button
              bgColor="bg-neutral-100 dark:bg-neutral-800"
              textColor="text-black dark:text-white"
              borderColor="border-neutral-200 dark:border-neutral-700"
              href="/uses"
            >
              <RectangleStackIcon width={20} height={20} className="mr-2" />
              My site stack
            </Button>
          </Link>
        </div>
        <HeaderView className="mt-16">Principles</HeaderView>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {principles.map((principle, idx) => {
            return (
              <div
                key={idx}
                className="rounded-md bg-neutral-50 p-3 dark:bg-neutral-800"
              >
                <span className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
                  {principle.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex w-full items-center justify-center px-4 pt-16">
          <p className="w-full rounded-xl bg-neutral-100 p-4 text-center text-black dark:bg-neutral-800 dark:text-white md:w-2/3">
            {text}
          </p>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const props = ["title", "content", "metadata"];

  const data = await bucket.getObject({
    id: "62e2e0f19f26bd0e6c6b2ad8",
    props: props.toString(),
  });

  const principlesData = await bucket.getObjects({
    query: {
      type: "principles",
    },
    props: "title",
  });

  const about = await data.object;
  const principles = await principlesData.objects;
  return {
    props: {
      about,
      principles,
    },
  };
}
