# Contribution

So you'd like to contribute some code, report a bug, or request a feature? You're in the right place! This guide covers the basics of starting to contribute to `x-dash`.

  - [Reporting Bugs](#reporting-bugs)
  - [Requesting Features](#requesting-features)
  - [Opening a Pull Request](#opening-a-pull-request)
  - [Code Style](#code-style)
  - [Testing](#testing)
  - [Releasing/Versioning](#releasingversioning)


## Reporting bugs

We like it when people report bugs and would definitely rather _know_ about them than be left in the dark. We use GitHub issues for bug tracking. When filing a bug report, there are some guidelines you can follow which will help us quickly resolve your issue:

  - ### Check if the bug has already been reported
    You can do this by searching the repository. This gives us more time to focus on existing bugs, and it might help you find a solution more quickly.

  - ### Make sure your software is up to date
    It may be that your bug has already been fixed in a newer version.

  - ### Provide steps to reproduce
    Your bug will generally get fixed much more quickly if you provide clear steps to reproduce the problem. This should include the version numbers of any relevant software.

  - ### Write a failing test or example
    This is not _required_ to file a bug report, but we'll love you if you add one! Writing a failing [test](#testing) or example and opening a pull request will help us quickly locate the issue.

  - ### Open multiple bug reports
    If you have multiple different bugs, it's best to open each as a separate GitHub issue.


## Requesting features

When making a feature request, it's helpful for us if you follow these guidelines.

  - ### Check if the feature has already been requested
    You can do this by searching the repository. You may find that somebody has already asked for the feature you're thinking of! If this is the case then feel free to join in the comments.

  - ### Phrase as user needs
    If you phrase your feature request as a user need rather than a proposed solution, it opens up more potential for discussion and collaboration – _way_ more fun for everyone.

  - ### Consider big and small screens
    It's imperative that the components we build and maintain as a part of `x-dash` work well for both App users and FT.com users whether on their phone or desktop PC. Features which lack a suitable experience for the big or small screen are likely to not to be accepted.

  - ### Open multiple feature requests
    If you have multiple different requests, it's best to open each as a separate GitHub issue.

It's important to note that we can't accept _every_ feature request, we'll always discuss why if we're not going to accept them though.


## Opening a pull request

Please do! All of the code in `x-dash` is peer-reviewed by members of The App and FT.com teams. Here are some things you can do to help this review go smoothly:

  - ### Discuss features first
    If you're thinking of opening a pull request that adds a feature, you'll save yourself some time and effort if you [discuss it in a feature request first](#requesting-features). The review is guaranteed to go more smoothly if we've chatted about it beforehand.

  - ### Update the documentation
    The user documentation should be kept up to date with any changes made. Use inline code comments as developer documentation, focusing more on _why_ your code does something than _what_ it's doing.

  - ### Update affected stories and snapshots
    When adding new variations or configurations to an existing component these should be made visible by adding a new story for inclusion in the component demos. These demos also generate the snapshots used for [testing](#testing) and your build will fail if do not update these.

  - ### No hacks or temporary workarounds
    The stability of `x-dash` is vital for it to be successful. As well as maintaining quality it is important to consider that The App and FT.com have very different lifespans; a "quick hack" may remain installed on an App user's device for several weeks or even months. Need to hack? Keep it in your app!

  - ### Follow the code style
    We have a [code style](#code-style), and the pull request build will fail if this isn't followed. If the code style varies for a project already then it's best to follow the example set in that project. We're not mean, we just like consistency!

  - ### Reference other issues
    When fixing a bug, reference the original report; when adding a feature, link to the original feature request. It'll help us massively!


## Code style

The best way to ensure you stick to the `x-dash` code style is to make your work consistent with the code around it. We also provide a [Prettier] configuration to automatically format files, so don't let it get in the way of your flow – you can fix it afterwards!

[Prettier]: https://prettier.io/

### General style

  - Tabs for indentation (except in `package.json` and Markdown files)
  - 100 characters per line
  - Don't abbreviate names (`request` is better than `req`)

### JavaScript style

  - Use semicolons
  - Use `'`, not `"`
  - Use ES6 where available
  - Commas at the end of the line, not the start

### CSS/Sass style

  - Use [BEM]-style naming for classes
  - One selector per line
  - One property/value per line
  - Don't style IDs

[BEM]: http://getbem.com/naming/

### Markdown style

  - Add two empty lines above a `h2` (to break up sections)
  - Indent lists and quotes (by two spaces)
  - Use [reference-style] links as much as possible

[reference-style]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links


## Testing

We use [Jest] for testing `x-dash` components and packages. Most commonly this takes the form of snapshots generated from the stories associated with a component. We enforce code quality with [JSLint].

[Jest]: https://jestjs.io/
[JSLint]: https://github.com/reid/node-jslint


## Releasing/Versioning

This section is for contributors who have write access to repositories. Hi core contributors :wave:

All of our projects are versioned using [Semantic Versioning], you should familiarise yourself with this. The following guide will outline how to tag and release a new version of all projects, it assumes that all the code you wish to release is now on the `master` or main branch.

  1. **Review the commits since the last release**. You can find the last release in the git log, or by using the compare feature on GitHub. Make sure you've pulled all of the latest changes.

  2. **Decide on a version**. Work out whether this release is major, minor, or patch level. Major releases are generally planned out; if a breaking change has snuck into `master` without prior-planning it may be worth removing it or attempting to make it backwards-compatible.

  3. **Write the changelog**. This project has a `changelog.md` file in the root. You should create a new section at the top with the new version number and the date, then outline all of the changes as a list. Follow the style of the rest of the document.

  4. **Update any package files**. Add the new version to package files. This could include `package.json` or `bower.json` as examples. A quick way to check if you've got them all is by running: `git grep "current-version-number"`

  5. **Commit your changes**. Commit the changes to changelong, README, and package files. The commit message should be "Version x.x.x" (exact casing, and with no "v" preceeding the version number). This is the _only_ time you're allowed to commit directly to `master`.

  6. **Add a release**. Create a release using the GitHub UI (note there should be a "v" preceeding the version number). This will automatically kick off a new build and publish each package.

  7. **Celebrate**. :tada::beer::cake::cocktail:

[semantic versioning]: http://semver.org/
