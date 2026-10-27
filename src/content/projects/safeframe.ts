import { defineProject } from '../schema';

// The clip SafeFrame scans in the loops and the results screenshots. Its
// licence (CC BY 4.0) requires this credit wherever they appear.
const TORONTO_SKYLINE = {
  label: "Sample video",
  title: "Toronto Skyline",
  author: "Lucastphotography",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  source: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Toronto_Skyline.webm",
};

export default defineProject({
  slug: "safeframe",
  title: "SafeFrame",
  subtitle: "Private Video Safety Checks, Right on the Device",
  summary: "Checks videos for adult content right on the phone or laptop. Nothing is uploaded, so a child's screen stays private.",
  category: "AI/ML",
  tags: ["AI/ML", "Child Safety", "Privacy", "Mobile"],
  year: "2026",
  status: "MVP",
  kind: "internal",
  industry: ["Online Safety"],
  stack: ["Next.js", "React Native", "Machine Learning"],
  links: {
    live: "https://safeframe-livid.vercel.app",
  },
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  cover: "/images/safeframe/screen-home-desktop.webp",
  gallery: [
    { src: "/images/safeframe/screen-home-desktop.webp", alt: "SafeFrame home page: video safety that never leaves the device", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/safeframe/screen-detect-desktop.webp", alt: "SafeFrame detector, ready for a video file or a link", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/safeframe/screen-results-desktop.webp", alt: "SafeFrame result for a sample clip: no inappropriate content found, with per-category scores, a score timeline and on-device timings", kind: "screen", width: 1440, height: 900, credit: TORONTO_SKYLINE, reviewed: true },
    { src: "/images/safeframe/screen-architecture-desktop.webp", alt: "SafeFrame architecture page explaining how it decides, with a numbered table of contents", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/safeframe/screen-home-dark-desktop.webp", alt: "SafeFrame home page in the dark theme", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/safeframe/screen-home-mobile.webp", alt: "SafeFrame home page on a phone", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/safeframe/screen-detect-mobile.webp", alt: "SafeFrame detector on a phone, ready for a file or a link", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/safeframe/screen-results-mobile.webp", alt: "SafeFrame result for a sample clip on a phone, with the score timeline", kind: "screen", width: 780, height: 1688, credit: TORONTO_SKYLINE, reviewed: true },
  ],
  loops: [
    {
      src: "/media/safeframe/loop-desktop-960.mp4",
      poster: "/images/safeframe/screen-detect-desktop.webp",
      caption: "A real scan in the browser: pasting a link to a sample clip, pre-scanning it on the device, and the result, with no inappropriate content found.",
      view: "desktop",
      width: 960,
      height: 600,
      credit: TORONTO_SKYLINE,
      reviewed: true,
    },
    {
      src: "/media/safeframe/loop-mobile.mp4",
      poster: "/images/safeframe/screen-detect-mobile.webp",
      caption: "The same scan on a phone, ending on the scores and the result payload.",
      view: "mobile",
      width: 780,
      height: 1688,
      credit: TORONTO_SKYLINE,
      reviewed: true,
    },
  ],
  description: "SafeFrame checks a video for adult content without sending it anywhere. You drop in a file or paste a link. A small model screens the video frame by frame inside the browser, and a larger model double-checks only the unclear frames. You get a clear verdict, a confidence score and the exact moments that were flagged. The same scoring core also runs in an Android app (one model) and a browser extension.",
  businessProblem: "Kids' browsers and parental tools need to catch adult content in videos. Sending a child's screen to a server is a privacy and legal risk. It also costs money per user and fails offline. Many families also use older phones with little memory.",
  architecturalSolution: "A fully client-side, static-export PWA with no server, database or inference API. A platform-agnostic TypeScript core (Zod payload schema, scoring, smoothing and device-tier policy) is shared unchanged by a Next.js 16 web app, an Expo app and a Manifest V3 extension. Detection is an adaptive cascade: an NSFWJS MobileNetV2 screener on TensorFlow.js checks every sampled frame, and only borderline frames go to a Vision Transformer verifier on ONNX Runtime Web inside a Web Worker. The verifier blends its score with the screener's but can never pull it below the screener's explicit-content score. A second pass over the raw scores catches short inserts that smoothing would hide.",
  systemFlow: "Upload / URL → Seek-Based Sampling (denser around suspect moments) → Downscale and Preprocess → Screener (every frame) → Verifier (borderline frames only, Web Worker) → Score Fusion → Smoothing + Hysteresis + Evidence Runs → Verdict JSON + Timeline → Blur / Pause / Parent Gate",
  techStack: [
    {
      label: "Web App",
      items: [
        { name: "Next.js", version: "16.2", purpose: "App Router with static export (no server at runtime)" },
        { name: "React", version: "19.2", purpose: "UI and the local detection state machine" },
        { name: "TypeScript", version: "5.9", purpose: "Strict types across the whole monorepo" },
        { name: "Tailwind CSS", version: "4.3", purpose: "Styling with light and dark themes" },
        { name: "Framer Motion", version: "12.43", purpose: "Motion and transitions" },
        { name: "Radix UI", purpose: "Accessible dialog, slider, switch and tabs primitives" },
        { name: "Service Worker", purpose: "Hand-rolled offline cache for the app shell and model weights" },
      ],
    },
    {
      label: "On-Device ML",
      items: [
        { name: "NSFWJS (MobileNetV2)", version: "4.3", purpose: "Screener model, bundled with the app (no download)" },
        { name: "TensorFlow.js", version: "4.22", purpose: "Screener runtime on WebGL with a WASM fallback" },
        { name: "Transformers.js", version: "4.2", purpose: "Verifier: an open-weights Vision Transformer classifier" },
        { name: "ONNX Runtime Web", purpose: "Verifier execution on WebGPU or WASM inside a Web Worker" },
      ],
    },
    {
      label: "Shared Core",
      items: [
        { name: "@safeframe/core", purpose: "Pure TypeScript scoring, aggregation and device-tier policy" },
        { name: "Zod", version: "4.4", purpose: "One payload and config schema for every platform" },
        { name: "Vitest", version: "4.1", purpose: "Unit tests plus an offline replay harness" },
      ],
    },
    {
      label: "Mobile & Extension",
      items: [
        { name: "Expo", version: "57", purpose: "Android app sharing the same core" },
        { name: "React Native", version: "0.86", purpose: "Native mobile UI" },
        { name: "onnxruntime-react-native", version: "1.24", purpose: "Native on-device verifier that works in airplane mode" },
        { name: "esbuild", version: "0.25", purpose: "Manifest V3 extension bundle with unused model weights stripped out" },
      ],
    },
    {
      label: "Tooling & Deploy",
      items: [
        { name: "pnpm workspaces", version: "10.16", purpose: "Monorepo for core, web, mobile and extension" },
        { name: "Vercel", purpose: "Static hosting of the prebuilt export" },
        { name: "EAS Build", purpose: "Cloud Android builds, with the model fetched at build time" },
      ],
    },
  ],
  architecture: {
    pattern: "Platform-Agnostic Core + Thin Clients (Zero-Server)",
    diagram: "packages/core (Zod schema · scoring · aggregation · device tier)\n  ├─▶ apps/web — Next.js static PWA: Seek Sampler → Screener (TF.js) → Verifier (ONNX Runtime, Web Worker) → Aggregator → Verdict + Response Layer\n  ├─▶ apps/mobile — Expo: Thumbnailer → JPEG Decode → ONNX Runtime (native) → Aggregator\n  └─▶ apps/extension — Manifest V3 content script → hidden inference iframe (structured clone) → Aggregator → Blur + Pause\n\nNetwork at runtime: a one-time verifier model download (capable devices only) and the video URLs the user provides. Nothing else.",
    designPatterns: [
      "Adaptive model cascade with a per-video escalation budget",
      "Score fusion: a weighted blend floored at the explicit-content score",
      "Smoothing with hysteresis for segment boundaries",
      "Independent raw-series evidence pass for the verdict",
      "Execution-provider fallback chain (WebGPU half precision → full precision → quantized WASM)",
      "Device-tier policy as a pure, tested function",
      "Typed adapters around untyped ML library output",
      "Promise-based RPC over a Web Worker",
      "Schema-first payload shared by every platform",
    ],
  },
  boundedContexts: [
    {
      name: "Detection Core",
      responsibility: "Score combination, cascade routing, score fusion, smoothing, segments and the verdict",
      entities: ["CategoryScores", "FrameSample", "EvidenceRun", "FlaggedSegment", "DetectionResult", "DetectionConfig"],
    },
    {
      name: "Frame Pipeline",
      responsibility: "Seek-based sampling, denser sampling around suspect moments, preprocessing and model adapters",
      entities: ["SeekQueue", "FrameGrabber", "ScreenerAdapter", "VerifierClient"],
    },
    {
      name: "Device Policy",
      responsibility: "Device-tier resolution, sampling rate and whether the verifier is ever loaded",
      entities: ["DeviceSignals", "DeviceTier", "BenchmarkRecord"],
    },
    {
      name: "Response Layer",
      responsibility: "Live guard, blur / pause / hide / skip modes and the press-and-hold parent gate",
      entities: ["ResponseMode", "RunMode", "StageMode"],
    },
    {
      name: "Diagnostics",
      responsibility: "On-device benchmark panel, scan log and offline threshold replay",
      entities: ["BenchmarkRecord", "ScanLogEntry", "ScanFrame", "TimelinePoint"],
    },
  ],
  schema: [
    {
      name: "DetectionResult (payload)",
      description: "Zod-validated verdict returned by every platform; no database exists by design",
      keyFields: ["contains_inappropriate_content", "confidence", "categories", "flagged_segments", "frames_analyzed", "processing", "engine"],
    },
    {
      name: "DetectionConfig",
      description: "Thresholds, cascade band, sampling and response mode, each with a documented default",
      keyFields: ["flagThreshold", "releaseThreshold", "borderlineLow", "borderlineHigh", "responseMode", "runMode", "strictPreview"],
    },
    {
      name: "FlaggedSegment",
      description: "A timestamped stretch of flagged content",
      keyFields: ["start_s", "end_s", "peak_score", "dominant_category"],
    },
    {
      name: "CategoryScores",
      description: "The screener's class scores for each frame",
      keyFields: ["porn", "hentai", "sexy", "neutral", "drawing"],
    },
    {
      name: "ScanLogEntry (local only)",
      description: "Recent scans kept in the browser, with optional per-frame JSON saved to a folder the user picks",
      keyFields: ["id", "at", "sourceKind", "config", "result", "benchmark", "frames"],
    },
  ],
  features: [
    { title: "Nothing Leaves the Device", description: "Videos are checked inside the browser. No uploads, no account, no server. It even works offline after the first visit." },
    { title: "A Quick Check, Then a Careful One", description: "A small, fast model checks every frame. A bigger model double-checks only the unclear ones, which saves time." },
    { title: "Exact Flagged Moments", description: "A timeline shows where flagged content starts and ends, not just a yes or no." },
    { title: "Calm Response for Kids", description: "Flagged moments blur and pause right away, and a parent presses and holds to continue. Blur, pause, hide and skip modes are all available." },
    { title: "Works on Old and New Phones", description: "SafeFrame tests the device first, then adjusts. Older phones get a lighter check instead of a frozen screen." },
    { title: "One Engine on Web, Android and Extension", description: "The same detection core runs in the web app, an Android app and a browser extension that guards any video on a page." },
    { title: "On-Device Benchmark Panel", description: "A built-in panel measures speed on the user's own device. Anything not measured shows a dash, never an estimate." },
  ],
  adrs: [
    { id: "ADR-001", title: "Image Classifiers over a Vision LLM", status: "Accepted", rationale: "Small classifiers return per-class probabilities that support thresholds and hysteresis. Vision LLMs are far larger and much slower per frame on a phone." },
    { id: "ADR-002", title: "Adaptive Cascade", status: "Accepted", rationale: "Pays the large-model cost only on borderline frames, capped per video. Low-end devices never download the verifier." },
    { id: "ADR-003", title: "The Verifier Arbitrates, Never Overwrites", status: "Accepted", rationale: "Replacing the screener's score gave the verifier a veto and produced false negatives. A weighted blend floored at the explicit-content score fixes it without re-flagging swimwear or cartoons." },
    { id: "ADR-004", title: "Float Weights on WebGPU, Quantized Weights Only on WASM", status: "Accepted", rationale: "Quantized weights on the WebGPU execution provider silently returned wrong scores, so the data type is chosen per backend with a fallback chain." },
    { id: "ADR-005", title: "A Second Verdict Path from the Raw Scores", status: "Accepted", rationale: "Smoothing pushed a short explicit insert below the threshold. A sustained-evidence pass flags it, while smoothing still draws the segment boundaries." },
    { id: "ADR-006", title: "No Server: CORS Failures Surfaced, Not Proxied", status: "Accepted", rationale: "A proxy would bring back the server the privacy design exists to avoid. The UI explains the failure and offers file upload instead." },
    { id: "ADR-007", title: "Hidden Iframe Instead of an Offscreen Document", status: "Accepted", rationale: "Structured-clone messaging moves pixel buffers as binary data, where extension runtime messaging would serialize every frame as JSON." },
    { id: "ADR-008", title: "Local Reducer State Machine, No Server-Cache Library", status: "Accepted", rationale: "There is no server state, so a query or Redux layer would add weight with nothing to cache." },
  ],
});
