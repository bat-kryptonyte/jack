import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { Button, AppBar, Toolbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "#FFFFFF",
    marginBottom: theme.spacing(3),
  },
  linkButton: {
    margin: theme.spacing(1),
    color: theme.palette.common.white,
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar}>
         
        
      <Toolbar>
      <Link href="/about" passHref>
         <Image
              src="/duck-contour-final.png"
              alt="Descriptive Alt Text"
              width={200}
              height={200}
            /> 
          
        </Link>

        <Link href="/about" passHref>
          <Button className={classes.linkButton}>
            About Us
          </Button>
        </Link>

        <Link href="/team" passHref>
          <Button className={classes.linkButton}>
            Team
          </Button>
        </Link>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
