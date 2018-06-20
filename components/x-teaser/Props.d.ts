export type ContentType = 'article' | 'video' | 'podcast' | 'package' | 'liveblog' | 'promoted-content' | 'paid-post';

/** Strings must be a parseable format, e.g. ISO 8601 */
export type DateLike = Date | string | number;

export type Layout = 'small' | 'large' | 'hero' | 'top-story';

export type Modifier = 'stacked' | 'centre' | 'stretched' | 'opinion-background' | 'landscape' | 'big-story' | string;

export type ImageSize = 'XS' | 'Small' | 'Medium' | 'Large' | 'XL';

export interface Media {
	url: string;
	width: number;
	height: number;
}

export interface Concept {
	id: string;
	url: string;
	/** Preferred if available */
	relativeUrl?;
	prefLabel: string;
}

export interface Meta {
	showMeta: boolean;
	/** Usually a brand, or a genre, or content type */
	conceptPrefix?: string;
	concept?: Concept;
	conceptSuffix?: string;
	/** Fallback used if the contextID is the same as the display concept */
	altConcept?: Concept;
	/** Promoted content type */
	promotedPrefix?: 'Paid Post' | 'Promoted content';
	promotedSuffix?: string;
}

export interface Title {
	showTitle: boolean;
	title: string;
	/** Used for testing headline variations */
	altTitle?: string;
}

export interface Standfirst {
	showStandfirst: boolean;
	standfirst?: string;
	/** Used for testing standfirst variations */
	altStandfirst?: string;
}

export interface Status {
	showStatus: boolean;
	publishedDate: DateLike;
	firstPublishedDate: DateLike;
	/** Displays new/updated X mins/hours ago */
	useRelativeTime: boolean;
	/** Live blog status, will override date and time */
	status?: 'inprogress' | 'comingsoon' | 'closed';
}

export interface Video {
	showVideo: boolean;
	video?: Media
}

export interface Headshot {
	showHeadshot: boolean;
	headshot?: Media;
	headshotTint?: 'string'
}

export interface Image {
	showImage: boolean;
	/** Images must be accessible to the Origami Image Service */
	image?: Media;
	imageSize?: ImageSize;
	imageLazyload?: Boolean;
}

export interface RelatedLinks {
	showRelated: boolean;
	related?: RelatedLink[];
}

export interface RelatedLink {
	id: string;
	type: ContentType;
	url: string;
	/** Preferred to url if available */
	relativeUrl?;
	title: string;
}

export interface Indicators {
	canBeDistributed: 'yes' | 'no' | 'verify';
	canBeSyndicated: 'yes' | 'no' | 'verify' | 'withContributorPayment';
	accessLevel: 'premium' | 'subscribed' | 'registered' | 'free';
	/** Dynamically inferred options */
	isOpinion?: boolean;
	isColumn?: boolean;
	/** Methode packaging options */
	isEditorsChoice?: boolean;
	isExclusive?: boolean;
	isScoop?: boolean;
}

export interface Context {
	/** Enables alternative content for headline testing */
	enableHeadlineTesting?: Boolean;
	/** Prevents the teaser displaying the same concept */
	parentConcept?: Concept;
}

export interface Variants {
	/** Default is "small" */
	layout?: Layout;
	/** Extra class name variations to append */
	modifiers?: Modifier[];
}

export interface TeaserProps extends Meta, Title, Standfirst, Status, Headshot, Image, Video, RelatedLinks, Variants {
	id: string;
	url: string;
	/** Preferred to url if available */
	relativeUrl?;
	type: ContentType;
	indicators: Indicators
}
