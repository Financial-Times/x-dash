#!/bin/bash

# Exit if any subcommand fails.
set -e

git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_NAME

DEPLOY_DIR="tools/x-docs/public/*"
DEPLOY_BRANCH="matth/gh-pages"
GITHUB_REPOSITORY="https://github.com/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}.git"

echo "Fetching github.com/Financial-Times/${CIRCLE_PROJECT_REPONAME}/${DEPLOY_BRANCH}"
git clone $GITHUB_REPOSITORY tmp --single-branch --branch $DEPLOY_BRANCH

cd tmp
git rm -r --quiet .
cd ..

echo "Copying ${DEPLOY_DIR} to tmp/"
cp -r $DEPLOY_DIR tmp
cd tmp

git add -A
git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}" --allow-empty

echo "Pushing to ${DEPLOY_BRANCH}"
git push --quiet origin $DEPLOY_BRANCH
