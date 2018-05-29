const registeredComponents = {};

export function registerComponent(component) {
	registeredComponents[component.wrappedDisplayName] = component;
};

export function getComponent(name) {
	return registeredComponents[name];
};
