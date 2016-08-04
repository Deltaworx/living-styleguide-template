# Living styleguide template

A living styleguide template, produced with Metalsmith.

## Instructions

### Setup - from scratch

```sh
# clone the repo
git clone https://github.com/Deltaworx/living-styleguide-template.git

cd living-styleguide-template

# rename origin
git remote rename origin updates
git fetch updates

# add your origin
git remote add origin ...
```

### If you already have a repo

```sh
git remote add updates https://github.com/Deltaworx/living-styleguide-template.git
```

### Update

```
# if you want to merge the changes
git checkout -b updates-master updates/master
git pull
git checkout -b my_branch

```
