# What is x-dash?

x-dash is an experiment in building new shared frontend components for FT.com and the FT Apps. An alternative introduction for FT developers is also available in [Google Slides] (viewable by employees only.)

[Google Slides]: https://docs.google.com/presentation/d/1Z8mGsv4JU2TafNPIHw2RcejoNp7AN_v4LfCCGC7qrgw/edit?usp=sharing


## What are goals of this project?

The primary goal is to create a set of UI components that are shareable between The App and FT.com. We aim to provide the patterns and tools required for developers to create high quality components which are suitable for use across both products. We want to do this to provide a consistent experience for users who move between the two.


## Why is this so hard?

Making components for both The App and FT.com is a technical challenge because the two products have different tech stacks, different architectures, and a different history. This means we must find a new middleground without introducing compromises or new technolgies which might prevent teams from adopting it.

This project is also a tricky cultural challenge because the two products have different life-cycles -- the website ships many times a day, whereas an app may remain on a users phone for several months -- and not all existing components may have been originally conceived with both products in mind meaning we are unable to "lift and shift" them.


## What is different about x-dash?

With x-dash we have introduced a [monorepo] project structure, new [contribution guidelines], and a new [release process]. These have all been carefully considered to help ensure that x-dash components can be responsibly and reliably shipped to both products.


[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[contribution guidelines]: https://github.com/Financial-Times/x-dash/blob/master/contribution.md
[release process]: https://github.com/Financial-Times/x-dash/blob/master/release-guidelines.md


## Is this React?

All x-dash components are compatible with React and a variety of other runtimes.
