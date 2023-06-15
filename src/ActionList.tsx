import {
        Button,
        Icon,
        VStack,
        useColorModeValue,
        Heading
      } from "@chakra-ui/react";
      import ActionCard from "./ActionCard";
      import { AddIcon } from "@chakra-ui/icons";
      
      export default function ActionList() {
        return (
          <VStack
          role={"group"}
          pt ='3'
          pb={'5'}
          w={"425px"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          >
              <Heading alignSelf={'flex-start'} ml = '5' pt='1' fontSize={'2xl'}>
                      Action List
              </Heading>
            <ActionCard />
          </VStack>
        );
      }
      