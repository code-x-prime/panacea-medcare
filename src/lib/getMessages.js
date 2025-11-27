// src/lib/getMessages.js
export async function getMessages(locale, page) {
  try {
    const messages = await import(`../../messages/${locale}/${page}.json`);
    return messages.default;
  } catch (error) {
    // Fallback to English if translation not found
    try {
      const fallback = await import(`../../messages/en/${page}.json`);
      return fallback.default;
    } catch {
      return {};
    }
  }
}
