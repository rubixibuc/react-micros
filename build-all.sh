#!/usr/bin/env bash

echo "Building Project"

npm --prefix ./vendors run build
npm --prefix ./reactor run build
npm --prefix ./cores/build run build -- --env.id=coreOrchestrator
npm --prefix ./cores/build run build -- --env.id=coreRedux
npm --prefix ./cores/build run build -- --env.id=core1

echo "Project Built"