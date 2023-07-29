import { execSync } from "child_process";

// Simple remark plugin to get the modified time of a file in Git. Used to get
// the modified time of wiki articles.

export function modifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" ${filepath}`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}
