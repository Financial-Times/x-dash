# Release Guidelines

## Experimental features

Only stable, well tested components and packages may be present in the master or development branches. _Any publishable code in the master or development branches must have been tested in both The App and FT.com_. This is so we do not release unproven components with a stable version number.

To develop your component create a new feature branch including your module name, for example if you are building a new tabs component you would create a branch named `feature-x-tabs`. Your component will stay in this branch until it is ready to be merged into the next major or minor release so you are encouraged to merge from or rebase onto the latest development or master branch regularly. You are welcome to raise pull requests against your feature branch if you need to.

Because experimental modules will not be included in any stable releases we allow them to be published separately using a pre-1.0.0 version number. You are free to make as many prereleases as you need. To create a prerelease of your experimental module you must create a tag in the format `module-name-v0.x.x`, for example to release the tabs component you would create tag named `x-tabs-v0.0.1` for the latest commit in the `feature-x-tabs` branch.

You are encouraged to use an identifier to namespace your prereleases, e.g. `x-tags-v0.0.1-beta.1`, as this will also prevent Renovate from automatically creating a PR for updating applications using an earlier version of your component (this would be undesirable if your new component version contained breaking changes which cannot be expressed with semver). 

When your new module is considered stable raise a pull request against the current development branch. Your module will be released as part of the next major or minor version.


## Releasing/Versioning

All of our projects are versioned using [Semantic Versioning], you should familiarise yourself with this. The following guide will outline how to tag and release a new version of all projects, it assumes that all the code you wish to release is now on the `master` or main branch.

  1. **Review the commits since the last release**. You can find the last release in the git log, or by using the compare feature on GitHub. Make sure you've pulled all of the latest changes.

  2. **Decide on a version**. Work out whether this release is major, minor, or patch level. Major releases are generally planned out; if a breaking change has snuck into `master` without prior-planning it may be worth removing it or attempting to make it backwards-compatible.

  3. **Write the changelog**. This project has a `changelog.md` file in the root. You should create a new section at the top with the new version number and the date, then outline all of the changes as a list. Follow the style of the rest of the document.

  4. **Update any package files**. Add the new version to package files. This could include `package.json` or `bower.json` as examples. A quick way to check if you've got them all is by running: `git grep "current-version-number"`

  5. **Commit your changes**. Commit the changes to changelong, README, and package files. The commit message should be "Version x.x.x" (exact casing, and with no "v" preceeding the version number). This is the _only_ time you're allowed to commit directly to `master`.

  6. **Add a release**. Create a release using the GitHub UI (note there should be a "v" preceeding the version number). This will automatically kick off a new build and publish each package.

  7. **Celebrate**. :tada::beer::cake::cocktail:

[semantic versioning]: http://semver.org/
