import Head from "next/head";
import PageHeader from "../components/PageHeader";
import FeatureCard from "../components/FeatureCard";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchInput from "../components/SearchInput";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Feature({ features }) {
  // the value of the search field
  const [title, setTitle] = useState("");

  // the search result
  const [foundFeatures, setFoundFeatures] = useState(features);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = features.filter((feature) => {
        return (
          feature.title.toLowerCase().includes(keyword.toLowerCase()) ||
          feature.metadata.type.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFoundFeatures(results);
    } else {
      setFoundFeatures(features);
    }

    setTitle(keyword);
  };

  const router = useRouter();
  if (!router.isFallback && !features?.length) {
    return;
  }

  const metaTitle = "KEJK | Features";
  const metaImage =
    "https://imgix.cosmicjs.com/aa1741b0-9c8f-11ec-b20b-ad2fdaf5e1bc-2022meta.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/features";

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
        <div className="mx-auto w-full max-w-5xl">
          <PageHeader>Features</PageHeader>
          <SearchInput
            value={title}
            onChange={filter}
            placeholder={"Search features"}
            width={"w-full md:w-1/2"}
          />
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {foundFeatures && foundFeatures.length > 0 ? (
              foundFeatures.map((feature, idx) => {
                return (
                  <FeatureCard
                    key={idx}
                    link={feature.metadata.url}
                    title={feature.title}
                    type={feature.metadata.type}
                  />
                );
              })
            ) : (
              <p className="w-full justify-center text-center text-neutral-600 dark:text-neutral-400">
                No results for <strong>{title}</strong>. Try searching for{" "}
                <em>Code</em>.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "features",
    },
    props: "id,slug,title,metadata,created_at",
    sort: "-created_at",
  });

  const features = await data.objects;

  return {
    props: {
      features,
    },
    revalidate: 10,
  };
}
