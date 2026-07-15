#!/usr/bin/env bash

set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required for CI-compatible visual baselines." >&2
  echo "Without Docker, run the 'Generate Linux visual baselines' GitHub Actions workflow." >&2
  exit 127
fi

readonly image="mcr.microsoft.com/playwright:v1.61.1-noble"
readonly user_id="$(id -u)"
readonly group_id="$(id -g)"

docker run --rm --init --ipc=host \
  --user "${user_id}:${group_id}" \
  --env HOME=/tmp/home \
  --volume "${PWD}:/work" \
  --tmpfs "/work/node_modules:rw,uid=${user_id},gid=${group_id},mode=0755" \
  --workdir /work \
  "${image}" \
  bash -lc 'mkdir -p "$HOME" && corepack pnpm install --frozen-lockfile && corepack pnpm test:visual:update'
