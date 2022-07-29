import { MailIcon } from "@heroicons/react/outline";
import Head from "next/head";
import AppCard from "../components/AppCard";
import Button from "../components/Button";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Projects({ apps }) {
  const metaTitle = "KEJK | Projects";
  return (
    <div className={"mt-12"}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="pb-4 text-4xl font-bold text-gray-700 dark:text-gray-200">
          Projects
        </h1>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {apps.map((app) => {
            return (
              <AppCard
                key={app.id}
                link={app.metadata.url}
                image={app.metadata.cover?.imgix_url}
                title={app.title}
                subtitle={app.metadata.subtitle}
              />
            );
          })}
        </div>
        <div className="mx-auto mt-8 flex w-full justify-center space-x-4">
          <Button
            bgColor="neutral-100"
            textColor="black"
            borderColor="neutral-200"
            darkBgColor="neutral-800"
            darkTextColor="white"
            darkBorderColor="neutral-700"
          >
            <MailIcon width={24} height={24} />
            <a href="mailto:karl@kejk.tech?subject=Let's work together!">
              Work with me
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "apps",
    },
    props: "slug,title,content,metadata",
  });
  const apps = await data.objects;
  return {
    props: {
      apps,
    },
  };
}
