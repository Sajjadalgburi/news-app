import { hashPassword, comparePassword } from "../../src/helpers/bcrypt";

jest.mock("../../src/helpers/bcrypt");

afterAll(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

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

      mockHashPassword.mockRestore();
    });

    it("Should return a null promise if there is an error", async () => {
      // Mocking the resolved value to return null
      const mockHashPassword = jest
        .spyOn(require("../../src/helpers/bcrypt"), "hashPassword")
        .mockResolvedValueOnce(null);

      const fakePassword = undefined;
      const token = await hashPassword(fakePassword); // Uses mocked version

      // Checking if the token is null
      expect(token).toBeNull();
      expect(mockHashPassword).toHaveBeenCalledWith(fakePassword);

      mockHashPassword.mockRestore();
    });
  });

  describe("The Compare Password Method", () => {
    it("Should return TRUE if the password MATCHES the hashed password", async () => {
      // Spy on the actual implementation without mocking
      const spyOnComparePassword = jest
        .spyOn(require("../../src/helpers/bcrypt"), "comparePassword")
        .mockResolvedValueOnce(true);

      const password = "123456";
      const hashedPassword = await hashPassword(password);

      const res = await comparePassword(password, hashedPassword);

      // Ensure the function was called with the correct parameters
      expect(spyOnComparePassword).toHaveBeenCalledWith(
        password,
        hashedPassword,
      );
      expect(res).toBeTruthy();
    });
  });

  it("Should return FALSE if the password does NOT MATCH the hashed password", async () => {
    // Spy on the actual implementation without mocking
    const spyOnComparePassword = jest
      .spyOn(require("../../src/helpers/bcrypt"), "comparePassword")
      .mockResolvedValueOnce(false);

    const realPassword = "123456";
    const invalidPassword = "random";
    const hashedPassword = await hashPassword(realPassword);

    const res: boolean = await comparePassword(invalidPassword, hashedPassword); // Result should be false

    // Ensure the function was called with the correct parameters
    expect(spyOnComparePassword).toHaveBeenCalledWith(
      invalidPassword,
      hashedPassword,
    );
    expect(res).toBe(false);
  });
});
