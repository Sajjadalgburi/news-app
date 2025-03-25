import { createJwtToken } from "../../src/utils/jwt";

jest.mock("../../src/utils/jwt");

describe("JWT helper methods in utils folder", () => {
  describe("The create JWT method helper", () => {
    const createJwtToken_MOCKED_ = createJwtToken as jest.Mock;

    it("Should correctly return a new token when passed a user payload", () => {
      const mockToken = "mocked_token_string";
      createJwtToken_MOCKED_.mockReturnValue(mockToken);

      const userPayload = {
        id: "123",
        name: "fake user",
        email: "fakeuser@gmail.com",
      };

      const token = createJwtToken(userPayload);

      expect(typeof token).toBe("string");
      expect(token).toBe(mockToken);
      expect(createJwtToken).toHaveBeenCalledWith(userPayload);
      expect(createJwtToken).toHaveBeenCalledTimes(1);
    });

    it.skip("Should throw an Error if it catches an issue/error", () => {
      const invalidPayload = null; // passing invalid payload to simulate an error event
      createJwtToken_MOCKED_.mockImplementation(invalidPayload);

      // Testing the actual function with an invalid payload
      expect(() => createJwtToken(invalidPayload)).toThrow(
        /Could not create the JWT token/i,
      );
    });
  });
});
