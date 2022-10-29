import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import AllCapsHeader from "../components/AllCapsHeader";
import AppCard from "../components/AppCard";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Projects({ apps, utilities, clients }) {
  const metaTitle = "KEJK | Projects";
  const metaImage =
    "https://imgix.cosmicjs.com/85d48f80-9cb0-11ec-b20b-ad2fdaf5e1bc-meta-projects.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/projects";

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
      <main>
        <PageHeader>Projects</PageHeader>
        <AllCapsHeader marginTop={8} justify={"justify-start"}>
          Personal
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
          {apps.map((app, idx) => {
            return (
              <AppCard
                key={idx}
                link={app.metadata.url}
                image={app.metadata.cover?.imgix_url}
                title={app.title}
                subtitle={app.metadata.subtitle}
              />
            );
          })}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {utilities.map((utility, idx) => {
            return (
              <AppCard
                key={idx}
                link={utility.metadata.url}
                image={utility.metadata.cover?.imgix_url}
                title={utility.title}
                subtitle={utility.metadata.subtitle}
              />
            );
          })}
        </div>
        <AllCapsHeader marginTop={16} justify={"justify-start"}>
          Clients
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3">
          {clients.map((client, idx) => {
            return (
              <AppCard
                key={idx}
                link={client.metadata.url}
                image={client.metadata.cover?.imgix_url}
                title={client.title}
                subtitle={client.metadata.subtitle}
                tags={client.metadata.tags}
              />
            );
          })}
        </div>
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center space-y-4 md:mt-16 md:flex-row md:space-y-0 md:space-x-4">
          <Button
            bgColor="bg-neutral-100 dark:bg-neutral-800"
            textColor="text-black dark:text-white"
            borderColor="border-neutral-200 dark:border-neutral-700"
            href="/work"
          >
            View my in-house work
            <ArrowRightIcon className="ml-2" width={20} height={20} />
          </Button>
          <Button
            bgColor="bg-neutral-100 dark:bg-neutral-800"
            textColor="text-black dark:text-white"
            borderColor="border-neutral-200 dark:border-neutral-700"
            href="mailto:karl@kejk.tech?subject=Let's work together!"
          >
            <EnvelopeIcon className="mr-2" width={20} height={20} />
            Work with me
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
    props: "id,title,metadata",
  });

  const utilitiesData = await bucket.getObjects({
    query: {
      type: "utilities",
    },
    props: "id,title,metadata",
  });

  const freelancesData = await bucket.getObjects({
    query: {
      type: "freelances",
    },
    props: "id,title,metadata",
  });

  const apps = await data.objects;
  const utilities = await utilitiesData.objects;
  const clients = await freelancesData.objects;
  return {
    props: {
      apps,
      utilities,
      clients,
    },
  };
}
