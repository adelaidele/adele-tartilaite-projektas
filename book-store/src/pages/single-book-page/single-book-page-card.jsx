import React from "react";
import { Box, Typography, Card, Fab, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import SingleBookPageImage from "./single-book-page-card-image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { theme } from "../../libs/ThemeCreator";
import { addToCart } from "../../store/cart";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/auth";

const SingleBookPageCard = ({ title, author, genre, price, img, id }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const { loggedIn } = useSelector(selectAuth);

  const StyledBoxContainer = styled(Card)({
    display: "flex",
    width: "100%",
    height: 400,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: "#f8f8ff",
    padding: 25,
  });

  const StyleImageContainer = styled(Card)({
    height: 250,
    width: 250,
    borderRadius: "10%",
  });

  const StyledInformationItem = styled(Typography)({
    textAlign: "end",
    fontSize: 16,
    marginBottom: 10,
  });

  const StyledBookTitle = styled(Typography)({
    textAlign: "center",
    marginBottom: 15,
    fontSize: 20,
  });

  const StyledInformationPrice = styled(StyledInformationItem)({
    fontWeight: "bold",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  });

  return (
    <Container>
      <StyledBoxContainer>
        <StyleImageContainer>
          <SingleBookPageImage img={img} sx={{ borderRadius: "10%" }} />
        </StyleImageContainer>
        <Box>
          <StyledBookTitle sx={{ fontWeight: "bold" }}>{title}</StyledBookTitle>
          <StyledInformationItem>Author: {author}</StyledInformationItem>
          <StyledInformationItem>Genre: {genre}</StyledInformationItem>
          <StyledInformationPrice>
            Price: {price}
            {loggedIn ? (
              <Fab
                onClick={() =>
                  handleAddToCart({ title, author, genre, price, img, id })
                }
                size="small"
                style={{ marginLeft: 20, backgroundColor: "#f5f5f5" }}
              >
                <AddShoppingCartIcon
                  style={{ fill: theme.palette.primary.light }}
                />
              </Fab>
            ) : null}
          </StyledInformationPrice>
        </Box>
      </StyledBoxContainer>
    </Container>
  );
};

export default SingleBookPageCard;
