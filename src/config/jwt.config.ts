export type JwtConfig = {
  secret: string;
  // expiry:string
};
export default (): JwtConfig => ({
  secret: process.env.JWT_SECRET,
});
