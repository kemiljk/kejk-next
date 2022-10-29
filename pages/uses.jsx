import Head from "next/head";
import StackCard from "../components/StackCard";
import PageHeader from "../components/PageHeader";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Projects({ stacks }) {
  const metaTitle = "KEJK | Stack";
  const metaImage =
    "https://imgix.cosmicjs.com/16143f80-10ee-11ed-b476-13ceb56f12f2-image.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/uses";

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
        <PageHeader>Stack</PageHeader>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stacks.map((stack, idx) => {
            return (
              <StackCard
                key={idx}
                link={stack.metadata.url}
                image={stack.metadata.icon.imgix_url}
                title={stack.title}
                subtitle={stack.metadata.subtitle}
                tags={stack.metadata.tags}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "stacks",
    },
    props: "title,content,metadata",
  });

  const stacks = await data.objects;
  return {
    props: {
      stacks,
    },
  };
}
