/** Independent browser implementation: A*, orthogonal unit-cost grid, Manhattan heuristic and stable heap ties. */
export interface Cell {
  x: number;
  y: number;
}
export interface SearchResult {
  path: Cell[];
  visited: Cell[];
  cost: number | null;
}
interface Node {
  id: number;
  g: number;
  h: number;
}
class MinHeap {
  private values: Node[] = [];
  private before(a: Node, b: Node) {
    return (
      a.g + a.h < b.g + b.h ||
      (a.g + a.h === b.g + b.h && (a.h < b.h || (a.h === b.h && a.id < b.id)))
    );
  }
  get size() {
    return this.values.length;
  }
  push(node: Node) {
    const a = this.values;
    a.push(node);
    let i = a.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (!this.before(a[i]!, a[parent]!)) break;
      [a[i], a[parent]] = [a[parent]!, a[i]!];
      i = parent;
    }
  }
  pop() {
    const a = this.values;
    const first = a[0]!;
    const last = a.pop()!;
    if (a.length) {
      a[0] = last;
      let i = 0;
      while (true) {
        let next = i;
        for (const child of [i * 2 + 1, i * 2 + 2])
          if (child < a.length && this.before(a[child]!, a[next]!))
            next = child;
        if (next === i) break;
        [a[i], a[next]] = [a[next]!, a[i]!];
        i = next;
      }
    }
    return first;
  }
}
export function findPath(
  grid: readonly (readonly boolean[])[],
  start: Cell,
  goal: Cell,
): SearchResult {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  if (
    !height ||
    !width ||
    height * width > 10000 ||
    grid.some(
      (row) =>
        row.length !== width || row.some((value) => typeof value !== 'boolean'),
    )
  )
    throw new RangeError('Invalid grid');
  const valid = (p: Cell) =>
    Number.isInteger(p.x) &&
    Number.isInteger(p.y) &&
    p.x >= 0 &&
    p.y >= 0 &&
    p.x < width &&
    p.y < height;
  if (
    !valid(start) ||
    !valid(goal) ||
    grid[start.y]![start.x] ||
    grid[goal.y]![goal.x]
  )
    throw new RangeError('Invalid endpoints');
  const id = (p: Cell) => p.y * width + p.x;
  const cell = (i: number) => ({ x: i % width, y: Math.floor(i / width) });
  const origin = id(start),
    target = id(goal);
  const g = new Array<number>(width * height).fill(Infinity);
  const parent = new Map<number, number>();
  const closed = new Set<number>();
  const visited: Cell[] = [];
  const heap = new MinHeap();
  const heuristic = (p: Cell) =>
    Math.abs(p.x - goal.x) + Math.abs(p.y - goal.y);
  g[origin] = 0;
  heap.push({ id: origin, g: 0, h: heuristic(start) });
  while (heap.size) {
    const current = heap.pop();
    if (closed.has(current.id) || current.g !== g[current.id]) continue;
    closed.add(current.id);
    const p = cell(current.id);
    visited.push(p);
    if (current.id === target) {
      const path: Cell[] = [];
      let cursor: number | undefined = target;
      while (cursor !== undefined) {
        path.push(cell(cursor));
        cursor = parent.get(cursor);
      }
      return { path: path.reverse(), visited, cost: current.g };
    }
    for (const [dx, dy] of [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]) {
      const next = { x: p.x + dx!, y: p.y + dy! };
      if (!valid(next) || grid[next.y]![next.x]) continue;
      const key = id(next);
      if (closed.has(key) || current.g + 1 >= g[key]!) continue;
      g[key] = current.g + 1;
      parent.set(key, current.id);
      heap.push({ id: key, g: g[key]!, h: heuristic(next) });
    }
  }
  return { path: [], visited, cost: null };
}
