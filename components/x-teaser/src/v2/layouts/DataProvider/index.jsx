import { h } from '@financial-times/x-engine';

import {
	ImageSizes,
	THEME_DEFAULT,
	THEME_OPINION,
	THEME_PAPER,
} from '../../../concerns/constants';
import imageService from '../../../concerns/image-service';

import RawContainer from '../../components/Container';
import RawTitle from '../../components/Title';
import RawMeta from '../../components/Meta';
import RawStandFirst from '../../components/StandFirst';
import RawImage from '../../components/Image';
import RawTimestamp from '../../components/Timestamp';

// Connect WrappedComponent to teaser data
export const connect = (WrappedComponent, teaserData = {}, theme, mapTeaserDataToProps = () => {}) => {
	const teaserProps = mapTeaserDataToProps(teaserData);
	const resolvedTheme = (teaserData.ui && teaserData.ui.forceTheme) || theme || THEME_PAPER;

	return layoutProps => <WrappedComponent {...teaserProps} {...layoutProps} theme={resolvedTheme} />;
};

const normalizeTeaserData = teaserData => Object.assign({}, teaserData, {
	// null -> undefined, so that we don't have to check for both
	metaLink: teaserData.metaLink || undefined,
	metaAltLink: teaserData.metaLink || undefined,
	indicators: teaserData.indicators || {},
});

// Provides selected components connected to teaser data to be rendered using `render` prop
export const DataProvider = ({ render, theme, components = [], ...teaserData }) => {
	const normalizedTeaserData = normalizeTeaserData(teaserData);
	const metaOpinionHasAlwaysSkyTheme = !theme || [THEME_PAPER, THEME_DEFAULT].indexOf(theme) !== -1;

	const componentMap = {
		Container: connect(
			RawContainer,
			normalizedTeaserData,
			theme,
		),
		Meta: connect(
			RawMeta,
			normalizedTeaserData,
			metaOpinionHasAlwaysSkyTheme && normalizedTeaserData.indicators.isOpinion ? THEME_OPINION : theme,
			({
				metaLink = {},
				metaAltLink = {},
				metaPrefixText,
				metaSuffixText,
				context: { parentId, parentLabel } = {},
			}) => {
				const hasSameIdAsParent = parentId && parentId === metaLink.id;
				const hasSameLabelAsParent = parentLabel && parentLabel === metaLink.prefLabel;
				const useAltLink = hasSameIdAsParent || hasSameLabelAsParent;
				const { url, relativeUrl, prefLabel } = useAltLink ? metaAltLink : metaLink;

				return {
					url: relativeUrl || url,
					prefLabel,
					prefixLabel: parentLabel !== metaPrefixText && metaPrefixText,
					suffixLabel: parentLabel !== metaSuffixText && metaSuffixText,
				};
			},
		),
		Title: connect(
			RawTitle,
			normalizedTeaserData,
			theme,
			({
				headlineTesting,
				title,
				altTitle,
				relativeUrl,
				url,
				indicators: { accessLevel } = {},
				ui: { titleSize } = {},
			}) => ({
				text: headlineTesting && altTitle ? altTitle : title,
				isPremium: accessLevel === 'premium',
				url: relativeUrl || url,
				size: titleSize,
			}),
		),
		Standfirst: connect(
			RawStandFirst,
			normalizedTeaserData,
			theme,
			({ standfirst }) => ({ text: standfirst }),
		),
		Image: connect(
			RawImage,
			normalizedTeaserData,
			theme,
			({ image = {}, imageSize = 'Large', imageLazyLoad }) => ({
				src: image.url ? imageService(image.url, ImageSizes[imageSize]) : null,
				isLazyLoaded: !!imageLazyLoad,
				lazyLoadClassName: imageLazyLoad,
			}),
		),
		Timestamp: connect(
			RawTimestamp,
			normalizedTeaserData,
			theme,
			({ publishedDate }) => ({ publishedDate }),
		),
	};

	const renderedComponents = components.map(componentName => {
		const LayoutComponent = componentMap[componentName];

		if (!LayoutComponent) {
			throw new Error(`[DataProvider] Component '${componentName}' doesn't have mapping implemented.`);
		}

		return LayoutComponent;
	});

	return render(renderedComponents);
};
