import { hashPassword, comparePassword } from "../../src/helpers/bcrypt";

jest.mock("../../src/helpers/bcrypt");

describe("bcrypt helper functions", () => {
  describe("The Hash Password Method", () => {
    it("Should return a new hash token of type string after successful creation", async () => {
      // Mocking the resolved value for hashPassword
      const mockHashPassword = jest
        .spyOn(require("../../src/helpers/bcrypt"), "hashPassword")
        .mockResolvedValueOnce("mocked_hashed_password");

      const fakePassword = "123456";
      const token = await hashPassword(fakePassword); // Uses mocked version

      expect(mockHashPassword).toHaveBeenCalledWith(fakePassword);
      expect(typeof token).toBe("string");
      expect(token).toBe("mocked_hashed_password");

      mockHashPassword.mockRestore(); // Don't forget to restore the spy
    });
  });
});
