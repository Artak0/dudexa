"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("dudexa-cookie-consent")) {
      // The preference is only available after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);
  if (!visible || pathname.startsWith("/admin")) return null;
  function choose(value: "accepted" | "necessary") { localStorage.setItem("dudexa-cookie-consent", value); setVisible(false); }
  return <aside className="cookie-banner" aria-label="Cookie preferences"><div><strong>Privacy by design.</strong><p>We use anonymous analytics to improve product discovery. Necessary storage keeps your language and privacy preference.</p><Link href="/legal/cookies">Cookie policy</Link></div><button onClick={() => choose("necessary")}>Necessary only</button><button className="accept" onClick={() => choose("accepted")}>Accept analytics</button></aside>;
}
