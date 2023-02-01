import {
  AtSignIcon,
  HamburgerIcon,
  MoonIcon,
  RepeatIcon,
  SearchIcon,
  SmallCloseIcon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import NavItem from 'components/NavItem';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import ThemeSwitcher from './ThemeSwitcher';

const Nav = () => {
  const { data: session } = useSession();
  const [search, setSearch] = useState('');
  const { toggleColorMode } = useColorMode();
  const ColorModeIcon = useColorModeValue(SunIcon, MoonIcon);
  const colorModeText = useColorModeValue('Light', 'Dark');
  const router = useRouter();

  return (
    <>
      <Box as="nav" mx="auto" maxW="4xl" px={4}>
        <Flex
          pos="relative"
          flexWrap="wrap"
          justify="space-between"
          align="center"
          py={6}
        >
          <HStack spacing={8}>
            <Box display={{ base: 'block', md: 'none' }}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                />
                <MenuList>
                  <Link href="/">
                    <MenuItem icon={<AtSignIcon />}>Home</MenuItem>
                  </Link>
                  {session && (
                    <Link href="/create">
                      <MenuItem icon={<RepeatIcon />}>Trade</MenuItem>
                    </Link>
                  )}
                  <MenuItem icon={<ColorModeIcon />} onClick={toggleColorMode}>
                    {colorModeText} Mode
                  </MenuItem>
                  <MenuItem icon={<SmallCloseIcon />}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Flex align="center">
              <Box display={{ base: 'none', md: 'block' }}>
                <Flex gap={4}>
                  <NavItem href="/" text="Home" />
                  {session && <NavItem href="/create" text="Create Listing" />}
                </Flex>
              </Box>
            </Flex>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push({
                  pathname: `/pokemon`,
                  query: { search: `${search}` },
                });
              }}
            >
              <InputGroup>
                <InputLeftAddon p={0} borderRadius={0} borderLeftRadius="md">
                  <Select borderRadius={0} borderLeftRadius="md">
                    <option value="pokemon">Pokemon</option>
                    <option value="users">Trainers</option>
                  </Select>
                </InputLeftAddon>
                <Input
                  placeholder="Search"
                  value={search}
                  type="search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={`Search ${colorModeText}`}
                    type="submit"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputRightElement>
              </InputGroup>
            </form>
          </HStack>
          <Flex align="center" gap={4} display={{ base: 'none', md: 'flex' }}>
            <ThemeSwitcher />
            {!session && (
              <NextLink href="/api/auth/signin/discord">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    signIn('discord', {
                      callbackUrl: `${window.location.origin}/`,
                    });
                  }}
                >
                  <Box as="span">Login</Box>
                </Link>
              </NextLink>
            )}
            {session && session?.user?.id && (
              <>
                <NextLink href="/profile">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      router.push({
                        pathname: `/profile/${session?.user?.id}`,
                      });
                    }}
                  >
                    <Box as="span">Profile</Box>
                  </Link>
                </NextLink>
                <NextLink href="/">
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      signOut({
                        callbackUrl: `${window.location.origin}`,
                      });
                    }}
                  >
                    <Box as="span">Logout</Box>
                  </Link>
                </NextLink>
              </>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Nav;
