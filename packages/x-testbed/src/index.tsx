import {Component} from 'x-build';

interface TestProps {
	foo: string
}

type TestComponent = Component<TestProps>;

const Test: TestComponent = ({foo}) => <div>{foo} world</div>;

export default Test;
