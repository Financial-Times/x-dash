import { h } from '@financial-times/x-engine';
import { ArticleSaveButton } from '@financial-times/x-article-save-button/src/ArticleSaveButton';
import c from 'classnames';
import { DataProvider } from '../../DataProvider';
import Heading from '../Heading';

import styles from './styles.scss';

const Body = ({ hasStandfirst = false, className, ...teaserData }) => {
	const { onSaveSubmit, csrfToken, isSaved, displaySaveButton } = teaserData;

	return (
		<DataProvider
			components={['Container', 'Standfirst', 'Timestamp']}
			render={([Container, Standfirst, Timestamp]) => (
				<Container className={c(className, styles.container)}>
					<div className={styles.topContent}>
						<Heading {...teaserData} />
						{hasStandfirst && <Standfirst className={styles.standfirst} />}
					</div>

					<div className={styles.footer}>
						<Timestamp className={styles.timestamp} />

						{displaySaveButton && (
							<ArticleSaveButton
								className={styles.saveButton}
								id={`${teaserData.id}-save-button`}
								contentId={teaserData.id}
								contentTitle={teaserData.title}
								csrfToken={csrfToken}
								isSaved={isSaved || false}
								onSubmit={detail => onSaveSubmit && onSaveSubmit(detail)}
							/>
						)}
					</div>
				</Container>
			)}
			{...teaserData}
		/>
	);
};

export default Body;
