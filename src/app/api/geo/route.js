import { NextResponse } from "next/server";
import {
  getCountryFromRequest,
  getLocaleFromCountry,
} from "@/lib/locale/geo";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const fromHeader = getCountryFromRequest(request);
  if (fromHeader) {
    return NextResponse.json({
      countryCode: fromHeader,
      locale: getLocaleFromCountry(fromHeader),
      source: "cdn",
    });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const clientIp =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null;

  const isLocal =
    !clientIp || clientIp === "127.0.0.1" || clientIp === "::1";

  if (isLocal) {
    return NextResponse.json({
      countryCode: null,
      locale: "en",
      source: "local",
    });
  }

  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(clientIp)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.success !== false && data?.country_code) {
        const countryCode = String(data.country_code).toUpperCase();
        return NextResponse.json({
          countryCode,
          locale: getLocaleFromCountry(countryCode),
          source: "ipwho",
        });
      }
    }
  } catch {
    /* fall through */
  }

  return NextResponse.json({
    countryCode: null,
    locale: "en",
    source: "default",
  });
}
