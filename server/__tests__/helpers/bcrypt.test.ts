import { hashPassword, comparePassword } from "../../src/helpers/bcrypt";

jest.mock("../../src/helpers/bcrypt", () => ({
  hashPassword: jest.fn().mockResolvedValue("mocked_hashed_password"),
}));

describe("bcrypt helper functions", () => {
  describe("The Hash Password Method", () => {
    it("should return a new hash token of type string after succesfull creation", async () => {
      const fakePassword = "123456";

      const token = await hashPassword(fakePassword); // Uses mocked version

      expect(hashPassword).toHaveBeenCalledWith(fakePassword);
      expect(typeof token).toBe("string");
      expect(token).toBe("mocked_hashed_password");
    });
  });
});
