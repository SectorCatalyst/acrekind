import { Leaf } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return <main className="legal-page"><article><Link className="wordmark" href="/"><Leaf size={17} />ACREKIND</Link><p className="eyebrow">Privacy note · Effective 31 July 2026</p><h1>A small tool with a small data footprint.</h1><p>Acrekind creates garden plans in your browser. The answers you enter are not sent to Acrekind or stored in an account. If you choose to share a plan, its settings are placed in the link so the recipient can recreate it.</p><h2>Information you provide</h2><p>The planner accepts a general place name, hardiness zone, light, moisture and plot size. Do not enter a street address or other sensitive information. PDF files are generated on your device.</p><h2>Third parties</h2><p>The site may be hosted by a third-party infrastructure provider that processes routine technical logs for security and reliability. Links to external plant references are governed by their own privacy policies.</p><h2>Contact</h2><p>Questions can be sent to <a href="mailto:hello@acrekind.com">hello@acrekind.com</a>.</p></article></main>;
}
