import React, {Component} from 'react';
import styles from './search.module.scss';
import { ItemList, Item} from '../sidebar';
import {Index} from 'elasticlunr';

const Highlight = ({query, text}) => {
	const index = text.search(new RegExp(`(\\b|^)${query}`), 'i');
	if(index < 0) return null;

	const before = text.slice(index >= 20 ? index - 20 : 0, index);
	const after = text.slice(index + query.length, index + query.length + 20);

	return <span className={styles.highlight}>
		{before}
		<strong>{query}</strong>
		{after}
	</span>;
}

const Results = ({results, query, onClickResult}) => <ItemList className={styles.results}>
	{results.length
		? results.map(
			(result) => <Item
				className={styles.result}
				key={result.id}
				title={result.title}
				href={result.href}
				onClick={onClickResult}
				supplementary={
					<Highlight query={query} text={result.plainText} />
				}
			/>
		)
		: <Item className={styles.result} >No results</Item>
	}
</ItemList>;

export default class Search extends Component {
	constructor (props) {
		super(props);

		this.state = {
			query: '',
			results: [],
		};

		this.search = this.search.bind(this);
	}

	render() {
		return <div>
			<input
				className={styles.search}
				type='search'
				placeholder='Search...'
				value={this.state.query}
				onChange={this.search}
			/>

			{this.state.query &&
				<Results
					onClickResult={() => this.setState({query: ''})}
					results={this.state.results}
					query={this.state.query}
				/>
			}
		</div>;
	}

	search (ev) {
		const query = ev.target.value;
		this.index = this.index || Index.load(this.props.index);
		this.setState({
			query,
			results: this.index.search(query, {
				fields: {
					title: {boost: 2},
					plainText: {boost: 1}
				},
				expand: true
			}).map(
				({ref}) => this.index.documentStore.getDoc(ref)
			),
		});
	}
}
