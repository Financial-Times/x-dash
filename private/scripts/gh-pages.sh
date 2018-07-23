git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_NAME

DEPLOY_DIR="tools/x-docs/public/*"
DEPLOY_BRANCH="matth/gh-pages"

git clone $CIRCLE_REPOSITORY_URL tmp

cd tmp
git checkout --orphan $DEPLOY_BRANCH
cd ..

cp -r $DEPLOY_DIR tmp

cd tmp

git add -A
git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}" --allow-empty

git push -q https://${GITHUB_TOKEN}@github.com/Financial-Times/${CIRCLE_PROJECT_REPONAME}.git $DEPLOY_BRANCH
