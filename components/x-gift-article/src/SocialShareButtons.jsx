import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import { trimHighlights } from './lib/highlightsHelpers'

export const SocialShareButtons = ({
	actions,
	mailtoUrl,
	shareType,
	enterpriseEnabled,
	url,
	article,
	highlight,
	includeHighlights
}) => {
	const onClickHandler = (event) => {
		switch (shareType) {
			case ShareType.gift:
				actions.emailGiftUrl(event)
				break
			case ShareType.enterprise:
				actions.emailEnterpriseUrl(event)
				break
			case ShareType.nonGift:
				actions.emailNonGiftUrl(event)
				break
			default:
		}
	}

	const sharedText = includeHighlights ? `${article.title} - "${trimHighlights(highlight)}"` : article.title

	const mobileShareLinks = {
		facebook: `http://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(
			sharedText
		)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
			sharedText
		)}&via=financialtimes`,
		linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
			url
		)}&text='${sharedText}'`,
		whatsapp: `https://wa.me?text=${encodeURIComponent(sharedText)}%20-%20${encodeURIComponent(url)}`
	}

	return (
		<div>
			<h3 className="o3-type-body-highlight share-article-dialog__share-via-socials-title">Or share via</h3>
			<div id="social-share-buttons" data-o-component="o-share" className="o-share">
				<ul className="share-article-dialog__share-via-socials-wrapper">
					<li className="o-share__action">
						<a
							className="o-share__icon o-share__icon--x"
							href={mobileShareLinks.twitter}
							rel="noopener noreferrer"
							data-trackable="twitter"
						>
							<div className="o-share__icon__image">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
									<path d="M21.647 18.469 28.932 10h-1.726l-6.326 7.353L15.827 10H10l7.64 11.12L10 30h1.726l6.68-7.765L23.744 30h5.827l-7.924-11.531Zm-2.365 2.748-.774-1.107-6.16-8.81H15l4.971 7.11.774 1.107 6.462 9.242h-2.652l-5.273-7.541Z" />
								</svg>
							</div>
							<span className="o-share__text">Share on X</span>
						</a>
					</li>
					<li className="o-share__action">
						<a
							className="o-share__icon o-share__icon--facebook"
							href={mobileShareLinks.facebook}
							rel="noopener noreferrer"
							data-trackable="facebook"
						>
							<div className="o-share__icon__image">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
									<path d="M643.9 342h-48.2c-37.8 0-45.1 18-45.1 44.3v58.1h90.1l-11.7 91h-78.4V769h-94V535.5H378v-91h78.6v-67.1c0-77.9 47.6-120.3 117.1-120.3 33.3 0 61.9 2.5 70.2 3.6V342z" />
								</svg>
							</div>
							<span className="o-share__text">Share on Facebook</span>
						</a>
					</li>
					<li className="o-share__action">
						<a
							className="o-share__icon o-share__icon--linkedin"
							href={mobileShareLinks.linkedin}
							rel="noopener noreferrer"
							data-trackable="linkedin"
						>
							<div className="o-share__icon__image">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
									<path d="M264.4 426.2h106.2v341.4H264.4V426.2zm53.2-169.7c-34.1 0-61.6 27.6-61.6 61.5 0 34 27.5 61.5 61.6 61.5 33.9 0 61.5-27.6 61.5-61.5-.1-34-27.6-61.5-61.5-61.5zm323.1 161.2c-51.6 0-86.2 28.3-100.4 55.1h-1.5v-46.7H437.2v341.4h106V598.7c0-44.5 8.4-87.7 63.6-87.7 54.5 0 55.1 50.9 55.1 90.5v166H768V580.3c0-91.9-19.9-162.6-127.3-162.6z" />
								</svg>
							</div>
							<span className="o-share__text">Share on LinkedIn</span>
						</a>
					</li>
					<li className="o-share__action">
						<a
							className="o-share__icon o-share__icon--whatsapp"
							href={mobileShareLinks.whatsapp}
							rel="noopener noreferrer"
							data-trackable="whatsapp"
						>
							<div className="o-share__icon__image">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
									<path d="M756.7 436.8c-35.6-122-152.2-196.3-279.3-178.1-116 16.7-208.2 121.5-210.6 238.6-.9 45.5 9.5 87.9 30.4 128.2 2.6 4.9 3.1 12.2 1.6 17.6-4.1 15.4-9.8 30.5-14.9 45.7L257.6 768c44.5-14.2 86.2-27.4 127.8-41.1 7.3-2.4 13.1-1.8 19.9 1.5 48.9 23.9 100.3 31.5 154.2 22.4 145.1-24.5 238.3-172.8 197.2-314zM542.2 710.9c-47.6 5.4-91.8-3.7-132.7-28.3-5.4-3.2-9.9-3.8-15.8-1.8-20.2 6.8-40.7 13.2-61 19.7-2.4.8-4.9 1.2-9.5 2.4 5.3-16.1 8.6-31.2 15.1-44.8 9.4-20.1 6.5-35.8-4.3-55.9-57.4-106-12.8-237.4 99.5-287 124.7-55.1 269.7 24.4 288.6 159.4 17.9 129.1-77.2 224.6-179.9 236.3zm98.3-144.6c2.9 1.7 5.2 7.7 4.9 11.6-1.8 27.4-19.7 46.3-47.1 50.4-4.6.7-9.3.9-14 1.4l-.3 1c-8.8-1.9-17.7-3.3-26.2-5.9-57.5-17.8-101.9-53-134.8-103.2-13.6-20.8-27.2-41.4-30.4-66.8-3.1-24.2 4.6-44.7 21.1-62.3 10.4-11 23.3-10.4 36.3-7.7 2.9.6 6.1 4.2 7.4 7.2 6.9 16.7 13.7 33.4 19.4 50.5 1.5 4.7-.5 10.8-2 16-.8 3-3.6 5.5-5.7 8.1-14.9 18.3-14.7 18.2-1.7 37.8 17.8 26.9 41.5 46.8 70.2 61.2 9 4.5 15.7 3.7 21.9-4.2 5.2-6.5 11.1-12.5 16.5-18.9 4-4.8 8.6-6 14.2-3.1 16.8 8.9 33.9 17.4 50.3 26.9" />
								</svg>
							</div>
							<span className="o-share__text">Share on Whatsapp</span>
						</a>
					</li>
					<li className="o-share__action">
						<a
							className={`o-share__icon ${
								enterpriseEnabled ? 'share-article-dialog__icon--email' : 'o-share__icon--mail'
							}`}
							href={mailtoUrl}
							rel="noopener noreferrer"
							onClick={onClickHandler}
							data-trackable="email"
						>
							<div className="o-share__icon__image">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
									<path d="M768 305.1H256V719h512V305.1zm-51.2 362.6H307.2V450.1L512 573l204.8-122.9v217.6zm0-277.3L512 513.3 307.2 390.4v-34.1h409.6v34.1z" />
								</svg>
							</div>
							<span className="o-share__text">Share via Email</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
