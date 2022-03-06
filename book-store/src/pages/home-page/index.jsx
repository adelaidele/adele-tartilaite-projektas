import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomePageCard from "./home-page-card";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/auth";

const HomePage = () => {
  const theme = useTheme();
  const { loggedIn } = useSelector(selectAuth);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: "250px",
          mb: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={5}
      >
        <Typography variant="h2" gutterBottom component="div">
          Welcome to our book store!
        </Typography>
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HomePageCard
          title="Browse our selection!"
          buttonTitle="browse"
          theme={theme}
          url="/books"
          width={loggedIn ? "100%" : "45%"}
        />
        {!loggedIn ? (
          <HomePageCard
            title="Become a member!"
            buttonTitle="register"
            theme={theme}
            url="/register"
            width="45%"
          />
        ) : null}
      </Box>
    </>
  );
};

export default HomePage;
