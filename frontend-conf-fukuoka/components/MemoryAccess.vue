<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";

const props = withDefaults(
  defineProps<{
    mode?: "hc" | "dict";
    caption?: boolean;
    step?: number;
    maxHeight?: string;
  }>(),
  { mode: "hc", caption: true, maxHeight: "300px" },
);

type Mark = "hit" | "miss";
interface Step {
  text: string;
  marks: [string, Mark][];
  loads: number;
  bucket?: boolean;
}

const STEPS: Record<"hc" | "dict", Step[]> = {
  hc: [
    {
      text: "a.x を読む。ICには「前回のMap」と「x は a+24」が記録済み",
      marks: [],
      loads: 0,
    },
    {
      text: "① a+0 の Map を読み、ICの Map と比較 → 一致して形が確定",
      marks: [["o0", "hit"]],
      loads: 1,
    },
    {
      text: "② a+24 を直接読む → x = 1。同じオブジェクト内の2か所を読むだけ",
      marks: [["o3", "hit"]],
      loads: 2,
    },
  ],
  dict: [
    {
      text: "a.x を読む。辞書モードなので x と y は本体にない",
      marks: [],
      loads: 0,
    },
    {
      text: "① a+0 の Map を読む → 辞書モードと判明。オフセットは不明",
      marks: [["o0", "hit"]],
      loads: 1,
    },
    {
      text: "② a+8 の properties を読む → 別領域のハッシュテーブルへ",
      marks: [["o1", "hit"]],
      loads: 2,
    },
    {
      text: '③ "x" のハッシュ値を読み、バケット1を計算',
      marks: [],
      loads: 3,
      bucket: true,
    },
    {
      text: '④ バケット1のキーを読む → "y" で不一致（衝突）',
      marks: [["k1", "miss"]],
      loads: 4,
    },
    {
      text: '⑤ バケット2のキーを読む → "x" で一致',
      marks: [["k2", "hit"]],
      loads: 5,
    },
    {
      text: "⑥ バケット2の値を読む → x = 1。依存した読み込みの連鎖",
      marks: [["v2", "hit"]],
      loads: 6,
    },
  ],
};

const { $clicks } = useSlideContext();

const steps = computed(() => STEPS[props.mode]);
const clicks = computed(() => props.step ?? $clicks?.value ?? 0);
const index = computed(() =>
  Math.min(Math.max(clicks.value, 0), steps.value.length - 1),
);
const step = computed(() => steps.value[index.value]);
const isDict = computed(() => props.mode === "dict");
const viewBox = computed(() => (isDict.value ? "0 0 630 310" : "0 0 630 106"));

function cls(id: string): string {
  const current = step.value.marks.find(([m]) => m === id);
  if (current) return current[1];
  for (let j = 1; j < index.value; j++) {
    const past = steps.value[j].marks.find(([m]) => m === id);
    if (past) return past[1] === "miss" ? "miss" : "done";
  }
  return "";
}

const objectCells = [
  { id: "o0", x: 40, off: "a+0", label: "Map" },
  { id: "o1", x: 150, off: "a+8", label: "properties" },
  { id: "o2", x: 260, off: "a+16", label: "elements" },
  { id: "o3", x: 370, off: "a+24", label: "x = 1" },
  { id: "o4", x: 480, off: "a+32", label: "y = 2" },
];

const buckets = [
  { n: 0, x: 40, key: "空", value: "" },
  { n: 1, x: 170, key: 'キー "y"', value: "値 2" },
  { n: 2, x: 300, key: 'キー "x"', value: "値 1" },
  { n: 3, x: 430, key: "空", value: "" },
];
</script>

<template>
  <div class="memory-access">
    <!-- スライドにクリック数を登録するための不可視マーカー -->
    <span
      v-for="n in steps.length - 1"
      :key="n"
      v-click="n"
      class="click-marker"
    />
    <svg
      :viewBox="viewBox"
      :style="{ maxHeight }"
      role="img"
      :aria-label="
        isDict
          ? '辞書モードでのメモリアクセス'
          : 'Hidden Class方式でのメモリアクセス'
      "
    >
      <defs>
        <marker
          id="ma-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="context-stroke"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </marker>
      </defs>

      <g v-for="c in objectCells" :key="c.id">
        <text class="sub" :x="c.x + 55" y="30" text-anchor="middle">
          {{ c.off }}
        </text>
        <rect
          class="cell"
          :class="cls(c.id)"
          :x="c.x"
          y="40"
          width="110"
          height="46"
          rx="4"
        />
        <text
          class="label"
          :x="c.x + 55"
          y="63"
          text-anchor="middle"
          dominant-baseline="central"
        >
          {{
            isDict && (c.id === "o3" || c.id === "o4") ? "（なし）" : c.label
          }}
        </text>
      </g>

      <g v-if="isDict">
        <path
          d="M 205 88 L 205 166"
          class="arrow"
          marker-end="url(#ma-arrow)"
        />
        <g v-for="b in buckets" :key="b.n">
          <rect
            class="cell"
            :class="cls(`k${b.n}`)"
            :x="b.x"
            y="170"
            width="130"
            height="36"
            rx="4"
          />
          <text
            class="label"
            :x="b.x + 65"
            y="188"
            text-anchor="middle"
            dominant-baseline="central"
          >
            {{ b.key }}
          </text>
          <rect
            class="cell"
            :class="cls(`v${b.n}`)"
            :x="b.x"
            y="206"
            width="130"
            height="36"
            rx="4"
          />
          <text
            class="label"
            :x="b.x + 65"
            y="224"
            text-anchor="middle"
            dominant-baseline="central"
          >
            {{ b.value }}
          </text>
          <text
            class="sub"
            :class="{ accent: b.n === 1 && step.bucket }"
            :x="b.x + 65"
            y="262"
            text-anchor="middle"
          >
            バケット{{ b.n }}
          </text>
        </g>
        <text class="sub" x="40" y="292">
          properties が指す別領域のハッシュテーブル
        </text>
      </g>
    </svg>

    <div v-if="caption" class="caption">
      <span>{{ step.text }}</span>
      <span class="count">読み込み {{ step.loads }} 回</span>
    </div>
  </div>
</template>

<style scoped>
.memory-access {
  --ma-bg: #f5f4ef;
  --ma-cell: #ffffff;
  --ma-border: #b4b2a9;
  --ma-text: #2c2c2a;
  --ma-sub: #5f5e5a;
  --ma-hit-bg: #e6f1fb;
  --ma-hit: #185fa5;
  --ma-miss-bg: #fcebeb;
  --ma-miss: #a32d2d;
  width: 100%;
}

:global(html.dark) .memory-access {
  --ma-bg: #2c2c2a;
  --ma-cell: #444441;
  --ma-border: #888780;
  --ma-text: #f1efe8;
  --ma-sub: #d3d1c7;
  --ma-hit-bg: #0c447c;
  --ma-hit: #85b7eb;
  --ma-miss-bg: #791f1f;
  --ma-miss: #f09595;
}

.click-marker {
  display: none;
}

svg {
  display: block;
  width: 100%;
  height: auto;
  background: var(--ma-bg);
  border-radius: 12px;
}

.cell {
  fill: var(--ma-cell);
  stroke: var(--ma-border);
  stroke-width: 1;
  transition:
    fill 0.2s,
    stroke 0.2s;
}
.cell.hit {
  fill: var(--ma-hit-bg);
  stroke: var(--ma-hit);
  stroke-width: 2;
}
.cell.miss {
  fill: var(--ma-miss-bg);
  stroke: var(--ma-miss);
  stroke-width: 2;
}
.cell.done {
  stroke: var(--ma-hit);
  stroke-width: 1.5;
}

.label {
  fill: var(--ma-text);
  font-size: 14px;
}
.sub {
  fill: var(--ma-sub);
  font-size: 12px;
}
.sub.accent {
  fill: var(--ma-hit);
  font-weight: 600;
}

.arrow {
  fill: none;
  stroke: var(--ma-sub);
  stroke-width: 1.5;
}

.caption {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--ma-bg);
  color: var(--ma-text);
  font-size: 0.9em;
}
.count {
  flex-shrink: 0;
  color: var(--ma-sub);
}
</style>
