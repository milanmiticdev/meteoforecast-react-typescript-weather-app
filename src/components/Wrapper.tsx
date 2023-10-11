import type { WrapperProps } from '../types/props.ts';

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
	return <div id="wrapper">{children}</div>;
};

export default Wrapper;
