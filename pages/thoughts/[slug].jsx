import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { useRouter } from "next/router";
import TextButton from "../../components/TextButton";
import AllCapsHeader from "../../components/AllCapsHeader";
import Moment from "react-moment";
import classNames from "classnames";
import {
  ArrowLongLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/20/solid";
import { styled, keyframes } from "@stitches/react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-regex.min";
import "prismjs/components/prism-json.min";
import WritingCard from "../../components/WritingCard";

const VIEWPORT_PADDING = 24;

const slideIn = keyframes({
  from: { transform: `trangrayX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "trangrayX(0)" },
});

const slideOut = keyframes({
  from: { transform: "trangrayX(0)" },
  to: { transform: `trangrayX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const swipeOut = keyframes({
  from: { transform: "trangrayX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `trangrayX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const StyledToast = styled(ToastPrimitive.Root, {
  "@media (prefers-reduced-motion: no-preference)": {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${slideOut} 100ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: "trangrayX(var(--radix-toast-swipe-move-x))",
    },
    '&[data-swipe="cancel"]': {
      transform: "trangrayX(0)",
      transition: "transform 200ms ease-out",
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },
});

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ToastPrimitive.Viewport;
export const Toast = StyledToast;
export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export const ToastClose = ToastPrimitive.Close;

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Post({ allPosts, post }) {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return;
  }

  const metaTitle = `KEJK | ${post?.title}`;
  const metaImage = `${post?.metadata.hero.imgix_url}`;
  const metaDescription = "Designer, developer, writer and musician";
  const url = `https://kejk.tech/${post?.slug}`;

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
              <Link legacyBehavior href={"/writing"}>
                <a className="">
                  <TextButton textColor="black" darkTextColor="white">
                    <ArrowLongLeftIcon className="mr-2 h-6 w-6 flex-shrink-0 text-neutral-500 group-hover:text-teal-500 dark:text-neutral-400" />
                    All thoughts
                  </TextButton>
                </a>
              </Link>
            </div>
            <article>
              <AllCapsHeader marginTop={0} justify={"justify-start"}>
                Last updated:&nbsp;<Moment fromNow>{post.modified_at}</Moment>
              </AllCapsHeader>
              <PageHeader>{post.title}</PageHeader>
              <div
                className="inline-link text-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </>
        )}
        <div className="mt-12 flex w-full justify-center">
          <ToastProvider swipeDirection="right">
            <button
              onClick={() => {
                setOpen(false);
                window.clearTimeout(timerRef.current);
                timerRef.current = window.setTimeout(() => {
                  navigator.clipboard.writeText(window.location.href);
                  setOpen(true);
                }, 100);
              }}
              className={classNames(
                `mb-4 flex items-center justify-center space-x-2 rounded-md border border-neutral-200 bg-neutral-100 py-2 px-4 text-sm font-medium text-black transition ease-in-out hover:border-teal-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white md:w-max md:text-base`
              )}
            >
              <Link
                legacyBehavior
                legacyBehavior
                Icon
                className="mr-2 h-6 w-6 flex-shrink-0 text-neutral-500 dark:text-neutral-400"
              />
              Copy link to clipboard
            </button>
            <Toast
              open={open}
              onOpenChange={setOpen}
              className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-100 p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
            >
              <ToastTitle className="flex items-center text-black dark:text-white">
                <CheckCircleIcon className="mr-2 h-6 w-6 flex-shrink-0 text-teal-500 dark:text-teal-400" />
                {"Copied to clipboard!"}
              </ToastTitle>
              <ToastDescription className="font-mono text-xs text-neutral-600 dark:text-neutral-400">
                {"https://www.kejk.tech/thoughts/" + post?.slug}
              </ToastDescription>
            </Toast>
            <ToastViewport className="felx-col w- fixed bottom-0 right-0 z-50 m-0 flex w-auto max-w-screen-sm list-none gap-4 p-6 outline-none" />
          </ToastProvider>
        </div>
        <hr className="my-4 border-neutral-300 dark:border-neutral-700" />
        <AllCapsHeader marginTop={0} justify={"justify-start"}>
          More to explore
        </AllCapsHeader>
        <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2">
          {allPosts !== undefined &&
            allPosts
              .filter((nextPost) => nextPost?.id !== post?.id)
              .map((nextPost, idx) => (
                <Link
                  legacyBehavior
                  legacyBehavior
                  key={idx}
                  href={`/thoughts/${nextPost.slug}`}
                >
                  <a className="">
                    <WritingCard
                      title={nextPost.title}
                      subtitle={nextPost.metadata.snippet}
                    />
                  </a>
                </Link>
              ))}
        </div>
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
  const post = await data.objects[0];

  const allWritingData = await bucket.getObjects({
    query: {
      type: "writings",
    },
    props: "id,slug,content,title,metadata",
    limit: 4,
  });
  const allPosts = await allWritingData.objects;

  return {
    props: { post, allPosts },
  };
}

export async function getStaticPaths() {
  const data = await bucket.getObjects({
    query: {
      type: "writings",
    },
    props: "id,slug,content,title,metadata",
  });
  const allPosts = await data.objects;
  return {
    paths: allPosts.map((post) => `/thoughts/${post.slug}`),
    fallback: true,
  };
}
