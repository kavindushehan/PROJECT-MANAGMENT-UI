import * as React from "react";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useMemo, useState} from "react";
import categoryAPI from "../../../../../apis/modules/topicCategory";
import topicAPI from "../../../../../apis/modules/topic";
import {Spinner} from "react-bootstrap";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import ErrorToast from "../../../../../toast/error";
import Success from "../../../../../toast/success";
import Loader from "../../../../../loader/loader";
import {useDropzone} from "react-dropzone";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function SubmitTopicToPannel(props) {
    const [loading, setLoading] = useState(false);
    const [openned, setOpen] = React.useState(false);
    const [selectedCoSupervisor, setSelectedCoSupervisor] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const [showSuccessToast, setSuccessShowToast] = useState(false);
    const [showErrorToast, setErrorShowToast] = useState(false);

    const [panel, setPanel] = useState([]);

    const handleClickOpen = async () => {
        setOpen(true);
        let panelRespond = (await topicAPI.getMyPanel()).data.data.Respond;
        console.log(panelRespond)
        setPanel(panelRespond);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const baseStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "90px",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#A9A9B0",
        borderStyle: "dashed",
        marginBottom: "20px",
        backgroundColor: "#ffffff",
        color: "default",
        outline: "none",
        transition: "border .24s ease-in-out",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeStyle = {
        borderColor: "#2196f3",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const acceptStyle = {
        borderColor: "#00e676",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rejectStyle = {
        borderColor: "#ff1744",
    };

    //This is used to drag and drop image
    const {acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open} = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });


    //This is used style drag and drop image
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [baseStyle, isDragActive, activeStyle, isDragAccept, acceptStyle, isDragReject, rejectStyle]
    );
    const filepath = acceptedFiles.map((file) => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    const submitTopicToCoSupervisor = async () => {
        try {
            setBtnLoading(true);
            let formdata = new FormData();
            formdata.append("doc", acceptedFiles[0])
            formdata.append("topic_id", props.topic._id);
            formdata.append("panel_member_id", panel._id);

            await topicAPI.submitTopicToPanel(formdata);
            setSuccessShowToast(true);
            setOpen(false);
            window.location.reload(false);
        } catch (e) {
            setErrorShowToast(true);
        }
        setBtnLoading(false);
    };

    return (
        <div>
            {loading && <Loader/>}
            {!loading && (
                <div>
                    {showSuccessToast && (
                        <>
                            <Success message="Your topic submit to supervisor is successfully"/>
                        </>
                    )}

                    {showErrorToast && (
                        <>
                            <ErrorToast message="There have some errors. Please try again later"/>
                        </>
                    )}
                    {
                        panel == null && (
                            <ErrorToast message="Your group haven't any panel yet"/>
                        )
                    }
                    <Button
                        variant="outlined"
                        sx={{
                            float: "right",
                        }}
                        onClick={handleClickOpen}
                    >
                        SUBMIT TOPIC TO PANEL
                    </Button>
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        disableEscapeKeyDown={true}
                        open={openned}
                    >
                        <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                        >
                            SUBMIT OUR TOPIC TO PANEL
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                <form>
                                    <div className="form-group mt-2">
                                        <label
                                            className="mt-4"
                                            style={{fontWeight: "bold", color: "#5A5A5A"}}
                                        >
                                            Panel Name
                                        </label>
                                        <input type="text"
                                               className="form-control"
                                               id=""
                                               disabled={true}
                                               value={panel.name}
                                        />
                                    </div>

                                    <div className="form-group mt-2">
                                        <label
                                            className="mt-4"
                                            style={{fontWeight: "bold", color: "#5A5A5A"}}
                                        >
                                            Topic Name
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id=""
                                            disabled={true}
                                            placeholder="Enter Your Topic Name"
                                            required
                                            style={{height: "100px"}}
                                            value={props.topic.name}
                                        />
                                    </div>

                                    <div className="form-group mt-2">
                                        <div hidden={filepath.length > 0} {...getRootProps({style})}>
                                            <input {...getInputProps()} />
                                            <p>Drag 'n' drop your image file here, or click to select files</p>
                                        </div>

                                        <h4>File Details</h4>
                                        <ul>{filepath}</ul>
                                    </div>
                                    <br/>
                                </form>
                            </Typography>
                            <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <LoadingButton
                                disabled={filepath.length === 0 || btnLoading}
                                onClick={submitTopicToCoSupervisor}
                                endIcon={<SendIcon/>}
                                loading={btnLoading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                Send
                            </LoadingButton>
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            )}
        </div>
    );
}
