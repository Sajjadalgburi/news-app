import { createJwtToken } from "../../src/utils/jwt";

// Mock the createJwtToken method
jest.mock("../../src/utils/jwt", () => ({
  createJwtToken: jest.fn().mockReturnValue("mocked_token_string"),
}));

describe("JWT helper methods in utils folder", () => {
  describe("The create JWT method helper", () => {
    it("Should correctly return a new has token and passed in a user payload", () => {
      const userPayload = {
        id: "123",
        name: "fake user",
        email: "fakeuser@gmail.com",
      };

      const token = createJwtToken(userPayload);

      expect(typeof token).toBe("string");
      expect(token).toBe("mocked_token_string"); // Check the mocked token
      expect(createJwtToken).toHaveBeenCalledWith(userPayload); // Ensure the correct payload was passed
      expect(createJwtToken).toHaveBeenCalled(); // Ensure the function was called
    });
  });
});
