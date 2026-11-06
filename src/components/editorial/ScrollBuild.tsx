"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { siteConfig } from "@/data/siteConfig";
import styles from "./scroll-build.module.css";

const agents = [
  { name: "layout", color: "#f26b82" },
  { name: "type", color: "#bba4ff" },
  { name: "visual", color: "#71d7de" },
  { name: "motion", color: "#f5c77d" },
  { name: "grid", color: "#9be4a2" },
  { name: "detail", color: "#e5a4da" },
  { name: "system", color: "#87b6ff" },
  { name: "build", color: "#f29586" },
  { name: "copy", color: "#b9d997" },
  { name: "polish", color: "#c8b8f6" },
  { name: "ship", color: "#8fd7c7" },
  { name: "review", color: "#eed7a5" },
] as const;

const buildSpeed = siteConfig.motion.speedMultiplier;
const atBuildSpeed = (milliseconds: number) => Math.round(milliseconds / buildSpeed);
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

type BuildState = "waiting" | "built";
type BuildTarget = {
  node: HTMLElement;
  index: number;
  state: BuildState;
  desired: BuildState;
  owner: number | null;
};
type AgentTask = {
  target: BuildTarget;
  intent: BuildState;
  stage: "travel" | "draw" | "type" | "commit";
  started: number;
  duration: number;
  progress: number;
  text: string;
  characters: number;
};

function targetName(node: HTMLElement) {
  const kind = node.dataset.build ?? "part";
  const labels: Record<string, string> = {
    "hero-word": "BACKGROUND TYPE", "hero-portrait": "PORTRAIT",
    "hero-copy": "HERO COPY", "hero-detail": "HERO DETAIL",
    heading: "HEADING", visual: "IMAGE", line: "CONTENT", link: "LINK",
    part: "COMPONENT", panel: "PANEL", card: "CARD", shell: "CARD FRAME", logo: "TECH MARK",
  };
  return labels[kind] ?? kind.toUpperCase();
}

function priority(target: BuildTarget) {
  const kind = target.node.dataset.build;
  if (!target.node.closest("#home")) return 4;
  if (kind === "hero-copy" && target.node.textContent?.trim().startsWith("Hello")) return 0;
  if (kind === "hero-portrait") return 1;
  if (kind === "hero-word") return 2;
  if (kind === "hero-copy") return 3;
  return 5;
}

function visibleRect(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  if (rect.width <= 1 || rect.height <= 1 || rect.bottom <= 0 || rect.top >= window.innerHeight || rect.right <= 0 || rect.left >= window.innerWidth) {
    return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height };
  }
  let { left, top, right, bottom } = rect;
  let parent = node.parentElement;
  while (parent && parent.tagName !== "MAIN") {
    const style = window.getComputedStyle(parent);
    if (style.overflow === "hidden" || style.overflow === "clip" || style.overflowX === "hidden" || style.overflowY === "hidden") {
      const clip = parent.getBoundingClientRect();
      left = Math.max(left, clip.left);
      top = Math.max(top, clip.top);
      right = Math.min(right, clip.right);
      bottom = Math.min(bottom, clip.bottom);
    }
    parent = parent.parentElement;
  }
  return { left, top, right, bottom, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
}

type TargetRect = ReturnType<typeof visibleRect>;

function copyFor(node: HTMLElement) {
  const kind = node.dataset.build ?? "";
  const copyKinds = ["hero-word", "hero-copy", "hero-detail", "heading", "line", "link", "logo"];
  if (!copyKinds.includes(kind) && !node.matches("p,h1,h2,h3,h4,h5,h6") && !(kind === "part" && node.childElementCount < 2)) return "";
  const read = (element: Node): string => {
    if (element.nodeType === Node.TEXT_NODE) return element.textContent ?? "";
    if (!(element instanceof Element)) return "";
    if (element.tagName === "BR") return "\n";
    if (element.matches("svg,input,textarea,select") || (element !== node && element.matches("[aria-hidden='true']"))) return "";
    const content = Array.from(element.childNodes, read).join("");
    return element !== node && /^(DIV|P|LI|SUMMARY|H[1-6])$/.test(element.tagName) ? "\n" + content + "\n" : content;
  };
  return read(node).replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function ScrollBuild({ forceBoot = false }: { forceBoot?: boolean }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-portfolio-root]");
    const layer = layerRef.current;
    if (!root || !layer) return;

    const cursors = Array.from(layer.querySelectorAll<HTMLElement>("[data-agent-cursor]"));
    const frames = Array.from(layer.querySelectorAll<HTMLElement>("[data-selection-frame]"));
    const copies = frames.map((guide) => guide.querySelector<HTMLElement>("[data-typed-copy]")!);
    const copyText = frames.map((guide) => guide.querySelector<HTMLElement>("[data-typed-text]")!);
    const sizes = frames.map((guide) => guide.querySelector<HTMLElement>("[data-size-label]")!);
    const targets = new Map<HTMLElement, BuildTarget>();
    const tasks: (AgentTask | null)[] = Array(cursors.length).fill(null);
    let nextAgent = 0;
    let frame = 0;
    let motionFrame = 0;
    let bootTimer = 0;
    let destroyed = false;
    const boot = forceBoot || (window.scrollY < 24 && !window.location.hash);

    function setState(target: BuildTarget, state: BuildState) {
      target.state = state;
      target.node.dataset.agentState = state;
      if (target.node.dataset.build === "shell") target.node.inert = state !== "built";
    }

    function hideFrame(agent: number) {
      frames[agent].dataset.active = "false";
      frames[agent].dataset.phase = "";
      frames[agent].dataset.hasCopy = "false";
      copyText[agent].textContent = "";
      cursors[agent].dataset.working = "false";
      const action = cursors[agent].querySelector<HTMLElement>("[data-agent-action]");
      if (action) action.textContent = "";
    }

    function moveCursor(agent: number, x: number, y: number) {
      cursors[agent].style.transform = "translate3d(" + x + "px," + y + "px,0)";
    }

    function park(agent: number) {
      const cursor = cursors[agent];
      const header = window.innerWidth <= 760 ? 60 : 68;
      const spread = (Math.floor(agent / 4) + 1) / 4;
      const lane = agent % 4;
      const x = lane === 0 ? 18 : lane === 1 ? window.innerWidth - 36 : window.innerWidth * spread;
      const y = lane === 2 ? window.innerHeight - 30 : lane === 3 ? header + 22 : header + (window.innerHeight - header - 45) * spread;
      cursor.style.transition = "";
      cursor.style.setProperty("--travel-duration", atBuildSpeed(650) + "ms");
      moveCursor(agent, x, y);
      cursor.dataset.parked = "true";
    }

    function cancel(agent: number) {
      const task = tasks[agent];
      if (!task) return;
      task.target.owner = null;
      task.target.node.dataset.agentState = task.target.state;
      tasks[agent] = null;
      hideFrame(agent);
    }

    function schedule() {
      if (!destroyed && !frame) frame = window.requestAnimationFrame(sync);
    }

    function scheduleMotion() {
      if (!destroyed && !motionFrame) motionFrame = window.requestAnimationFrame(animate);
    }

    function collect(scheduleAfter = true) {
      const nodes = Array.from(root!.querySelectorAll<HTMLElement>("main [data-build]"));
      const current = new Set(nodes);
      for (const [node, target] of targets) {
        if (current.has(node)) continue;
        if (target.owner !== null) cancel(target.owner);
        targets.delete(node);
      }
      nodes.forEach((node, index) => {
        const existing = targets.get(node);
        if (existing) {
          existing.index = index;
          return;
        }
        const target: BuildTarget = { node, index, state: "waiting", desired: "waiting", owner: null };
        targets.set(node, target);
        setState(target, "waiting");
      });
      if (scheduleAfter) schedule();
    }

    function targetIsVisible(rect: TargetRect) {
      const header = window.innerWidth <= 760 ? 60 : 68;
      return rect.width > 1 && rect.height > 1 && rect.bottom > header && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
    }

    function desiredFor(target: BuildTarget, rect: TargetRect): BuildState {
      const header = window.innerWidth <= 760 ? 60 : 68;
      const openingHero = boot && window.scrollY < 24 && Boolean(target.node.closest("#home"));
      const entry = openingHero ? window.innerHeight + 5 : window.innerHeight * 0.84;
      const exit = target.node.closest("#home") && target.index < 2
        ? header + 28 : Math.max(header + 28, window.innerHeight * 0.22);
      const shell = target.node.parentElement?.closest<HTMLElement>('[data-build="shell"]');
      if (shell && shell.dataset.agentState !== "built") return "waiting";
      return rect.width > 1 && rect.height > 1 && rect.top < entry && rect.bottom > exit ? "built" : "waiting";
    }

    function geometry(rect: TargetRect) {
      const header = window.innerWidth <= 760 ? 60 : 68;
      const left = Math.max(2, Math.min(window.innerWidth - 22, rect.left));
      const top = Math.max(header + 2, Math.min(window.innerHeight - 24, rect.top));
      const right = Math.max(left + 2, Math.min(window.innerWidth - 18, rect.right));
      const bottom = Math.max(top + 2, Math.min(window.innerHeight - 20, rect.bottom));
      return { left, top, width: right - left, height: bottom - top };
    }

    function typeStyles(agent: number, node: HTMLElement) {
      const style = window.getComputedStyle(node);
      Object.assign(copies[agent].style, {
        fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight,
        fontStyle: style.fontStyle, lineHeight: style.lineHeight, letterSpacing: style.letterSpacing,
        textTransform: style.textTransform, textAlign: style.textAlign, color: style.color,
        paddingTop: style.paddingTop, paddingRight: style.paddingRight,
        paddingBottom: style.paddingBottom, paddingLeft: style.paddingLeft,
        whiteSpace: style.whiteSpace === "nowrap" ? "pre" : "pre-wrap",
      });
    }

    function renderTask(agent: number, rect: TargetRect) {
      const task = tasks[agent];
      if (!task) return;
      const box = geometry(rect);
      const guide = frames[agent];
      const drawing = task.stage === "draw";
      const factor = drawing ? (task.intent === "built" ? ease(task.progress) : 1 - ease(task.progress)) : task.stage === "commit" && task.intent === "waiting" ? 0 : 1;
      const width = Math.max(2, box.width * factor);
      const height = Math.max(2, box.height * factor);
      guide.style.transform = "translate3d(" + box.left + "px," + box.top + "px,0)";
      guide.style.width = width + "px";
      guide.style.height = height + "px";
      sizes[agent].textContent = Math.round(width) + " × " + Math.round(height);
      copies[agent].style.width = rect.width + "px";
      copies[agent].style.height = rect.height + "px";
      copies[agent].style.left = Math.min(0, rect.left - box.left) + "px";
      copies[agent].style.top = Math.min(0, rect.top - box.top) + "px";

      if (task.stage === "type") {
        const fraction = task.intent === "built" ? task.progress : 1 - task.progress;
        const count = Math.round(task.text.length * fraction);
        if (count !== task.characters) {
          copyText[agent].textContent = task.text.slice(0, count);
          task.characters = count;
        }
      }
      moveCursor(agent, box.left + width, box.top + height);
    }

    function beginStage(agent: number, stage: AgentTask["stage"], now: number) {
      const task = tasks[agent];
      if (!task) return;
      task.stage = stage;
      task.started = now;
      task.progress = 0;
      task.duration = stage === "draw" ? atBuildSpeed(400)
        : stage === "type" ? atBuildSpeed(Math.max(180, Math.min(700, task.text.length * 5)))
          : atBuildSpeed(145);
      frames[agent].dataset.phase = stage;
      if (stage === "type") {
        task.characters = -1;
        renderTask(agent, visibleRect(task.target.node));
      }
    }

    function commit(agent: number, now: number) {
      const task = tasks[agent];
      if (!task) return;
      setState(task.target, task.intent);
      beginStage(agent, "commit", now);
    }

    function startWork(agent: number, now: number) {
      const task = tasks[agent];
      if (!task) return;
      cursors[agent].style.transition = "none";
      task.target.node.dataset.agentState = task.intent === "built" ? "placing" : "removing";
      frames[agent].dataset.active = "true";
      // Teardown erases the copy before contracting the same frame.
      beginStage(agent, task.intent === "waiting" && task.text ? "type" : "draw", now);
      renderTask(agent, visibleRect(task.target.node));
    }

    function animate(now: number) {
      motionFrame = 0;
      if (destroyed) return;
      for (let agent = 0; agent < tasks.length; agent++) {
        const task = tasks[agent];
        if (!task) continue;
        const rect = visibleRect(task.target.node);
        if (!targetIsVisible(rect)) {
          cancel(agent);
          setState(task.target, "waiting");
          schedule();
          continue;
        }
        task.progress = clamp((now - task.started) / task.duration);
        if (task.stage === "travel") {
          if (task.progress >= 1) startWork(agent, now);
          continue;
        }
        renderTask(agent, rect);
        if (task.progress < 1) continue;
        if (task.stage === "draw") {
          if (task.intent === "built" && task.text) beginStage(agent, "type", now);
          else commit(agent, now);
        } else if (task.stage === "type") {
          if (task.intent === "waiting") beginStage(agent, "draw", now);
          else commit(agent, now);
        } else {
          task.target.owner = null;
          tasks[agent] = null;
          hideFrame(agent);
          schedule();
        }
      }
      if (tasks.some(Boolean)) scheduleMotion();
    }

    function assign(agent: number, target: BuildTarget) {
      const rect = visibleRect(target.node);
      if (!targetIsVisible(rect)) {
        setState(target, target.desired);
        return;
      }
      const cursor = cursors[agent];
      const guide = frames[agent];
      const text = copyFor(target.node);
      const duration = atBuildSpeed(250 + (agent % 4) * 45);
      const task: AgentTask = {
        target, intent: target.desired, stage: "travel", started: performance.now(),
        duration, progress: 0, text, characters: -1,
      };
      tasks[agent] = task;
      target.owner = agent;
      cursor.style.transition = "";
      cursor.style.setProperty("--travel-duration", duration + "ms");
      cursor.dataset.working = "true";
      cursor.dataset.parked = "false";
      cursor.dataset.intent = task.intent;
      guide.dataset.intent = task.intent;
      guide.dataset.kind = target.node.dataset.build ?? "part";
      guide.dataset.hasCopy = text ? "true" : "false";
      const label = guide.querySelector<HTMLElement>("[data-selection-label]");
      if (label) label.textContent = targetName(target.node);
      const action = cursor.querySelector<HTMLElement>("[data-agent-action]");
      if (action) action.textContent = (task.intent === "built" ? "BUILDING " : "REMOVING ") + targetName(target.node);
      if (text) typeStyles(agent, target.node);
      if (task.intent === "built") target.node.dataset.agentState = "placing";
      const box = geometry(rect);
      moveCursor(agent, task.intent === "built" ? box.left : box.left + box.width, task.intent === "built" ? box.top : box.top + box.height);
      scheduleMotion();
    }

    function sync() {
      frame = 0;
      if (destroyed) return;
      const candidates: BuildTarget[] = [];
      const measured = Array.from(targets.values(), (target) => ({ target, rect: visibleRect(target.node) }));
      for (const { target, rect } of measured) {
        const visible = targetIsVisible(rect);
        const desired = desiredFor(target, rect);
        target.desired = desired;
        if (target.owner !== null) {
          const task = tasks[target.owner];
          if (!visible || (task && task.intent !== desired)) {
            cancel(target.owner);
            if (!visible) setState(target, "waiting");
          } else if (task?.stage !== "travel") renderTask(target.owner, rect);
        }
        if (target.owner !== null) continue;
        if (!visible) {
          if (target.state !== "waiting") setState(target, "waiting");
          continue;
        }
        if (target.state !== desired) candidates.push(target);
      }
      candidates.sort((a, b) => {
        if (a.desired !== b.desired) return a.desired === "built" ? -1 : 1;
        if (a.desired === "waiting") return b.index - a.index;
        return priority(a) - priority(b) || a.index - b.index;
      });
      const maxWorking = window.innerWidth <= 760 ? 4 : 8;
      const availableAgents = window.innerWidth <= 760 ? 6 : cursors.length;
      let working = tasks.filter(Boolean).length;
      for (const target of candidates) {
        if (working >= maxWorking) break;
        let agent = -1;
        for (let offset = 0; offset < availableAgents; offset++) {
          const index = (nextAgent + offset) % availableAgents;
          if (tasks[index] === null) {
            agent = index;
            nextAgent = (index + 1) % availableAgents;
            break;
          }
        }
        if (agent === -1) break;
        assign(agent, target);
        working++;
      }
      for (let agent = 0; agent < cursors.length; agent++) {
        if (tasks[agent] === null) park(agent);
      }
    }

    collect(false);
    root.dataset.buildReady = "true";
    if (boot) bootTimer = window.setTimeout(schedule, atBuildSpeed(420));
    else schedule();
    const observer = new MutationObserver(() => collect());
    observer.observe(root.querySelector("main") ?? root, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    window.addEventListener("hashchange", schedule);
    root.addEventListener("toggle", schedule, true);

    return () => {
      destroyed = true;
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(motionFrame);
      window.clearTimeout(bootTimer);
      for (let index = 0; index < tasks.length; index++) cancel(index);
      for (const target of targets.values()) {
        if (target.node.dataset.build === "shell") target.node.inert = false;
        delete target.node.dataset.agentState;
      }
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      window.removeEventListener("hashchange", schedule);
      root.removeEventListener("toggle", schedule, true);
      delete root.dataset.buildReady;
    };
  }, [forceBoot]);

  return (
    <div className={styles.layer} ref={layerRef} aria-hidden="true">
      {agents.map((agent, index) => (
        <span key={agent.name} className={styles.cursor} data-agent-cursor data-working="false" data-parked="false"
          style={{ "--cursor-color": agent.color, "--cursor-index": index } as CSSProperties}>
          <span className={styles.cursorBody}>
            <svg viewBox="0 0 18 22" width="16" height="20" fill="none">
              <path d="M2 1.5v17l4.4-4.6 3.1 6.3 3.1-1.5-3.1-6.2h6.2L2 1.5Z" fill="var(--cursor-color)" stroke="#09090a" strokeWidth="1.6" />
            </svg>
            <span className={styles.cursorText}><strong>{agent.name}.agent</strong><small data-agent-action /></span>
          </span>
        </span>
      ))}
      {agents.map((agent) => (
        <span key={agent.name} className={styles.selectionFrame} data-selection-frame data-active="false"
          style={{ "--frame-color": agent.color } as CSSProperties}>
          <span className={styles.selectionLabel} data-selection-label />
          <span className={styles.frameGrid} />
          <span className={styles.copyWindow}><span className={styles.typedCopy} data-typed-copy><span data-typed-text /><b className={styles.caret} /></span></span>
          <span className={styles.sizeLabel} data-size-label />
          <i /><i /><i /><i />
        </span>
      ))}
      <div className={styles.hint}><span /> AGENTS BUILD THIS PAGE <b>↕ SCROLL</b></div>
    </div>
  );
}
