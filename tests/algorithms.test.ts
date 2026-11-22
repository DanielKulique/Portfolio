/** Independent BFS oracle and path invariants guard against plausible-looking but incorrect A* visualizations. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findPath } from '../src/lib/algorithms/astar.ts';
function bfs(grid: boolean[][]) {
  const queue = [{ x: 0, y: 0, d: 0 }],
    seen = new Set(['0,0']);
  for (let i = 0; i < queue.length; i++) {
    const p = queue[i]!;
    if (p.x === 2 && p.y === 2) return p.d;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const x = p.x + dx!,
        y = p.y + dy!,
        key = `${x},${y}`;
      if (x < 0 || y < 0 || x > 2 || y > 2 || grid[y]![x] || seen.has(key))
        continue;
      seen.add(key);
      queue.push({ x, y, d: p.d + 1 });
    }
  }
  return null;
}
test('matches BFS across all 128 obstacle layouts with fixed free endpoints', () => {
  for (let bits = 0; bits < 128; bits++) {
    let bit = 0;
    const grid = Array.from({ length: 3 }, (_, y) =>
      Array.from({ length: 3 }, (_, x) =>
        (x === 0 && y === 0) || (x === 2 && y === 2)
          ? false
          : Boolean(bits & (1 << bit++)),
      ),
    );
    const result = findPath(grid, { x: 0, y: 0 }, { x: 2, y: 2 });
    assert.equal(result.cost, bfs(grid));
    assert.equal(
      new Set(result.visited.map((p) => `${p.x},${p.y}`)).size,
      result.visited.length,
    );
    if (result.cost !== null) {
      assert.equal(result.path.length, result.cost + 1);
      result.path.forEach((p, index) => {
        assert.equal(grid[p.y]![p.x], false);
        if (index) {
          const prev = result.path[index - 1]!;
          assert.equal(Math.abs(p.x - prev.x) + Math.abs(p.y - prev.y), 1);
        }
      });
    }
  }
});
test('handles identical endpoints and unreachable goals honestly', () => {
  assert.equal(findPath([[false]], { x: 0, y: 0 }, { x: 0, y: 0 }).cost, 0);
  assert.equal(
    findPath([[false, true, false]], { x: 0, y: 0 }, { x: 2, y: 0 }).cost,
    null,
  );
});
test('rejects malformed, oversized or blocked inputs', () => {
  for (const args of [
    [[], { x: 0, y: 0 }, { x: 0, y: 0 }],
    [[[false], [false, false]], { x: 0, y: 0 }, { x: 0, y: 0 }],
    [[[true]], { x: 0, y: 0 }, { x: 0, y: 0 }],
    [[[false]], { x: -1, y: 0 }, { x: 0, y: 0 }],
    [[[false]], { x: 0.5, y: 0 }, { x: 0, y: 0 }],
  ] as const) {
    assert.throws(() => findPath(args[0], args[1], args[2]), RangeError);
  }
  assert.throws(
    () =>
      findPath(
        Array.from({ length: 101 }, () => Array(100).fill(false)),
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ),
    RangeError,
  );
});
test('has deterministic ties and never mutates the input', () => {
  const grid = Array.from({ length: 10 }, () => Array(12).fill(false));
  const before = JSON.stringify(grid);
  assert.deepEqual(
    findPath(grid, { x: 1, y: 1 }, { x: 10, y: 8 }),
    findPath(grid, { x: 1, y: 1 }, { x: 10, y: 8 }),
  );
  assert.equal(JSON.stringify(grid), before);
});
