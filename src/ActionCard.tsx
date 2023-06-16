import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Button,
  Icon,
  UnorderedList,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Action } from './types';
import parse from 'html-react-parser';

type textProp = {
  text: string;
  steps: string;
  index: number;
  setActionList: React.Dispatch<React.SetStateAction<Action[]>>;
  actionList: Action[];
};

export default function ActionCard({ text, steps, index, actionList, setActionList}: textProp) {

  function handleDelete() {
    const newList = [...actionList]; 
    newList.splice(index - 1, 1); 
    setActionList(newList); 
  }

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
        <Stack align={"flex-start"}>
          <Heading fontSize={"lg"} fontFamily={"body"} fontWeight={700}>
            {text}
          </Heading>
          <UnorderedList>
          <div style={{ fontWeight: 500 }}>
          {parse(steps)}
          </div>
          </UnorderedList>
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
            onClick={handleDelete}
          >
            <Icon as={CheckIcon} boxSize={3.5} />
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
