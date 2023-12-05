import { Box, BoxProps, IconButton, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

export type BaseLayoutProps = BoxProps;

export const BaseLayout = (props: BaseLayoutProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      p="4"
      pt="0"
      shadow="md"
      rounded="md"
      minH="100vh"
      w="md"
      maxW="100%"
      bgColor="MBackground"
      mx="auto"
      {...props}
    >
      <Outlet />
      <Box position="fixed" bottom="4" left="4">
        <IconButton
          borderWidth="1px"
          borderColor="MBorder"
          icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
          onClick={toggleColorMode}
          aria-label="change theme"
          title="Change Theme"
          background="MBackground"
          className="box-shadow"
        />
      </Box>
    </Box>
  );
};
