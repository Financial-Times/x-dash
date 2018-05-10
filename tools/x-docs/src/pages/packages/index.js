import React from 'react';
import Packages from '../../components/packages';

const PackagesPage = ({data}) => <Packages
	packages={
		data.allPackage
	}
/>;

export default PackagesPage;

export const query = graphql`
	query PackagesData {
		allPackage(filter: {base: {eq: "packages"}, pkgJson: {private: {ne: true}}}) {
			...PackageCards
		}
	}
`;
