import * as bcrypt from 'bcrypt';

export default () => ({
  password: {
    encryptPassword: async (password: string) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hashSync(password, salt);
    },
    isValidPassword: async (encrypted: string, value: string) => {
      return bcrypt.compareSync(encrypted, value);
    },
  },
});
