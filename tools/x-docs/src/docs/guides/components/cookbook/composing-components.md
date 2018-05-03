# Composing components

Some components have slots that allow consumers to add extra elements in certain places. These can be other components or strings of HTML. One example of this is the [Teaser component's "actions" slot](https://github.com/financial-times/x-dash/tree/master/components/x-teaser/src/CustomSlot.jsx), which is typically used for a topic follow button.

## Using a component's custom slot

In the component's documentation will be a list of its properties and what it expects. In the Teaser component's case, its property `customSlot` will be rendered in an `o-teaser__action` element. This can be a JSX element or an HTML string.

For example, using JSX:

```jsx
<Teaser customSlot={
	<button>Follow</button>
} />;
```

Or, using an HTML string:

```js
Teaser({
	customSlot: '<button>Follow</button>',
});
```

## Writing a component with a custom slot

_To be fully documented._
