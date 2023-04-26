import {FC} from 'react';
import NextLink, { LinkProps } from 'next/link';

const Link: FC<LinkProps & {className?: string; target?: string;}> = ({className, children, target, ...props}) => {
  return <NextLink {...props}><a target={target} className={className}>{children}</a></NextLink>
};

export default Link;