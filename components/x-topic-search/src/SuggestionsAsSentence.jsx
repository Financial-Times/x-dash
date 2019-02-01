import { h } from '@financial-times/x-engine';

export default ({ suggestions }) => {
	const suggestionsLength = suggestions.length;

	return (
		<span>
			{suggestions.map((suggestion, index) => (
				<span key={ suggestion.id }>
					{suggestionsLength > 1 && index === suggestionsLength - 1 && ' and '}
					<b>{suggestion.prefLabel}</b>
					{index < suggestionsLength - 2 && ', '}
				</span>)
			)}
		</span>
	);
};
