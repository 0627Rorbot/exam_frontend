import React, { useEffect, useState, useRef } from "react";
// import Header from "../../Components/Header";
import TSpinner from "../../libs/TSpinner";
import PdfViewer from "../../libs/TPdfViewer";
import { Container, IconButton } from "@chakra-ui/react";
// import TCard from "../../Components/Test/TCard";

import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  FormHelperText,
  Wrap,
  WrapItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { FaRegFilePdf } from "react-icons/fa6";
import { GrDocumentUpdate } from "react-icons/gr";
import { ImFilePdf } from "react-icons/im";
import "./style.css";
import TCard from "../../Components/Test/TCard";

import { useSelector, useDispatch } from "react-redux";

import {
  createSubject,
  readSubjects,
} from "../../store/features/subject/subjectSlice";

const Problem = () => {
  const dispatch = useDispatch();
  // const [subjects, setSubjects] = useState([]);
  const subjects = useSelector((state) => state.subject.subjects);

  useEffect(() => {
    dispatch(readSubjects());
  }, [dispatch]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // total subjects infos
  const [fileUrl, setFileUrl] = useState("");
  const [pdf_file, setPdf_File] = useState(undefined);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);

  const my_file = useRef();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setPdf_File(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const onSaveSubject = () => {
    const problem = {
      pdf_file: pdf_file,
      title: title,
      content: content,
    };
    console.log(problem);
    dispatch(createSubject(problem));
  };

  return (
    <>
      {load ? <TSpinner /> : <></>}
      {/* <Header /> */}
      <Container maxW="10xl" bg="gray.50" centerContent>
        <Box background={""} p={5}>
          <Wrap justify="center" spacing={"30px"} size="lg">
            <WrapItem>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="React.js Test"
                  value={title}
                  size="lg"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormHelperText>We need to input title.</FormHelperText>
              </FormControl>
            </WrapItem>
            <WrapItem>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Input
                  placeholder="This is the best test for you."
                  value={content}
                  size="lg"
                  onChange={(e) => setContent(e.target.value)}
                />
                <FormHelperText>We need to input content.</FormHelperText>
              </FormControl>
            </WrapItem>
            <WrapItem>
              <FormControl>
                <FormLabel>PDF Exam Problem URL</FormLabel>
                <Input
                  type="text"
                  placeholder="http://exam.pdf.com"
                  size="lg"
                  readOnly={true}
                  value={fileUrl}
                />
                <FormHelperText>We need to input pdf url.</FormHelperText>
              </FormControl>
            </WrapItem>
            <WrapItem>
              <FormControl>
                <FormLabel>Exam Title</FormLabel>
                <Wrap spacing="10px" justify="center">
                  <WrapItem>
                    <Button
                      colorScheme="green"
                      onClick={() => my_file.current.click()}
                    >
                      <FaRegFilePdf />
                      PDF
                    </Button>
                  </WrapItem>
                  <WrapItem>
                    <Button colorScheme="blue" onClick={() => onSaveSubject()}>
                      <GrDocumentUpdate />
                      Upload
                    </Button>
                  </WrapItem>
                  <WrapItem>
                    <Button mr={0} colorScheme="green">
                      <ImFilePdf />
                      View
                    </Button>
                  </WrapItem>
                </Wrap>
              </FormControl>
            </WrapItem>
          </Wrap>
        </Box>

        <Input
          type="file"
          className="hidden"
          ref={my_file}
          onChange={(e) => onFileChange(e)}
        />
        <Box>
          {subjects.map((item) => (
            <TCard
              p={10}
              key={item._id}
              icon={item.icon}
              title={item.title}
              content={item.content}
              // onTest={onTest}
            />
          ))}
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>PDF View - Title: Title_1</DrawerHeader>
            <DrawerBody>
              <Box>
                <PdfViewer />
              </Box>
            </DrawerBody>

            <DrawerFooter>
              {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button> */}
              {/* <Button colorScheme='blue'>Save</Button> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Container>
    </>
  );
};

export default Problem;
