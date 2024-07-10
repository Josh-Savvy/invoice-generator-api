import * as bcrypt from 'bcrypt';

/**
 * Object containing password and invoice related functions.
 */
export default {
  /**
   * Functions related to password encryption and validation.
   */
  password: {
    /**
     * Encrypts a password using bcrypt.
     * @param {string} password - The password to encrypt.
     * @returns {Promise<string>} A promise that resolves to the hashed password.
     */
    encryptPassword: async (password: string): Promise<string> => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hashSync(password, salt);
    },

    /**
     * Validates a password against its encrypted version using bcrypt.
     * @param {string} encrypted - The encrypted password.
     * @param {string} value - The plain text password to validate.
     * @returns {boolean} True if the plain text password matches the encrypted password, false otherwise.
     */
    isValidPassword: async (
      encrypted: string,
      value: string,
    ): Promise<boolean> => {
      return bcrypt.compareSync(encrypted, value);
    },
  },

  /**
   * Functions related to invoice generation.
   */
  invoice: {
    /**
     * Generates a random alphanumeric invoice reference.
     * @returns {string} The generated invoice reference.
     */
    generateInvoiceRef: (): string => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const length = 8;
      let invoiceRef = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        invoiceRef += characters[randomIndex];
      }
      return invoiceRef;
    },
  },
};
