import SysTray from "https://deno.land/x/systray@v0.2.2/mod.ts";
import { notify } from "https://deno.land/x/notifier@v0.4.0/mod.ts";
import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

const TITLE = "Yubi Tap Notifier";

const systray = new SysTray({
  menu: {
    icon: `${Deno.execPath().split('/').slice(0, -1).join('/')}/icon-tray.png`,
    tooltip: TITLE,
    title: "",
    items: [
      {
        title: "...working",
        tooltip: "...working",
        enabled: false,
      },
    ],
  },
  directory: "bin", // cache directory of binary package
});

systray.on("ready", () => {
  console.log("tray started!");
});

systray.on("exit", () => {
  console.log("exited");
});

systray.on("error", (error) => {
  console.log(error);
});

while (true) {
  let timer = setTimeout(() => {
    notify({
      title: TITLE,
      message: "Please tap to a yubikey",
      icon: "./icon-tray.png",
    });
  }, 300);
  await exec("pkcs11-tool -I", { output: OutputMode.None });
  clearTimeout(timer);
  await wait(1e3);
}