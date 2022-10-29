import Head from "next/head";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import WritingCard from "../components/WritingCard";
import Button from "../components/Button";
import fs from "fs";
import { Feed } from "feed";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { EnvelopeIcon, RssIcon } from "@heroicons/react/20/solid";
import SearchInput from "../components/SearchInput";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

export default function Writing({ writings }) {
  const metaTitle = "KEJK | Writing";
  const metaImage =
    "https://imgix.cosmicjs.com/d71255b0-10ed-11ed-b476-13ceb56f12f2-image.png";
  const metaDescription = "Designer, developer, writer and musician";
  const url = "https://kejk.tech/thoughts";

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // the value of the search field
  const [title, setTitle] = useState("");

  // the search result
  const [foundPosts, setFoundPosts] = useState(writings);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = writings.filter((writing) => {
        return (
          writing.title.toLowerCase().includes(keyword.toLowerCase()) ||
          writing.metadata.snippet
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          writing.metadata.tag.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setFoundPosts(results);
    } else {
      setFoundPosts(writings);
    }
    setTitle(keyword);
  };

  const tagFilter = (e) => {
    const tagValue = e.target.innerText;

    const results = writings.filter((writing) => {
      if (tagValue !== "All") {
        return writing.metadata.tag.toLowerCase() === tagValue.toLowerCase();
      } else {
        return writings;
      }
    });
    setFoundPosts(results);
  };

  const uniqueTags = [
    ...new Set(writings.map((writing) => writing.metadata.tag)),
  ];

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
          <div className="flex w-full items-center justify-between">
            <PageHeader>Writing</PageHeader>
            <Button
              bgColor="bg-neutral-100 dark:bg-transparent mb-4 md:mb-0"
              textColor="text-black dark:text-white"
              borderColor="border-neutral-200 dark:border-neutral-700"
              onClick={openModal}
            >
              <RssIcon className="mr-2" width={20} height={20} />
              Subscribe
            </Button>
            <>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-50 p-4 text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900">
                          <Dialog.Title className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-50">
                            Subscribe
                          </Dialog.Title>
                          <div className="mt-2">
                            <span className="text-neutral-600 dark:text-neutral-400">
                              Get an email whenever I publish a new thought.
                            </span>
                            <form
                              action="https://buttondown.email/api/emails/embed-subscribe/karl"
                              method="post"
                              target="popupwindow"
                              onSubmit="window.open('https://buttondown.email/karl', 'popupwindow')"
                              className="embeddable-buttondown-form mt-4 grid grid-cols-1 gap-2 pb-4 md:grid-cols-3"
                            >
                              <label
                                htmlFor="bd-email"
                                className="md:col-span-2"
                              >
                                <span className="sr-only">
                                  Enter your email
                                </span>
                                <input
                                  type="email"
                                  name="email"
                                  id="bd-email"
                                  placeholder="e.g. sly@stallone.com"
                                  className="w-full rounded-lg border border-neutral-200 bg-neutral-100 py-3 px-3 text-neutral-800 focus:border focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50"
                                  required
                                />
                              </label>
                              <input type="hidden" value="1" name="embed" />
                              <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-teal-100 hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                              >
                                <EnvelopeIcon
                                  width={20}
                                  height={20}
                                  className="mr-2 inline-block text-teal-50"
                                />
                                Subscribe
                              </button>
                            </form>
                            <Link href="https://kejk.tech/rss/feed.xml">
                              <>
                                <span className=" text-neutral-600 dark:text-neutral-300">
                                  Or you can subscribe via{" "}
                                </span>
                                <a
                                  href="https://kejk.tech/rss/feed.xml"
                                  target={"_blank"}
                                  rel={"noopener noreferrer"}
                                  className="text-teal-700 dark:text-teal-500"
                                >
                                  RSS
                                </a>
                              </>
                            </Link>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="scrollbar-hidden grid grid-flow-col items-center space-x-2 overflow-x-auto">
              <Button
                bgColor="bg-neutral-100 dark:bg-neutral-800 mt-4 !text-sm"
                textColor="text-black dark:text-white"
                borderColor="border-none"
                onClick={tagFilter}
              >
                All
              </Button>
              {uniqueTags.map((tag, idx) => (
                <Button
                  bgColor="bg-neutral-100 dark:bg-neutral-800 mt-4 !text-sm"
                  textColor="text-black dark:text-white"
                  borderColor="border-none"
                  onClick={tagFilter}
                  key={idx}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Button>
              ))}
            </div>
            <SearchInput
              value={title}
              onChange={filter}
              placeholder={"Search articles"}
              width={"w-full"}
            />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {foundPosts && foundPosts.length > 0 ? (
              foundPosts.map((writing, idx) => {
                return (
                  <Link key={idx} href={`/thoughts/${writing.slug}`}>
                    <a className="">
                      <WritingCard
                        title={writing.title}
                        subtitle={writing.metadata.snippet}
                        tag={writing.metadata.tag}
                      />
                    </a>
                  </Link>
                );
              })
            ) : (
              <p className="w-full justify-center text-center text-neutral-600 dark:text-neutral-400">
                No results for <strong>{title}</strong>. Try searching for{" "}
                <em>Design</em>.
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
      type: "writings",
    },
    props: "id,slug,title,metadata,published_at",
  });
  const writings = await data.objects;

  const generateRssFeed = async () => {
    const posts = writings;
    const siteURL = "https://kejk.tech";
    const date = new Date();
    const author = {
      name: "Karl Emil James Koch",
      email: "karl@kejk.tech",
      link: "https://twitter.com/_kejk",
    };
    const feed = new Feed({
      title: "KEJK | Writing",
      description: "Thoughts on design, development and career progression",
      id: siteURL,
      link: siteURL,
      image: `${siteURL}/logo.svg`,
      favicon: `${siteURL}/favicon.ico`,
      copyright: `All rights reserved ${date.getFullYear()}, Karl Emil James Koch`,
      updated: date,
      generator: "Feed for Node.js",
      feedLinks: {
        rss2: `${siteURL}/rss/feed.xml`,
        json: `${siteURL}/rss/feed.json`,
        atom: `${siteURL}/rss/atom.xml`,
      },
      author,
    });
    posts.forEach((post) => {
      const url = `${siteURL}/thoughts/${post.slug}`;
      feed.addItem({
        title: post.title,
        id: post.id,
        link: url,
        description: post.metadata.snippet,
        image: post.metadata.hero.imgix_url,
        content: post.content,
        author: [author],
        contributor: [author],
        date: new Date(post.published_at),
      });
    });
    fs.mkdirSync("./public/rss", { recursive: true });
    fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
    fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
    fs.writeFileSync("./public/rss/feed.json", feed.json1());
  };

  await generateRssFeed();

  return {
    props: {
      writings,
    },
  };
}
