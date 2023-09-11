#!/bin/bash
# TODO: fix that this kills any uncommited changes
git checkout --orphan gh-pages
npm run build
git --work-tree dist add --all
git --work-tree dist commit -m 'Deploy'
git push origin HEAD:gh-pages --force
rm -rf dist
git checkout -f main
git branch -D gh-pages