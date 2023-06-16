import {
  Button,
  Icon,
  VStack,
  useColorModeValue,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import ToDoCard from "./ToDoCard";
import { DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

type ToDoListProps = {
  toDoArray: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ToDoList({ toDoArray, setList }: ToDoListProps) {
  const [text, setText] = useState("");

  let handleInputChange = (e: { target: { value: string } }) => {
    let inputValue = e.target.value;
    setText(inputValue);
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(toDoArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  function closeModal(posted: boolean) {
    if (text !== "" && posted) setList([...toDoArray, text]);
    setText("");
    onClose();
  }

  return (
    <VStack
      role={"group"}
      pt="3"
      pb={"5"}
      w={"425px"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      overflowY={"auto"}
      maxH="70vh"
    >
      <Heading alignSelf={"flex-start"} ml="5" pt="1" fontSize={"2xl"}>
        To-Do
      </Heading>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {toDoArray.map((text, index) => (
                <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                       <ToDoCard
                        text={text}
                        index={index + 1}
                        isDragging={false}
                        setList = {setList}
                        toDoArray={toDoArray}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        style={{
          position: "sticky",
          bottom: "0px",
          zIndex: 2,
        }}
        p={7}
        rounded={"full"}
        bg={"green.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(1 200 1 / 48%), 0 10px 10px -5px rgb(1 200 1 / 43%)"
        }
        _hover={{
          bg: "green.500",
        }}
        alignSelf={"flex-end"}
        mx="20px"
        onClick={onOpen}
      >
        <Icon as={AddIcon} boxSize={6} />
      </Button>
      <Modal isOpen={isOpen} onClose={() => closeModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new To-Do</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea value={text} onChange={handleInputChange}></Textarea>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => closeModal(false)}>
              Close
            </Button>
            <Button colorScheme="green" onClick={() => closeModal(true)}>
              Post To-Do
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
