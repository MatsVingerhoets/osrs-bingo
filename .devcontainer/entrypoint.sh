#!/bin/sh

if [ ! -f /osrs-bingo/package.json ]; then
  echo "📦 Copying initial project into volume..."
  cp -r /osrs-bingo-init/. /osrs-bingo
fi

exec "$@"
