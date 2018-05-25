# Styling

Currently, there's no officially-supported way of providing styling for components. To begin with, all our components that require styling are built to be compatible with Origami styles, and the recommended way of using these is by including the CSS from the [Origami Build Service](https://www.ft.com/__origami/service/build/v2/) and referencing the classes in your markup.

For styles specific to a single x-dash component, we suggest writing a CSS file and including it in the package, then importing it into your app however you normally include styles (e.g. using a SCSS `@import`).

We're actively investigating better-integrated ways of including styling with components.
