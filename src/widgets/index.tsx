import { declareIndexPlugin, ReactRNPlugin } from "@remnote/plugin-sdk";

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.settings.registerStringSetting({
    id: "font-family",
    title: "Document Title Font Family",
    description: "Provide a font family for the document title",
    defaultValue: "Georgia, sans-serif",
  });

  plugin.track(async (reactivePlugin) => {
    const fontFamily = await reactivePlugin.settings.getSetting<string>("font-family");
    await reactivePlugin.app.registerCSS(
      "font-family",
      `.document-title, .doc-title-large { font-family: ${fontFamily}; }`
    );
  });

  await plugin.settings.registerNumberSetting({
    id: "font-size",
    title: "Document Title Font Size (px)",
    description: "Provide a font size for the document title in pixels.",
    defaultValue: 36
  });

  plugin.track(async (reactivePlugin) => {
    const fontSize = await reactivePlugin.settings.getSetting<number>("font-size");
    await reactivePlugin.app.registerCSS(
      "font-size",
      `.document-title, .doc-title-large { font-size: ${fontSize}px; }`
    );
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
