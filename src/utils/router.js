import { createHashRouter } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { BookPage } from "../pages/BookPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { RegisterPage } from "../pages/RegisterPage";

export const getBookPageRoute = (bookId) => {
  return `books/${bookId}`;
};

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <PageContainer>
        <HomePage />
      </PageContainer>
    ),
  },
  {
    path: "books/:bookId",
    element: (
      <PageContainer>
        <BookPage />
      </PageContainer>
    ),
  },
  {
    path: "/login",
    element: (
      <PageContainer>
        <LoginPage />
      </PageContainer>
    ),
  },
  {
    path: "/register",
    element: (
      <PageContainer>
        <RegisterPage />
      </PageContainer>
    ),
  },
  {
    path: "*",
    element: (
      <PageContainer>
        <NotFoundPage />
      </PageContainer>
    ),
  },
]);
