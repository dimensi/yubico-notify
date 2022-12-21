import notifier from 'node-notifier';
import path, {dirname} from 'node:path';
import { execa } from 'execa';
import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));
const wait = (ms) => new Promise(r => setTimeout(r, ms));

while (true) {
  let timer = setTimeout(() => {
    notifier.notify({
      title: "Yubikey",
      message: "Tap on your yubikey",
      icon: "/Users/n.nafranets/yubico-notify/icon.jpg",
    });
  }, 500);
  await execa("/usr/local/bin/pkcs11-tool", ["-I"]);
  clearTimeout(timer)
  await wait(1e3);
}