import path from "path";
import util from "util";

const exec = util.promisify((await import("child_process")).exec);

const pathToVSCE = path.resolve("node_modules/.bin/vsce");

export const getExtensionInstalls = async (
  extensionName: string
): Promise<number> => {
  try {
    const { stdout, stderr } = await exec(
      `${pathToVSCE} show ${extensionName}`
    );
    const match = /install\s*(\d+)\s*installs/g.exec(stdout);
    if (match === null) {
      throw new Error("Failed to parse out install count");
    }
    return Number(match[1]);
  } catch (e) {
    throw new Error("Failed to get extension information", { cause: e });
  }
};
