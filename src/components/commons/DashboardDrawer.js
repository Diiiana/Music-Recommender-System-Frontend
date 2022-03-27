import React from "react";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: { 
        display: 'flex',
    },
    drawer: {
        width: "260px"
    }
})

function DashboardDrawer() {
    const styleClass = useStyles(); 
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
  return (
    <div
    
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        className={styleClass.drawer}
      >
        <List
        class="bg-transparent">
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerClose}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <ArrowBackIcon/>
      </IconButton>
      </Drawer>
    </div>
  );
}

export default DashboardDrawer;
