import h from '@financial-times/x-engine';

const Input = ({
	type,
	name,
	value,
	...props
}) => (
	<input
		value={value}
		type={type}
		name={name}
		{...props} />
);

export default Input;
