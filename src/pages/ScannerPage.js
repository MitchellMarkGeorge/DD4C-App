import React from "react";
import { Heading, Paragraph, Spinner } from "evergreen-ui";
import QrReader from "react-qr-reader";
import { db } from "../services/firebase";
import { CURRENT_DAY_DB_PATH, decryptObject } from "../services/utils";
import Box from "ui-box";
import { ROUTES } from "../services/routes";
import * as Sentry from "@sentry/react";

const currentDayRef = db.ref(CURRENT_DAY_DB_PATH);

export default function ScannerPage(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const onError = (err) => {
    console.log(err);
    Sentry.captureException(err); // have to before history.push as component will be unmounted
    props.history.push(ROUTES.ERROR);
  };

  const onScan = async (result) => {
    // console.log(result);
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
          // if the student hasn't been scanned (meaning they dont exist in the database on that day), it is added to the database
          // if not, the error page is shown (meaning they were scanned/ in the database on that day)
          props.history.push(ROUTES.ERROR);
        } else {
          await currentDayRef.push(decryptedStudentData);
          props.history.push(ROUTES.SUCCESS);
        }
        // }
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
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
