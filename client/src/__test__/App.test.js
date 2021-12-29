import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../App";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/";

let queryByText;

const server = setupServer(
  rest.get("https://fakestoreapi.com/products", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: "Casio Watch",
          price: 99.99,
          description: "It's a watch",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          rating: { rate: 4.9, count: 20 },
        },
      ])
    );
  }),
  rest.get("/auth/success", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: "user has successfully authenticated",
        user: {
          _id: { $oid: "61b4022f6a106e5195f45f61" },
          googleId: "100710622871462087966",
          displayName: "Quan MQ",
          firstName: "Quan",
          lastName: "MQ",
          image:
            "https://lh3.googleusercontent.com/a-/AOh14Gh9L5RtecOKkNWmof19oBb5va__p_rn-8WzKKsnhw=s96-c",
          createdAt: { $date: { $numberLong: "1639186991689" } },
          __v: { $numberInt: "0" },
          role: "admin",
        },
        cookies: "abc123",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  const component = render(<App />);
  queryByText = component.queryByText;
});

describe("app testing", () => {
  test("navbar should not display 'My Order', 'Logout' and 'Admin' button", () => {
    const adminBtn = queryByText("Admin");
    const orderBtn = queryByText("My Order");
    const logoutBtn = queryByText("Logout");

    expect(adminBtn).not.toBeInTheDocument();
    expect(orderBtn).not.toBeInTheDocument();
    expect(logoutBtn).not.toBeInTheDocument();
  });

  test("navbar should only display 'Home', 'Shop' and 'Login' button", () => {
    const homeBtn = queryByText("Home");
    const shopBtn = queryByText("Shop");
    const loginBtn = queryByText("Login");

    expect(homeBtn).toBeVisible();
    expect(shopBtn).toBeVisible();
    expect(loginBtn).toBeVisible();
  });

  test("login success", async () => {
    const loginBtn = queryByText("Login");
    userEvent.click(loginBtn);
    await waitFor(() => {
      expect(queryByText("Logout")).toBeInTheDocument();
    });
  });

  test("logout success", async () => {
    const loginBtn = queryByText("Login");
    userEvent.click(loginBtn);
    const logoutBtn = await screen.findByText("Logout");
    userEvent.click(logoutBtn);
    await waitFor(() => {
      expect(queryByText("Login")).toBeInTheDocument();
    });
  });

  test("add an item to cart", async () => {
    const shopBtn = queryByText("Shop");
    userEvent.click(shopBtn);
    const item = await screen.findByRole("img");
    userEvent.hover(item);
    const quickViewBtn = await screen.findByText("Quick View");
    expect(quickViewBtn).toBeVisible();
    userEvent.click(quickViewBtn);
    const addBtn = await screen.findByText("ADD TO CART");
    userEvent.click(addBtn);
    await waitFor(() => {
      expect(queryByText("is added to cart!")).toBeVisible();
    });
  });

  test("change item quantity in cart", async () => {
    const item = await screen.findByRole("img");
    userEvent.hover(item);
    const quickViewBtn = await screen.findByText("Quick View");
    expect(quickViewBtn).toBeVisible();
    userEvent.click(quickViewBtn);
    const addToCartBtn = await screen.findByText("ADD TO CART");
    userEvent.click(addToCartBtn);
    await waitFor(() => {
      expect(queryByText("is added to cart!")).toBeVisible();
    });
    const cartIcon = screen.getByTestId("cart");
    userEvent.click(cartIcon);
    expect(queryByText("Your Shopping Cart")).toBeVisible();
    const addBtn = queryByText("+");
    const subtractBtn = queryByText("-");
    const itemAmount = screen.getByTestId("item-amount");
    userEvent.click(addBtn);
    userEvent.click(addBtn);
    expect(itemAmount.textContent).toBe("3");
    userEvent.click(subtractBtn);
    expect(itemAmount.textContent).toBe("2");
  });

  test("remove item from cart", async () => {
    const item = await screen.findByRole("img");
    userEvent.hover(item);
    const quickViewBtn = await screen.findByText("Quick View");
    expect(quickViewBtn).toBeVisible();
    userEvent.click(quickViewBtn);
    const addToCartBtn = await screen.findByText("ADD TO CART");
    userEvent.click(addToCartBtn);
    await waitFor(() => {
      expect(queryByText("is added to cart!")).toBeVisible();
    });
    const cartIcon = screen.getByTestId("cart");
    userEvent.click(cartIcon);
    expect(queryByText("Your Shopping Cart")).toBeVisible();
    userEvent.click(screen.getByTestId("remove"));
    expect(queryByText("No items in cart.")).toBeVisible();
  });
});
