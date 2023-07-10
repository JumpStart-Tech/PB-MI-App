import { getTherapistInfo } from "../models/userData";
import { useState, useEffect } from "react";

// calls getTherapistInfo from userData to get information for the profile screen
function useTherapist(therapistId) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (therapistId) {
      getTherapistInfo(therapistId)
        .then((therapist) => {
          if (isMounted) {
            setInfo(therapist);
          }
        })
        .catch((error) => {
          console.error('Error in fetching therapist info:', error);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [therapistId]);

  return info;
}

export {useTherapist};