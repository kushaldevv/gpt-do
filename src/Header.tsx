import { Heading, Stack, Text } from "@chakra-ui/react";

import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function Header() {
  return (
    <Stack textAlign={"center"} alignItems="center">
      <ColorModeSwitcher alignSelf={'flex-end'} marginX={'5'} mt = '5'/>
      <Heading
        fontFamily={"sans-serif"}
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        mt = '-10'
      >
        To-Do List{" "}
        <Text as={"span"} bgGradient='linear(to-l, #7928CA, #FF0080)'bgClip='text'>
          made easy
        </Text>
      </Heading>
      <Text color={"gray.500"} maxW={"3xl"}>
        Efficiently manage your time with AI-generated action steps by <br />{" "}
        prioritizing tasks effectively.
      </Text>
    </Stack>
  );
}
