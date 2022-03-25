import { h } from '@financial-times/x-engine'
import { ArticleSaveButton } from '@financial-times/x-article-save-button'
import { Teaser, presets } from '@financial-times/x-teaser'

const TeaserList = ({ items = [], showSaveButtons = true, csrfToken = null }) => (
	<ul className="x-teaser-list">
		{items.map((item) => {
			return (
				<li key={item.id} className="x-teaser-list-item">
					<div className="x-teaser-list-item__article">
						<Teaser {...item} {...presets.Small} theme="teaser-list" />
					</div>
					{showSaveButtons && (
						<div className="x-teaser-list-item__actions">
							<ArticleSaveButton
								id={`${item.id}-save-button`}
								contentId={item.id}
								contentTitle={item.title}
								csrfToken={csrfToken}
								saved={item.saved || false}
							/>
						</div>
					)}
				</li>
			)
		})}
	</ul>
)

export { TeaserList }
