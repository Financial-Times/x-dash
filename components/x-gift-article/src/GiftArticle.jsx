import { h } from '@financial-times/x-engine';
import Title from './Title';
import { Form } from './Form';

const GiftArticle = (data) => {

	return (
		<form name="gift-form" className="gift-form">
			<Title title={ data.title }/>
			<fieldset className="gift-form__group">
				<Form {...data}/>
			</fieldset>
		</form>
	);
}

export {
	GiftArticle
};
