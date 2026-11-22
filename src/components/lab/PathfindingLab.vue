<script setup lang="ts">
/** Accessible grid editor and deterministic A* trace player; calculation is local and independent of the C++ runtime. */
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {
  findPath,
  type Cell,
  type SearchResult,
} from '../../lib/algorithms/astar';
import { labCopy } from '../../i18n/lab';
import type { Locale } from '../../i18n';
const { locale } = defineProps<{ locale: Locale }>();
const t = labCopy[locale];
const cols = 12,
  rows = 10;
const walls = ref(
  Array.from({ length: rows }, (_, y) =>
    Array.from(
      { length: cols },
      (_, x) => x === 5 && y > 1 && y < 8 && y !== 5,
    ),
  ),
);
const start = ref<Cell>({ x: 1, y: 1 }),
  goal = ref<Cell>({ x: 10, y: 8 });
const mode = ref<'wall' | 'start' | 'goal'>('wall');
const focused = ref(13);
const board = ref<HTMLElement>();
const result = ref<SearchResult | null>(null);
const progress = ref(0);
const elapsed = ref(0);
const speed = ref(60);
const playing = ref(false);
const reduced = ref(false);
const hydrated = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;
const same = (a: Cell, b: Cell) => a.x === b.x && a.y === b.y;
const done = computed(
  () => result.value !== null && progress.value >= result.value.visited.length,
);
const status = computed(() =>
  done.value
    ? result.value!.cost === null
      ? t.missing
      : t.found
    : playing.value
      ? t.playing
      : result.value
        ? t.paused
        : t.ready,
);
const visible = computed(
  () =>
    new Set(
      result.value?.visited
        .slice(0, progress.value)
        .map((p) => p.y * cols + p.x),
    ),
);
const path = computed(
  () =>
    new Set(done.value ? result.value?.path.map((p) => p.y * cols + p.x) : []),
);
function stop() {
  if (timer !== undefined) clearInterval(timer);
  timer = undefined;
  playing.value = false;
}
function reset() {
  stop();
  result.value = null;
  progress.value = 0;
  elapsed.value = 0;
}
function calculate() {
  const begin = performance.now();
  result.value = findPath(walls.value, start.value, goal.value);
  elapsed.value = performance.now() - begin;
  progress.value = 0;
}
function advance() {
  if (!result.value) calculate();
  progress.value = Math.min(progress.value + 1, result.value!.visited.length);
  if (done.value) stop();
}
function run() {
  if (playing.value) {
    stop();
    return;
  }
  if (!result.value || done.value) calculate();
  if (reduced.value) {
    progress.value = result.value!.visited.length;
    return;
  }
  playing.value = true;
  timer = setInterval(advance, speed.value);
}
function edit(x: number, y: number) {
  reset();
  const p = { x, y };
  if (mode.value === 'wall') {
    if (!same(p, start.value) && !same(p, goal.value))
      walls.value[y]![x] = !walls.value[y]![x];
  } else {
    if (same(p, mode.value === 'start' ? goal.value : start.value)) return;
    walls.value[y]![x] = false;
    if (mode.value === 'start') start.value = p;
    else goal.value = p;
  }
  focused.value = y * cols + x;
}
function state(x: number, y: number) {
  const p = { x, y };
  return same(p, start.value)
    ? 'start'
    : same(p, goal.value)
      ? 'goal'
      : walls.value[y]![x]
        ? 'wall'
        : path.value.has(y * cols + x)
          ? 'path'
          : visible.value.has(y * cols + x)
            ? 'visited'
            : 'free';
}
function keyboard(event: KeyboardEvent) {
  const offsets: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -cols,
    ArrowDown: cols,
    Home: -(focused.value % cols),
    End: cols - 1 - (focused.value % cols),
  };
  const offset = offsets[event.key];
  if (offset === undefined) return;
  event.preventDefault();
  focused.value = Math.max(
    0,
    Math.min(rows * cols - 1, focused.value + offset),
  );
  board.value
    ?.querySelector<HTMLButtonElement>(`[data-cell="${focused.value}"]`)
    ?.focus();
}
onMounted(() => {
  hydrated.value = true;
  reduced.value = matchMedia('(prefers-reduced-motion: reduce)').matches;
});
onUnmounted(stop);
</script>
<template>
  <div class="lab-experiment">
    <p id="grid-instructions">{{ t.instructions }}</p>
    <div class="lab-layout">
      <div class="lab-board">
        <div
          ref="board"
          role="grid"
          :aria-label="t.grid"
          aria-describedby="grid-instructions"
          :aria-rowcount="rows"
          :aria-colcount="cols"
          :aria-busy="!hydrated"
          class="path-grid"
          @keydown="keyboard"
        >
          <div v-for="(_row, y) in walls" :key="y" role="row" class="path-row">
            <button
              v-for="(_cell, x) in walls[y]"
              :key="x"
              role="gridcell"
              :disabled="!hydrated"
              :data-cell="y * cols + x"
              :tabindex="focused === y * cols + x ? 0 : -1"
              :class="['path-cell', state(x, y)]"
              :aria-label="`${t.row} ${y + 1}, ${t.column} ${x + 1}: ${t[state(x, y)]}`"
              @focus="focused = y * cols + x"
              @click="edit(x, y)"
            >
              <span v-if="state(x, y) === 'start'">{{ t.start[0] }}</span><span
                v-else-if="state(x, y) === 'goal'"
                >{{ t.goal[0] }}</span
              ><span v-else-if="state(x, y) === 'wall'" aria-hidden="true"
                >×</span
              ><span v-else-if="state(x, y) === 'path'" aria-hidden="true"
                >•</span
              >
            </button>
          </div>
        </div>
        <ul class="lab-legend">
          <li
            v-for="key in ['start', 'goal', 'wall', 'visited', 'path'] as const"
            :key="key"
          >
            <span :class="['legend-swatch', key]" aria-hidden="true"></span
            >{{ t[key] }}
          </li>
        </ul>
      </div>
      <div class="lab-controls">
        <fieldset :disabled="!hydrated">
          <legend>{{ t.edit }}</legend>
          <label v-for="key in ['wall', 'start', 'goal'] as const" :key="key"
            ><input
              v-model="mode"
              type="radio"
              name="edit-mode"
              :value="key"
            />{{ t[key] }}</label
          >
        </fieldset>
        <label for="lab-speed">{{ t.speed }}: {{ speed }}</label
        ><input
          id="lab-speed"
          v-model.number="speed"
          type="range"
          :disabled="!hydrated"
          min="10"
          max="300"
          step="10"
          @input="stop"
        />
        <div class="lab-actions">
          <button class="button primary" :disabled="!hydrated" @click="run">
            {{
              playing ? t.pause : result && !done ? t.resume : t.run
            }}</button><button
            class="button secondary"
            :disabled="!hydrated || playing || done"
            @click="advance"
          >
            {{ t.step }}</button
          ><button
            class="button secondary"
            :disabled="!hydrated"
            @click="reset"
          >
            {{ t.reset }}</button
          ><button
            class="button secondary"
            @click="
              reset();
              walls = walls.map((row) => row.map(() => false));
            "
          >
            {{ t.clear }}
          </button>
        </div>
        <p class="lab-status" role="status" aria-live="polite">{{ status }}</p>
        <dl class="lab-metrics">
          <div>
            <dt>{{ t.nodes }}</dt>
            <dd>{{ progress }}</dd>
          </div>
          <div>
            <dt>{{ t.cost }}</dt>
            <dd>{{ done ? (result?.cost ?? t.noPath) : '—' }}</dd>
          </div>
          <div>
            <dt>{{ t.duration }}</dt>
            <dd>{{ result ? `${elapsed.toFixed(2)} ms` : '—' }}</dd>
          </div>
        </dl>
        <p v-if="reduced" class="lab-note">{{ t.reduced }}</p>
      </div>
    </div>
    <p class="lab-note">{{ t.metricsNote }}</p>
  </div>
</template>
