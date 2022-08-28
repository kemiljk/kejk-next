import React from "react";
import Nav from "./Nav";
import { CommandPalette } from "../components/CommandPalette";

const Cosmic = require("cosmicjs");
const api = Cosmic();

const BUCKET_SLUG = process.env.NEXT_PUBLIC_COSMIC_SLUG;
const READ_KEY = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

const bucket = await api.bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

const fetchWritingData = await bucket.getObjects({
  query: {
    type: "writings",
  },
  props: "id,type,slug,title,metadata",
});
const writingData = fetchWritingData.objects;

const fetchAppData = await bucket.getObjects({
  query: {
    type: "apps",
  },
  props: "id,type,slug,title,metadata",
});
const appData = fetchAppData.objects;

const fetchUtilitiesData = await bucket.getObjects({
  query: {
    type: "utilities",
  },
  props: "id,type,slug,title,metadata",
});
const utilitiesData = fetchUtilitiesData.objects;

const fetchStacksData = await bucket.getObjects({
  query: {
    type: "software-stacks",
  },
  props: "id,type,slug,title,metadata",
});
const stacksData = fetchStacksData.objects;

const fetchFeaturesData = await bucket.getObjects({
  query: {
    type: "features",
  },
  props: "id,type,slug,title,metadata",
});
const featuresData = fetchFeaturesData.objects;

const fetchAlbumsData = await bucket.getObjects({
  query: {
    type: "albums",
  },
  props: "id,type,slug,title,metadata",
});
const albumsData = fetchAlbumsData.objects;

const contactDetails = [
  {
    title: "Email",
    url: "mailto:karl@kejk.tech",
  },
  {
    title: "GitHub",
    url: "https://github.com/kemiljk",
  },
  {
    title: "Figma",
    url: "https://www.figma.com/@_kejk",
  },
  {
    title: "Twitter",
    url: "https://www.twitter.com/_kejk",
  },
];

const Layout = ({
  writings,
  apps,
  utilities,
  contacts,
  stacks,
  features,
  albums,
  children,
}) => {
  writings = writingData;
  apps = appData;
  utilities = utilitiesData;
  contacts = contactDetails;
  stacks = stacksData;
  features = featuresData;
  albums = albumsData;

  return (
    <>
      <div className="mb-24 md:mb-4 lg:mb-12">
        <CommandPalette
          writings={writings}
          apps={apps}
          utilities={utilities}
          contacts={contacts}
          stacks={stacks}
          features={features}
          albums={albums}
        />
        <Nav />
        <main className="mx-auto h-full w-full max-w-5xl justify-center px-4 md:mt-32 md:px-12 lg:px-0">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
