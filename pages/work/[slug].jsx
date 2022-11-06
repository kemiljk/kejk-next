import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "../../components/PageHeader";
import { useRouter } from "next/router";
import TextButton from "../../components/TextButton";
import AllCapsHeader from "../../components/AllCapsHeader";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Project({ work }) {
  const router = useRouter();
  if (!router.isFallback && !work?.slug) {
    return;
  }

  const metaTitle = `KEJK | ${work?.title}`;
  const metaImage = `${work?.metadata.hero.imgix_url}`;
  const metaDescription = "Designer, developer, writer and musician";
  const url = `https://kejk.tech/${work?.slug}`;

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
      <main className="mx-auto max-w-3xl">
        {router.isFallback ? (
          <PageHeader>Loading...</PageHeader>
        ) : (
          <>
            <div className="group mb-8 flex w-full justify-start">
              <Link legacyBehavior href={"/work"}>
                <a className="">
                  <TextButton textColor="black" darkTextColor="white">
                    <ArrowLongLeftIcon className="mr-2 h-6 w-6 flex-shrink-0 text-neutral-500 group-hover:text-teal-500 dark:text-neutral-400" />
                    All work
                  </TextButton>
                </a>
              </Link>
            </div>
            <article>
              <AllCapsHeader marginTop={0} justify={"justify-start"}>
                {work.metadata.year}
              </AllCapsHeader>
              <Image
                src={work.metadata.featured?.imgix_url}
                alt={work.title}
                width={995}
                height={360}
                placeholder="blur"
                blurDataURL={`${work.metadata.featured?.imgix_url}?auto=format,compress&q=1&blur=500&w=2`}
              />
              <PageHeader paddingTop={4}>{work.title}</PageHeader>
              <div
                className="inline-link text-lg"
                dangerouslySetInnerHTML={{ __html: work.content }}
              />
            </article>
          </>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await bucket.getObjects({
    query: {
      slug: params.slug,
    },
    props: "id,slug,content,title,metadata,modified_at",
  });
  const work = await data.objects[0];

  return {
    props: { work },
  };
}

export async function getStaticPaths() {
  const data = await bucket.getObjects({
    query: {
      type: "works",
    },
    props: "id,slug,content,title,metadata",
  });
  const allWorks = await data.objects;
  return {
    paths: allWorks.map((work) => `/work/${work.slug}`),
    fallback: true,
  };
}
