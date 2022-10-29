import markdownStyles from "../styles/markdown-styles.module.css";
import ReactMarkdown from "react-markdown";
import classnames from "classnames";

const components = {
  a: (a) => {
    return (
      <a href={a.href} rel="noopener noreferrer" target="_blank">
        {a.children}
      </a>
    );
  },
};

const Markdown = ({ content, ...props }) => {
  return (
    <ReactMarkdown
      components={components}
      {...props}
      className={classnames(
        markdownStyles["markdown"],
        props.className ? props.className : null
      )}
    >
      {content}
    </ReactMarkdown>
  );
};
export default Markdown;
