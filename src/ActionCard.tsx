import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Button,
  Icon,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";
//       const IMAGE =
//         'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function ActionCard() {
  var prioirty = 1;
  var title =
    "Finish to-do application and commit to git. Then send email to recruiter.";
  return (
    <Center py={3}>
      <Box
        role={"group"}
        p={6}
        w={"375px"}
        bg={useColorModeValue("white", "gray.600")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Stack align={"center"}>
          <Heading fontSize={"medium"} fontFamily={"body"} fontWeight={500}>
            {title}
          </Heading>
          <Button
            px={3}
            fontSize={"sm"}
            rounded={"full"}
            bg={"green.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(1 200 1 / 48%), 0 10px 10px -5px rgb(1 200 1 / 43%)"
            }
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
            alignSelf={"flex-end"}
          >
            <Icon as={CheckIcon} boxSize={3.5} />
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
