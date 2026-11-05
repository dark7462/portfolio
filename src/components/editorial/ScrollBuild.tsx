"use client";

import { useEffect, useRef, type CSSProperties } from "react";
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

const buildSpeed = 1.5;
const atBuildSpeed = (milliseconds: number) => Math.round(milliseconds / buildSpeed);

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
  stage: "travel" | "select" | "commit";
  timers: number[];
};

function targetName(node: HTMLElement) {
  const kind = node.dataset.build ?? "part";
  const labels: Record<string, string> = {
    "hero-word": "BACKGROUND TYPE",
    "hero-portrait": "PORTRAIT",
    "hero-copy": "HERO COPY",
    "hero-detail": "HERO DETAIL",
    heading: "HEADING",
    visual: "IMAGE",
    line: "CONTENT",
    link: "LINK",
    part: "COMPONENT",
    panel: "PANEL",
    card: "CARD",
    shell: "CARD FRAME",
    logo: "TECH MARK",
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
  let left = rect.left;
  let top = rect.top;
  let right = rect.right;
  let bottom = rect.bottom;
  let parent = node.parentElement;
  // A compare image can be wider than the visible portion of the slider.
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

export function ScrollBuild({ forceBoot = false }: { forceBoot?: boolean }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-portfolio-root]");
    const layer = layerRef.current;
    if (!root || !layer) return;

    const cursors = Array.from(layer.querySelectorAll<HTMLElement>("[data-agent-cursor]"));
    const frames = Array.from(layer.querySelectorAll<HTMLElement>("[data-selection-frame]"));
    const targets = new Map<HTMLElement, BuildTarget>();
    const tasks: (AgentTask | null)[] = Array(cursors.length).fill(null);
    const timers = new Set<number>();
    let nextAgent = 0;
    let frame = 0;
    let destroyed = false;
    const boot = forceBoot || (window.scrollY < 24 && !window.location.hash);

    function later(callback: () => void, delay: number) {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        if (!destroyed) callback();
      }, delay);
      timers.add(timer);
      return timer;
    }

    function setState(target: BuildTarget, state: BuildState) {
      target.state = state;
      target.node.dataset.agentState = state;
      if (target.node.dataset.build === "shell") target.node.inert = state !== "built";
    }

    function hideFrame(agent: number) {
      frames[agent].dataset.active = "false";
      frames[agent].dataset.phase = "";
      cursors[agent].dataset.working = "false";
      const action = cursors[agent].querySelector<HTMLElement>("[data-agent-action]");
      if (action) action.textContent = "";
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
      cursor.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      cursor.dataset.parked = "true";
    }

    function cancel(agent: number) {
      const task = tasks[agent];
      if (!task) return;
      for (const timer of task.timers) {
        window.clearTimeout(timer);
        timers.delete(timer);
      }
      task.target.owner = null;
      task.target.node.dataset.agentState = task.target.state;
      tasks[agent] = null;
      hideFrame(agent);
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

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(sync);
    }

    function targetIsVisible(rect: ReturnType<typeof visibleRect>) {
      return rect.width > 1 && rect.height > 1 && rect.bottom > 68 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
    }

    function desiredFor(target: BuildTarget, rect: ReturnType<typeof visibleRect>): BuildState {
      const header = window.innerWidth <= 760 ? 60 : 68;
      const openingHero = boot && window.scrollY < 24 && Boolean(target.node.closest("#home"));
      const entry = openingHero ? window.innerHeight + 5 : window.innerHeight * 0.84;
      const exit = target.node.closest("#home") && target.index < 2
        ? header + 28
        : Math.max(header + 28, window.innerHeight * 0.22);
      const shell = target.node.parentElement?.closest<HTMLElement>('[data-build="shell"]');
      if (shell && shell.dataset.agentState !== "built") return "waiting";
      return rect.width > 1 && rect.height > 1 && rect.top < entry && rect.bottom > exit ? "built" : "waiting";
    }

    function position(agent: number, rect: ReturnType<typeof visibleRect>, active: boolean) {
      const cursor = cursors[agent];
      const guide = frames[agent];
      const x = Math.max(12, Math.min(window.innerWidth - 85, rect.left + Math.min(24, rect.width * 0.18)));
      const y = Math.max(70, Math.min(window.innerHeight - 30, rect.top + Math.min(22, rect.height * 0.2)));
      cursor.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      if (!active) return;
      const left = Math.max(2, rect.left);
      const top = Math.max(62, rect.top);
      guide.style.left = left + "px";
      guide.style.top = top + "px";
      guide.style.width = Math.max(0, Math.min(window.innerWidth - left - 2, rect.right - left)) + "px";
      guide.style.height = Math.max(0, Math.min(window.innerHeight - top - 2, rect.bottom - top)) + "px";
    }

    function commit(agent: number) {
      const task = tasks[agent];
      if (!task) return;
      task.stage = "commit";
      setState(task.target, task.intent);
      frames[agent].dataset.phase = "commit";
      task.timers.push(later(() => {
        task.target.owner = null;
        tasks[agent] = null;
        hideFrame(agent);
        schedule();
      }, atBuildSpeed(145)));
    }

    function assign(agent: number, target: BuildTarget) {
      const intent = target.desired;
      const rect = visibleRect(target.node);
      if (!targetIsVisible(rect)) {
        setState(target, intent);
        return;
      }
      const task: AgentTask = { target, intent, stage: "travel", timers: [] };
      tasks[agent] = task;
      target.owner = agent;
      const cursor = cursors[agent];
      const guide = frames[agent];
      const duration = atBuildSpeed(250 + (agent % 4) * 45);
      cursor.style.transition = "";
      cursor.style.setProperty("--travel-duration", duration + "ms");
      cursor.dataset.working = "true";
      cursor.dataset.parked = "false";
      cursor.dataset.intent = intent;
      guide.dataset.intent = intent;
      guide.dataset.kind = target.node.dataset.build ?? "part";
      const label = guide.querySelector<HTMLElement>("[data-selection-label]");
      if (label) label.textContent = targetName(target.node);
      const action = cursor.querySelector<HTMLElement>("[data-agent-action]");
      if (action) action.textContent = (intent === "built" ? "CREATING " : "REMOVING ") + targetName(target.node);
      if (intent === "built") target.node.dataset.agentState = "placing";
      position(agent, rect, false);
      task.timers.push(later(() => {
        task.stage = "select";
        cursor.style.transition = "none";
        position(agent, visibleRect(target.node), true);
        guide.dataset.active = "true";
        guide.dataset.phase = "draft";
        task.timers.push(later(() => commit(agent), atBuildSpeed(210)));
      }, duration));
    }

    function sync() {
      frame = 0;
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
          } else if (task?.stage !== "travel") {
            position(target.owner, rect, true);
          }
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
    // The reel begins with an empty canvas and a clustered swarm.
    if (boot) later(schedule, atBuildSpeed(420));
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
      for (const timer of timers) window.clearTimeout(timer);
      for (let index = 0; index < tasks.length; index++) cancel(index);
      for (const target of targets.values()) {
        if (target.node.dataset.build === "shell") target.node.inert = false;
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
          <i /><i /><i /><i />
        </span>
      ))}
      <div className={styles.hint}><span /> AGENTS BUILD THIS PAGE <b>↕ SCROLL</b></div>
    </div>
  );
}
