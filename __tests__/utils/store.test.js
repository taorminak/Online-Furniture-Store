/* global jest, describe, test, expect, beforeEach */
import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";

// Import functions to test
import {
  removeFromLS,
  removeFromWishlistLS,
  addItemToCart,
  addItemToWishlist,
  updateCartTotal,
  purchaseClicked,
  clearLS,
  quantityChanged,
  removeCartItem,
  removeWishlistItem,
} from "../../js/utils/store.js";

// Setup DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body>
  <div class="cart-items"></div>
  <div class="wishlist-items"></div>
  <span class="cart-total-price">$0</span>
  <button class="btn-purchase">Purchase</button>
</body></html>`);
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

// Replace the global localStorage with our mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

jest
  .spyOn(Storage.prototype, "getItem")
  .mockImplementation(() =>
    JSON.stringify([
      { title: "Test Item", price: "$99.99", imageSrc: "test.jpg" },
    ]),
  );
jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
jest.spyOn(Storage.prototype, "clear").mockImplementation(() => {});
// Mock alert
global.alert = jest.fn();

beforeEach(() => {
  // Reset DOM
  document.body.innerHTML = `
    <div class="cart-items">
      <div class="cart-row">
        <div class="cart-item cart-column">
          <img class="cart-item-image" src="test.jpg" width="100" height="100">
          <span class="cart-item-title">Test Item</span>
        </div>
        <span class="cart-price cart-column">$99.99</span>
        <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">Remove</button>
        </div>
      </div>
    </div>
    <div class="wishlist-items">
      <div class="wishlist-row">
        <div class="wishlist-item wishlist-column">
          <img class="wishlist-item-image" src="test.jpg" width="100" height="100">
          <span class="wishlist-item-title">Test Item</span>
        </div>
        <span class="wishlist-price wishlist-column">$99.99</span>
        <div class="wishlist-quantity wishlist-column">
          <button class="btn btn-danger" type="button">Remove</button>
        </div>
      </div>
    </div>
    <span class="cart-total-price">$99.99</span>
    <button class="btn-purchase">Purchase</button>
  `;

  // Clear all mocks
  jest.clearAllMocks();
  global.alert.mockClear();
});

describe("Cart Functionality", () => {
  beforeEach(() => {
    localStorage.getItem.mockReturnValue(
      JSON.stringify([
        { title: "Test Item", price: "$99.99", imageSrc: "test.jpg" },
      ]),
    );
  });

  test("removeFromLS removes item from localStorage", () => {
    const index = 0;
    removeFromLS(index);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "data",
      JSON.stringify([]),
    );
  });

  test("updateCartTotal calculates correct total", async() => {
    const quantityInput = document.querySelector(".cart-quantity-input");
    quantityInput.value = "2";

    updateCartTotal();

    await new Promise(resolve => setTimeout(resolve, 2000)); 

    const totalElement = document.querySelector(".cart-total-price");
    expect(totalElement.innerText).toBe("$199.98");
  });

  test("addItemToCart prevents duplicate items", () => {
    addItemToCart(0, "Test Item", "$99.99", "test.jpg");

    expect(global.alert).toHaveBeenCalledWith(
      "This item is already added to the cart",
    );
  });

  test("quantityChanged validates input value", () => {
    const input = document.querySelector(".cart-quantity-input");
    input.value = "-1";

    quantityChanged({ target: input });

    expect(input.value).toBe("1");
  });

  test("removeCartItem removes item and updates total", () => {
    const button = document.querySelector(".cart-quantity .btn-danger");
    const cartRow = button.closest(".cart-row");

    removeCartItem({ target: button });

    expect(document.querySelector(".cart-items").contains(cartRow)).toBeFalsy();
    expect(document.querySelector(".cart-total-price").innerText).toBe("$0");
  });
});

describe("Wishlist Functionality", () => {
  beforeEach(() => {
    localStorage.getItem.mockReturnValue(
      JSON.stringify([
        { titleWL: "Test Item", priceWL: "$99.99", imageSrcWL: "test.jpg" },
      ]),
    );
  });

  test("removeFromWishlistLS removes item from localStorage", () => {
    const index = 0;
    removeFromWishlistLS(index);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "wishlist",
      JSON.stringify([]),
    );
  });

  test("addItemToWishlist prevents duplicate items", () => {
    addItemToWishlist(0, "Test Item", "$99.99", "test.jpg");

    expect(global.alert).toHaveBeenCalledWith(
      "This item is already added to the wishlist",
    );
  });

  test("removeWishlistItem removes item from DOM", () => {
    const button = document.querySelector(".wishlist-quantity .btn-danger");
    const wishlistRow = button.closest(".wishlist-row");

    removeWishlistItem({ target: button });

    expect(
      document.querySelector(".wishlist-items").contains(wishlistRow),
    ).toBeFalsy();
  });
});

describe("Purchase Functionality", () => {
  test("purchaseClicked clears cart and localStorage", () => {
    purchaseClicked();

    expect(global.alert).toHaveBeenCalledWith("Thank you for your purchase");
    expect(localStorage.removeItem).toHaveBeenCalledWith("data");
    expect(localStorage.removeItem).toHaveBeenCalledWith("wishlist");
    expect(document.querySelector(".cart-items").children.length).toBe(0);
    expect(document.querySelector(".cart-total-price").innerText).toBe("$0");
  });

  test("clearLS clears localStorage", () => {
    clearLS();
    expect(localStorage.removeItem).toHaveBeenCalledWith("data");
    expect(localStorage.removeItem).toHaveBeenCalledWith("wishlist");
  });
});
