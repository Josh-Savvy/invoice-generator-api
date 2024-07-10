export default class Client {
  last_name: string;

  first_name: string;

  email?: string;

  phone_number?: string;

  isUser: boolean = false;

  constructor(input: Client) {
    Object.assign(this, input);
  }
}
