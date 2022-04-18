import { Button } from "@mui/material";
import * as React from "react";
import * as Types from "../types";

const Navbar = (props: Types.NavbarProps) => {
  return (
    <>
      <div className="mb-4">
        <Button variant="contained" onClick={() => props.navToNewBlog()} className="btn btn-primary">
          New Blog
        </Button>
        <Button variant="contained" onClick={() => props.navToBlogs()} className="btn btn-primary">
          Blogs
        </Button>
        <Button variant="contained" onClick={() => props.navToAuthors()} className="btn btn-primary">
          Authors
        </Button>
        <Button variant="contained" onClick={() => props.handleLoggingOut()} className="btn btn-primary">
          Logout
        </Button>
      </div>
    </>
  );
};

export default Navbar;
