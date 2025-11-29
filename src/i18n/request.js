import { getRequestConfig } from "next-intl/server";

var locales = ["en", "ar", "fr"];

export default getRequestConfig(async ({ locale }) => {
  var validLocale = locales.includes(locale) ? locale : "en";

  var navbarMessages = (
    await import("../../messages/" + validLocale + "/navbar.json")
  ).default;
  var quoteFormMessages = (
    await import("../../messages/" + validLocale + "/quoteForm.json")
  ).default;

  return {
    locale: validLocale,
    messages: {
      navbar: navbarMessages,
      quoteForm: quoteFormMessages,
    },
  };
});
