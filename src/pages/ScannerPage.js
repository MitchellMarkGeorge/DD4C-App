import React from "react";
import { Heading, Paragraph, Spinner } from "evergreen-ui";
import QrReader from "react-qr-reader";
import { db } from "../services/firebase";
import { decryptObject, getDBPath } from "../services/utils";
import Box from "ui-box";
import { ROUTES } from "../services/routes";

// console.log(process.env.REACT_APP_SECRET_PASSWORD)

const CURRENT_DAY_PATH = getDBPath();

const currentDayRef = db.ref(CURRENT_DAY_PATH);

export default function ScannerPage(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const onError = (err) => {
    console.log(err);
    props.history.push(ROUTES.ERROR);
  };

  const onScan = async (result) => {
    if (result && typeof result === "string") {
      setIsLoading(true);

      const decryptedStudentData = decryptObject(result);
      

      const { id } = decryptedStudentData;
      try {
        const snapshot = await currentDayRef
          .orderByChild("id")
          .equalTo(id)
          .once("value");
        if (snapshot.exists()) {
          // checks if the student has already been scanned
          // if the student hasnt be scanned, it is added to the datbase
          // if not, the error page is shown
          props.history.push(ROUTES.ERROR);
        } else {
          await currentDayRef.push(decryptedStudentData);
          props.history.push(ROUTES.SUCCESS);
        }
      } catch (error) {
        console.log(error);
        props.history.push(ROUTES.ERROR);
      }
    }
  };

  return (
    <Box
      position="relative"
      height="100%"
      width="100%"
      backgroundColor={isLoading ? "#D9822B" : null}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color="#47B881"
        transform="translate(-50%, -50%)"
        //     height="100%"
        //   width="100%"
        textAlign="center"
      >
        <Heading
          size={800}
          fontWeight="bold"
          color={isLoading ? "#fff" : "#47B881"}
        >
          {isLoading ? "Loading..." : "Scanner"}
        </Heading>

        {!isLoading && (
          <Paragraph marginTop="1rem" marginBottom="1rem" color="muted">
            Scan student QR Codes Here
          </Paragraph>
        )}

        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="1rem"
          >
            <Spinner size={36} />
          </Box>
        ) : (
          <QrReader
            style={{ height: "18rem", width: "18rem" }} // try and get a better size (inital ->300px)
            onScan={onScan}
            onError={onError}
          />
        )}
      </Box>
    </Box>
  );
}
