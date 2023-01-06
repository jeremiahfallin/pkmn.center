import { useRouter } from 'next/router';
import { Link } from '@chakra-ui/react';

interface INavItem {
  icon?: JSX.Element;
  href: string;
  text: string;
}

const NavItem = (props: INavItem) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link
      href={props.href}
      color={isActive ? 'blue.500' : 'gray.500'}
      aria-current={isActive ? 'page' : undefined}
    >
      {props.icon}
      <span>{props.text}</span>
    </Link>
  );
};

export default NavItem;
