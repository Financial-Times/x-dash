const getComponentName = Component =>
	Component.displayName
	|| Component.name
	|| 'Unknown';

export default getComponentName;
