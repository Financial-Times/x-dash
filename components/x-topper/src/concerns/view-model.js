class View {
	constructor() {
		this.model = {
			// TODO: Put the properties at the root level
			wrapper: {
				mods: {
					basic: false,
					opinion: false,
					centered: false,
					colorPaper: false,
					hasHeadshot: false,
					splitTextLeft: false,
					splitTextCenter: false,
					fullBleedOffset: false,
					fullBleedImageLeft: false,
				}
			},
			tags: {
				show: false,
				entries: []
			},
			headline: {
				show: false,
				mods: {
					large: false
				},
				text: ''
			},
			standfirst: {
				show: false,
				text: ''
			},
			columnist: {
				show: false,
				name: '',
				url: ''
			},
			headshot: {
				show: false,
				image: {
					alt: '',
					url: ''
				}
			},
			background: {
				show: false
			},
			visual: {
				show: false,
				image: {
					alt: '',
					src: ''
				},
				imageSources: [],
				credit: {
					show: false,
					text: ''
				}
			}
		}
	}
}

export function createViewModel(props) {
	const view = new View()
	modifyModel(view.model, props, props.modifiers)
	return view.model
}

function modifyModel(model, props, modifiers) {
	for(let modifier of modifiers) {
		modifier(model, props)
	}
}
