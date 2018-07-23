#!/bin/bash

# Exit if any subcommand fails.
set -e

git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_NAME

DEPLOY_DIR="tools/x-docs/public/*"
DEPLOY_BRANCH="matth/gh-pages"

# Clone only the branch we need so we don't download unnecessary history
git clone $CIRCLE_REPOSITORY_URL tmp --single-branch --branch $DEPLOY_BRANCH

# Clean out all the files, -q prevents Git logging every filename
cd tmp
git rm -rq .
cd ..

# Copy all of the website files into the directory
cp -r $DEPLOY_DIR tmp
cd tmp

# Stage and commit all of the files, silence the list output by sending it to /dev/null
git add -A &> /dev/null
git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}" --allow-empty

# Push to the branch and stay quiet unless something goes wrong
git push -q origin $DEPLOY_BRANCH
