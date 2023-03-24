import { Octokit } from "octokit";
import { useState } from "react";

type ReadmeProps = {
  md: string;
};

const octokit = new Octokit({
  auth: process.env.github_read_only,
});

export default function ReadmePreview(props: ReadmeProps) {
  const [data, setData] = useState("");
  octokit
    .request("POST /markdown", {
      text: props.md,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then((res) => res.data).then(data => setData(data));
  return <>{data}</>;
}
