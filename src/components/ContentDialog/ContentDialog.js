import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import ContentDialogBody from "../ContentDialogBody/ContentDialogBody";
import ContentDialogFooter from "../ContentDialogFooter/ContentDialogFooter";
import DialogTitleComp from "../ContentDialogTitle/ContentDialogTitle";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ContentDialog = (props) => {
  const { open, handleClose, id, media_type, openYoutubeVideo } = props;
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchContentData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=1612773dba4979088f60607d539b18c5&page&language=en-US`
      );
      setContent(data);
      // console.log(data);
    };

    fetchContentData();
  }, [media_type, id]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        component="span"
      >
        <DialogTitle id="draggable-dialog-title" component="span">
          {content && (
            <DialogTitleComp
              contentName={content.name || content.title}
              date={content.first_air_date || content.release_date || "-----"}
              vote_average={content.vote_average}
            />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="span">
            {content && (
              <ContentDialogBody
                tagline={content.tagline || "no tagline was given"}
                poster={content.backdrop_path}
                contentName={content.name || content.title}
                description={content.overview || "no description was given"}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          component="span"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {content && (
            <ContentDialogFooter
              openYoutubeVideo={openYoutubeVideo}
              handleClose={handleClose}
              openContentHomepage={content.homepage}
              media_type={media_type}
            />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContentDialog;
