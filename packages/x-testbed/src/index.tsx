import {Component} from 'x-build';

interface TestProps {
	foo: string
}

type TestComponent = Component<TestProps>;

const Test: TestComponent = ({foo}) => <div>{foo + 2}</div>;

export default Test;
