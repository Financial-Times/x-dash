---
title: State & Interactivity
---

Currently, x-dash components must be stateless. There is no way for an x-dash component to respond to an event or other activity such as a network fetch.

You can manually add your own event listeners to DOM nodes created by an x-dash component, but there is no way of managing the lifecycle of these or cleaning them up.

We're actively investigating ways to build x-dash components that change their state in response to events, and we'd like to hear your use cases.
