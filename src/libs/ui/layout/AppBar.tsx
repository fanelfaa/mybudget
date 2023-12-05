import { Button, Grid, HStack, Heading, IconButton } from "@chakra-ui/react";
import { CSSProperties, ReactElement, useEffect, useId, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

export type AppBarAction = {
  title?: string;
  icon?: ReactElement;
  style?: CSSProperties;
  onClick?: () => void;
};

export const Action = ({ icon, title, style, onClick }: AppBarAction) => {
  if (icon && !title) {
    return (
      <IconButton
        icon={icon}
        aria-label=""
        onClick={onClick}
        variant="ghost"
        colorScheme="blue"
        size="sm"
        fontSize="1.8rem"
        bg="transparent!important"
        style={style}
      />
    );
  }
  return (
    <Button
      leftIcon={icon}
      onClick={onClick}
      variant="ghost"
      colorScheme="blue"
      size="sm"
      bg="transparent!important"
      fontSize="1rem"
      fontWeight="medium"
      style={style}
    >
      {title}
    </Button>
  );
};

export type AppBarProps = {
  leftAction?: AppBarAction;
  title?: string;
  onBack?: () => void;
  rightActions?: AppBarAction[];
};

export const AppBar = ({
  title,
  onBack,
  rightActions,
  leftAction,
}: AppBarProps) => {
  const [showSmallTitle, setShowSmallTitle] = useState(false);
  const [hideBigTitle, setHideBigTitle] = useState(false);
  const uniqId = useId();

  const handleScroll = () => {
    const position = window.scrollY;
    setShowSmallTitle(position >= 40);
    setHideBigTitle(position >= 45);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Grid
        templateColumns="1fr 3fr 1fr"
        position="sticky"
        zIndex="100"
        top="0"
        bg={hideBigTitle ? "MAppBarShow" : "MBackground"}
        blur="md"
        backdropFilter="blur(15px)"
        alignItems="center"
        borderBottom="1px solid"
        borderColor={showSmallTitle ? "MBorder" : "transparent"}
        mx="-4"
        px="2"
        h="12"
        justifyContent="space-between"
        transition="all .2s ease-in-out"
      >
        <HStack>
          {onBack ? (
            <IconButton
              icon={<FiChevronLeft />}
              variant="ghost"
              aria-label="Back"
              onClick={onBack}
              colorScheme="blue"
              size="sm"
              fontSize="1.8rem"
              bg="transparent!important"
            />
          ) : null}
          {leftAction && !onBack ? <Action {...leftAction} /> : null}
        </HStack>
        <Heading
          size="md"
          fontWeight="semibold"
          noOfLines={1}
          textAlign="center"
          color={showSmallTitle ? undefined : "transparent"}
          transition="all .2s ease-in-out"
        >
          {title}
        </Heading>
        <HStack justify="flex-end">
          {rightActions && rightActions.length > 0
            ? rightActions.map((action, i) => (
                <Action key={uniqId + i} {...action} />
              ))
            : null}
        </HStack>
      </Grid>
      <Heading
        noOfLines={2}
        color={!showSmallTitle ? "MTitleText" : "transparent"}
        transition="all .3s ease-out"
        size="xl"
        fontSize="2.5rem"
        minH="14"
      >
        {title}
      </Heading>
    </>
  );
};
