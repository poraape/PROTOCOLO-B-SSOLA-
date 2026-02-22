#!/usr/bin/env bash
set -euo pipefail

# Resolve unmerged binary conflicts by keeping local branch versions (--ours).
# Safe for work branch workflows where local refactor must be preserved.

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Not inside a git repository" >&2
  exit 1
fi

current_branch="$(git branch --show-current)"
echo "Branch: ${current_branch}"

echo "Checking unmerged paths..."
mapfile -t unmerged < <(git diff --name-only --diff-filter=U)

if [ "${#unmerged[@]}" -eq 0 ]; then
  echo "No unmerged paths found. Nothing to do."
  exit 0
fi

resolved=0
skipped=0

for path in "${unmerged[@]}"; do
  # Determine if path is treated as binary by attributes.
  attrs="$(git check-attr binary -- "$path" | awk -F': ' '{print $3}')"

  if [[ "$attrs" == "set" ]]; then
    echo "Resolving binary conflict with --ours: $path"
    git checkout --ours -- "$path" || true
    # if file was deleted on ours side, ensure stage reflects deletion
    if [ -e "$path" ]; then
      git add -- "$path"
    else
      git rm --cached --ignore-unmatch -- "$path" >/dev/null 2>&1 || true
    fi
    resolved=$((resolved+1))
  else
    echo "Skipping non-binary conflict: $path"
    skipped=$((skipped+1))
  fi
done

echo "Resolved binary conflicts: $resolved"
echo "Skipped non-binary conflicts: $skipped"

echo "Current status:"
git status --short
