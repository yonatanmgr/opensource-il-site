export default function ReadmePreview(props: { readmePreview: string }) {
  return (
    <div
      dir="ltr"
      className="hidden lg:block w-2/4 min-w-[50%] max-w-[50%] h-auto overflow-y-auto markdown-body bg-readmedark border border-myblue rounded-tl-xl rounded-tr-xl"
      dangerouslySetInnerHTML={{ __html: props.readmePreview }}
    ></div>
  );
}
