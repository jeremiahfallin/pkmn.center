import { Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface INavItemMobile {
  icon?: JSX.Element;
  href: string;
  text: string;
}

const NavItemMobile = (props: INavItemMobile) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link
      href={props.href}
      color={isActive ? 'primary.500' : 'gray.500'}
      aria-current={isActive ? 'page' : undefined}
    >
      {props.icon}
      <span>{props.text}</span>
    </Link>
  );
};

export default NavItemMobile;
