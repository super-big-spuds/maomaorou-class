import showdown from "showdown";
import "./index.css";

type Props = {
  mdx: string;
};
export default function StrapiMdxToHtmlConverter(props: Props) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(props.mdx);
  const htmlWithTabs = html.replace(/\n/g, "<br>");

  return (
    <div
      className="no-tailwind"
      dangerouslySetInnerHTML={{ __html: htmlWithTabs }}
    />
  );
}
