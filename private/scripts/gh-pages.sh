git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_NAME

DEPLOY_DIR="tools/x-docs/public/*"
DEPLOY_BRANCH="matth/gh-pages"

GITHUB_REPOSITORY="https://${GITHUB_TOKEN}@github.com/Financial-Times/${CIRCLE_PROJECT_REPONAME}.git"

git clone $GITHUB_REPOSITORY tmp --depth=0

cd tmp
git checkout --orphan $DEPLOY_BRANCH
cd ..

cp -r $DEPLOY_DIR tmp

cd tmp

git add -A
git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}"

git push -q $GITHUB_REPOSITORY $DEPLOY_BRANCH
