import React from 'react';
import Packages from '../../components/packages';

const ComponentsPage = ({data}) => <Packages
	packages={
		data.allPackage
	}
/>;

export default ComponentsPage;

export const query = graphql`
	query ComponentsData {
		allPackage(filter: {base: {eq: "components"}, pkgJson: {private: {ne: true}}}) {
			...PackageCards
		}
	}
`;
