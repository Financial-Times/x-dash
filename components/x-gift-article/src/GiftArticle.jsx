import { h } from '@financial-times/x-engine';
import Title from './Title';
import { Form } from './Form';

const GiftArticle = (data) => {

	return (
		<form name="gift-form" className="gift-form">
			<fieldset className="o-forms">
				<Title title={ data.title }/>
				<Form {...data}/>
			</fieldset>
		</form>
	);
}

export {
	GiftArticle
};
