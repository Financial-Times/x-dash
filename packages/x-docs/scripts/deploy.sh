#!/bin/bash
# adapted from https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
set -e

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in travis_deploy_key.enc -out travis_deploy_key -d
chmod 600 travis_deploy_key
eval `ssh-agent -s`
ssh-add travis_deploy_key

# do the actual deploy
gh-pages -d public
