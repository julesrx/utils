#/bin/bash

bump=$(npm version patch)
echo "Bumped version to $bump"

read -p "Are you sure? " -n 1 -r
echo   
if [[ $REPLY =~ ^[Yy]$ ]]
then
    npm publish --access public
fi