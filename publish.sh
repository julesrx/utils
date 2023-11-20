#/bin/bash

read -p "Are you sure? y/n" -n 1 -r
echo   
if [[ $REPLY =~ ^[Yy]$ ]]
then
    bump=$(npm version patch)
    echo "Bumped version to $bump"

    npm publish --access public
    git push
fi