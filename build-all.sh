#!/usr/bin/env bash

echo "Building Project"

npm --prefix ./vendors run build
npm --prefix ./reactor run build
npm --prefix ./cores/build run build -- --env.id=orchestrator
npm --prefix ./cores/build run build -- --env.id=core-redux
npm --prefix ./cores/build run build -- --env.id=core-1

echo "Project Built"