import { h } from '@financial-times/x-engine'
import styles from './AdvancedSharing.scss'

const titleClassNames = [styles.title].join(' ')

export default ({ userOrganisation }) => (
	<div className={titleClassNames} id="gift-article-title">
		{userOrganisation} has supergifting enabled
	</div>
)
