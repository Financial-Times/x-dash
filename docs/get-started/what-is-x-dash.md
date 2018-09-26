# What is x-dash?

This project is an experiment in building new shared UI components for FT.com and the FT App. An alternative introduction for FT developers is also available in [Google Slides] (viewable by employees only.)

[Google Slides]: https://docs.google.com/presentation/d/1Z8mGsv4JU2TafNPIHw2RcejoNp7AN_v4LfCCGC7qrgw/edit?usp=sharing


## What are goals of this project?

The primary goal is to create a set of UI components that are shareable between The App and FT.com. We aim to provide the patterns and tools required for developers to create high quality code which is suitable for use across both products.

We want to do this to provide a consistent experience for our users who move between the two and act as an aid the technical evolution of both products.


## Why is this a challenge?

Making components for both The App and FT.com is a technical challenge because the two products have different tech stacks, different architectures, and a different history. This means we must find a new middleground without introducing compromises or new technologies which might prevent teams from adopting it.

This project is also a tricky cultural challenge because the two products have different life-cycles — the website ships many times a day, whereas an app may remain on a user's phone for several months — and not all existing components may have been originally conceived with both products in mind meaning we are unable to "lift and shift" them.

And finally, both are enormous projects. Pivoting is not easy and takes a lot of effort. As a [free market] we can only convince teams to adopt x-dash by providing a truly better alternative to their current tools.

[free market]: http://matt.chadburn.co.uk/notes/teams-as-services.html


## What is different about x-dash?

With x-dash we have introduced a [monorepo] project structure, new [contribution guidelines], and a new [release process]. These have all been carefully considered to help ensure that x-dash components can be responsibly and reliably shipped to both products.


[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[contribution guidelines]: https://github.com/Financial-Times/x-dash/blob/master/contribution.md
[release process]: https://github.com/Financial-Times/x-dash/blob/master/release-guidelines.md


## Does x-dash mean we can use React?

This project does not require the use of any particular technology for your application. The aim of x-dash is to ensure all components are compatible with a variety of runtimes for both the server and the client-side, including [React].

By ensuring compatibility with React it is possible to take advantage of the fantastic tooling made available by that community, including [Storybook] and [Enzyme]. In addition, adopting these tools means that we are able to position our technology programmes more closely to the prevailing sentiment of the development community and therefore potential employees.

[React]: https://reactjs.org/
[Storybook]: https://storybook.js.org/
[Enzyme]: https://github.com/airbnb/enzyme
