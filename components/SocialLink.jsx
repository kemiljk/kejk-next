import Link from "next/link";

const SocialLink = ({ title, href }) => {
  return (
    <Link href={href}>
      <a className="inline-link" href={href} target="_blank" rel="noreferrer">
        {title}
      </a>
    </Link>
  );
};

export default SocialLink;
