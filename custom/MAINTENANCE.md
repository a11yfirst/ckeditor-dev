# Maintenance of A11yFirst

## Overview

This document outlines the procedures needed for incorporating changes made
to the CKEditor 4 development repository, located at
[https://github.com/ckeditor/ckeditor4](https://github.com/ckeditor/ckeditor4),
into the A11yFirst plugins development repository.

In particular, we want to first merge all commits made to the `major` branch
in the upstream repository into our development repository's `master` branch,
and then from our `master` branch into our `a11yfirst-master` branch.

Once the upstream commits have been merged into `a11yfirst-master`, we then
need to test all of our plugins to ensure that none of the changes/commits
have had any undesirable effects on our code.

While there may be various reasons for creating maintenance releases of
A11yFirst, they are especially important when security updates are made to
CKEditor 4.

## Procedure

1. Make sure the `plugins-dev` working copy is up to date:

   `git pull`

### Merge `upstream/major` branch changes into `plugins-dev/master`

1. Add a remote, by convention named `upstream`, that references the CKEditor
   repository whose changes we want to incorporate:

   `git remote add upstream https://github.com/ckeditor/ckeditor4`

1. Fetch the branches and their respective commits from the upstream repo:

   `git fetch upstream`

1. Checkout the `plugins-dev` repository's local master branch:

   `git checkout master`

1. Merge the changes from `upstream/major` and push to `origin`:

   `git merge upstream/major`

   `git push origin master`

1. Remove the `upstream` remote reference from `plugins-dev`:

   `git remote rm upstream`

### Merge updated `master` branch into `a11yfirst-master` and test

1. Merge the changes now in the `master` branch into `a11yfirst-master`:

   `git checkout a11yfirst-master`

   `git merge master`

1. Test the functionality of the A11yFirst plugins.

1. If everything is working in all plugins, push the merged changes in the
   `a11yfirst-master` branch to the `plugins-dev` repository's `origin`:

   `git push # assumes a11yfirst-master is current branch`

1. Follow the instructions in the `DISTRIBUTION.md` document to create a new
   distribution version of A11yFirst using CKBuilder. Note that CKBuilder will
   create a downloadable distribution based on the latest major version, which
   should correspond to the upstream `major` branch.

