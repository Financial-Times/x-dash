/** Strings must be a parseable format, e.g. ISO 8601 */
export type TeaserContentType = 'article' | 'video' | 'podcast' | 'package' | 'liveblog' | 'promoted-content' | 'paid-post';

export type TeaserDate = Date | string | number;

export type TeaserLayout = 'small' | 'large' | 'hero' | 'top-story';

export type TeaserModifier = 'opinion' | 'highlight' | 'centre' | 'stretched' | string;

export type TeaserImageSizes = 'XS' | 'Small' | 'Medium' | 'Large' | 'XL';

/** Thumbnail images must be accessible to the Origami Image Service */
export interface TeaserImage {
	url: string;
	width: number;
	height: number;
}

export interface TeaserConcept {
	id: string;
	url: string;
	prefLabel: string;
}

export interface TeaserMeta {
	/** Usually a brand, or a genre, or content type */
	conceptPrefix?: string;
	concept?: TeaserConcept;
	conceptSuffix?: string;
	/** Fallback used if the contextID is the same as the display concept */
	alternativeConcept?: TeaserConcept;
	/** Promoted content type */
	promotedPrefix?: 'Paid Post' | 'Promoted content';
	promotedBy?: string;
}

export interface TeaserContent {
	type: TeaserContentType;
	id: string;
	url: string;
	title: string;
	/** Used for testing headline variations */
	alternativeTitle?: string;
	standfirst?: string;
	/** Used for testing standfirst variations */
	alternativeStandfirst?: string;
}

export interface TeaserExtras {
	// TODO: re-name thumbnail?
	image?: TeaserImage;
	/** Headshot images must be present in the relevant Origami Image Service image set */
	headshot?: string;
	/** Content access level */
	premium?: boolean;
	/** Custom HTML slot */
	actions?: string | Function;
}

export interface TeaserStatus {
	publishedDate: TeaserDate;
	firstPublishedDate: TeaserDate;
	/** Live blog status */
	status?: 'inprogress' | 'comingsoon' | 'closed';
}

export interface TeaserFeatures {
	/** Default is false */
	showMeta: boolean;
	/** Default is false */
	showTitle: boolean;
	/** Default is false */
	showStandfirst: boolean;
	/** Default is false */
	showStatus: boolean;
	/** Default is false */
	showImage: boolean;
	/** Default is false */
	showActions: boolean;
	/** Default is false */
	showHeadshot: boolean;
}

export interface TeaserOptions {
	/** Default is false, showTitle must also be enabled */
	useAlternativeTitle: boolean;
	/** Default is false, showStandfirst must also be enabled */
	useAlternativeStandfirst: boolean;
	/** Default is false, showStatus must also be enabled */
	useRelativeTime: boolean;
	/** Default is false, showMeta must also be enabled */
	useAlternativeConcept: boolean;
	/** Default is "Small" */
	imageSize: string;
	/** Default is "small" */
	layouts?: TeaserLayout;
	/** Extra class name variations to append */
	modifiers?: TeaserModifier[];
}

export interface TeaserProps
	extends TeaserMeta,
		TeaserContent,
		TeaserStatus,
		TeaserExtras,
		TeaserFeatures,
		TeaserOptions {}
