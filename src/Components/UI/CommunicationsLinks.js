import SpeedDial from "@mui/material/SpeedDial";
import React from "react";
import MessageIcon from "@mui/icons-material/Message";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const ComunicationLinks = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const facebookHanlder = () => {
    handleClose();
    const messengerLink = "https://m.me/100041643753488";
    window.open(messengerLink, "_blank");
  };
  const whatsAppHanlder = () => {
    handleClose();
    const whatsappLink = "https://wa.me/+970597348306";
    window.open(whatsappLink, "_blank");
  };
  const phoneHanlder = () => {
    handleClose();
    const phoneNumber = "+972597348306";

    const telUrl = `tel:${phoneNumber}`;

    window.location.href = telUrl;
  };
  const emailHanlder = () => {
    handleClose();

    const recipientEmail = "mqandel3@gmail.com";
    const subject = "Communicate with alpha";
    const body = "";
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const actions = [
    { icon: <FacebookIcon />, name: "Facebook", handler: facebookHanlder },
    { icon: <WhatsAppIcon />, name: "WhatsApp", handler: whatsAppHanlder },
    { icon: <PhoneIcon />, name: "Phone", handler: phoneHanlder },
    { icon: <EmailIcon />, name: "Email", handler: emailHanlder },
  ];
  return (
    <SpeedDial
      ariaLabel="Communcations"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<MessageIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.handler}
        />
      ))}
    </SpeedDial>
  );
};

export default ComunicationLinks;
