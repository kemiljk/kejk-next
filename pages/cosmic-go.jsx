import Head from "next/head";
import Image from "next/image";
import PageHeader from "../components/PageHeader";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import TextButton from "../components/TextButton";
import { useRouter } from "next/router";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

const CosmicGo = ({ cosmicGo }) => {
  const metaTitle = "KEJK | Cosmic Go";
  const metaImage =
    "https://imgix.cosmicjs.com/b25458a0-4198-11ed-90bf-c1749bd2c993-image.png";
  const metaDescription = "Powering a personal SwiftUI app with Cosmic";
  const url = "https://kejk.tech/cosmic-go";

  const router = useRouter();
  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className={"mx-auto mt-12 max-w-3xl"}>
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
        <div className="group mb-8 flex w-full justify-start">
          <Link href={"#"}>
            <a className="" onClick={goBack}>
              <TextButton textColor="black" darkTextColor="white">
                <ArrowLongLeftIcon className="mr-2 h-6 w-6 flex-shrink-0 text-neutral-500 group-hover:text-teal-500 dark:text-neutral-400" />
                Go back
              </TextButton>
            </a>
          </Link>
        </div>
        <PageHeader>{cosmicGo.title}</PageHeader>
        <h2 className="mb-4 text-left text-2xl font-medium text-neutral-700 dark:text-neutral-400 md:text-2xl">
          {cosmicGo.metadata.subtitle}
        </h2>
        <div className="h-auto w-full max-w-3xl">
          <Image
            className="rounded-md"
            src={cosmicGo.metadata.hero?.imgix_url}
            width={1000}
            height={700}
            quality={100}
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            blurDataURL={`${cosmicGo.metadata.hero?.imgix_url}?auto=format,compress&q=1&blur=500&w=2`}
            alt="Image of the app icon"
            priority
          />
        </div>
        <div className="mt-12 flex w-full items-center justify-between gap-2">
          <div className="flex flex-col space-y-4">
            <div
              className="flex w-full flex-col gap-2 md:w-2/3"
              dangerouslySetInnerHTML={{ __html: cosmicGo.metadata.subheader }}
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-max">
              <Image
                className="rounded-[28px]"
                width={150}
                height={150}
                src={cosmicGo.metadata.icon?.imgix_url}
                alt="Image of the app icon"
                quality={100}
              />
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: cosmicGo.content }} />
      </main>
    </div>
  );
};

export default CosmicGo;

export async function getStaticProps() {
  const data = await bucket.getObjects({
    query: {
      type: "cosmic-go",
      slug: "cosmic-go",
    },
    props: "title,content,metadata",
  });

  const cosmicGo = await data.objects[0];
  return {
    props: {
      cosmicGo,
    },
  };
}
